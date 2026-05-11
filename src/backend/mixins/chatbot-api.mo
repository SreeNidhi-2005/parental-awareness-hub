import Text "mo:core/Text";
import Array "mo:core/Array";
import ChatTypes "../types/chatbot";
import Time "mo:core/Time";

mixin () {

  // IC Management canister type for HTTP outcalls
  type HttpHeader = { name : Text; value : Text };
  type HttpMethod = { #get; #post; #head };
  type HttpResponse = {
    status  : Nat;
    headers : [HttpHeader];
    body    : Blob;
  };
  type HttpRequest = {
    url                : Text;
    max_response_bytes : ?Nat64;
    headers            : [HttpHeader];
    body               : ?Blob;
    method             : HttpMethod;
    transform          : ?{ function : shared query { response : HttpResponse; context : Blob } -> async HttpResponse; context : Blob };
  };

  let ic : actor {
    http_request : HttpRequest -> async HttpResponse;
  } = actor "aaaaa-aa";

  let SYSTEM_PROMPT : Text = "You are a warm, empathetic parenting guidance assistant for the Parental Awareness Hub. " #
    "You help parents understand their children's emotional needs, mental health challenges, and communication gaps. " #
    "Always respond with compassion, evidence-based advice, and practical suggestions. " #
    "Focus on positive, non-judgmental guidance that strengthens family relationships. " #
    "Keep responses concise (2-4 paragraphs) and actionable.";

  // Escape special JSON characters in a text string
  func escapeJson(t : Text) : Text {
    var r = t;
    r := r.replace(#text "\\", "\\\\");
    r := r.replace(#text "\"", "\\\"");
    r := r.replace(#predicate (func(c : Char) : Bool { c == '\n' }), "\\n");
    r := r.replace(#predicate (func(c : Char) : Bool { c == '\r' }), "\\r");
    r := r.replace(#predicate (func(c : Char) : Bool { c == '\t' }), "\\t");
    r;
  };

  // Build the OpenAI chat completions request body
  func buildRequestBody(request : ChatTypes.ChatRequest) : Text {
    let msgParts : [Text] = request.messages.map<ChatTypes.ChatMessage, Text>(
      func(msg) {
        let role = switch (msg.role) { case (#user) { "user" }; case (#assistant) { "assistant" } };
        "{\"role\":\"" # role # "\",\"content\":\"" # escapeJson(msg.content) # "\"}";
      }
    );
    let joined = msgParts.values().join(",");
    "{\"model\":\"gpt-3.5-turbo\",\"max_tokens\":512,\"messages\":[" #
      "{\"role\":\"system\",\"content\":\"" # escapeJson(SYSTEM_PROMPT) # "\"}," #
      joined # "]}";
  };

  // Extract the assistant reply text from an OpenAI JSON response
  func extractReply(body : Text) : Text {
    let marker = "\"content\":\"";
    let parts = body.split(#text marker).toArray();
    if (parts.size() < 2) {
      return "I'm sorry, I could not process that request. Please try again.";
    };
    let afterMarker = parts[1];
    // Split on " character (ASCII 34) using char code comparison
    let innerParts = afterMarker.split(#predicate (func(c : Char) : Bool { Char.toNat32(c) == 34 })).toArray();
    if (innerParts.size() == 0) {
      return "I'm sorry, I could not process that request. Please try again.";
    };
    var reply = innerParts[0];
    reply := reply.replace(#text "\\n", "\n");
    reply := reply.replace(#text "\\t", "\t");
    reply := reply.replace(#text "\\\"", "\"");
    reply := reply.replace(#text "\\\\", "\\");
    reply;
  };

  public shared func chat(request : ChatTypes.ChatRequest) : async ChatTypes.ChatResponse {
    let bodyText = buildRequestBody(request);
    let bodyBlob = bodyText.encodeUtf8();

    // Attach cycles for http_request (IC requires payment for outcalls)
    let cycles : Nat = 1_000_000_000;
    ignore cycles; // cycles attachment is handled by calling context

    let httpResp = await ic.http_request({
      url                = "https://api.openai.com/v1/chat/completions";
      max_response_bytes = ?(Nat64.fromNat(4096));
      headers            = [
        { name = "Content-Type";  value = "application/json" },
        { name = "Authorization"; value = "Bearer OPENAI_API_KEY" }
      ];
      body               = ?bodyBlob;
      method             = #post;
      transform          = null;
    });

    let replyText = switch (httpResp.body.decodeUtf8()) {
      case null   { "Unable to decode response from AI service." };
      case (?raw) { extractReply(raw) };
    };

    { reply = replyText; timestamp = Time.now() };
  };
};

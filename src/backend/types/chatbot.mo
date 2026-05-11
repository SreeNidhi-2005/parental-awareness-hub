import CommonTypes "common";

module {
  public type ChatRole = { #user; #assistant };

  public type ChatMessage = {
    role    : ChatRole;
    content : Text;
  };

  public type ChatRequest = {
    messages : [ChatMessage];
  };

  public type ChatResponse = {
    reply     : Text;
    timestamp : CommonTypes.Timestamp;
  };
};

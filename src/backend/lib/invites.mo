import Map "mo:core/Map";
import Types "../types/common";
import Time "mo:core/Time";

module {
  public func generateInviteToken(
    invites : Map.Map<Text, Types.InviteToken>,
    boards : Map.Map<Types.BoardId, Types.Board>,
    caller : Principal,
    boardId : Types.BoardId,
  ) : ?Text {
    switch (boards.get(boardId)) {
      case null { null };
      case (?board) {
        if (board.ownerId != caller) { return null };
        let now = Time.now();
        // Simple token: boardId + principal text + timestamp
        let token = boardId.toText() # "-" # caller.toText() # "-" # now.toText();
        let invite : Types.InviteToken = {
          token = token;
          boardId = boardId;
          role = #Editor;
          createdAt = now;
        };
        invites.add(token, invite);
        ?token;
      };
    };
  };

  public func validateInviteToken(
    invites : Map.Map<Text, Types.InviteToken>,
    token : Text,
  ) : ?(Types.BoardId, Types.BoardRole) {
    switch (invites.get(token)) {
      case null { null };
      case (?invite) { ?(invite.boardId, invite.role) };
    };
  };

  public func joinBoardWithToken(
    invites : Map.Map<Text, Types.InviteToken>,
    boards : Map.Map<Types.BoardId, Types.Board>,
    caller : Principal,
    token : Text,
  ) : { #ok; #err : Text } {
    switch (invites.get(token)) {
      case null { #err("Invalid invite token") };
      case (?invite) {
        switch (boards.get(invite.boardId)) {
          case null { #err("Board not found") };
          case (?board) {
            // Check if already a collaborator or owner
            if (board.ownerId == caller) { return #err("You are already the owner") };
            let existing = board.collaborators.find(func(c : Types.Collaborator) : Bool { c.principal == caller });
            if (existing != null) { return #err("Already a collaborator") };
            let newCollab : Types.Collaborator = { principal = caller; role = invite.role };
            board.collaborators := board.collaborators.concat([newCollab]);
            #ok;
          };
        };
      };
    };
  };
}

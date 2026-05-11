import Map "mo:core/Map";
import Types "../types/common";

module {
  public func setUserRole(
    boards : Map.Map<Types.BoardId, Types.Board>,
    caller : Principal,
    boardId : Types.BoardId,
    userPrincipal : Principal,
    role : Types.BoardRole,
  ) : Bool {
    switch (boards.get(boardId)) {
      case null { false };
      case (?board) {
        if (board.ownerId != caller) { return false };
        let existing = board.collaborators.find(func(c : Types.Collaborator) : Bool { c.principal == userPrincipal });
        switch (existing) {
          case (?_) {
            board.collaborators := board.collaborators.map(
              func(c : Types.Collaborator) : Types.Collaborator {
                if (c.principal == userPrincipal) { { c with role = role } } else { c };
              }
            );
          };
          case null {
            let newCollab : Types.Collaborator = { principal = userPrincipal; role = role };
            board.collaborators := board.collaborators.concat([newCollab]);
          };
        };
        true;
      };
    };
  };

  public func getUserRole(
    boards : Map.Map<Types.BoardId, Types.Board>,
    caller : Principal,
    boardId : Types.BoardId,
  ) : ?Types.BoardRole {
    switch (boards.get(boardId)) {
      case null { null };
      case (?board) {
        if (board.ownerId == caller) { return ?#Owner };
        switch (board.collaborators.find(func(c : Types.Collaborator) : Bool { c.principal == caller })) {
          case (?collab) { ?collab.role };
          case null { null };
        };
      };
    };
  };

  public func getBoardPermissions(
    boards : Map.Map<Types.BoardId, Types.Board>,
    caller : Principal,
    boardId : Types.BoardId,
  ) : [Types.PermissionEntry] {
    switch (boards.get(boardId)) {
      case null { [] };
      case (?board) {
        if (board.ownerId != caller) { return [] };
        let ownerEntry : Types.PermissionEntry = { principal = board.ownerId; role = #Owner };
        let collabEntries = board.collaborators.map(
          func(c : Types.Collaborator) : Types.PermissionEntry { { principal = c.principal; role = c.role } }
        );
        [ownerEntry].concat(collabEntries);
      };
    };
  };
}

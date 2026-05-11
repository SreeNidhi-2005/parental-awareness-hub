import Map "mo:core/Map";
import List "mo:core/List";
import Types "../types/common";
import Time "mo:core/Time";
import Array "mo:core/Array";

module {
  public func createBoard(
    boards : Map.Map<Types.BoardId, Types.Board>,
    nextId : Nat,
    caller : Principal,
    title : Text,
  ) : Types.BoardId {
    let now = Time.now();
    let board : Types.Board = {
      id = nextId;
      title = title;
      ownerId = caller;
      var canvasJson = "{}";
      createdAt = now;
      var updatedAt = now;
      var collaborators = [];
    };
    boards.add(nextId, board);
    nextId;
  };

  public func getBoards(
    boards : Map.Map<Types.BoardId, Types.Board>,
    caller : Principal,
  ) : [Types.BoardPublic] {
    let results = List.empty<Types.BoardPublic>();
    for ((_, board) in boards.entries()) {
      if (hasAccess(board, caller)) {
        results.add(toPublic(board));
      };
    };
    results.toArray();
  };

  public func getBoard(
    boards : Map.Map<Types.BoardId, Types.Board>,
    caller : Principal,
    boardId : Types.BoardId,
  ) : ?Types.BoardPublic {
    switch (boards.get(boardId)) {
      case null { null };
      case (?board) {
        if (hasAccess(board, caller)) {
          ?toPublic(board);
        } else { null };
      };
    };
  };

  public func saveBoardState(
    boards : Map.Map<Types.BoardId, Types.Board>,
    caller : Principal,
    boardId : Types.BoardId,
    canvasJson : Text,
  ) : Bool {
    switch (boards.get(boardId)) {
      case null { false };
      case (?board) {
        if (not hasAccess(board, caller)) { return false };
        board.canvasJson := canvasJson;
        board.updatedAt := Time.now();
        true;
      };
    };
  };

  public func deleteBoard(
    boards : Map.Map<Types.BoardId, Types.Board>,
    caller : Principal,
    boardId : Types.BoardId,
  ) : Bool {
    switch (boards.get(boardId)) {
      case null { false };
      case (?board) {
        if (board.ownerId != caller) { return false };
        boards.remove(boardId);
        true;
      };
    };
  };

  public func toPublic(board : Types.Board) : Types.BoardPublic {
    {
      id = board.id;
      title = board.title;
      ownerId = board.ownerId;
      canvasJson = board.canvasJson;
      createdAt = board.createdAt;
      updatedAt = board.updatedAt;
      collaborators = board.collaborators;
    };
  };

  public func hasAccess(
    board : Types.Board,
    caller : Principal,
  ) : Bool {
    if (board.ownerId == caller) { return true };
    let found = board.collaborators.find(func(c : Types.Collaborator) : Bool { c.principal == caller });
    found != null;
  };

  public func getRole(
    board : Types.Board,
    caller : Principal,
  ) : ?Types.BoardRole {
    if (board.ownerId == caller) { return ?#Owner };
    switch (board.collaborators.find(func(c : Types.Collaborator) : Bool { c.principal == caller })) {
      case (?collab) { ?collab.role };
      case null { null };
    };
  };
}

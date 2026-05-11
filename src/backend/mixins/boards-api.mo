import Map "mo:core/Map";
import Types "../types/common";
import BoardsLib "../lib/boards";
import List "mo:core/List";

mixin (
  boards : Map.Map<Types.BoardId, Types.Board>,
  counter : List.List<Nat>,
) {
  public shared ({ caller }) func createBoard(title : Text) : async Types.BoardId {
    let nextId = counter.at(0);
    counter.put(0, nextId + 1);
    BoardsLib.createBoard(boards, nextId, caller, title);
  };

  public shared query ({ caller }) func getBoards() : async [Types.BoardPublic] {
    BoardsLib.getBoards(boards, caller);
  };

  public shared query ({ caller }) func getBoard(boardId : Types.BoardId) : async ?Types.BoardPublic {
    BoardsLib.getBoard(boards, caller, boardId);
  };

  public shared ({ caller }) func saveBoardState(boardId : Types.BoardId, canvasJson : Text) : async Bool {
    BoardsLib.saveBoardState(boards, caller, boardId, canvasJson);
  };

  public shared ({ caller }) func deleteBoard(boardId : Types.BoardId) : async Bool {
    BoardsLib.deleteBoard(boards, caller, boardId);
  };
}

import Map "mo:core/Map";
import List "mo:core/List";
import Types "../types/common";
import BoardsLib "../lib/boards";
import RevisionsLib "../lib/revisions";

mixin (
  boards : Map.Map<Types.BoardId, Types.Board>,
  revisions : Map.Map<Types.BoardId, List.List<Types.Revision>>,
) {
  public shared ({ caller }) func saveRevision(boardId : Types.BoardId, canvasJson : Text, snapshotLabel : Text) : async Bool {
    // Only allow access if caller has board access
    switch (boards.get(boardId)) {
      case null { false };
      case (?board) {
        if (not BoardsLib.hasAccess(board, caller)) { return false };
        RevisionsLib.saveRevision(revisions, boardId, canvasJson, snapshotLabel);
        true;
      };
    };
  };

  public shared query ({ caller }) func getRevisions(boardId : Types.BoardId) : async [Types.Revision] {
    switch (boards.get(boardId)) {
      case null { [] };
      case (?board) {
        if (not BoardsLib.hasAccess(board, caller)) { return [] };
        RevisionsLib.getRevisions(revisions, boardId);
      };
    };
  };

  public shared query ({ caller }) func loadRevision(boardId : Types.BoardId, revisionIndex : Nat) : async ?Text {
    switch (boards.get(boardId)) {
      case null { null };
      case (?board) {
        if (not BoardsLib.hasAccess(board, caller)) { return null };
        RevisionsLib.loadRevision(revisions, boardId, revisionIndex);
      };
    };
  };
}

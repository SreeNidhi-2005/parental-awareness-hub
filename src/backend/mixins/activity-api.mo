import Map "mo:core/Map";
import List "mo:core/List";
import Types "../types/common";
import BoardsLib "../lib/boards";
import ActivityLib "../lib/activity";

mixin (
  boards : Map.Map<Types.BoardId, Types.Board>,
  activity : Map.Map<Types.BoardId, List.List<Types.ActivityEvent>>,
) {
  public shared ({ caller }) func logActivity(boardId : Types.BoardId, eventType : Text, description : Text) : async Bool {
    // Retrieve username from the board context — caller's principal text as fallback
    switch (boards.get(boardId)) {
      case null { false };
      case (?board) {
        if (not BoardsLib.hasAccess(board, caller)) { return false };
        ActivityLib.logActivity(activity, caller, boardId, caller.toText(), eventType, description);
        true;
      };
    };
  };

  public shared query ({ caller }) func getActivity(boardId : Types.BoardId) : async [Types.ActivityEvent] {
    switch (boards.get(boardId)) {
      case null { [] };
      case (?board) {
        if (not BoardsLib.hasAccess(board, caller)) { return [] };
        ActivityLib.getActivity(activity, boardId);
      };
    };
  };
}

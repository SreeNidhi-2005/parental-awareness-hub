import Map "mo:core/Map";
import Types "../types/common";
import CursorsLib "../lib/cursors";

mixin (cursors : Map.Map<Types.BoardId, Map.Map<Principal, Types.CursorState>>) {
  public shared ({ caller }) func updateCursor(boardId : Types.BoardId, x : Float, y : Float, username : Text, color : Text) : async () {
    CursorsLib.updateCursor(cursors, caller, boardId, x, y, username, color);
  };

  public shared query ({ caller }) func getCursors(boardId : Types.BoardId) : async [Types.CursorState] {
    CursorsLib.getCursors(cursors, caller, boardId);
  };
}

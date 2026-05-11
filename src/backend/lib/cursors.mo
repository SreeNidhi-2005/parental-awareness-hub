import Map "mo:core/Map";
import Types "../types/common";
import Time "mo:core/Time";
import List "mo:core/List";

module {
  public func updateCursor(
    cursors : Map.Map<Types.BoardId, Map.Map<Principal, Types.CursorState>>,
    caller : Principal,
    boardId : Types.BoardId,
    x : Float,
    y : Float,
    username : Text,
    color : Text,
  ) {
    let boardCursors = switch (cursors.get(boardId)) {
      case (?existing) { existing };
      case null {
        let newMap = Map.empty<Principal, Types.CursorState>();
        cursors.add(boardId, newMap);
        newMap;
      };
    };
    let cursor : Types.CursorState = {
      userId = caller;
      username = username;
      x = x;
      y = y;
      color = color;
      lastSeen = Time.now();
    };
    boardCursors.add(caller, cursor);
  };

  public func getCursors(
    cursors : Map.Map<Types.BoardId, Map.Map<Principal, Types.CursorState>>,
    caller : Principal,
    boardId : Types.BoardId,
  ) : [Types.CursorState] {
    switch (cursors.get(boardId)) {
      case null { [] };
      case (?boardCursors) {
        let now = Time.now();
        // 10 seconds in nanoseconds
        let staleThreshold : Int = 10_000_000_000;
        let results = List.empty<Types.CursorState>();
        for ((uid, cursor) in boardCursors.entries()) {
          // Filter out caller's own cursor and stale cursors
          if (uid != caller and (now - cursor.lastSeen) < staleThreshold) {
            results.add(cursor);
          };
        };
        results.toArray();
      };
    };
  };
}

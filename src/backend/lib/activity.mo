import Map "mo:core/Map";
import List "mo:core/List";
import Types "../types/common";
import Time "mo:core/Time";

module {
  public func logActivity(
    activity : Map.Map<Types.BoardId, List.List<Types.ActivityEvent>>,
    caller : Principal,
    boardId : Types.BoardId,
    username : Text,
    eventType : Text,
    description : Text,
  ) {
    let event : Types.ActivityEvent = {
      timestamp = Time.now();
      userId = caller;
      username = username;
      eventType = eventType;
      description = description;
    };
    let list = switch (activity.get(boardId)) {
      case (?existing) { existing };
      case null {
        let newList = List.empty<Types.ActivityEvent>();
        activity.add(boardId, newList);
        newList;
      };
    };
    list.add(event);
    // Keep only last 20 events
    if (list.size() > 20) {
      let sz = list.size();
      let start : Nat = sz - 20;
      let arr = list.sliceToArray(start, sz);
      list.clear();
      for (e in arr.values()) {
        list.add(e);
      };
    };
  };

  public func getActivity(
    activity : Map.Map<Types.BoardId, List.List<Types.ActivityEvent>>,
    boardId : Types.BoardId,
  ) : [Types.ActivityEvent] {
    switch (activity.get(boardId)) {
      case null { [] };
      case (?list) { list.toArray() };
    };
  };
}

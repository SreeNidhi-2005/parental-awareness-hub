import Map "mo:core/Map";
import List "mo:core/List";
import Types "../types/common";
import Time "mo:core/Time";

module {
  public func saveRevision(
    revisions : Map.Map<Types.BoardId, List.List<Types.Revision>>,
    boardId : Types.BoardId,
    canvasJson : Text,
    snapshotLabel : Text,
  ) {
    let revision : Types.Revision = {
      timestamp = Time.now();
      snapshotLabel = snapshotLabel;
      canvasJson = canvasJson;
    };
    let list = switch (revisions.get(boardId)) {
      case (?existing) { existing };
      case null {
        let newList = List.empty<Types.Revision>();
        revisions.add(boardId, newList);
        newList;
      };
    };
    list.add(revision);
    // Keep only last 10 revisions — trim oldest if over limit
    let sz = list.size();
    if (sz > 10) {
      let start : Nat = sz - 10;
      let arr = list.sliceToArray(start, sz);
      list.clear();
      for (r in arr.values()) {
        list.add(r);
      };
    };
  };

  public func getRevisions(
    revisions : Map.Map<Types.BoardId, List.List<Types.Revision>>,
    boardId : Types.BoardId,
  ) : [Types.Revision] {
    switch (revisions.get(boardId)) {
      case null { [] };
      case (?list) { list.toArray() };
    };
  };

  public func loadRevision(
    revisions : Map.Map<Types.BoardId, List.List<Types.Revision>>,
    boardId : Types.BoardId,
    revisionIndex : Nat,
  ) : ?Text {
    switch (revisions.get(boardId)) {
      case null { null };
      case (?list) {
        switch (list.first()) {
          case null { null };
          case (?_) {
            if (revisionIndex < list.size()) { ?(list.at(revisionIndex).canvasJson) } else { null };
          };
        };
      };
    };
  };
}

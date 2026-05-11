import Map "mo:core/Map";
import List "mo:core/List";
import CommonTypes "../types/common";
import ResourceTypes "../types/resources";
import ResourcesLib "../lib/resources";

mixin (
  resources  : Map.Map<ResourceTypes.ResourceId, ResourceTypes.Resource>,
  bookmarks  : Map.Map<CommonTypes.UserId, List.List<ResourceTypes.BookmarkedResource>>,
  resCounter : { var nextId : Nat }
) {

  public query func listResources() : async [ResourceTypes.Resource] {
    ResourcesLib.listResources({ resources; bookmarks; counter = resCounter });
  };

  public query func listResourcesByCategory(category : ResourceTypes.ResourceCategory) : async [ResourceTypes.Resource] {
    ResourcesLib.listByCategory({ resources; bookmarks; counter = resCounter }, category);
  };

  public shared ({ caller }) func saveBookmark(resourceId : ResourceTypes.ResourceId) : async () {
    ResourcesLib.saveBookmark({ resources; bookmarks; counter = resCounter }, caller, resourceId);
  };

  public shared ({ caller }) func removeBookmark(resourceId : ResourceTypes.ResourceId) : async () {
    ResourcesLib.removeBookmark({ resources; bookmarks; counter = resCounter }, caller, resourceId);
  };

  public shared ({ caller }) func getMyBookmarks() : async [ResourceTypes.Resource] {
    ResourcesLib.listBookmarks({ resources; bookmarks; counter = resCounter }, caller);
  };
};

import CommonTypes "common";

module {
  public type ResourceId = Nat;

  public type ResourceCategory = { #parentingTips; #wellnessArticles; #expertGuidance; #emergencySupport };

  public type Resource = {
    id          : ResourceId;
    title       : Text;
    description : Text;
    category    : ResourceCategory;
    link        : Text;
  };

  public type BookmarkedResource = {
    userId     : CommonTypes.UserId;
    resourceId : ResourceId;
    savedAt    : CommonTypes.Timestamp;
  };
};

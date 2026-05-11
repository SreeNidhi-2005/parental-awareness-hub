import CommonTypes "common";

module {
  public type UserProfile = {
    id         : CommonTypes.UserId;
    name       : Text;
    bio        : Text;
    childrenAges : [Nat];
    joinedAt   : CommonTypes.Timestamp;
  };
};

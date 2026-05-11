import Map "mo:core/Map";
import Time "mo:core/Time";
import CommonTypes "../types/common";
import UserTypes "../types/users";
import UsersLib "../lib/users";

mixin (profiles : Map.Map<CommonTypes.UserId, UserTypes.UserProfile>) {

  public shared ({ caller }) func getMyProfile() : async ?UserTypes.UserProfile {
    UsersLib.getProfile({ profiles }, caller);
  };

  public shared ({ caller }) func upsertMyProfile(
    name         : Text,
    bio          : Text,
    childrenAges : [Nat]
  ) : async UserTypes.UserProfile {
    UsersLib.upsertProfile({ profiles }, caller, name, bio, childrenAges);
  };
};

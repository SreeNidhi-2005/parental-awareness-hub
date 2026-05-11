import Map "mo:core/Map";
import Time "mo:core/Time";
import CommonTypes "../types/common";
import UserTypes "../types/users";

module {
  public type State = {
    profiles : Map.Map<CommonTypes.UserId, UserTypes.UserProfile>;
  };

  public func getProfile(state : State, userId : CommonTypes.UserId) : ?UserTypes.UserProfile {
    state.profiles.get(userId);
  };

  public func upsertProfile(
    state        : State,
    userId       : CommonTypes.UserId,
    name         : Text,
    bio          : Text,
    childrenAges : [Nat]
  ) : UserTypes.UserProfile {
    let existing = state.profiles.get(userId);
    let joinedAt = switch (existing) {
      case (?p) { p.joinedAt };
      case null  { Time.now() };
    };
    let profile : UserTypes.UserProfile = {
      id           = userId;
      name         = name;
      bio          = bio;
      childrenAges = childrenAges;
      joinedAt     = joinedAt;
    };
    state.profiles.add(userId, profile);
    profile;
  };
};

import Time "mo:core/Time";

module {
  public type UserId = Principal;
  public type Timestamp = Int;

  public func now() : Timestamp { Time.now() };
};

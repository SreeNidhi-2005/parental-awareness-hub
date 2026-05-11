import CommonTypes "common";

module {
  public type WorkshopId = Nat;

  public type Workshop = {
    id          : WorkshopId;
    title       : Text;
    description : Text;
    facilitator : Text;
    dateTime    : CommonTypes.Timestamp;
    maxCapacity : Nat;
    registeredCount : Nat;
  };

  public type Registration = {
    workshopId : WorkshopId;
    userId     : CommonTypes.UserId;
    registeredAt : CommonTypes.Timestamp;
  };
};

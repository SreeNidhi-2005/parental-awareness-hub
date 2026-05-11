import Map "mo:core/Map";
import List "mo:core/List";
import CommonTypes "../types/common";
import WorkshopTypes "../types/workshops";
import WorkshopsLib "../lib/workshops";

mixin (
  workshops     : Map.Map<WorkshopTypes.WorkshopId, WorkshopTypes.Workshop>,
  registrations : Map.Map<WorkshopTypes.WorkshopId, List.List<WorkshopTypes.Registration>>,
  wsCounter     : { var nextId : Nat }
) {

  public query func listWorkshops() : async [WorkshopTypes.Workshop] {
    WorkshopsLib.listWorkshops({ workshops; registrations; counter = wsCounter });
  };

  public query func getWorkshop(id : WorkshopTypes.WorkshopId) : async ?WorkshopTypes.Workshop {
    WorkshopsLib.getWorkshop({ workshops; registrations; counter = wsCounter }, id);
  };

  public shared ({ caller }) func registerForWorkshop(workshopId : WorkshopTypes.WorkshopId) : async Bool {
    WorkshopsLib.register({ workshops; registrations; counter = wsCounter }, workshopId, caller);
  };

  public shared ({ caller }) func getMyWorkshops() : async [WorkshopTypes.Workshop] {
    WorkshopsLib.getUserRegistrations({ workshops; registrations; counter = wsCounter }, caller);
  };

  public shared ({ caller }) func isRegisteredForWorkshop(workshopId : WorkshopTypes.WorkshopId) : async Bool {
    WorkshopsLib.isRegistered({ workshops; registrations; counter = wsCounter }, workshopId, caller);
  };
};

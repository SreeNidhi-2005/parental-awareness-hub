import Map "mo:core/Map";
import List "mo:core/List";
import CommonTypes "../types/common";
import ModuleTypes "../types/modules";
import ModulesLib "../lib/modules";

mixin (
  modules    : Map.Map<ModuleTypes.ModuleId, ModuleTypes.LearningModule>,
  progress   : Map.Map<CommonTypes.UserId, List.List<ModuleTypes.ModuleProgress>>,
  modCounter : { var nextId : Nat }
) {

  public query func listModules() : async [ModuleTypes.LearningModule] {
    ModulesLib.listModules({ modules; progress; counter = modCounter });
  };

  public query func getModule(id : ModuleTypes.ModuleId) : async ?ModuleTypes.LearningModule {
    ModulesLib.getModule({ modules; progress; counter = modCounter }, id);
  };

  public shared ({ caller }) func getMyProgress() : async [ModuleTypes.ModuleProgress] {
    ModulesLib.getProgress({ modules; progress; counter = modCounter }, caller);
  };

  public shared ({ caller }) func updateProgress(
    moduleId : ModuleTypes.ModuleId,
    status   : ModuleTypes.ProgressStatus,
    bookmark : Bool
  ) : async () {
    ModulesLib.updateProgress({ modules; progress; counter = modCounter }, caller, moduleId, status, bookmark);
  };
};

module {
  public type ModuleId = Nat;

  public type LearningModule = {
    id          : ModuleId;
    title       : Text;
    description : Text;
    icon        : Text;
    category    : Text;
    article     : Text;
    tips        : [Text];
  };

  public type ProgressStatus = { #notStarted; #inProgress; #completed };

  public type ModuleProgress = {
    moduleId   : ModuleId;
    status     : ProgressStatus;
    bookmarked : Bool;
  };
};

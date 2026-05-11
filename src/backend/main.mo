import Map "mo:core/Map";
import List "mo:core/List";
import CommonTypes "types/common";
import UserTypes "types/users";
import ModuleTypes "types/modules";
import WorkshopTypes "types/workshops";
import FeedbackTypes "types/feedback";
import ResourceTypes "types/resources";
import UsersApi "mixins/users-api";
import ModulesApi "mixins/modules-api";
import WorkshopsApi "mixins/workshops-api";
import FeedbackApi "mixins/feedback-api";
import ResourcesApi "mixins/resources-api";
import ChatbotApi "mixins/chatbot-api";
import TipsApi "mixins/tips-api";
import ModulesLib "lib/modules";
import WorkshopsLib "lib/workshops";
import ResourcesLib "lib/resources";



actor {
  // --- User state ---
  let profiles = Map.empty<CommonTypes.UserId, UserTypes.UserProfile>();

  // --- Learning modules state ---
  let modules    = Map.empty<ModuleTypes.ModuleId, ModuleTypes.LearningModule>();
  let progress   = Map.empty<CommonTypes.UserId, List.List<ModuleTypes.ModuleProgress>>();
  let modCounter = { var nextId : Nat = 1 };

  // --- Workshops state ---
  let workshops     = Map.empty<WorkshopTypes.WorkshopId, WorkshopTypes.Workshop>();
  let registrations = Map.empty<WorkshopTypes.WorkshopId, List.List<WorkshopTypes.Registration>>();
  let wsCounter     = { var nextId : Nat = 1 };

  // --- Feedback state ---
  let feedbacks    = List.empty<FeedbackTypes.Feedback>();
  let testimonials = List.empty<FeedbackTypes.Testimonial>();
  let fbCounter    = { var nextId : Nat = 1 };

  // --- Resources state ---
  let resources  = Map.empty<ResourceTypes.ResourceId, ResourceTypes.Resource>();
  let bookmarks  = Map.empty<CommonTypes.UserId, List.List<ResourceTypes.BookmarkedResource>>();
  let resCounter = { var nextId : Nat = 1 };

  // --- Seed initial data (idempotent: no-ops if data already present) ---
  ModulesLib.seedModules({ modules; progress; counter = modCounter });
  WorkshopsLib.seedWorkshops({ workshops; registrations; counter = wsCounter });
  ResourcesLib.seedResources({ resources; bookmarks; counter = resCounter });

  // --- Mixin composition ---
  include UsersApi(profiles);
  include ModulesApi(modules, progress, modCounter);
  include WorkshopsApi(workshops, registrations, wsCounter);
  include FeedbackApi(feedbacks, testimonials, fbCounter);
  include ResourcesApi(resources, bookmarks, resCounter);
  include ChatbotApi();
  include TipsApi();
};

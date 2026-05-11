import type {
  ChatMessage,
  ChatRequest,
  ChatResponse,
  ChatRole,
  Feedback,
  FeedbackId,
  LearningModule,
  ModuleId,
  ModuleProgress,
  ProgressStatus,
  Resource,
  ResourceCategory,
  ResourceId,
  Testimonial,
  UserProfile,
  Workshop,
  WorkshopId,
} from "@/backend";

export type {
  ChatMessage,
  ChatRequest,
  ChatResponse,
  ChatRole,
  Feedback,
  LearningModule,
  ModuleProgress,
  ProgressStatus,
  Resource,
  ResourceCategory,
  ResourceId,
  Testimonial,
  UserProfile,
  Workshop,
  WorkshopId,
  ModuleId,
  FeedbackId,
};

export interface NavLink {
  label: string;
  href: string;
}

export interface DailyTip {
  text: string;
  date: string;
}

export type Theme = "light" | "dark";

export interface AppState {
  theme: Theme;
  toggleTheme: () => void;
}

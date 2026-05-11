import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Workshop {
    id: WorkshopId;
    title: string;
    registeredCount: bigint;
    maxCapacity: bigint;
    description: string;
    facilitator: string;
    dateTime: Timestamp;
}
export type ModuleId = bigint;
export type Timestamp = bigint;
export interface Testimonial {
    id: FeedbackId;
    content: string;
    submittedAt: Timestamp;
    parentName: string;
}
export interface Feedback {
    id: FeedbackId;
    submittedAt: Timestamp;
    email: string;
    message: string;
    rating: bigint;
    parentName: string;
}
export type UserId = Principal;
export interface ChatResponse {
    timestamp: Timestamp;
    reply: string;
}
export interface ChatRequest {
    messages: Array<ChatMessage>;
}
export type WorkshopId = bigint;
export interface Resource {
    id: ResourceId;
    title: string;
    link: string;
    description: string;
    category: ResourceCategory;
}
export interface ChatMessage {
    content: string;
    role: ChatRole;
}
export interface LearningModule {
    id: ModuleId;
    title: string;
    icon: string;
    tips: Array<string>;
    description: string;
    article: string;
    category: string;
}
export type FeedbackId = bigint;
export type ResourceId = bigint;
export interface ModuleProgress {
    moduleId: ModuleId;
    status: ProgressStatus;
    bookmarked: boolean;
}
export interface UserProfile {
    id: UserId;
    bio: string;
    name: string;
    joinedAt: Timestamp;
    childrenAges: Array<bigint>;
}
export enum ChatRole {
    user = "user",
    assistant = "assistant"
}
export enum ProgressStatus {
    notStarted = "notStarted",
    completed = "completed",
    inProgress = "inProgress"
}
export enum ResourceCategory {
    expertGuidance = "expertGuidance",
    wellnessArticles = "wellnessArticles",
    emergencySupport = "emergencySupport",
    parentingTips = "parentingTips"
}
export interface backendInterface {
    chat(request: ChatRequest): Promise<ChatResponse>;
    getDailyTip(): Promise<string>;
    getModule(id: ModuleId): Promise<LearningModule | null>;
    getMyBookmarks(): Promise<Array<Resource>>;
    getMyProfile(): Promise<UserProfile | null>;
    getMyProgress(): Promise<Array<ModuleProgress>>;
    getMyWorkshops(): Promise<Array<Workshop>>;
    getWorkshop(id: WorkshopId): Promise<Workshop | null>;
    isRegisteredForWorkshop(workshopId: WorkshopId): Promise<boolean>;
    listFeedbacks(): Promise<Array<Feedback>>;
    listModules(): Promise<Array<LearningModule>>;
    listResources(): Promise<Array<Resource>>;
    listResourcesByCategory(category: ResourceCategory): Promise<Array<Resource>>;
    listTestimonials(): Promise<Array<Testimonial>>;
    listWorkshops(): Promise<Array<Workshop>>;
    registerForWorkshop(workshopId: WorkshopId): Promise<boolean>;
    removeBookmark(resourceId: ResourceId): Promise<void>;
    saveBookmark(resourceId: ResourceId): Promise<void>;
    submitFeedback(parentName: string, email: string, rating: bigint, message: string): Promise<Feedback>;
    submitTestimonial(parentName: string, content: string): Promise<Testimonial>;
    updateProgress(moduleId: ModuleId, status: ProgressStatus, bookmark: boolean): Promise<void>;
    upsertMyProfile(name: string, bio: string, childrenAges: Array<bigint>): Promise<UserProfile>;
}

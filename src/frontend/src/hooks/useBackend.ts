import { createActor } from "@/backend";
import type {
  ChatRequest,
  ChatResponse,
  Feedback,
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
} from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function useBackendActor() {
  return useActor(createActor);
}

export function useMyProfile() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<UserProfile | null>({
    queryKey: ["my-profile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpsertProfile() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation<
    UserProfile,
    Error,
    { name: string; bio: string; childrenAges: bigint[] }
  >({
    mutationFn: async ({ name, bio, childrenAges }) => {
      if (!actor) throw new Error("Not connected");
      return actor.upsertMyProfile(name, bio, childrenAges);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["my-profile"] }),
  });
}

export function useModules() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<LearningModule[]>({
    queryKey: ["modules"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listModules();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useModule(id: ModuleId) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<LearningModule | null>({
    queryKey: ["module", id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getModule(id);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMyProgress() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<ModuleProgress[]>({
    queryKey: ["my-progress"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyProgress();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateProgress() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation<
    void,
    Error,
    { moduleId: ModuleId; status: ProgressStatus; bookmark: boolean }
  >({
    mutationFn: async ({ moduleId, status, bookmark }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateProgress(moduleId, status, bookmark);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["my-progress"] }),
  });
}

export function useWorkshops() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Workshop[]>({
    queryKey: ["workshops"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listWorkshops();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useWorkshop(id: WorkshopId) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Workshop | null>({
    queryKey: ["workshop", id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getWorkshop(id);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMyWorkshops() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Workshop[]>({
    queryKey: ["my-workshops"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyWorkshops();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRegisterWorkshop() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation<boolean, Error, WorkshopId>({
    mutationFn: async (workshopId) => {
      if (!actor) throw new Error("Not connected");
      return actor.registerForWorkshop(workshopId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["my-workshops"] });
      qc.invalidateQueries({ queryKey: ["workshops"] });
    },
  });
}

export function useIsRegistered(workshopId: WorkshopId) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<boolean>({
    queryKey: ["is-registered", workshopId.toString()],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isRegisteredForWorkshop(workshopId);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useFeedbacks() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Feedback[]>({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listFeedbacks();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitFeedback() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation<
    Feedback,
    Error,
    { parentName: string; email: string; rating: bigint; message: string }
  >({
    mutationFn: async ({ parentName, email, rating, message }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitFeedback(parentName, email, rating, message);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["feedbacks"] }),
  });
}

export function useTestimonials() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listTestimonials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitTestimonial() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation<
    Testimonial,
    Error,
    { parentName: string; content: string }
  >({
    mutationFn: async ({ parentName, content }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitTestimonial(parentName, content);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["testimonials"] }),
  });
}

export function useResources() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Resource[]>({
    queryKey: ["resources"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listResources();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useResourcesByCategory(category: ResourceCategory) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Resource[]>({
    queryKey: ["resources", category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listResourcesByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMyBookmarks() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Resource[]>({
    queryKey: ["my-bookmarks"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyBookmarks();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveBookmark() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation<void, Error, ResourceId>({
    mutationFn: async (resourceId) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveBookmark(resourceId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["my-bookmarks"] }),
  });
}

export function useRemoveBookmark() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation<void, Error, ResourceId>({
    mutationFn: async (resourceId) => {
      if (!actor) throw new Error("Not connected");
      return actor.removeBookmark(resourceId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["my-bookmarks"] }),
  });
}

export function useChat() {
  const { actor } = useBackendActor();
  return useMutation<ChatResponse, Error, ChatRequest>({
    mutationFn: async (request) => {
      if (!actor) throw new Error("Not connected");
      return actor.chat(request);
    },
  });
}

export function useDailyTip() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<string>({
    queryKey: ["daily-tip"],
    queryFn: async () => {
      if (!actor) return "";
      return actor.getDailyTip();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 60,
  });
}

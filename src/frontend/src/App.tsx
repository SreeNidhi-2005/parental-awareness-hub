import { Layout } from "@/components/Layout";
import { Toaster } from "@/components/ui/sonner";
import { AppProvider } from "@/context/AppContext";
import {
  InternetIdentityProvider,
  useInternetIdentity,
} from "@caffeineai/core-infrastructure";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const LoginPage = lazy(() =>
  import("@/pages/LoginPage").then((m) => ({ default: m.LoginPage })),
);
const HomePage = lazy(() =>
  import("@/pages/HomePage").then((m) => ({ default: m.HomePage })),
);
const ModulesPage = lazy(() =>
  import("@/pages/ModulesPage").then((m) => ({ default: m.ModulesPage })),
);
const MentalHealthPage = lazy(() =>
  import("@/pages/MentalHealthPage").then((m) => ({
    default: m.MentalHealthPage,
  })),
);
const RelationshipPage = lazy(() =>
  import("@/pages/RelationshipPage").then((m) => ({
    default: m.RelationshipPage,
  })),
);
const WorkshopsPage = lazy(() =>
  import("@/pages/WorkshopsPage").then((m) => ({ default: m.WorkshopsPage })),
);
const ResourcesPage = lazy(() =>
  import("@/pages/ResourcesPage").then((m) => ({ default: m.ResourcesPage })),
);
const FeedbackPage = lazy(() =>
  import("@/pages/FeedbackPage").then((m) => ({ default: m.FeedbackPage })),
);
const ProfilePage = lazy(() =>
  import("@/pages/ProfilePage").then((m) => ({ default: m.ProfilePage })),
);

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-64">
      <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 30_000, retry: 1 },
  },
});

const rootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  ),
});

const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "layout",
  component: AuthGuardLayout,
});

function AuthGuardLayout() {
  const { isAuthenticated, isInitializing } = useInternetIdentity();
  const navigate = layoutRoute.useNavigate();

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    void navigate({ to: "/login" });
    return null;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({ to: "/home" });
  },
  component: () => null,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const homeRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/home",
  component: HomePage,
});

const modulesRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/modules",
  component: ModulesPage,
});

const mentalHealthRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/mental-health",
  component: MentalHealthPage,
});

const relationshipRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/relationship",
  component: RelationshipPage,
});

const workshopsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/workshops",
  component: WorkshopsPage,
});

const resourcesRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/resources",
  component: ResourcesPage,
});

const feedbackRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/feedback",
  component: FeedbackPage,
});

const profileRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/profile",
  component: ProfilePage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  layoutRoute.addChildren([
    homeRoute,
    modulesRoute,
    mentalHealthRoute,
    relationshipRoute,
    workshopsRoute,
    resourcesRoute,
    feedbackRoute,
    profileRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <InternetIdentityProvider>
        <AppProvider>
          <RouterProvider router={router} />
          <Toaster richColors position="top-right" />
        </AppProvider>
      </InternetIdentityProvider>
    </QueryClientProvider>
  );
}

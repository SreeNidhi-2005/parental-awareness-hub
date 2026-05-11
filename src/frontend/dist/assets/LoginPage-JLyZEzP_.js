import { u as useAuth, a as useRouter, r as reactExports, j as jsxRuntimeExports, m as motion, H as Heart, B as Button } from "./index-xVE1wIx6.js";
import { S as Sparkles } from "./sparkles-nvykvXO8.js";
import { S as Shield } from "./shield-DHWh0Lfr.js";
import { U as Users } from "./users-CVdb36SI.js";
const FEATURES = [
  {
    icon: Heart,
    title: "Emotional Support",
    desc: "Access expert parenting guidance and emotional wellness resources."
  },
  {
    icon: Sparkles,
    title: "AI-Powered Chat",
    desc: "Get real-time answers to your parenting questions from our AI assistant."
  },
  {
    icon: Shield,
    title: "Secure & Private",
    desc: "Your data stays private using Internet Identity — no passwords needed."
  },
  {
    icon: Users,
    title: "Community",
    desc: "Join workshops, share experiences, and learn with other parents."
  }
];
const QUOTES = [
  {
    text: "Children need love, especially when they do not deserve it.",
    author: "Harold Hulbert"
  },
  {
    text: "It is easier to build strong children than to repair broken adults.",
    author: "Frederick Douglass"
  },
  {
    text: "Your children need your presence more than your presents.",
    author: "Jesse Jackson"
  }
];
function LoginPage() {
  const { isAuthenticated, isLoading, login } = useAuth();
  const router = useRouter();
  reactExports.useEffect(() => {
    if (isAuthenticated) {
      router.navigate({ to: "/home" });
    }
  }, [isAuthenticated, router]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex flex-col lg:flex-row", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: -40 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.6, ease: "easeOut" },
        className: "lg:w-1/2 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex flex-col justify-center px-8 sm:px-16 py-16 relative overflow-hidden",
        "data-ocid": "login.brand_panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-24 -left-24 w-72 h-72 bg-primary/10 rounded-full blur-3xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-16 -right-16 w-56 h-56 bg-accent/10 rounded-full blur-3xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex justify-center mb-10 lg:mb-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.img,
            {
              src: "/assets/generated/hero-parental-wellness-transparent.dim_800x600.png",
              alt: "Parental Awareness Illustration",
              className: "w-full max-w-xs lg:max-w-sm object-contain drop-shadow-lg",
              initial: { opacity: 0, scale: 0.9 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 0.7, delay: 0.2 }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, delay: 0.3 },
              className: "relative",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-4 h-4 text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-primary uppercase tracking-widest", children: "Parental Awareness Hub" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-4", children: [
                  "Understanding children",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "begins with listening." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base leading-relaxed max-w-md", children: "A warm, supportive platform helping modern parents connect with their children's emotional world through expert guidance and community." })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, delay: 0.5 },
              className: "mt-8 relative",
              children: QUOTES.slice(0, 1).map((q) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "blockquote",
                {
                  className: "bg-card/60 backdrop-blur-sm border border-border rounded-xl p-4",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm italic text-foreground/80", children: [
                      '"',
                      q.text,
                      '"'
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "mt-2 text-xs text-muted-foreground", children: [
                      "— ",
                      q.author
                    ] })
                  ]
                },
                q.author
              ))
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, x: 40 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.6, ease: "easeOut" },
        className: "lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 py-16",
        "data-ocid": "login.auth_panel",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl sm:text-3xl font-bold text-foreground mb-2", children: "Welcome back" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Sign in to access your parenting dashboard, saved modules, and community workshops." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8", children: FEATURES.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.4, delay: 0.4 + i * 0.08 },
              className: "flex items-start gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-soft transition-smooth",
              "data-ocid": `login.feature_card.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg bg-primary/12 flex items-center justify-center shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "w-3.5 h-3.5 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: f.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 leading-relaxed", children: f.desc })
                ] })
              ]
            },
            f.title
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.4, delay: 0.75 },
              className: "space-y-4",
              "data-ocid": "login.auth_section",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-6 shadow-card", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-primary/12 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-primary" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Secure Sign In" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Powered by Internet Identity" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed mb-5", children: "We use Internet Identity — a secure, passwordless authentication system. No email or password required." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      className: "w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-glow transition-smooth h-11",
                      onClick: () => login(),
                      disabled: isLoading,
                      "data-ocid": "login.sign_in_button",
                      children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" }),
                        "Signing in..."
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4" }),
                        "Continue with Internet Identity"
                      ] })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground", children: "By signing in, you agree to our community guidelines and privacy policy. Your data is stored securely on the Internet Computer." })
              ]
            }
          )
        ] })
      }
    )
  ] });
}
export {
  LoginPage
};

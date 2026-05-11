import { c as createLucideIcon, u as useAuth, x as useMyProfile, f as useMyProgress, p as useMyBookmarks, i as useMyWorkshops, y as useUpsertProfile, r as reactExports, P as ProgressStatus, j as jsxRuntimeExports, U as User, B as Button, L as Link, m as motion, X, E as ExternalLink, n as ue } from "./index-xVE1wIx6.js";
import { C as Clock, B as Badge } from "./badge-CTzgVlF9.js";
import { I as Input } from "./input-DIMY8UvV.js";
import { L as Label, T as Textarea, C as CircleCheckBig } from "./textarea-C6aIZZ5q.js";
import { L as LoaderCircle } from "./loader-circle-DUoZAwQE.js";
import { B as BookOpen } from "./book-open-CyWZIs0N.js";
import { B as Bookmark } from "./bookmark-B-XXHTGA.js";
import { C as Calendar } from "./calendar-CnxBRswp.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 20h9", key: "t2du7b" }],
  [
    "path",
    {
      d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
      key: "1ykcvy"
    }
  ]
];
const PenLine = createLucideIcon("pen-line", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode);
const PROGRESS_STATUS_LABELS = {
  [ProgressStatus.completed]: "Completed",
  [ProgressStatus.inProgress]: "In Progress",
  [ProgressStatus.notStarted]: "Not Started"
};
const PROGRESS_STATUS_COLORS = {
  [ProgressStatus.completed]: "bg-secondary/20 text-secondary-foreground",
  [ProgressStatus.inProgress]: "bg-primary/15 text-primary",
  [ProgressStatus.notStarted]: "bg-muted text-muted-foreground"
};
function formatDate(ts) {
  const ms = Number(ts / BigInt(1e6));
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}
function ProfilePage() {
  const { isAuthenticated } = useAuth();
  const { data: profile, isLoading: profileLoading } = useMyProfile();
  const { data: progress } = useMyProgress();
  const { data: bookmarks } = useMyBookmarks();
  const { data: myWorkshops } = useMyWorkshops();
  const upsert = useUpsertProfile();
  const [editing, setEditing] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({ name: "", bio: "", ages: "" });
  reactExports.useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name,
        bio: profile.bio,
        ages: profile.childrenAges.join(", ")
      });
    }
  }, [profile]);
  const handleSave = async () => {
    const ages = form.ages.split(",").map((a) => BigInt(Number.parseInt(a.trim(), 10))).filter((a) => !Number.isNaN(Number(a)));
    try {
      await upsert.mutateAsync({
        name: form.name,
        bio: form.bio,
        childrenAges: ages
      });
      setEditing(false);
      ue.success("Profile updated!");
    } catch {
      ue.error("Failed to save profile.");
    }
  };
  const completedCount = (progress == null ? void 0 : progress.filter((p) => p.status === ProgressStatus.completed).length) ?? 0;
  const inProgressCount = (progress == null ? void 0 : progress.filter((p) => p.status === ProgressStatus.inProgress).length) ?? 0;
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "py-20 flex flex-col items-center gap-4",
        "data-ocid": "profile.unauthenticated_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-8 h-8 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-xl", children: "Sign in to view your profile" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm text-center max-w-xs", children: "Track your learning progress, manage bookmarks, and stay connected with your workshops." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              className: "bg-primary text-primary-foreground",
              "data-ocid": "profile.sign_in_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: "Sign In" })
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-12", "data-ocid": "profile.page", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 sm:px-6 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        className: "mb-8",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section-divider" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground mb-2", children: "My Profile" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Your personal dashboard — track progress, manage bookmarks, view workshops." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: -16 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.45, delay: 0.1 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "wellness-card p-6",
              "data-ocid": "profile.profile_card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center mb-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mb-3", children: profileLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-6 h-6 text-primary animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold text-primary", children: (profile == null ? void 0 : profile.name) ? profile.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) : "P" }) }),
                  profileLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-muted rounded w-28 animate-pulse" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: (profile == null ? void 0 : profile.name) || "Parent" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Parental Awareness Member" }),
                  (profile == null ? void 0 : profile.joinedAt) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1 flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                    "Joined ",
                    formatDate(profile.joinedAt)
                  ] })
                ] }),
                editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "p-name", className: "text-xs", children: "Name" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "p-name",
                        value: form.name,
                        onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
                        className: "h-8 text-sm",
                        "data-ocid": "profile.name_input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "p-bio", className: "text-xs", children: "About You" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Textarea,
                      {
                        id: "p-bio",
                        value: form.bio,
                        onChange: (e) => setForm((f) => ({ ...f, bio: e.target.value })),
                        rows: 3,
                        className: "text-sm",
                        "data-ocid": "profile.bio_textarea"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "p-ages", className: "text-xs", children: "Children's Ages (comma-separated)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "p-ages",
                        value: form.ages,
                        onChange: (e) => setForm((f) => ({ ...f, ages: e.target.value })),
                        placeholder: "8, 13",
                        className: "h-8 text-sm",
                        "data-ocid": "profile.ages_input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "button",
                        variant: "outline",
                        size: "sm",
                        className: "flex-1",
                        onClick: () => setEditing(false),
                        "data-ocid": "profile.cancel_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5 mr-1" }),
                          "Cancel"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "button",
                        size: "sm",
                        className: "flex-1 bg-primary text-primary-foreground hover:bg-primary/90",
                        onClick: handleSave,
                        disabled: upsert.isPending,
                        "data-ocid": "profile.save_button",
                        children: [
                          upsert.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin mr-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-3.5 h-3.5 mr-1" }),
                          "Save"
                        ]
                      }
                    )
                  ] })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                  (profile == null ? void 0 : profile.bio) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: profile.bio }),
                  (profile == null ? void 0 : profile.childrenAges) && profile.childrenAges.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: profile.childrenAges.map((age) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Badge,
                    {
                      variant: "secondary",
                      className: "text-xs bg-primary/10 text-primary",
                      children: [
                        "Child age ",
                        age.toString()
                      ]
                    },
                    age.toString()
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      size: "sm",
                      className: "w-full",
                      onClick: () => setEditing(true),
                      "data-ocid": "profile.edit_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "w-3.5 h-3.5 mr-1" }),
                        "Edit Profile"
                      ]
                    }
                  )
                ] })
              ]
            }
          )
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.45, delay: 0.15 },
            className: "grid grid-cols-3 gap-4",
            children: [
              {
                icon: CircleCheckBig,
                label: "Completed",
                value: completedCount,
                color: "text-secondary-foreground"
              },
              {
                icon: BookOpen,
                label: "In Progress",
                value: inProgressCount,
                color: "text-primary"
              },
              {
                icon: Bookmark,
                label: "Bookmarks",
                value: (bookmarks == null ? void 0 : bookmarks.length) ?? 0,
                color: "text-accent-foreground"
              }
            ].map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "wellness-card p-4 text-center",
                "data-ocid": `profile.stat_card.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(stat.icon, { className: `w-5 h-5 mx-auto mb-1 ${stat.color}` }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-foreground", children: stat.value }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground leading-tight mt-0.5", children: stat.label })
                ]
              },
              stat.label
            ))
          }
        ),
        progress && progress.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.45, delay: 0.2 },
            className: "wellness-card p-5",
            "data-ocid": "profile.progress_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm", children: "Learning Progress" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/modules",
                    className: "text-xs text-primary hover:underline",
                    children: "View all modules"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: progress.slice(0, 6).map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center justify-between py-1",
                  "data-ocid": `profile.progress_item.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-foreground", children: [
                      "Module ",
                      p.moduleId.toString()
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Badge,
                      {
                        variant: "secondary",
                        className: `text-xs ${PROGRESS_STATUS_COLORS[p.status]}`,
                        children: [
                          p.status === ProgressStatus.completed && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3 mr-1" }),
                          PROGRESS_STATUS_LABELS[p.status]
                        ]
                      }
                    )
                  ]
                },
                p.moduleId.toString()
              )) })
            ]
          }
        ),
        myWorkshops && myWorkshops.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.45, delay: 0.25 },
            className: "wellness-card p-5",
            "data-ocid": "profile.workshops_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm", children: "My Workshops" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/workshops",
                    className: "text-xs text-primary hover:underline",
                    children: "View all"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: myWorkshops.slice(0, 4).map((w, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-3 py-1",
                  "data-ocid": `profile.workshop_item.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4 text-primary shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground truncate", children: w.title })
                  ]
                },
                w.id.toString()
              )) })
            ]
          }
        ),
        bookmarks && bookmarks.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.45, delay: 0.3 },
            className: "wellness-card p-5",
            "data-ocid": "profile.bookmarks_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm", children: "Saved Resources" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/resources",
                    className: "text-xs text-primary hover:underline",
                    children: "View all"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: bookmarks.slice(0, 4).map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: r.link,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "flex items-center gap-3 py-1 group",
                  "data-ocid": `profile.bookmark_item.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "w-4 h-4 text-primary shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground group-hover:text-primary transition-smooth truncate", children: r.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3 text-muted-foreground shrink-0 ml-auto" })
                  ]
                },
                r.id.toString()
              )) })
            ]
          }
        )
      ] })
    ] })
  ] }) });
}
export {
  ProfilePage
};

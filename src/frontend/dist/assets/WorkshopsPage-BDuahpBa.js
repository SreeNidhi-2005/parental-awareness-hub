import { c as createLucideIcon, h as useWorkshops, i as useMyWorkshops, r as reactExports, j as jsxRuntimeExports, m as motion, A as AnimatePresence, u as useAuth, k as useIsRegistered, B as Button, l as useRegisterWorkshop, X, n as ue } from "./index-xVE1wIx6.js";
import { B as Badge, C as Clock } from "./badge-CTzgVlF9.js";
import { I as Input } from "./input-DIMY8UvV.js";
import { C as CircleCheckBig, L as Label, T as Textarea } from "./textarea-C6aIZZ5q.js";
import { L as LoaderCircle } from "./loader-circle-DUoZAwQE.js";
import { C as Calendar } from "./calendar-CnxBRswp.js";
import { U as Users } from "./users-CVdb36SI.js";
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
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = createLucideIcon("map-pin", __iconNode);
const FALLBACK_UPCOMING = [
  {
    id: BigInt(1),
    title: "Understanding Teenage Mental Health",
    description: "A 2-hour session with child psychologist Dr. Meena Sharma covering depression, anxiety, and emotional regulation in teenagers.",
    facilitator: "Dr. Meena Sharma",
    dateTime: BigInt(Date.now() * 1e6 + 7 * 24 * 60 * 60 * 1e9),
    registeredCount: BigInt(34),
    maxCapacity: BigInt(50)
  },
  {
    id: BigInt(2),
    title: "Communicating Across the Generation Gap",
    description: "Practical tools to bridge generational differences and build meaningful dialogue with your children in the digital age.",
    facilitator: "Prof. Arun Kumar",
    dateTime: BigInt(
      Date.now() * 1e6 + 14 * 24 * 60 * 60 * 1e9
    ),
    registeredCount: BigInt(22),
    maxCapacity: BigInt(40)
  },
  {
    id: BigInt(3),
    title: "Emotional Safety at Home",
    description: "How to create a household environment where children feel safe, valued, and free to express themselves honestly.",
    facilitator: "Ms. Ritu Patel",
    dateTime: BigInt(
      Date.now() * 1e6 + 21 * 24 * 60 * 60 * 1e9
    ),
    registeredCount: BigInt(18),
    maxCapacity: BigInt(35)
  }
];
const FALLBACK_PAST = [
  {
    id: BigInt(10),
    title: "Breaking the Cycle of Reactive Parenting",
    description: "How to recognize emotional triggers and respond to children from a place of calm, not reactivity.",
    facilitator: "Dr. Priya Nair",
    dateTime: BigInt(
      Date.now() * 1e6 - 30 * 24 * 60 * 60 * 1e9
    ),
    registeredCount: BigInt(45),
    maxCapacity: BigInt(45)
  },
  {
    id: BigInt(11),
    title: "Screen Time & Digital Wellness for Kids",
    description: "Evidence-based strategies for managing technology use while maintaining family harmony.",
    facilitator: "Ms. Kavya Reddy",
    dateTime: BigInt(
      Date.now() * 1e6 - 60 * 24 * 60 * 60 * 1e9
    ),
    registeredCount: BigInt(38),
    maxCapacity: BigInt(40)
  }
];
function formatDate(ts) {
  const ms = Number(ts / BigInt(1e6));
  return new Date(ms).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}
function formatTime(ts) {
  const ms = Number(ts / BigInt(1e6));
  return new Date(ms).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit"
  });
}
function isPast(ts) {
  return Number(ts / BigInt(1e6)) < Date.now();
}
function RegisterModal({ workshop, onClose, onSuccess }) {
  const register = useRegisterWorkshop();
  const [form, setForm] = reactExports.useState({
    parentName: "",
    email: "",
    numChildren: "",
    message: ""
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.parentName || !form.email) {
      ue.error("Name and email are required");
      return;
    }
    try {
      await register.mutateAsync(workshop.id);
      onSuccess();
      ue.success(`You're registered for "${workshop.title}"!`);
    } catch {
      ue.error("Registration failed. Please try again.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4",
      "data-ocid": "workshops.register_modal",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            className: "absolute inset-0 bg-foreground/20 backdrop-blur-sm",
            onClick: onClose
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 24, scale: 0.97 },
            animate: { opacity: 1, y: 0, scale: 1 },
            exit: { opacity: 0, y: 24, scale: 0.97 },
            transition: { duration: 0.22 },
            className: "relative wellness-card p-6 w-full max-w-md",
            "data-ocid": "workshops.register_dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-lg", children: "Register for Workshop" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: workshop.title })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "p-1.5 rounded-lg hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-smooth",
                    "aria-label": "Close",
                    "data-ocid": "workshops.register_close_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "rw-name", children: "Your Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "rw-name",
                      placeholder: "Enter your name",
                      value: form.parentName,
                      onChange: (e) => setForm((f) => ({ ...f, parentName: e.target.value })),
                      "data-ocid": "workshops.register_name_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "rw-email", children: "Email Address" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "rw-email",
                      type: "email",
                      placeholder: "your@email.com",
                      value: form.email,
                      onChange: (e) => setForm((f) => ({ ...f, email: e.target.value })),
                      "data-ocid": "workshops.register_email_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "rw-children", children: "Number of Children" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "rw-children",
                      type: "number",
                      min: "1",
                      placeholder: "e.g. 2",
                      value: form.numChildren,
                      onChange: (e) => setForm((f) => ({ ...f, numChildren: e.target.value })),
                      "data-ocid": "workshops.register_children_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "rw-message", children: [
                    "Anything you'd like to share?",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "(optional)" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      id: "rw-message",
                      placeholder: "Questions, topics you'd like covered...",
                      rows: 3,
                      value: form.message,
                      onChange: (e) => setForm((f) => ({ ...f, message: e.target.value })),
                      "data-ocid": "workshops.register_message_textarea"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      className: "flex-1",
                      onClick: onClose,
                      "data-ocid": "workshops.register_cancel_button",
                      children: "Cancel"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "submit",
                      className: "flex-1 bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow transition-smooth",
                      disabled: register.isPending,
                      "data-ocid": "workshops.register_confirm_button",
                      children: [
                        register.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin mr-2" }) : null,
                        "Confirm Registration"
                      ]
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      ]
    }
  );
}
function WorkshopCard({
  workshop,
  index,
  onRegister
}) {
  const { isAuthenticated } = useAuth();
  const { data: registered } = useIsRegistered(workshop.id);
  const past = isPast(workshop.dateTime);
  const spotsLeft = Number(workshop.maxCapacity) - Number(workshop.registeredCount);
  const isFull = spotsLeft <= 0;
  const handleRegisterClick = () => {
    if (!isAuthenticated) {
      ue.error("Please sign in to register for workshops");
      return;
    }
    onRegister(workshop);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.4, delay: index * 0.08 },
      className: `wellness-card p-6 flex flex-col gap-4 ${past ? "opacity-75" : ""}`,
      "data-ocid": `workshops.workshop_card.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-base leading-tight", children: workshop.title }),
          past ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "secondary",
              className: "shrink-0 bg-muted text-muted-foreground",
              children: "Past"
            }
          ) : registered ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "secondary",
              className: "shrink-0 bg-secondary/15 text-secondary-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3 mr-1" }),
                " Registered"
              ]
            }
          ) : isFull ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "secondary",
              className: "shrink-0 bg-muted text-muted-foreground",
              children: "Full"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "secondary",
              className: "shrink-0 bg-primary/10 text-primary",
              children: [
                spotsLeft,
                " spots left"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: workshop.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5" }),
            formatDate(workshop.dateTime)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
            formatTime(workshop.dateTime)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5" }),
            workshop.registeredCount.toString(),
            " /",
            " ",
            workshop.maxCapacity.toString()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5" }),
            "Online via Zoom"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            "Facilitator:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: workshop.facilitator })
          ] }),
          !past && !registered && !isFull && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              className: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow transition-smooth",
              onClick: handleRegisterClick,
              "data-ocid": `workshops.register_button.${index + 1}`,
              children: "Register"
            }
          )
        ] })
      ]
    }
  );
}
function WorkshopsPage() {
  const { data: workshops, isLoading } = useWorkshops();
  const { data: myWorkshops } = useMyWorkshops();
  const [tab, setTab] = reactExports.useState("upcoming");
  const [registerTarget, setRegisterTarget] = reactExports.useState(null);
  const all = workshops && workshops.length > 0 ? workshops : [...FALLBACK_UPCOMING, ...FALLBACK_PAST];
  const upcoming = all.filter((w) => !isPast(w.dateTime));
  const past = all.filter((w) => isPast(w.dateTime));
  const display = tab === "upcoming" ? upcoming : past;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-12", "data-ocid": "workshops.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          className: "mb-10",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section-divider" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground mb-3", children: "Community Workshops" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-2xl text-sm sm:text-base", children: "Live, expert-led sessions to deepen your parenting skills and connect with a community of parents navigating similar challenges." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-2 mb-8",
          "data-ocid": "workshops.tab_switcher",
          children: [
            ["upcoming", "past"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setTab(t),
                className: `px-5 py-2 rounded-full text-sm font-medium transition-smooth border ${tab === t ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:bg-muted/60 hover:text-foreground"}`,
                "data-ocid": `workshops.${t}_tab`,
                children: [
                  t === "upcoming" ? "Upcoming" : "Past",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-xs opacity-70", children: [
                    "(",
                    t === "upcoming" ? upcoming.length : past.length,
                    ")"
                  ] })
                ]
              },
              t
            )),
            myWorkshops && myWorkshops.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-xs text-muted-foreground", children: [
              "You're registered for ",
              myWorkshops.length,
              " workshop",
              myWorkshops.length !== 1 ? "s" : ""
            ] })
          ]
        }
      ),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex items-center justify-center py-24",
          "data-ocid": "workshops.loading_state",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 text-primary animate-spin" })
        }
      ) : display.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: display.map((w, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        WorkshopCard,
        {
          workshop: w,
          index: i,
          onRegister: setRegisterTarget
        },
        w.id.toString()
      )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "mt-8 p-8 rounded-xl bg-muted/40 border border-border text-center",
          "data-ocid": "workshops.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-8 h-8 text-muted-foreground mx-auto mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: tab === "upcoming" ? "More workshops are being planned. Check back soon!" : "No past workshops yet." })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: registerTarget && /* @__PURE__ */ jsxRuntimeExports.jsx(
      RegisterModal,
      {
        workshop: registerTarget,
        onClose: () => setRegisterTarget(null),
        onSuccess: () => setRegisterTarget(null)
      }
    ) })
  ] });
}
export {
  WorkshopsPage
};

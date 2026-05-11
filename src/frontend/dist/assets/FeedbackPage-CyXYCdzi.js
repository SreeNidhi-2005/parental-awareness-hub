import { c as createLucideIcon, v as useSubmitFeedback, w as useSubmitTestimonial, d as useTestimonials, r as reactExports, j as jsxRuntimeExports, m as motion, B as Button, S as Send, A as AnimatePresence, n as ue } from "./index-xVE1wIx6.js";
import { I as Input } from "./input-DIMY8UvV.js";
import { C as CircleCheckBig, L as Label, T as Textarea } from "./textarea-C6aIZZ5q.js";
import { L as LoaderCircle } from "./loader-circle-DUoZAwQE.js";
import { Q as Quote, S as Star } from "./star-3ZKTTN9x.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }]
];
const MessageSquare = createLucideIcon("message-square", __iconNode);
const STATIC_TESTIMONIALS = [
  {
    id: BigInt(1),
    parentName: "Priya Mehta",
    content: "This platform completely changed how I communicate with my 14-year-old. I used to raise my voice out of frustration. Now I actually listen first. The emotional support modules helped me understand what he's going through.",
    submittedAt: BigInt(0)
  },
  {
    id: BigInt(2),
    parentName: "Rajesh Kumar",
    content: "I never realized how much my words were hurting my daughter. The 'Signs of Stress' module was eye-opening. She opened up to me for the first time in years after I started applying what I learned here.",
    submittedAt: BigInt(0)
  },
  {
    id: BigInt(3),
    parentName: "Sunita Sharma",
    content: "As a working mother, I always felt guilty about not spending enough quality time. The platform taught me that presence matters more than time. My relationship with both my kids has improved so much.",
    submittedAt: BigInt(0)
  },
  {
    id: BigInt(4),
    parentName: "Arjun Nair",
    content: "My teenager was withdrawn and I didn't know why. After reading the resources on teen depression, I approached him without judgment. He finally told me he was being bullied. We got him help immediately.",
    submittedAt: BigInt(0)
  },
  {
    id: BigInt(5),
    parentName: "Meena Pillai",
    content: "The workshop on generation gap communication was incredible. I learned that my daughter isn't being 'difficult' — she's just navigating a world I don't fully understand. That shift in perspective changed everything.",
    submittedAt: BigInt(0)
  }
];
function getInitials(name) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}
const AVATAR_COLORS = [
  "bg-primary/20 text-primary",
  "bg-secondary/20 text-secondary-foreground",
  "bg-accent/20 text-accent-foreground",
  "bg-chart-3/20 text-foreground",
  "bg-chart-5/20 text-foreground"
];
function TestimonialsCarousel({
  testimonials
}) {
  const [current, setCurrent] = reactExports.useState(0);
  const total = testimonials.length;
  const timerRef = reactExports.useRef(null);
  const next = () => setCurrent((c) => (c + 1) % total);
  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  reactExports.useEffect(() => {
    const interval = setInterval(next, 5e3);
    timerRef.current = interval;
    return () => clearInterval(interval);
  }, [total]);
  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 5e3);
  };
  const t = testimonials[current];
  const colorClass = AVATAR_COLORS[current % AVATAR_COLORS.length];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative wellness-card p-8 min-h-[260px] flex flex-col justify-between",
      "data-ocid": "feedback.testimonials_carousel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "w-8 h-8 text-primary/30 mb-4 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 16 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: -16 },
            transition: { duration: 0.28, ease: "easeOut" },
            className: "flex-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-base text-foreground/85 italic leading-relaxed", children: [
                '"',
                t.content,
                '"'
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${colorClass}`,
                    children: getInitials(t.parentName)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: t.parentName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Parent" })
                ] })
              ] })
            ]
          },
          current
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5", children: testimonials.map((t2, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                setCurrent(i);
                resetTimer();
              },
              className: `w-2 h-2 rounded-full transition-smooth ${i === current ? "bg-primary w-5" : "bg-border hover:bg-primary/40"}`,
              "aria-label": `Testimonial ${i + 1}`
            },
            t2.id.toString()
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  prev();
                  resetTimer();
                },
                className: "p-1.5 rounded-lg hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-smooth",
                "aria-label": "Previous testimonial",
                "data-ocid": "feedback.testimonial_prev",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  next();
                  resetTimer();
                },
                className: "p-1.5 rounded-lg hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-smooth",
                "aria-label": "Next testimonial",
                "data-ocid": "feedback.testimonial_next",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function StarRating({
  value,
  onChange
}) {
  const [hovered, setHovered] = reactExports.useState(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", role: "radiogroup", "aria-label": "Rating", children: [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      className: "p-0.5 transition-smooth",
      onMouseEnter: () => setHovered(s),
      onMouseLeave: () => setHovered(0),
      onClick: () => onChange(s),
      "aria-label": `${s} star`,
      "data-ocid": `feedback.star_${s}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Star,
        {
          className: `w-6 h-6 ${(hovered || value) >= s ? "text-primary fill-primary" : "text-muted-foreground"}`
        }
      )
    },
    `star-${s}`
  )) });
}
function FeedbackPage() {
  const submitFeedback = useSubmitFeedback();
  const submitTestimonial = useSubmitTestimonial();
  const { data: testimonials } = useTestimonials();
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    rating: 0,
    message: ""
  });
  const [testimonialForm, setTestimonialForm] = reactExports.useState({
    name: "",
    content: ""
  });
  const [feedbackDone, setFeedbackDone] = reactExports.useState(false);
  const [testimonialDone, setTestimonialDone] = reactExports.useState(false);
  const allTestimonials = testimonials && testimonials.length > 0 ? testimonials : STATIC_TESTIMONIALS;
  const handleFeedback = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.rating || !form.message) {
      ue.error("Please fill in all fields and select a rating");
      return;
    }
    try {
      await submitFeedback.mutateAsync({
        parentName: form.name,
        email: form.email,
        rating: BigInt(form.rating),
        message: form.message
      });
      setFeedbackDone(true);
      ue.success("Thank you for your feedback!");
    } catch {
      ue.error("Submission failed. Please try again.");
    }
  };
  const handleTestimonial = async (e) => {
    e.preventDefault();
    if (!testimonialForm.name || !testimonialForm.content) {
      ue.error("Please fill in both fields");
      return;
    }
    try {
      await submitTestimonial.mutateAsync({
        parentName: testimonialForm.name,
        content: testimonialForm.content
      });
      setTestimonialDone(true);
      ue.success("Your testimonial has been shared!");
    } catch {
      ue.error("Submission failed. Please try again.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-12", "data-ocid": "feedback.page", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 sm:px-6 max-w-5xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        className: "mb-10",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section-divider" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground mb-3", children: "Survey & Feedback" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-2xl text-sm sm:text-base", children: "Your experiences shape our platform. Share feedback, rate your journey, and inspire other parents with your story." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay: 0.1 },
        className: "mb-12",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-lg mb-4", children: "What Parents Are Saying" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TestimonialsCarousel, { testimonials: allTestimonials })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: -16 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.5 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "wellness-card p-6", "data-ocid": "feedback.form_card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-lg mb-1", children: "Share Your Feedback" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5", children: "How has this platform helped you as a parent?" }),
            feedbackDone ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-col items-center py-8 text-center",
                "data-ocid": "feedback.success_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-10 h-10 text-secondary mb-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Thank you!" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Your feedback helps us improve the platform for all parents." })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "form",
              {
                onSubmit: handleFeedback,
                className: "space-y-4",
                "data-ocid": "feedback.feedback_form",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "f-name", children: "Your Name" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "f-name",
                        placeholder: "Enter your name",
                        value: form.name,
                        onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
                        "data-ocid": "feedback.name_input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "f-email", children: "Email Address" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "f-email",
                        type: "email",
                        placeholder: "your@email.com",
                        value: form.email,
                        onChange: (e) => setForm((f) => ({ ...f, email: e.target.value })),
                        "data-ocid": "feedback.email_input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Rating" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      StarRating,
                      {
                        value: form.rating,
                        onChange: (r) => setForm((f) => ({ ...f, rating: r }))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "f-message", children: "Your Message" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Textarea,
                      {
                        id: "f-message",
                        placeholder: "What did you learn? How has this helped your family?",
                        rows: 4,
                        value: form.message,
                        onChange: (e) => setForm((f) => ({ ...f, message: e.target.value })),
                        "data-ocid": "feedback.message_textarea"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "submit",
                      className: "w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow transition-smooth",
                      disabled: submitFeedback.isPending,
                      "data-ocid": "feedback.submit_button",
                      children: [
                        submitFeedback.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin mr-2" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4 mr-2" }),
                        "Submit Feedback"
                      ]
                    }
                  )
                ]
              }
            )
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: 16 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.5, delay: 0.1 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "wellness-card p-6",
              "data-ocid": "feedback.testimonial_form_card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-lg mb-1", children: "Share Your Story" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5", children: "Inspire other parents with your transformation journey." }),
                testimonialDone ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex flex-col items-center py-8 text-center",
                    "data-ocid": "feedback.testimonial_success_state",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-10 h-10 text-secondary mb-3" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Story shared!" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Thank you for inspiring the community." })
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "form",
                  {
                    onSubmit: handleTestimonial,
                    className: "space-y-4",
                    "data-ocid": "feedback.testimonial_form",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "t-name", children: "Your Name" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Input,
                          {
                            id: "t-name",
                            placeholder: "Enter your name",
                            value: testimonialForm.name,
                            onChange: (e) => setTestimonialForm((f) => ({
                              ...f,
                              name: e.target.value
                            })),
                            "data-ocid": "feedback.testimonial_name_input"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "t-content", children: "Your Story" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Textarea,
                          {
                            id: "t-content",
                            placeholder: "Share how this platform changed your relationship with your child...",
                            rows: 6,
                            value: testimonialForm.content,
                            onChange: (e) => setTestimonialForm((f) => ({
                              ...f,
                              content: e.target.value
                            })),
                            "data-ocid": "feedback.testimonial_textarea"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          type: "submit",
                          className: "w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow transition-smooth",
                          disabled: submitTestimonial.isPending,
                          "data-ocid": "feedback.testimonial_submit_button",
                          children: [
                            submitTestimonial.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin mr-2" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4 mr-2" }),
                            "Share Story"
                          ]
                        }
                      )
                    ]
                  }
                )
              ]
            }
          )
        }
      )
    ] })
  ] }) });
}
export {
  FeedbackPage
};

import { c as createLucideIcon, o as useResources, p as useMyBookmarks, q as useSaveBookmark, s as useRemoveBookmark, u as useAuth, r as reactExports, R as ResourceCategory, j as jsxRuntimeExports, m as motion, t as Phone, B as Button, E as ExternalLink, n as ue } from "./index-xVE1wIx6.js";
import { I as Input } from "./input-DIMY8UvV.js";
import { L as LoaderCircle } from "./loader-circle-DUoZAwQE.js";
import { T as TriangleAlert } from "./triangle-alert-CXCJZPOg.js";
import { B as BookOpen } from "./book-open-CyWZIs0N.js";
import { B as BookmarkCheck } from "./bookmark-check-BwqxQVMj.js";
import { B as Bookmark } from "./bookmark-B-XXHTGA.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
const Funnel = createLucideIcon("funnel", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
const FALLBACK_RESOURCES = [
  {
    id: BigInt(1),
    title: "How to Talk to Your Teen Without Losing Them",
    description: "Practical conversation strategies from Dr. Lisa Damour, bestselling author and clinical psychologist.",
    link: "https://drlisadamour.com",
    category: ResourceCategory.parentingTips
  },
  {
    id: BigInt(2),
    title: "iCall Counselling — Free Mental Health Support",
    description: "TISS-backed free counselling service for adolescents and families in India.",
    link: "https://icallhelpline.org",
    category: ResourceCategory.emergencySupport
  },
  {
    id: BigInt(3),
    title: "Signs Your Child May Be Struggling Emotionally",
    description: "A clinical checklist and parent guide from the American Psychological Association.",
    link: "https://www.apa.org",
    category: ResourceCategory.wellnessArticles
  },
  {
    id: BigInt(4),
    title: "Parenting Teens in the Digital Age",
    description: "Research-backed guidance on screen time, social media, and digital citizenship for modern families.",
    link: "https://commonsensemedia.org",
    category: ResourceCategory.parentingTips
  },
  {
    id: BigInt(5),
    title: "NIMHANS — Child and Adolescent Mental Health",
    description: "Expert resources from India's premier mental health institution for parents and educators.",
    link: "https://nimhans.ac.in",
    category: ResourceCategory.expertGuidance
  },
  {
    id: BigInt(6),
    title: "Mindfulness for Parents: Staying Present",
    description: "Evidence-based mindfulness practices specifically designed to help parents manage stress and emotional reactivity.",
    link: "https://mindful.org",
    category: ResourceCategory.wellnessArticles
  },
  {
    id: BigInt(7),
    title: "Vandrevala Foundation Helpline",
    description: "24/7 mental health helpline for children, teens, and families in crisis. Free and confidential.",
    link: "https://www.vandrevalafoundation.com",
    category: ResourceCategory.emergencySupport
  },
  {
    id: BigInt(8),
    title: "The Whole-Brain Child — Dr. Daniel Siegel",
    description: "Science-backed strategies to nurture your child's developing mind and strengthen emotional health.",
    link: "https://drdansiegel.com",
    category: ResourceCategory.expertGuidance
  },
  {
    id: BigInt(9),
    title: "Greater Good Magazine — Raising Emotionally Healthy Kids",
    description: "Science-based insights from UC Berkeley on fostering resilience, empathy, and emotional well-being in children and teens.",
    link: "https://greatergood.berkeley.edu",
    category: ResourceCategory.wellnessArticles
  },
  {
    id: BigInt(10),
    title: "Child Mind Institute — Expert Parent Guides",
    description: "Clinician-reviewed guides on anxiety, ADHD, depression, and behaviour in children, written specifically for parents.",
    link: "https://childmind.org",
    category: ResourceCategory.expertGuidance
  }
];
const CATEGORIES = [
  { label: "All", value: null },
  { label: "Parenting Tips", value: ResourceCategory.parentingTips },
  { label: "Wellness Articles", value: ResourceCategory.wellnessArticles },
  { label: "Expert Guidance", value: ResourceCategory.expertGuidance },
  { label: "Emergency Support", value: ResourceCategory.emergencySupport }
];
const CATEGORY_LABELS = {
  [ResourceCategory.parentingTips]: "Parenting Tips",
  [ResourceCategory.wellnessArticles]: "Wellness Articles",
  [ResourceCategory.expertGuidance]: "Expert Guidance",
  [ResourceCategory.emergencySupport]: "Emergency Support"
};
const EMERGENCY_HOTLINES = [
  { name: "iCall (TISS)", number: "9152987821", note: "Mon–Sat, 8am–10pm" },
  { name: "Vandrevala Foundation", number: "1860-2662-345", note: "24/7" },
  { name: "Snehi", number: "044-24640050", note: "Mon–Fri, 8am–10pm" }
];
function ResourceCard({
  resource,
  index,
  isBookmarked,
  onToggleBookmark
}) {
  const isEmergency = resource.category === ResourceCategory.emergencySupport;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.4, delay: index * 0.06 },
      className: `wellness-card-hover p-5 flex flex-col gap-3 ${isEmergency ? "border-destructive/30 bg-destructive/5" : ""}`,
      "data-ocid": `resources.resource_card.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `module-icon-wrap shrink-0 ${isEmergency ? "bg-destructive/10 text-destructive [&>svg]:text-destructive" : ""}`,
              children: isEmergency ? /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 text-destructive" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "p-1.5 rounded-lg hover:bg-muted/60 text-muted-foreground hover:text-primary transition-smooth",
              onClick: () => onToggleBookmark(resource),
              "aria-label": isBookmarked ? "Remove bookmark" : "Save bookmark",
              "data-ocid": `resources.bookmark_button.${index + 1}`,
              children: isBookmarked ? /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkCheck, { className: "w-4 h-4 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `text-xs font-medium ${isEmergency ? "text-destructive" : "text-primary"}`,
              children: CATEGORY_LABELS[resource.category]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm leading-snug mt-1", children: resource.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 leading-relaxed", children: resource.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: resource.link,
            target: "_blank",
            rel: "noopener noreferrer",
            className: `mt-auto flex items-center gap-1 text-xs font-medium hover:underline ${isEmergency ? "text-destructive" : "text-primary"}`,
            "data-ocid": `resources.external_link.${index + 1}`,
            children: [
              "Visit Resource ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3" })
            ]
          }
        )
      ]
    },
    resource.id.toString()
  );
}
function ResourcesPage() {
  const { data: resources, isLoading } = useResources();
  const { data: bookmarks } = useMyBookmarks();
  const saveBookmark = useSaveBookmark();
  const removeBookmark = useRemoveBookmark();
  const { isAuthenticated } = useAuth();
  const [filter, setFilter] = reactExports.useState(null);
  const [search, setSearch] = reactExports.useState("");
  const display = resources && resources.length > 0 ? resources : FALLBACK_RESOURCES;
  const filtered = reactExports.useMemo(() => {
    let result = filter ? display.filter((r) => r.category === filter) : display;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (r) => r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [display, filter, search]);
  const emergency = filtered.filter(
    (r) => r.category === ResourceCategory.emergencySupport
  );
  const nonEmergency = filtered.filter(
    (r) => r.category !== ResourceCategory.emergencySupport
  );
  const bookmarkedIds = new Set((bookmarks == null ? void 0 : bookmarks.map((b) => b.id.toString())) ?? []);
  const toggleBookmark = async (r) => {
    if (!isAuthenticated) {
      ue.error("Sign in to save bookmarks");
      return;
    }
    const isBookmarked = bookmarkedIds.has(r.id.toString());
    try {
      if (isBookmarked) {
        await removeBookmark.mutateAsync(r.id);
        ue.success("Bookmark removed");
      } else {
        await saveBookmark.mutateAsync(r.id);
        ue.success("Saved to bookmarks");
      }
    } catch {
      ue.error("Action failed. Please try again.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-12", "data-ocid": "resources.page", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        className: "mb-10",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section-divider" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground mb-3", children: "Resources Library" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-2xl text-sm sm:text-base", children: "Curated articles, expert guidance, wellness tools, and emergency support for parents at every stage." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative mb-6 max-w-md",
        "data-ocid": "resources.search_bar",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Search resources...",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "pl-9",
              "data-ocid": "resources.search_input"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex flex-wrap gap-2 mb-8",
        "data-ocid": "resources.filter_tabs",
        children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: `flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-smooth border ${filter === cat.value ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:bg-muted/60 hover:text-foreground"}`,
            onClick: () => setFilter(cat.value),
            "data-ocid": `resources.filter.${cat.label.toLowerCase().replace(/ /g, "_")}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-3 h-3" }),
              cat.label
            ]
          },
          cat.label
        ))
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center justify-center py-24",
        "data-ocid": "resources.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 text-primary animate-spin" })
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      (filter === null || filter === ResourceCategory.emergencySupport) && emergency.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4 },
          className: "mb-8",
          "data-ocid": "resources.emergency_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-xl border border-destructive/30 bg-destructive/6 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-destructive" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-destructive text-sm", children: "Emergency Support Resources" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "If your child is in crisis or you need immediate help, reach out to these services." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex flex-wrap gap-3", children: EMERGENCY_HOTLINES.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-2 text-xs",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3 text-destructive shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
                      h.name,
                      ":"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "a",
                      {
                        href: `tel:${h.number}`,
                        className: "text-destructive hover:underline font-semibold",
                        children: h.number
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                      "(",
                      h.note,
                      ")"
                    ] })
                  ]
                },
                h.name
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: emergency.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              ResourceCard,
              {
                resource: r,
                index: i,
                isBookmarked: bookmarkedIds.has(r.id.toString()),
                onToggleBookmark: toggleBookmark
              },
              r.id.toString()
            )) })
          ]
        }
      ),
      nonEmergency.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5",
          "data-ocid": "resources.resource_list",
          children: nonEmergency.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ResourceCard,
            {
              resource: r,
              index: i,
              isBookmarked: bookmarkedIds.has(r.id.toString()),
              onToggleBookmark: toggleBookmark
            },
            r.id.toString()
          ))
        }
      ),
      filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "py-16 text-center",
          "data-ocid": "resources.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-10 h-10 text-muted-foreground mx-auto mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No resources match your search. Try different keywords." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "mt-4",
                onClick: () => {
                  setSearch("");
                  setFilter(null);
                },
                children: "Clear filters"
              }
            )
          ]
        }
      ),
      isAuthenticated && bookmarks && bookmarks.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.4 },
          className: "mt-12 pt-10 border-t border-border",
          "data-ocid": "resources.bookmarks_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkCheck, { className: "w-5 h-5 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "My Bookmarks" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground ml-1", children: [
                "(",
                bookmarks.length,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: bookmarks.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              ResourceCard,
              {
                resource: r,
                index: i,
                isBookmarked: true,
                onToggleBookmark: toggleBookmark
              },
              r.id.toString()
            )) })
          ]
        }
      )
    ] })
  ] }) });
}
export {
  ResourcesPage
};

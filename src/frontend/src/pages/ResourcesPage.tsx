import { ResourceCategory } from "@/backend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import {
  useMyBookmarks,
  useRemoveBookmark,
  useResources,
  useSaveBookmark,
} from "@/hooks/useBackend";
import type { Resource } from "@/types";
import {
  AlertTriangle,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Filter,
  Loader2,
  Phone,
  Search,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const FALLBACK_RESOURCES: Resource[] = [
  {
    id: BigInt(1),
    title: "How to Talk to Your Teen Without Losing Them",
    description:
      "Practical conversation strategies from Dr. Lisa Damour, bestselling author and clinical psychologist.",
    link: "https://drlisadamour.com",
    category: ResourceCategory.parentingTips,
  },
  {
    id: BigInt(2),
    title: "iCall Counselling — Free Mental Health Support",
    description:
      "TISS-backed free counselling service for adolescents and families in India.",
    link: "https://icallhelpline.org",
    category: ResourceCategory.emergencySupport,
  },
  {
    id: BigInt(3),
    title: "Signs Your Child May Be Struggling Emotionally",
    description:
      "A clinical checklist and parent guide from the American Psychological Association.",
    link: "https://www.apa.org",
    category: ResourceCategory.wellnessArticles,
  },
  {
    id: BigInt(4),
    title: "Parenting Teens in the Digital Age",
    description:
      "Research-backed guidance on screen time, social media, and digital citizenship for modern families.",
    link: "https://commonsensemedia.org",
    category: ResourceCategory.parentingTips,
  },
  {
    id: BigInt(5),
    title: "NIMHANS — Child and Adolescent Mental Health",
    description:
      "Expert resources from India's premier mental health institution for parents and educators.",
    link: "https://nimhans.ac.in",
    category: ResourceCategory.expertGuidance,
  },
  {
    id: BigInt(6),
    title: "Mindfulness for Parents: Staying Present",
    description:
      "Evidence-based mindfulness practices specifically designed to help parents manage stress and emotional reactivity.",
    link: "https://mindful.org",
    category: ResourceCategory.wellnessArticles,
  },
  {
    id: BigInt(7),
    title: "Vandrevala Foundation Helpline",
    description:
      "24/7 mental health helpline for children, teens, and families in crisis. Free and confidential.",
    link: "https://www.vandrevalafoundation.com",
    category: ResourceCategory.emergencySupport,
  },
  {
    id: BigInt(8),
    title: "The Whole-Brain Child — Dr. Daniel Siegel",
    description:
      "Science-backed strategies to nurture your child's developing mind and strengthen emotional health.",
    link: "https://drdansiegel.com",
    category: ResourceCategory.expertGuidance,
  },
  {
    id: BigInt(9),
    title: "Greater Good Magazine — Raising Emotionally Healthy Kids",
    description:
      "Science-based insights from UC Berkeley on fostering resilience, empathy, and emotional well-being in children and teens.",
    link: "https://greatergood.berkeley.edu",
    category: ResourceCategory.wellnessArticles,
  },
  {
    id: BigInt(10),
    title: "Child Mind Institute — Expert Parent Guides",
    description:
      "Clinician-reviewed guides on anxiety, ADHD, depression, and behaviour in children, written specifically for parents.",
    link: "https://childmind.org",
    category: ResourceCategory.expertGuidance,
  },
];

const CATEGORIES = [
  { label: "All", value: null },
  { label: "Parenting Tips", value: ResourceCategory.parentingTips },
  { label: "Wellness Articles", value: ResourceCategory.wellnessArticles },
  { label: "Expert Guidance", value: ResourceCategory.expertGuidance },
  { label: "Emergency Support", value: ResourceCategory.emergencySupport },
];

const CATEGORY_LABELS: Record<ResourceCategory, string> = {
  [ResourceCategory.parentingTips]: "Parenting Tips",
  [ResourceCategory.wellnessArticles]: "Wellness Articles",
  [ResourceCategory.expertGuidance]: "Expert Guidance",
  [ResourceCategory.emergencySupport]: "Emergency Support",
};

const EMERGENCY_HOTLINES = [
  { name: "iCall (TISS)", number: "9152987821", note: "Mon–Sat, 8am–10pm" },
  { name: "Vandrevala Foundation", number: "1860-2662-345", note: "24/7" },
  { name: "Snehi", number: "044-24640050", note: "Mon–Fri, 8am–10pm" },
];

function ResourceCard({
  resource,
  index,
  isBookmarked,
  onToggleBookmark,
}: {
  resource: Resource;
  index: number;
  isBookmarked: boolean;
  onToggleBookmark: (r: Resource) => void;
}) {
  const isEmergency = resource.category === ResourceCategory.emergencySupport;
  return (
    <motion.div
      key={resource.id.toString()}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className={`wellness-card-hover p-5 flex flex-col gap-3 ${
        isEmergency ? "border-destructive/30 bg-destructive/5" : ""
      }`}
      data-ocid={`resources.resource_card.${index + 1}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div
          className={`module-icon-wrap shrink-0 ${
            isEmergency
              ? "bg-destructive/10 text-destructive [&>svg]:text-destructive"
              : ""
          }`}
        >
          {isEmergency ? (
            <Phone className="w-4 h-4 text-destructive" />
          ) : (
            <BookOpen className="w-4 h-4" />
          )}
        </div>
        <button
          type="button"
          className="p-1.5 rounded-lg hover:bg-muted/60 text-muted-foreground hover:text-primary transition-smooth"
          onClick={() => onToggleBookmark(resource)}
          aria-label={isBookmarked ? "Remove bookmark" : "Save bookmark"}
          data-ocid={`resources.bookmark_button.${index + 1}`}
        >
          {isBookmarked ? (
            <BookmarkCheck className="w-4 h-4 text-primary" />
          ) : (
            <Bookmark className="w-4 h-4" />
          )}
        </button>
      </div>
      <div>
        <span
          className={`text-xs font-medium ${
            isEmergency ? "text-destructive" : "text-primary"
          }`}
        >
          {CATEGORY_LABELS[resource.category]}
        </span>
        <h3 className="font-display font-semibold text-foreground text-sm leading-snug mt-1">
          {resource.title}
        </h3>
        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
          {resource.description}
        </p>
      </div>
      <a
        href={resource.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-auto flex items-center gap-1 text-xs font-medium hover:underline ${
          isEmergency ? "text-destructive" : "text-primary"
        }`}
        data-ocid={`resources.external_link.${index + 1}`}
      >
        Visit Resource <ExternalLink className="w-3 h-3" />
      </a>
    </motion.div>
  );
}

export function ResourcesPage() {
  const { data: resources, isLoading } = useResources();
  const { data: bookmarks } = useMyBookmarks();
  const saveBookmark = useSaveBookmark();
  const removeBookmark = useRemoveBookmark();
  const { isAuthenticated } = useAuth();
  const [filter, setFilter] = useState<ResourceCategory | null>(null);
  const [search, setSearch] = useState("");

  const display =
    resources && resources.length > 0 ? resources : FALLBACK_RESOURCES;

  const filtered = useMemo(() => {
    let result = filter
      ? display.filter((r) => r.category === filter)
      : display;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q),
      );
    }
    return result;
  }, [display, filter, search]);

  const emergency = filtered.filter(
    (r) => r.category === ResourceCategory.emergencySupport,
  );
  const nonEmergency = filtered.filter(
    (r) => r.category !== ResourceCategory.emergencySupport,
  );

  const bookmarkedIds = new Set(bookmarks?.map((b) => b.id.toString()) ?? []);

  const toggleBookmark = async (r: Resource) => {
    if (!isAuthenticated) {
      toast.error("Sign in to save bookmarks");
      return;
    }
    const isBookmarked = bookmarkedIds.has(r.id.toString());
    try {
      if (isBookmarked) {
        await removeBookmark.mutateAsync(r.id);
        toast.success("Bookmark removed");
      } else {
        await saveBookmark.mutateAsync(r.id);
        toast.success("Saved to bookmarks");
      }
    } catch {
      toast.error("Action failed. Please try again.");
    }
  };

  return (
    <div className="py-12" data-ocid="resources.page">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="section-divider" />
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Resources Library
          </h1>
          <p className="text-muted-foreground max-w-2xl text-sm sm:text-base">
            Curated articles, expert guidance, wellness tools, and emergency
            support for parents at every stage.
          </p>
        </motion.div>

        {/* Search */}
        <div
          className="relative mb-6 max-w-md"
          data-ocid="resources.search_bar"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search resources..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            data-ocid="resources.search_input"
          />
        </div>

        {/* Filters */}
        <div
          className="flex flex-wrap gap-2 mb-8"
          data-ocid="resources.filter_tabs"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.label}
              type="button"
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-smooth border ${
                filter === cat.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:bg-muted/60 hover:text-foreground"
              }`}
              onClick={() => setFilter(cat.value as ResourceCategory | null)}
              data-ocid={`resources.filter.${cat.label.toLowerCase().replace(/ /g, "_")}`}
            >
              <Filter className="w-3 h-3" />
              {cat.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div
            className="flex items-center justify-center py-24"
            data-ocid="resources.loading_state"
          >
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : (
          <>
            {/* Emergency support highlight */}
            {(filter === null ||
              filter === ResourceCategory.emergencySupport) &&
              emergency.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mb-8"
                  data-ocid="resources.emergency_section"
                >
                  <div className="p-4 rounded-xl border border-destructive/30 bg-destructive/6 mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="w-4 h-4 text-destructive" />
                      <h2 className="font-display font-semibold text-destructive text-sm">
                        Emergency Support Resources
                      </h2>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      If your child is in crisis or you need immediate help,
                      reach out to these services.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-3">
                      {EMERGENCY_HOTLINES.map((h) => (
                        <div
                          key={h.name}
                          className="flex items-center gap-2 text-xs"
                        >
                          <Phone className="w-3 h-3 text-destructive shrink-0" />
                          <span className="font-medium text-foreground">
                            {h.name}:
                          </span>
                          <a
                            href={`tel:${h.number}`}
                            className="text-destructive hover:underline font-semibold"
                          >
                            {h.number}
                          </a>
                          <span className="text-muted-foreground">
                            ({h.note})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {emergency.map((r, i) => (
                      <ResourceCard
                        key={r.id.toString()}
                        resource={r}
                        index={i}
                        isBookmarked={bookmarkedIds.has(r.id.toString())}
                        onToggleBookmark={toggleBookmark}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

            {/* Regular resources */}
            {nonEmergency.length > 0 && (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                data-ocid="resources.resource_list"
              >
                {nonEmergency.map((r, i) => (
                  <ResourceCard
                    key={r.id.toString()}
                    resource={r}
                    index={i}
                    isBookmarked={bookmarkedIds.has(r.id.toString())}
                    onToggleBookmark={toggleBookmark}
                  />
                ))}
              </div>
            )}

            {filtered.length === 0 && (
              <div
                className="py-16 text-center"
                data-ocid="resources.empty_state"
              >
                <BookOpen className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">
                  No resources match your search. Try different keywords.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => {
                    setSearch("");
                    setFilter(null);
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}

            {/* My Bookmarks (if authenticated + has bookmarks) */}
            {isAuthenticated && bookmarks && bookmarks.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="mt-12 pt-10 border-t border-border"
                data-ocid="resources.bookmarks_section"
              >
                <div className="flex items-center gap-2 mb-6">
                  <BookmarkCheck className="w-5 h-5 text-primary" />
                  <h2 className="font-display font-semibold text-foreground">
                    My Bookmarks
                  </h2>
                  <span className="text-xs text-muted-foreground ml-1">
                    ({bookmarks.length})
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {bookmarks.map((r, i) => (
                    <ResourceCard
                      key={r.id.toString()}
                      resource={r}
                      index={i}
                      isBookmarked
                      onToggleBookmark={toggleBookmark}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

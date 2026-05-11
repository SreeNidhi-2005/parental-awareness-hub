import { ProgressStatus } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  useModules,
  useMyProgress,
  useUpdateProgress,
} from "@/hooks/useBackend";
import type { LearningModule } from "@/types";
import {
  BookmarkCheck,
  BookmarkPlus,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const FALLBACK_MODULES: LearningModule[] = [
  {
    id: BigInt(1),
    icon: "🧠",
    title: "Understanding Today's Generation",
    description:
      "Digital natives, social media effects, emotional intelligence, and generational communication patterns.",
    article:
      "Today's children are growing up in an era of constant digital stimulation, instant gratification, and social media identity formation. They communicate through memes, short videos, and emoji — not because they're shallow, but because that's the language of their world. Understanding this context is the first step toward meaningful connection. The generation gap isn't about values — it's about pace, medium, and what 'normal' feels like.",
    tips: [
      "Observe their digital habits without judgment or shame",
      "Ask open-ended questions about their online world",
      "Learn the apps and platforms they use — not to monitor, but to understand",
      "Respect their need for digital spaces as social infrastructure",
      "Discuss online safety as empowerment, not prohibition",
    ],
    category: "Foundation",
  },
  {
    id: BigInt(2),
    icon: "💙",
    title: "Signs of Stress & Depression",
    description:
      "Recognize early warning signs of emotional distress, anxiety, and depression in children and teenagers.",
    article:
      "Depression in teenagers often looks different than in adults. Rather than sadness, watch for irritability, withdrawal from friends, loss of interest in hobbies, and changes in sleep or appetite. Many teens mask pain with humor or busyness. The earlier you recognize the signs, the more effectively you can create the safe space they need to open up.",
    tips: [
      "Watch for changes in sleep patterns — too much or too little",
      "Notice sudden changes in friend groups or social withdrawal",
      "Take emotional outbursts seriously rather than dismissing them",
      "Don't dismiss sadness as a 'teenage phase'",
      "Ask how they're feeling — not just how school is going",
    ],
    category: "Mental Health",
  },
  {
    id: BigInt(3),
    icon: "👨‍👧",
    title: "Effects of Family Conflicts",
    description:
      "How parental fights and household tension impact children's emotional development and sense of safety.",
    article:
      "Children absorb family tension deeply — even when they appear unaffected on the surface. The home should feel like a safe base, not a battlefield. Chronic household conflict raises cortisol levels in children, affects academic performance, and shapes how they handle conflict as adults. Repairing conflicts visibly matters as much as preventing them.",
    tips: [
      "Never argue in ways that are threatening or demeaning in front of children",
      "Repair conflicts visibly — let children see resolution and reconciliation",
      "Reassure children clearly that they are never the cause of adult conflicts",
      "Model healthy conflict resolution by narrating your de-escalation",
      "Create rituals of reconnection after tense periods",
    ],
    category: "Family Dynamics",
  },
  {
    id: BigInt(4),
    icon: "💬",
    title: "Healthy Communication Methods",
    description:
      "Proven techniques for listening deeply, speaking gently, and creating psychological safety in conversations.",
    article:
      "Effective communication starts with listening more than speaking. Children need to feel heard before they can hear you. Psychological safety — the feeling that they won't be judged, dismissed, or punished for honesty — is the foundation of every healthy parent-child conversation. This takes consistent practice and radical patience.",
    tips: [
      "Use 'I feel...' statements instead of 'You always...' accusations",
      "Listen to understand, not to form your response",
      "Validate the emotion before offering a solution or correction",
      "Schedule regular low-pressure one-on-one time weekly",
      "Put devices down and offer undivided presence during conversations",
    ],
    category: "Communication",
  },
  {
    id: BigInt(5),
    icon: "📚",
    title: "Academic Pressure Awareness",
    description:
      "Navigate expectations around grades, careers, and performance without damaging emotional wellbeing.",
    article:
      "Academic pressure is one of the leading causes of teen anxiety globally. When grades become the only measure of worth, children internalize a conditional sense of love. Success should never come at the cost of mental health. Parents who celebrate curiosity and effort over outcomes raise children who are more resilient — and often more successful in the long run.",
    tips: [
      "Focus on effort and curiosity, not just the final grade",
      "Never compare your child to siblings, cousins, or classmates",
      "Celebrate non-academic strengths: creativity, kindness, perseverance",
      "Create pressure-free evenings where school is off-limits as a topic",
      "Ask what they found interesting today, not what marks they received",
    ],
    category: "Academic",
  },
  {
    id: BigInt(6),
    icon: "🌱",
    title: "Emotional Support for Teenagers",
    description:
      "How to be an emotionally available parent for teenagers navigating identity, peer pressure, and self-discovery.",
    article:
      "Teenagers need connection more than correction. Their brains are actively rewiring — processing identity, belonging, and self-worth in real time. Being emotionally available — even and especially when they push back — is the most powerful parenting tool available. You don't have to be perfect; you have to be present and consistent.",
    tips: [
      "Stay calm and grounded during emotional storms — they co-regulate through you",
      "Don't take withdrawal personally — it's developmental, not rejection",
      "Show up consistently even after being pushed away",
      "Share your own vulnerabilities appropriately to normalize imperfection",
      "Say 'I love you' and 'I'm proud of you' specifically and often",
    ],
    category: "Teenagers",
  },
];

const MODULE_STATS: Record<
  string,
  { label: string; value: string; color: string }[]
> = {
  Foundation: [
    {
      label: "Screen time (avg)",
      value: "7h/day",
      color: "bg-primary/10 text-primary",
    },
    {
      label: "Social apps used",
      value: "5+",
      color: "bg-accent/10 text-accent-foreground",
    },
    {
      label: "Gen Z online daily",
      value: "95%",
      color: "bg-secondary/10 text-secondary-foreground",
    },
  ],
  "Mental Health": [
    {
      label: "Teens w/ anxiety",
      value: "1 in 3",
      color: "bg-destructive/10 text-destructive",
    },
    {
      label: "Seek help",
      value: "< 20%",
      color: "bg-accent/10 text-accent-foreground",
    },
    {
      label: "Detection gap",
      value: "11 yrs",
      color: "bg-primary/10 text-primary",
    },
  ],
  "Family Dynamics": [
    {
      label: "Kids affected by conflict",
      value: "85%",
      color: "bg-destructive/10 text-destructive",
    },
    {
      label: "Cortisol increase",
      value: "3×",
      color: "bg-accent/10 text-accent-foreground",
    },
    {
      label: "Recovery time",
      value: "Days",
      color: "bg-primary/10 text-primary",
    },
  ],
  Communication: [
    {
      label: "Parents who listen first",
      value: "32%",
      color: "bg-primary/10 text-primary",
    },
    {
      label: "Feel heard by parents",
      value: "42%",
      color: "bg-secondary/10 text-secondary-foreground",
    },
    {
      label: "Safer at home",
      value: "+68%",
      color: "bg-accent/10 text-accent-foreground",
    },
  ],
  Academic: [
    {
      label: "Stress from grades",
      value: "72%",
      color: "bg-destructive/10 text-destructive",
    },
    {
      label: "Drop in grades due to anxiety",
      value: "40%",
      color: "bg-accent/10 text-accent-foreground",
    },
    {
      label: "Prefer less pressure",
      value: "91%",
      color: "bg-primary/10 text-primary",
    },
  ],
  Teenagers: [
    {
      label: "Want more connection",
      value: "78%",
      color: "bg-primary/10 text-primary",
    },
    {
      label: "Feel misunderstood",
      value: "64%",
      color: "bg-destructive/10 text-destructive",
    },
    {
      label: "Open up when calm",
      value: "3× more",
      color: "bg-secondary/10 text-secondary-foreground",
    },
  ],
};

const CATEGORY_COLORS: Record<string, string> = {
  Foundation: "bg-primary/10 text-primary border-primary/20",
  "Mental Health":
    "bg-secondary/10 text-secondary-foreground border-secondary/20",
  "Family Dynamics": "bg-accent/10 text-accent-foreground border-accent/20",
  Communication: "bg-primary/10 text-primary border-primary/20",
  Academic: "bg-destructive/10 text-destructive border-destructive/20",
  Teenagers: "bg-accent/10 text-accent-foreground border-accent/20",
};

const CATEGORIES = [
  "All",
  "Foundation",
  "Mental Health",
  "Family Dynamics",
  "Communication",
  "Academic",
  "Teenagers",
];

function ModuleCard({
  mod,
  index,
  progress,
  onMarkComplete,
  onBookmark,
  bookmarked,
  isAuthenticated,
}: {
  mod: LearningModule;
  index: number;
  progress?: ProgressStatus;
  onMarkComplete: (id: bigint) => void;
  onBookmark: (id: bigint) => void;
  bookmarked: boolean;
  isAuthenticated: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const isComplete = progress === ProgressStatus.completed;
  const stats = MODULE_STATS[mod.category] ?? [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="wellness-card overflow-hidden"
      data-ocid={`modules.module_card.${index + 1}`}
    >
      {/* Card header */}
      <div className="p-5 pb-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-xl shrink-0">
              {mod.icon}
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground text-base leading-snug">
                {mod.title}
              </h3>
              <span
                className={`inline-block text-xs px-2 py-0.5 rounded-full mt-1 font-medium border ${
                  CATEGORY_COLORS[mod.category] ??
                  "bg-muted text-muted-foreground border-border"
                }`}
              >
                {mod.category}
              </span>
            </div>
          </div>
          {/* Bookmark + complete badges */}
          <div className="flex items-center gap-1.5 shrink-0">
            {isAuthenticated && (
              <button
                type="button"
                onClick={() => onBookmark(mod.id)}
                className={`p-1.5 rounded-lg transition-smooth ${
                  bookmarked
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                }`}
                aria-label={bookmarked ? "Remove bookmark" : "Bookmark module"}
                data-ocid={`modules.bookmark_button.${index + 1}`}
              >
                {bookmarked ? (
                  <BookmarkCheck className="w-4 h-4" />
                ) : (
                  <BookmarkPlus className="w-4 h-4" />
                )}
              </button>
            )}
            {isComplete && (
              <span className="flex items-center gap-1 text-xs text-secondary-foreground bg-secondary/15 px-2 py-1 rounded-full">
                <CheckCircle2 className="w-3 h-3" />
                Done
              </span>
            )}
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {mod.description}
        </p>

        <button
          type="button"
          className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-primary transition-smooth hover:opacity-80"
          onClick={() => setExpanded((e) => !e)}
          data-ocid={`modules.expand_button.${index + 1}`}
          aria-expanded={expanded}
        >
          {expanded ? "Hide article" : "Read article & tips"}
          {expanded ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-border space-y-5">
              {/* Article */}
              <div className="pt-4">
                <p className="text-sm text-foreground/85 leading-relaxed">
                  {mod.article}
                </p>
              </div>

              {/* Stat infographics */}
              {stats.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2.5">
                    Key Statistics
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {stats.map((stat) => (
                      <div
                        key={stat.label}
                        className={`rounded-xl p-2.5 text-center ${stat.color}`}
                      >
                        <div className="text-lg font-bold font-display leading-none mb-0.5">
                          {stat.value}
                        </div>
                        <div className="text-xs opacity-80 leading-tight">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tips */}
              <div>
                <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-2.5">
                  Actionable Tips for Parents
                </p>
                <ul className="space-y-2">
                  {mod.tips.map((tip, ti) => (
                    <li
                      key={tip}
                      className="flex items-start gap-2.5 text-sm text-foreground"
                    >
                      <span className="w-5 h-5 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {ti + 1}
                      </span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Emotional guidance callout */}
              <div className="tip-banner">
                <p className="text-xs font-semibold text-primary mb-1">
                  Emotional Guidance
                </p>
                <p className="text-xs text-foreground/80 leading-relaxed">
                  Approach this topic with patience and without judgment. Your
                  consistency matters more than perfection.
                </p>
              </div>

              {/* Mark as complete */}
              {isAuthenticated && (
                <div className="pt-1">
                  <Button
                    type="button"
                    variant={isComplete ? "secondary" : "default"}
                    size="sm"
                    className="w-full"
                    onClick={() => onMarkComplete(mod.id)}
                    data-ocid={`modules.complete_button.${index + 1}`}
                  >
                    {isComplete ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-1.5" /> Completed
                      </>
                    ) : (
                      "Mark as complete"
                    )}
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function ModulesPage() {
  const { data: modules, isLoading } = useModules();
  const { data: progress } = useMyProgress();
  const updateProgress = useUpdateProgress();
  const { isAuthenticated } = useAuth();
  const [activeFilter, setActiveFilter] = useState("All");
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());

  const displayModules =
    modules && modules.length > 0 ? modules : FALLBACK_MODULES;

  const filtered =
    activeFilter === "All"
      ? displayModules
      : displayModules.filter((m) => m.category === activeFilter);

  const getProgress = (id: bigint) =>
    progress?.find((p) => p.moduleId === id)?.status;

  const handleMarkComplete = (id: bigint) => {
    updateProgress.mutate({
      moduleId: id,
      status: ProgressStatus.completed,
      bookmark: bookmarks.has(id.toString()),
    });
  };

  const toggleBookmark = (id: bigint) => {
    setBookmarks((prev) => {
      const next = new Set(prev);
      const key = id.toString();
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div className="py-12" data-ocid="modules.page">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="section-divider" />
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Awareness Learning Modules
          </h1>
          <p className="text-muted-foreground max-w-2xl text-sm sm:text-base">
            Six core awareness areas — each with articles, research statistics,
            expert tips, and practical guidance to help you better understand
            and support your child.
          </p>
          {!isAuthenticated && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/8 border border-primary/15 text-sm text-primary">
              <BookmarkPlus className="w-4 h-4" />
              Sign in to track your progress and bookmark modules
            </div>
          )}
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-8"
          data-ocid="modules.filter_bar"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-smooth ${
                activeFilter === cat
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
              }`}
              data-ocid={`modules.filter.${cat.toLowerCase().replace(/ /g, "_")}`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Progress summary */}
        {isAuthenticated && progress && progress.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-6 flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary/10 border border-secondary/20"
          >
            <CheckCircle2 className="w-4 h-4 text-secondary-foreground shrink-0" />
            <p className="text-sm text-secondary-foreground">
              You've completed{" "}
              <strong>
                {
                  progress.filter((p) => p.status === ProgressStatus.completed)
                    .length
                }
              </strong>{" "}
              of <strong>{displayModules.length}</strong> modules.
            </p>
          </motion.div>
        )}

        {isLoading ? (
          <div
            className="flex items-center justify-center py-24"
            data-ocid="modules.loading_state"
          >
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : (
          <>
            {filtered.length === 0 ? (
              <div
                className="text-center py-24 text-muted-foreground"
                data-ocid="modules.empty_state"
              >
                No modules match this filter.
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {filtered.map((mod, i) => (
                  <ModuleCard
                    key={mod.id.toString()}
                    mod={mod}
                    index={i}
                    progress={getProgress(mod.id)}
                    onMarkComplete={handleMarkComplete}
                    onBookmark={toggleBookmark}
                    bookmarked={bookmarks.has(mod.id.toString())}
                    isAuthenticated={isAuthenticated}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

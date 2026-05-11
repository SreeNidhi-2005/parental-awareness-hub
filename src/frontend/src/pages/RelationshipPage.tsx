import {
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Handshake,
  Heart,
  MessageCircle,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const TOPICS = [
  {
    icon: Handshake,
    title: "Building Trust with Your Child",
    colorClass: "text-primary bg-primary/10",
    accentBg: "bg-primary/5 border-primary/15",
    desc: "Trust is built in small, repeated moments — not grand gestures. Every time you follow through on a promise, you deposit into the trust account. Consistency, honesty, and safe repair after rupture are the foundations.",
    tips: [
      "Keep promises, even the small ones — they matter enormously",
      "Never laugh at or dismiss their fears, no matter how irrational they seem",
      "Share age-appropriate truths about your own life and mistakes",
      "Apologize genuinely when you're wrong — it models accountability",
      "Be consistent so they know exactly what to expect from you",
    ],
    warningSigns: [
      "Child stops sharing daily experiences with you",
      "Lies to avoid your reaction rather than seeking your help",
      "Prefers to confide in peers or other adults instead",
    ],
    guidance:
      "The rupture-repair cycle is essential. When trust breaks, explicitly naming it and working through it together strengthens the relationship more than if the rupture never happened.",
  },
  {
    icon: Heart,
    title: "Avoiding Fear-Based Parenting",
    colorClass: "text-secondary-foreground bg-secondary/10",
    accentBg: "bg-secondary/5 border-secondary/20",
    desc: "When children obey out of fear, they comply but disconnect. They become adults who cannot assert boundaries, who seek approval from authority, and who struggle to make decisions from their own values.",
    tips: [
      "Replace threats with natural consequences that teach cause and effect",
      "Explain the 'why' behind every rule — understanding builds buy-in",
      "Create genuine safety to say 'I made a mistake without fear of shame",
      "Avoid comparisons that create shame or conditional love",
      "Discipline the behavior, never the child's fundamental worth",
    ],
    warningSigns: [
      "Child is excessively compliant and afraid to express disagreement",
      "Hides mistakes or achievements depending on your reaction patterns",
      "Shows anxiety in your presence that disappears when you leave",
    ],
    guidance:
      "Authority and warmth are not opposites. Research consistently shows authoritative parenting — high warmth + high standards with explanation — produces the most confident, ethical children.",
  },
  {
    icon: MessageCircle,
    title: "Handling Arguments Calmly",
    colorClass: "text-accent-foreground bg-accent/10",
    accentBg: "bg-accent/5 border-accent/20",
    desc: "How you argue matters more than whether you argue. Children learn conflict resolution by watching you. A parent who models regulated disagreement teaches one of the most valuable life skills available.",
    tips: [
      "Take a 5-minute pause if voices are raised — announce it, then return",
      "Say 'I'm feeling overwhelmed. Let's continue when I'm calm' — and follow through",
      "Focus on the current issue only — never bring up historical grievances",
      "Look for the underlying need behind the resistance or pushback",
      "End every difficult conversation with a moment of genuine connection",
    ],
    warningSigns: [
      "Child shuts down completely and refuses any discussion after conflict",
      "Becomes visibly distressed when any tension arises in the home",
      "Re-enacts your conflict patterns in their own peer relationships",
    ],
    guidance:
      "A repair conversation after a difficult argument — 'I got too upset and I'm sorry for how I reacted' — models emotional intelligence and restores safety even more powerfully than not arguing at all.",
  },
  {
    icon: Users,
    title: "Supporting Children Emotionally",
    colorClass: "text-primary bg-primary/10",
    accentBg: "bg-primary/5 border-primary/15",
    desc: "Emotional support isn't about solving problems. It's about being a safe, consistent witness to your child's inner world — through difficult emotions, setbacks, and the ordinary hardships of growing up.",
    tips: [
      "Name the emotion you observe: 'You seem really frustrated right now'",
      "Sit with them in the emotion rather than rushing to fix or reframe it",
      "Ask 'What do you need right now?' before assuming what will help",
      "Don't rush to silver linings — let them fully feel the difficult thing first",
      "Check in after hard events without interrogating or demanding details",
    ],
    warningSigns: [
      "Child stops expressing any negative emotions — masked compliance",
      "Describes feeling alone even when surrounded by people",
      "Turns to screens or food to regulate emotions instead of people",
    ],
    guidance:
      "The goal is not to protect children from all negative emotions, but to help them develop the capacity to move through difficult feelings with support. Presence is the most powerful intervention.",
  },
];

const QUOTES = [
  {
    text: "Children are great imitators. So give them something great to imitate.",
    author: "Anonymous",
  },
  {
    text: "The way we talk to our children becomes their inner voice.",
    author: "Peggy O'Mara",
  },
  {
    text: "Behind every young child who believes in himself is a parent who believed first.",
    author: "Matthew Jacobson",
  },
];

function TopicCard({
  topic,
  index,
}: { topic: (typeof TOPICS)[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.09 }}
      whileHover={{ y: -3 }}
      className="wellness-card overflow-hidden cursor-default"
      data-ocid={`relationship.topic_card.${index + 1}`}
    >
      {/* Header */}
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${topic.colorClass} shrink-0`}
          >
            <topic.icon className="w-5 h-5" />
          </div>
          <h3 className="font-display font-semibold text-foreground text-base leading-snug">
            {topic.title}
          </h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {topic.desc}
        </p>

        <button
          type="button"
          className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-primary transition-smooth hover:opacity-80"
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
          data-ocid={`relationship.expand_button.${index + 1}`}
        >
          {expanded ? "Hide guidance" : "View tips & warning signs"}
          {expanded ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Expanded */}
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
            <div className="px-5 pb-5 border-t border-border space-y-4 pt-4">
              {/* Tips */}
              <div>
                <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-2.5">
                  Actionable Tips
                </p>
                <ul className="space-y-2">
                  {topic.tips.map((tip, ti) => (
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

              {/* Warning Signs */}
              <div
                className={`rounded-xl border p-4 ${topic.accentBg} space-y-2`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-4 h-4 text-destructive shrink-0" />
                  <p className="text-xs font-semibold text-destructive">
                    Warning Signs to Watch For
                  </p>
                </div>
                <ul className="space-y-1.5">
                  {topic.warningSigns.map((sign) => (
                    <li
                      key={sign}
                      className="flex items-start gap-2 text-xs text-foreground/80"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-destructive/60 mt-1.5 shrink-0" />
                      {sign}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Expert guidance */}
              <div className="tip-banner">
                <p className="text-xs font-semibold text-primary mb-1">
                  Expert Guidance
                </p>
                <p className="text-xs text-foreground/80 leading-relaxed">
                  {topic.guidance}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function RelationshipPage() {
  return (
    <div className="py-12" data-ocid="relationship.page">
      <div className="container mx-auto px-4 sm:px-6 space-y-14">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-divider" />
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Parent-Child Relationship
          </h1>
          <p className="text-muted-foreground max-w-2xl text-sm sm:text-base">
            Practical, research-backed guidance for building deep trust,
            resolving conflict with grace, and being the emotional anchor your
            child needs.
          </p>
        </motion.div>

        {/* Interactive topic cards */}
        <section data-ocid="relationship.topics_section">
          <motion.h2
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="font-display text-2xl font-bold text-foreground mb-5"
          >
            Four Pillars of a Healthy Parent-Child Relationship
          </motion.h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {TOPICS.map((topic, i) => (
              <TopicCard key={topic.title} topic={topic} index={i} />
            ))}
          </div>
        </section>

        {/* Quotes */}
        <section
          className="bg-muted/30 rounded-2xl p-8"
          data-ocid="relationship.quotes_section"
        >
          <h2 className="font-display text-xl font-bold text-foreground mb-6 text-center">
            Words to Parent By
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {QUOTES.map((q, i) => (
              <motion.blockquote
                key={q.author}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-card border border-border rounded-xl p-5"
                data-ocid={`relationship.quote_card.${i + 1}`}
              >
                <p className="text-sm italic text-foreground/80 leading-relaxed mb-3">
                  "{q.text}"
                </p>
                <footer className="text-xs text-muted-foreground font-medium">
                  — {q.author}
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

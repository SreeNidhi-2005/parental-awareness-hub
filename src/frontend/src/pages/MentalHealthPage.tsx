import {
  AlertCircle,
  CheckCircle2,
  Heart,
  Lightbulb,
  MessageCircle,
  Shield,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const MISTAKE_CARDS = [
  {
    icon: "🚫",
    title: "Dismissing Emotions",
    detail:
      "Saying 'You're fine, stop crying' or 'It's not a big deal' invalidates your child's inner reality. Even if the situation seems minor, the emotion is always real.",
    impact: "Children learn their feelings are wrong → stops sharing them",
    fix: "Try: 'I can see that really upset you. Tell me more.'",
  },
  {
    icon: "⚖️",
    title: "Constant Comparison",
    detail:
      "Comparing your child to siblings, cousins, or classmates triggers shame and damages self-worth. Competition should come from within, not from external benchmarks set by parents.",
    impact: "Breeds resentment, low self-esteem, and anxiety to perform",
    fix: "Try: 'I'm proud of the progress you've made.'",
  },
  {
    icon: "😔",
    title: "Using Shame as Discipline",
    detail:
      "Phrases like 'How could you do this?' or 'I'm embarrassed by you' use shame as a control mechanism. Shame damages the core sense of self, not just the behavior.",
    impact:
      "Children internalize 'I am bad' instead of 'I did something wrong'",
    fix: "Try: 'That behavior isn't okay. Let's talk about why.'",
  },
  {
    icon: "🏆",
    title: "Achievement Over Wellbeing",
    detail:
      "When grades, trophies, and performance define worth, children learn love is conditional. They become adults who cannot rest, who hustle for approval, and who fear failure deeply.",
    impact: "Anxiety, perfectionism, inability to enjoy success",
    fix: "Try: 'I'm proud of who you're becoming, not just what you achieve.'",
  },
  {
    icon: "🗣️",
    title: "Not Modeling Emotional Regulation",
    detail:
      "Children don't learn emotional management from lectures — they learn from watching. If you explode in anger, shut down, or avoid difficult feelings, they adopt the same patterns.",
    impact: "Kids mirror parental dysregulation into adulthood",
    fix: "Narrate your own process: 'I'm feeling overwhelmed. I'm going to take a breath.'",
  },
  {
    icon: "📵",
    title: "Distracted Presence",
    detail:
      "Being physically present but emotionally or digitally absent sends a powerful message: 'You are not worth my full attention.' Children internalize absence as rejection.",
    impact: "Reduces sense of security and willingness to confide",
    fix: "Set intentional phone-free time every day — even 20 minutes matters.",
  },
];

const COMMUNICATION_STEPS = [
  {
    step: 1,
    title: "Create space before speaking",
    desc: "Let your child decompress before launching into questions or advice. A snack, 20 minutes of quiet, or a simple 'I'm here when you're ready' opens more doors than interrogation.",
    icon: Heart,
    color: "bg-primary/10 text-primary",
  },
  {
    step: 2,
    title: "Listen to understand, not to respond",
    desc: "Most parents listen while preparing their rebuttal. Practice listening with the single goal of understanding their experience — not fixing it, not correcting it.",
    icon: MessageCircle,
    color: "bg-secondary/10 text-secondary-foreground",
  },
  {
    step: 3,
    title: "Reflect before advising",
    desc: "Before offering solutions, say back what you heard: 'So it sounds like you felt left out when...' This makes children feel genuinely understood and opens them to guidance.",
    icon: Shield,
    color: "bg-accent/10 text-accent-foreground",
  },
  {
    step: 4,
    title: "Validate the emotion",
    desc: "Validation doesn't mean agreement. 'That sounds really hard' acknowledges their experience without endorsing every choice. It keeps the conversation going.",
    icon: CheckCircle2,
    color: "bg-primary/10 text-primary",
  },
  {
    step: 5,
    title: "Offer support, not solutions first",
    desc: "Ask: 'Do you want me to just listen, or would you like my thoughts?' Respecting their preference gives them agency and makes them more open to guidance later.",
    icon: Lightbulb,
    color: "bg-secondary/10 text-secondary-foreground",
  },
  {
    step: 6,
    title: "End with connection",
    desc: "Even difficult conversations should end on a note of warmth: 'I'm really glad you told me this. I'm always here for you.' This seals the emotional safety of the exchange.",
    icon: Zap,
    color: "bg-accent/10 text-accent-foreground",
  },
];

const SECTIONS_INFO = [
  {
    icon: Heart,
    title: "What Emotional Well-Being Really Means",
    color: "text-primary",
    bg: "bg-primary/8",
    content:
      "Emotional well-being is your child's ability to understand and manage their feelings, form positive relationships, and recover from adversity. It's not about always being happy — it's about having the inner tools to navigate life's inevitable difficulties. The home environment shapes this more than school, peers, or media combined.",
    points: [
      "Children regulate emotions by mirroring their parents — you are their first model",
      "Consistent emotional safety builds long-term psychological resilience",
      "Validating feelings is not the same as approving of every behavior",
      "Emotional vocabulary helps children articulate and process inner states",
      "Wellbeing is a skill that can be taught through everyday interactions",
    ],
  },
  {
    icon: Shield,
    title: "Listening Without Judgment",
    color: "text-secondary-foreground",
    bg: "bg-secondary/10",
    content:
      "Non-judgmental listening is one of the most powerful gifts you can give your child. When they feel genuinely heard — not evaluated, not rushed, not interrupted — they open up naturally. This is when real connection and meaningful conversation happen. The hardest part: staying quiet when you want to fix.",
    points: [
      "Put down your phone, make eye contact, and orient your body toward them",
      "Reflect back what you hear before responding or advising",
      "Resist the urge to fix, advise, minimize, or silver-line immediately",
      "Sit with discomfort alongside them — don't rush past hard feelings",
      "Ask 'What do you need from me right now?' instead of assuming",
    ],
  },
];

const SCENARIOS = [
  {
    situation: "Your teenager comes home upset after school and snaps at you.",
    wrongResponse: "\"What's your problem? I didn't do anything to you.\"",
    betterResponse:
      "\"I can see something upset you. I'm here when you're ready to talk.\"",
    why: "The first response escalates conflict. The second creates a safe opening without applying pressure.",
  },
  {
    situation: "Your child gets a low grade and starts crying.",
    wrongResponse: '"You should have studied more. This is your own fault."',
    betterResponse:
      '"That feels disappointing. Let\'s talk about what made it hard."',
    why: "Blame shuts down learning and damages trust. Curiosity opens it back up.",
  },
  {
    situation: 'Your child says "I hate school" every day.',
    wrongResponse: '"Everyone has to go to school. Stop complaining."',
    betterResponse:
      '"What\'s the hardest part about school for you right now?"',
    why: "'Stop complaining' silences future disclosures. Curiosity surfaces the real issue underneath.",
  },
];

function MistakeCard({
  card,
  index,
}: { card: (typeof MISTAKE_CARDS)[0]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="wellness-card overflow-hidden"
      data-ocid={`mental.mistake_card.${index + 1}`}
    >
      <button
        type="button"
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-muted/30 transition-smooth"
        onClick={() => setOpen((o) => !o)}
        data-ocid={`mental.mistake_toggle.${index + 1}`}
      >
        <span className="text-2xl w-9 text-center shrink-0">{card.icon}</span>
        <span className="font-display font-semibold text-foreground text-sm flex-1">
          {card.title}
        </span>
        <AlertCircle className="w-4 h-4 text-destructive shrink-0" />
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="px-4 pb-4 border-t border-border space-y-3 pt-3">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {card.detail}
            </p>
            <div className="p-2.5 rounded-lg bg-destructive/8 border border-destructive/15">
              <p className="text-xs font-semibold text-destructive mb-0.5">
                Impact:
              </p>
              <p className="text-xs text-foreground/75">{card.impact}</p>
            </div>
            <div className="p-2.5 rounded-lg bg-secondary/10 border border-secondary/20">
              <p className="text-xs font-semibold text-secondary-foreground mb-0.5">
                Better approach:
              </p>
              <p className="text-xs text-foreground/80 italic">{card.fix}</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export function MentalHealthPage() {
  return (
    <div className="py-12" data-ocid="mental.page">
      <div className="container mx-auto px-4 sm:px-6 space-y-16">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-divider" />
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Mental Health Awareness
          </h1>
          <p className="text-muted-foreground max-w-2xl text-sm sm:text-base">
            Understanding emotional well-being, safe communication, and how to
            avoid the invisible mistakes that can quietly push children away.
          </p>
          {/* Hero stat strip */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                value: "1 in 5",
                label: "Children experience mental health challenges",
              },
              { value: "50%", label: "of cases begin before age 14" },
              { value: "80%", label: "never receive professional support" },
              {
                value: "1st",
                label: "Place children look for help: their parents",
              },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="wellness-card p-4 text-center"
              >
                <div className="text-2xl font-bold font-display gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground leading-snug">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Emotional well-being + listening sections */}
        <section data-ocid="mental.wellbeing_section">
          <motion.h2
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="font-display text-2xl font-bold text-foreground mb-5"
          >
            Foundations of Emotional Wellbeing
          </motion.h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {SECTIONS_INFO.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="wellness-card p-5 space-y-4"
                data-ocid={`mental.foundation_card.${i + 1}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg ${section.bg} flex items-center justify-center`}
                  >
                    <section.icon className={`w-4.5 h-4.5 ${section.color}`} />
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-base">
                    {section.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
                <ul className="space-y-2">
                  {section.points.map((pt) => (
                    <li
                      key={pt}
                      className="flex items-start gap-2 text-sm text-foreground"
                    >
                      <div className="w-4 h-4 rounded-full bg-primary/15 flex items-center justify-center mt-0.5 shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      </div>
                      {pt}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Common Mistakes */}
        <section data-ocid="mental.mistakes_section">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-5"
          >
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              6 Common Parenting Mistakes
            </h2>
            <p className="text-muted-foreground text-sm">
              These mistakes come from love — recognizing them is the first
              step. Tap each card to explore the impact and a better approach.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MISTAKE_CARDS.map((card, i) => (
              <MistakeCard key={card.title} card={card} index={i} />
            ))}
          </div>
        </section>

        {/* Safe Communication Step Guide */}
        <section data-ocid="mental.communication_section">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              Safe Communication: A Step-by-Step Guide
            </h2>
            <p className="text-muted-foreground text-sm">
              Creating psychological safety means children feel they can say
              anything without fear. These steps build that foundation.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COMMUNICATION_STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="wellness-card-hover p-5"
                data-ocid={`mental.comm_step.${i + 1}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className={`w-7 h-7 rounded-full ${step.color} flex items-center justify-center text-sm font-bold font-display shrink-0`}
                  >
                    {step.step}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg ${step.color} flex items-center justify-center`}
                  >
                    <step.icon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <h3 className="font-display font-semibold text-foreground text-sm mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Real-Life Scenarios */}
        <section data-ocid="mental.scenarios_section">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              Real-Life Scenarios
            </h2>
            <p className="text-muted-foreground text-sm">
              Small shifts in how we respond create entirely different outcomes.
              See the before and after.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {SCENARIOS.map((sc, idx) => (
              <motion.div
                key={sc.situation}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="wellness-card p-5 space-y-3"
                data-ocid={`mental.scenario_card.${idx + 1}`}
              >
                <div className="pb-2 border-b border-border">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                    Situation
                  </p>
                  <p className="text-sm text-foreground font-medium leading-snug">
                    {sc.situation}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-destructive/8 border border-destructive/15">
                  <p className="text-xs font-semibold text-destructive mb-1">
                    ❌ Less helpful:
                  </p>
                  <p className="text-xs text-foreground/70 italic">
                    {sc.wrongResponse}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/10 border border-secondary/20">
                  <p className="text-xs font-semibold text-secondary-foreground mb-1">
                    ✅ More helpful:
                  </p>
                  <p className="text-xs text-foreground/80 italic">
                    {sc.betterResponse}
                  </p>
                </div>
                <div className="tip-banner">
                  <p className="text-xs text-foreground/75 leading-relaxed">
                    {sc.why}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

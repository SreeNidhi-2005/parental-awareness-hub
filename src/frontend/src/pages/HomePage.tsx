import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useDailyTip, useTestimonials } from "@/hooks/useBackend";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookMarked,
  BookOpen,
  Brain,
  Calendar,
  Heart,
  MessageCircle,
  Quote,
  Shield,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const MODULES = [
  {
    icon: Brain,
    title: "Understanding Today's Generation",
    desc: "Digital natives, emotional patterns, and generational shifts in how children think and communicate.",
    href: "/modules",
    colorClass: "module-icon-teal",
  },
  {
    icon: Heart,
    title: "Signs of Stress & Depression",
    desc: "Recognize early warning signs of emotional distress, anxiety, and depression in your child.",
    href: "/mental-health",
    colorClass: "module-icon-purple",
  },
  {
    icon: Users,
    title: "Healthy Communication",
    desc: "Build bridges with proven techniques to listen, understand, and respond without judgment.",
    href: "/relationship",
    colorClass: "module-icon-green",
  },
  {
    icon: Shield,
    title: "Parenting Approaches",
    desc: "Evidence-based parenting strategies that support growth, trust, and emotional security.",
    href: "/modules",
    colorClass: "module-icon-teal",
  },
  {
    icon: Star,
    title: "Academic Pressure Awareness",
    desc: "Navigate the pressures of school, grades, and future expectations without harming wellbeing.",
    href: "/modules",
    colorClass: "module-icon-purple",
  },
  {
    icon: MessageCircle,
    title: "Emotional Support Toolkit",
    desc: "Practical tools and scripts for difficult conversations with teenagers and young children.",
    href: "/modules",
    colorClass: "module-icon-green",
  },
];

const STATIC_TESTIMONIALS = [
  {
    name: "Priya M.",
    text: "This platform changed how I talk to my 14-year-old. I finally understand what she was going through.",
    stars: 5,
    role: "Mother of two",
  },
  {
    name: "Rahul K.",
    text: "The modules on academic pressure were eye-opening. My son and I have better conversations now.",
    stars: 5,
    role: "Father, educator",
  },
  {
    name: "Anita S.",
    text: "I attended a workshop and met other parents facing the same struggles. Truly supportive community.",
    stars: 5,
    role: "Single mother",
  },
];

const MOTIVATIONAL_QUOTES = [
  {
    quote: "Children are not things to be molded, but people to be unfolded.",
    author: "Jess Lair",
  },
  {
    quote: "The way we talk to our children becomes their inner voice.",
    author: "Peggy O'Mara",
  },
  {
    quote:
      "Every word, facial expression, gesture, or action on the part of a parent gives the child some message about their worth.",
    author: "Virginia Satir",
  },
  {
    quote:
      "It's not only children who grow. Parents do too. As much as we watch to see what our children do with their lives, they are watching us to see what we do with ours.",
    author: "Joyce Maynard",
  },
  {
    quote: "Children learn more from what you are than what you teach.",
    author: "W.E.B. Du Bois",
  },
];

const PLATFORM_FEATURES = [
  {
    icon: BookOpen,
    title: "Evidence-Based Modules",
    desc: "Six curated learning paths built on child psychology research and real family experiences.",
  },
  {
    icon: Sparkles,
    title: "AI Parenting Guidance",
    desc: "Ask our support chatbot any question about parenting, communication, or child mental health.",
  },
  {
    icon: Calendar,
    title: "Live Workshops",
    desc: "Join expert-led sessions with other parents navigating similar challenges.",
  },
  {
    icon: Users,
    title: "Community Support",
    desc: "Connect with parents who understand. Share experiences and learn together.",
  },
];

function RotatingQuotes() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const current = MOTIVATIONAL_QUOTES[index];

  return (
    <div className="relative min-h-[140px] flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45 }}
          className="text-center max-w-2xl mx-auto px-4"
        >
          <p className="text-base sm:text-lg text-foreground/80 italic leading-relaxed mb-4">
            &ldquo;{current.quote}&rdquo;
          </p>
          <p className="text-sm font-semibold text-primary">
            — {current.author}
          </p>
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-0 flex gap-1.5 justify-center w-full">
        {MOTIVATIONAL_QUOTES.map((q, i) => (
          <button
            key={q.quote.slice(0, 20)}
            type="button"
            onClick={() => setIndex(i)}
            className={`w-1.5 h-1.5 rounded-full transition-smooth ${
              i === index ? "bg-primary w-4" : "bg-primary/30"
            }`}
            aria-label={`Quote ${i + 1}`}
            data-ocid={`home.quote_dot.${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export function HomePage() {
  const { data: dailyTip } = useDailyTip();
  const { data: backendTestimonials } = useTestimonials();
  const { isAuthenticated } = useAuth();

  const testimonials =
    backendTestimonials && backendTestimonials.length > 0
      ? backendTestimonials.slice(0, 3).map((t) => ({
          name: t.parentName,
          text: t.content,
          stars: 5,
          role: "Parent",
        }))
      : STATIC_TESTIMONIALS;

  return (
    <div className="flex flex-col">
      {/* ─── Hero ─── */}
      <section
        className="relative gradient-hero-bg dot-grid py-20 sm:py-28 overflow-hidden"
        data-ocid="home.hero_section"
      >
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/6 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-secondary/6 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
            >
              <span className="inline-flex items-center gap-1.5 pastel-chip mb-5">
                <Heart className="w-3.5 h-3.5" />A platform for modern parents
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-5xl font-bold text-foreground leading-tight mb-5">
                Understanding children
                <br />
                <span className="gradient-text">begins with listening.</span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
                A warm, evidence-based platform helping parents connect with
                their children's emotional world — navigating stress,
                depression, generation gaps, and building lasting trust.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow h-11 px-6 transition-smooth"
                  asChild
                  data-ocid="home.learn_more_button"
                >
                  <Link to="/modules">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Explore Modules
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="h-11 px-6 border-border hover:bg-muted/60 transition-smooth"
                  asChild
                  data-ocid="home.workshops_button"
                >
                  <Link to="/workshops">
                    <Calendar className="w-4 h-4 mr-2" />
                    Join a Workshop
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="h-11 px-6 border-border hover:bg-muted/60 transition-smooth"
                  asChild
                  data-ocid="home.support_button"
                >
                  <Link to="/resources">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Talk to Support
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex justify-center lg:justify-end"
            >
              <img
                src="/assets/generated/hero-family-connection-transparent.dim_800x600.png"
                alt="Parent and child emotional connection illustration"
                className="w-full max-w-lg object-contain drop-shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Daily Tip Banner ─── */}
      {dailyTip && (
        <section
          className="bg-muted/30 border-y border-border py-4"
          data-ocid="home.daily_tip_section"
        >
          <div className="container mx-auto px-4 sm:px-6">
            <div className="tip-banner flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                  Daily Parenting Tip
                </span>
                <p className="text-sm text-foreground mt-0.5 leading-relaxed">
                  {dailyTip}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── Platform Overview ─── */}
      <section
        className="py-20 bg-background"
        data-ocid="home.platform_section"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="section-divider mx-auto" />
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Everything you need to be a present parent
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
              From self-paced learning modules to live workshops and AI-guided
              support — we've built tools that meet you where you are.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PLATFORM_FEATURES.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="wellness-card p-5"
                data-ocid={`home.feature_card.${i + 1}`}
              >
                <div className="module-icon-wrap mb-3">
                  <feat.icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1.5 text-sm">
                  {feat.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Modules Grid ─── */}
      <section
        className="py-20 bg-muted/20 border-y border-border"
        data-ocid="home.modules_section"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="section-divider mx-auto" />
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Awareness Learning Modules
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
              Six core areas every modern parent should explore — from
              recognizing stress to building emotional safety.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MODULES.map((mod, i) => (
              <motion.div
                key={mod.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                data-ocid={`home.module_card.${i + 1}`}
              >
                <Link
                  to={mod.href}
                  className="wellness-card-hover block h-full p-5"
                >
                  <div className="module-icon-wrap mb-4">
                    <mod.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2 text-base">
                    {mod.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {mod.desc}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-medium text-primary">
                    Learn more <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button
              variant="outline"
              className="h-11 px-8 border-border hover:bg-muted/60 transition-smooth"
              asChild
              data-ocid="home.all_modules_button"
            >
              <Link to="/modules">
                View All Modules <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── Motivational Quotes ─── */}
      <section className="py-20 bg-background" data-ocid="home.quotes_section">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <div className="wellness-card p-8 sm:p-12 relative overflow-hidden">
              <div className="absolute -top-4 -left-2 opacity-10">
                <Quote className="w-24 h-24 text-primary" />
              </div>
              <div className="section-divider mx-auto mb-6" />
              <p className="text-center text-xs font-semibold text-primary uppercase tracking-widest mb-8">
                Words to Reflect On
              </p>
              <RotatingQuotes />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Why This Matters ─── */}
      <section
        className="bg-muted/20 border-y border-border py-20"
        data-ocid="home.illustration_section"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1 order-2 lg:order-1"
            >
              <div className="section-divider" />
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Every child deserves to be understood.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6 text-sm sm:text-base">
                Modern children face unprecedented pressures — social media,
                academic expectations, identity challenges. Parents often feel
                lost. We bridge that gap with compassionate, research-backed
                guidance.
              </p>
              <ul className="space-y-3">
                {[
                  "Recognize early signs of stress and anxiety",
                  "Communicate without triggering shutdown",
                  "Build trust through consistent emotional presence",
                  "Support without controlling",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-foreground"
                  >
                    <div className="w-4 h-4 rounded-full bg-primary/15 flex items-center justify-center mt-0.5 shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Button
                className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow transition-smooth"
                asChild
                data-ocid="home.mental_health_cta"
              >
                <Link to="/mental-health">
                  <Brain className="w-4 h-4 mr-2" />
                  Explore Mental Health Section
                </Link>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1 flex justify-center order-1 lg:order-2"
            >
              <img
                src="/assets/generated/hero-family-connection-transparent.dim_800x600.png"
                alt="Parent and child emotional connection illustration"
                className="w-full max-w-md object-contain drop-shadow-md"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section
        className="py-20 bg-background"
        data-ocid="home.testimonials_section"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="section-divider mx-auto" />
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-3">
              What Parents Are Saying
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm">
              Real stories from parents who found clarity, patience, and
              connection through our platform.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={`${t.name}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="wellness-card p-5"
                data-ocid={`home.testimonial_card.${i + 1}`}
              >
                <div className="flex gap-0.5 mb-3">
                  {[1, 2, 3, 4, 5].slice(0, t.stars).map((s) => (
                    <Star
                      key={s}
                      className="w-3.5 h-3.5 text-primary fill-primary"
                    />
                  ))}
                </div>
                <p className="text-sm text-foreground/80 italic leading-relaxed mb-4">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    — {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {t.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section
        className="gradient-hero-bg border-t border-border py-16"
        data-ocid="home.cta_section"
      >
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 pastel-chip mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              Start your journey today
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Ready to strengthen your family bond?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-sm sm:text-base">
              Join thousands of parents who have transformed their relationships
              through understanding, empathy, and compassionate communication.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {!isAuthenticated && (
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow h-11 px-8 transition-smooth"
                  asChild
                  data-ocid="home.join_cta_button"
                >
                  <Link to="/login">
                    <Heart className="w-4 h-4 mr-2" />
                    Join the Community
                  </Link>
                </Button>
              )}
              <Button
                variant="outline"
                className="h-11 px-8 border-border hover:bg-muted/60 transition-smooth"
                asChild
                data-ocid="home.resources_cta_button"
              >
                <Link to="/resources">
                  <BookMarked className="w-4 h-4 mr-2" />
                  Browse Resources
                </Link>
              </Button>
              <Button
                variant="outline"
                className="h-11 px-8 border-border hover:bg-muted/60 transition-smooth"
                asChild
                data-ocid="home.awareness_cta_button"
              >
                <Link to="/workshops">
                  <Calendar className="w-4 h-4 mr-2" />
                  Join Awareness Program
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

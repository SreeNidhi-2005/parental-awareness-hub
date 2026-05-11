import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "@tanstack/react-router";
import { Heart, Shield, Sparkles, Users } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

const FEATURES = [
  {
    icon: Heart,
    title: "Emotional Support",
    desc: "Access expert parenting guidance and emotional wellness resources.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Chat",
    desc: "Get real-time answers to your parenting questions from our AI assistant.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    desc: "Your data stays private using Internet Identity — no passwords needed.",
  },
  {
    icon: Users,
    title: "Community",
    desc: "Join workshops, share experiences, and learn with other parents.",
  },
];

const QUOTES = [
  {
    text: "Children need love, especially when they do not deserve it.",
    author: "Harold Hulbert",
  },
  {
    text: "It is easier to build strong children than to repair broken adults.",
    author: "Frederick Douglass",
  },
  {
    text: "Your children need your presence more than your presents.",
    author: "Jesse Jackson",
  },
];

export function LoginPage() {
  const { isAuthenticated, isLoading, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.navigate({ to: "/home" });
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Left Panel — Branding */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="lg:w-1/2 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex flex-col justify-center px-8 sm:px-16 py-16 relative overflow-hidden"
        data-ocid="login.brand_panel"
      >
        {/* Decorative blobs */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-accent/10 rounded-full blur-3xl" />

        {/* Hero Image */}
        <div className="relative flex justify-center mb-10 lg:mb-12">
          <motion.img
            src="/assets/generated/hero-parental-wellness-transparent.dim_800x600.png"
            alt="Parental Awareness Illustration"
            className="w-full max-w-xs lg:max-w-sm object-contain drop-shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Heart className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm font-medium text-primary uppercase tracking-widest">
              Parental Awareness Hub
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-4">
            Understanding children
            <br />
            <span className="text-primary">begins with listening.</span>
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed max-w-md">
            A warm, supportive platform helping modern parents connect with
            their children's emotional world through expert guidance and
            community.
          </p>
        </motion.div>

        {/* Quotes */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 relative"
        >
          {QUOTES.slice(0, 1).map((q) => (
            <blockquote
              key={q.author}
              className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-4"
            >
              <p className="text-sm italic text-foreground/80">"{q.text}"</p>
              <footer className="mt-2 text-xs text-muted-foreground">
                — {q.author}
              </footer>
            </blockquote>
          ))}
        </motion.div>
      </motion.div>

      {/* Right Panel — Auth Form */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 py-16"
        data-ocid="login.auth_panel"
      >
        <div className="max-w-md mx-auto w-full">
          <div className="mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Welcome back
            </h2>
            <p className="text-muted-foreground text-sm">
              Sign in to access your parenting dashboard, saved modules, and
              community workshops.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                className="flex items-start gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-soft transition-smooth"
                data-ocid={`login.feature_card.${i + 1}`}
              >
                <div className="w-7 h-7 rounded-lg bg-primary/12 flex items-center justify-center shrink-0 mt-0.5">
                  <f.icon className="w-3.5 h-3.5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">
                    {f.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Auth Action */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.75 }}
            className="space-y-4"
            data-ocid="login.auth_section"
          >
            <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-primary/12 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Secure Sign In
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Powered by Internet Identity
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-5">
                We use Internet Identity — a secure, passwordless authentication
                system. No email or password required.
              </p>
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-glow transition-smooth h-11"
                onClick={() => login()}
                disabled={isLoading}
                data-ocid="login.sign_in_button"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Continue with Internet Identity
                  </span>
                )}
              </Button>
            </div>

            <p className="text-center text-xs text-muted-foreground">
              By signing in, you agree to our community guidelines and privacy
              policy. Your data is stored securely on the Internet Computer.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

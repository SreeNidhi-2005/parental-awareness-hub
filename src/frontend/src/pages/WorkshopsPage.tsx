import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import {
  useIsRegistered,
  useMyWorkshops,
  useRegisterWorkshop,
  useWorkshops,
} from "@/hooks/useBackend";
import type { Workshop } from "@/types";
import {
  Calendar,
  CheckCircle,
  Clock,
  Loader2,
  MapPin,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const FALLBACK_UPCOMING: Workshop[] = [
  {
    id: BigInt(1),
    title: "Understanding Teenage Mental Health",
    description:
      "A 2-hour session with child psychologist Dr. Meena Sharma covering depression, anxiety, and emotional regulation in teenagers.",
    facilitator: "Dr. Meena Sharma",
    dateTime: BigInt(Date.now() * 1_000_000 + 7 * 24 * 60 * 60 * 1_000_000_000),
    registeredCount: BigInt(34),
    maxCapacity: BigInt(50),
  },
  {
    id: BigInt(2),
    title: "Communicating Across the Generation Gap",
    description:
      "Practical tools to bridge generational differences and build meaningful dialogue with your children in the digital age.",
    facilitator: "Prof. Arun Kumar",
    dateTime: BigInt(
      Date.now() * 1_000_000 + 14 * 24 * 60 * 60 * 1_000_000_000,
    ),
    registeredCount: BigInt(22),
    maxCapacity: BigInt(40),
  },
  {
    id: BigInt(3),
    title: "Emotional Safety at Home",
    description:
      "How to create a household environment where children feel safe, valued, and free to express themselves honestly.",
    facilitator: "Ms. Ritu Patel",
    dateTime: BigInt(
      Date.now() * 1_000_000 + 21 * 24 * 60 * 60 * 1_000_000_000,
    ),
    registeredCount: BigInt(18),
    maxCapacity: BigInt(35),
  },
];

const FALLBACK_PAST: Workshop[] = [
  {
    id: BigInt(10),
    title: "Breaking the Cycle of Reactive Parenting",
    description:
      "How to recognize emotional triggers and respond to children from a place of calm, not reactivity.",
    facilitator: "Dr. Priya Nair",
    dateTime: BigInt(
      Date.now() * 1_000_000 - 30 * 24 * 60 * 60 * 1_000_000_000,
    ),
    registeredCount: BigInt(45),
    maxCapacity: BigInt(45),
  },
  {
    id: BigInt(11),
    title: "Screen Time & Digital Wellness for Kids",
    description:
      "Evidence-based strategies for managing technology use while maintaining family harmony.",
    facilitator: "Ms. Kavya Reddy",
    dateTime: BigInt(
      Date.now() * 1_000_000 - 60 * 24 * 60 * 60 * 1_000_000_000,
    ),
    registeredCount: BigInt(38),
    maxCapacity: BigInt(40),
  },
];

function formatDate(ts: bigint): string {
  const ms = Number(ts / BigInt(1_000_000));
  return new Date(ms).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(ts: bigint): string {
  const ms = Number(ts / BigInt(1_000_000));
  return new Date(ms).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function isPast(ts: bigint): boolean {
  return Number(ts / BigInt(1_000_000)) < Date.now();
}

interface RegisterModalProps {
  workshop: Workshop;
  onClose: () => void;
  onSuccess: () => void;
}

function RegisterModal({ workshop, onClose, onSuccess }: RegisterModalProps) {
  const register = useRegisterWorkshop();
  const [form, setForm] = useState({
    parentName: "",
    email: "",
    numChildren: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.parentName || !form.email) {
      toast.error("Name and email are required");
      return;
    }
    try {
      await register.mutateAsync(workshop.id);
      onSuccess();
      toast.success(`You're registered for "${workshop.title}"!`);
    } catch {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      data-ocid="workshops.register_modal"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.22 }}
        className="relative wellness-card p-6 w-full max-w-md"
        data-ocid="workshops.register_dialog"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="font-display font-semibold text-foreground text-lg">
              Register for Workshop
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              {workshop.title}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-smooth"
            aria-label="Close"
            data-ocid="workshops.register_close_button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="rw-name">Your Name</Label>
            <Input
              id="rw-name"
              placeholder="Enter your name"
              value={form.parentName}
              onChange={(e) =>
                setForm((f) => ({ ...f, parentName: e.target.value }))
              }
              data-ocid="workshops.register_name_input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="rw-email">Email Address</Label>
            <Input
              id="rw-email"
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
              data-ocid="workshops.register_email_input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="rw-children">Number of Children</Label>
            <Input
              id="rw-children"
              type="number"
              min="1"
              placeholder="e.g. 2"
              value={form.numChildren}
              onChange={(e) =>
                setForm((f) => ({ ...f, numChildren: e.target.value }))
              }
              data-ocid="workshops.register_children_input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="rw-message">
              Anything you'd like to share?{" "}
              <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Textarea
              id="rw-message"
              placeholder="Questions, topics you'd like covered..."
              rows={3}
              value={form.message}
              onChange={(e) =>
                setForm((f) => ({ ...f, message: e.target.value }))
              }
              data-ocid="workshops.register_message_textarea"
            />
          </div>
          <div className="flex gap-3 pt-1">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
              data-ocid="workshops.register_cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow transition-smooth"
              disabled={register.isPending}
              data-ocid="workshops.register_confirm_button"
            >
              {register.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              Confirm Registration
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function WorkshopCard({
  workshop,
  index,
  onRegister,
}: { workshop: Workshop; index: number; onRegister: (w: Workshop) => void }) {
  const { isAuthenticated } = useAuth();
  const { data: registered } = useIsRegistered(workshop.id);
  const past = isPast(workshop.dateTime);

  const spotsLeft =
    Number(workshop.maxCapacity) - Number(workshop.registeredCount);
  const isFull = spotsLeft <= 0;

  const handleRegisterClick = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to register for workshops");
      return;
    }
    onRegister(workshop);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={`wellness-card p-6 flex flex-col gap-4 ${
        past ? "opacity-75" : ""
      }`}
      data-ocid={`workshops.workshop_card.${index + 1}`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display font-semibold text-foreground text-base leading-tight">
          {workshop.title}
        </h3>
        {past ? (
          <Badge
            variant="secondary"
            className="shrink-0 bg-muted text-muted-foreground"
          >
            Past
          </Badge>
        ) : registered ? (
          <Badge
            variant="secondary"
            className="shrink-0 bg-secondary/15 text-secondary-foreground"
          >
            <CheckCircle className="w-3 h-3 mr-1" /> Registered
          </Badge>
        ) : isFull ? (
          <Badge
            variant="secondary"
            className="shrink-0 bg-muted text-muted-foreground"
          >
            Full
          </Badge>
        ) : (
          <Badge
            variant="secondary"
            className="shrink-0 bg-primary/10 text-primary"
          >
            {spotsLeft} spots left
          </Badge>
        )}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {workshop.description}
      </p>
      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          {formatDate(workshop.dateTime)}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {formatTime(workshop.dateTime)}
        </span>
        <span className="flex items-center gap-1">
          <Users className="w-3.5 h-3.5" />
          {workshop.registeredCount.toString()} /{" "}
          {workshop.maxCapacity.toString()}
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5" />
          Online via Zoom
        </span>
      </div>
      <div className="flex items-center justify-between pt-1 border-t border-border">
        <span className="text-xs text-muted-foreground">
          Facilitator:{" "}
          <span className="font-medium text-foreground">
            {workshop.facilitator}
          </span>
        </span>
        {!past && !registered && !isFull && (
          <Button
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow transition-smooth"
            onClick={handleRegisterClick}
            data-ocid={`workshops.register_button.${index + 1}`}
          >
            Register
          </Button>
        )}
      </div>
    </motion.div>
  );
}

export function WorkshopsPage() {
  const { data: workshops, isLoading } = useWorkshops();
  const { data: myWorkshops } = useMyWorkshops();
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [registerTarget, setRegisterTarget] = useState<Workshop | null>(null);

  const all =
    workshops && workshops.length > 0
      ? workshops
      : [...FALLBACK_UPCOMING, ...FALLBACK_PAST];

  const upcoming = all.filter((w) => !isPast(w.dateTime));
  const past = all.filter((w) => isPast(w.dateTime));
  const display = tab === "upcoming" ? upcoming : past;

  return (
    <div className="py-12" data-ocid="workshops.page">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="section-divider" />
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Community Workshops
          </h1>
          <p className="text-muted-foreground max-w-2xl text-sm sm:text-base">
            Live, expert-led sessions to deepen your parenting skills and
            connect with a community of parents navigating similar challenges.
          </p>
        </motion.div>

        {/* Tab switcher */}
        <div
          className="flex items-center gap-2 mb-8"
          data-ocid="workshops.tab_switcher"
        >
          {(["upcoming", "past"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-smooth border ${
                tab === t
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:bg-muted/60 hover:text-foreground"
              }`}
              data-ocid={`workshops.${t}_tab`}
            >
              {t === "upcoming" ? "Upcoming" : "Past"}
              <span className="ml-2 text-xs opacity-70">
                ({t === "upcoming" ? upcoming.length : past.length})
              </span>
            </button>
          ))}
          {myWorkshops && myWorkshops.length > 0 && (
            <span className="ml-auto text-xs text-muted-foreground">
              You're registered for {myWorkshops.length} workshop
              {myWorkshops.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {isLoading ? (
          <div
            className="flex items-center justify-center py-24"
            data-ocid="workshops.loading_state"
          >
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : display.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {display.map((w, i) => (
              <WorkshopCard
                key={w.id.toString()}
                workshop={w}
                index={i}
                onRegister={setRegisterTarget}
              />
            ))}
          </div>
        ) : (
          <div
            className="mt-8 p-8 rounded-xl bg-muted/40 border border-border text-center"
            data-ocid="workshops.empty_state"
          >
            <Calendar className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              {tab === "upcoming"
                ? "More workshops are being planned. Check back soon!"
                : "No past workshops yet."}
            </p>
          </div>
        )}
      </div>

      {/* Registration Modal */}
      <AnimatePresence>
        {registerTarget && (
          <RegisterModal
            workshop={registerTarget}
            onClose={() => setRegisterTarget(null)}
            onSuccess={() => setRegisterTarget(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

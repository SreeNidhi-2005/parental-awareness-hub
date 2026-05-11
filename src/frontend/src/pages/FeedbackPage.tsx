import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useSubmitFeedback,
  useSubmitTestimonial,
  useTestimonials,
} from "@/hooks/useBackend";
import type { Testimonial } from "@/types";
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Loader2,
  MessageSquare,
  Quote,
  Send,
  Star,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const STATIC_TESTIMONIALS: Testimonial[] = [
  {
    id: BigInt(1),
    parentName: "Priya Mehta",
    content:
      "This platform completely changed how I communicate with my 14-year-old. I used to raise my voice out of frustration. Now I actually listen first. The emotional support modules helped me understand what he's going through.",
    submittedAt: BigInt(0),
  },
  {
    id: BigInt(2),
    parentName: "Rajesh Kumar",
    content:
      "I never realized how much my words were hurting my daughter. The 'Signs of Stress' module was eye-opening. She opened up to me for the first time in years after I started applying what I learned here.",
    submittedAt: BigInt(0),
  },
  {
    id: BigInt(3),
    parentName: "Sunita Sharma",
    content:
      "As a working mother, I always felt guilty about not spending enough quality time. The platform taught me that presence matters more than time. My relationship with both my kids has improved so much.",
    submittedAt: BigInt(0),
  },
  {
    id: BigInt(4),
    parentName: "Arjun Nair",
    content:
      "My teenager was withdrawn and I didn't know why. After reading the resources on teen depression, I approached him without judgment. He finally told me he was being bullied. We got him help immediately.",
    submittedAt: BigInt(0),
  },
  {
    id: BigInt(5),
    parentName: "Meena Pillai",
    content:
      "The workshop on generation gap communication was incredible. I learned that my daughter isn't being 'difficult' — she's just navigating a world I don't fully understand. That shift in perspective changed everything.",
    submittedAt: BigInt(0),
  },
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const AVATAR_COLORS = [
  "bg-primary/20 text-primary",
  "bg-secondary/20 text-secondary-foreground",
  "bg-accent/20 text-accent-foreground",
  "bg-chart-3/20 text-foreground",
  "bg-chart-5/20 text-foreground",
];

function TestimonialsCarousel({
  testimonials,
}: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = () => setCurrent((c) => (c + 1) % total);
  const prev = () => setCurrent((c) => (c - 1 + total) % total);

  // biome-ignore lint/correctness/useExhaustiveDependencies: timer setup uses stable refs
  useEffect(() => {
    const interval = setInterval(next, 5000);
    timerRef.current = interval;
    return () => clearInterval(interval);
  }, [total]);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 5000);
  };

  const t = testimonials[current];
  const colorClass = AVATAR_COLORS[current % AVATAR_COLORS.length];

  return (
    <div
      className="relative wellness-card p-8 min-h-[260px] flex flex-col justify-between"
      data-ocid="feedback.testimonials_carousel"
    >
      <Quote className="w-8 h-8 text-primary/30 mb-4 shrink-0" />
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="flex-1"
        >
          <p className="text-base text-foreground/85 italic leading-relaxed">
            "{t.content}"
          </p>
          <div className="flex items-center gap-3 mt-6">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${colorClass}`}
            >
              {getInitials(t.parentName)}
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground">
                {t.parentName}
              </p>
              <p className="text-xs text-muted-foreground">Parent</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex gap-1.5">
          {testimonials.map((t, i) => (
            <button
              key={t.id.toString()}
              type="button"
              onClick={() => {
                setCurrent(i);
                resetTimer();
              }}
              className={`w-2 h-2 rounded-full transition-smooth ${
                i === current
                  ? "bg-primary w-5"
                  : "bg-border hover:bg-primary/40"
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => {
              prev();
              resetTimer();
            }}
            className="p-1.5 rounded-lg hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-smooth"
            aria-label="Previous testimonial"
            data-ocid="feedback.testimonial_prev"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              next();
              resetTimer();
            }}
            className="p-1.5 rounded-lg hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-smooth"
            aria-label="Next testimonial"
            data-ocid="feedback.testimonial_next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function StarRating({
  value,
  onChange,
}: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={`star-${s}`}
          type="button"
          className="p-0.5 transition-smooth"
          onMouseEnter={() => setHovered(s)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(s)}
          aria-label={`${s} star`}
          data-ocid={`feedback.star_${s}`}
        >
          <Star
            className={`w-6 h-6 ${
              (hovered || value) >= s
                ? "text-primary fill-primary"
                : "text-muted-foreground"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export function FeedbackPage() {
  const submitFeedback = useSubmitFeedback();
  const submitTestimonial = useSubmitTestimonial();
  const { data: testimonials } = useTestimonials();

  const [form, setForm] = useState({
    name: "",
    email: "",
    rating: 0,
    message: "",
  });
  const [testimonialForm, setTestimonialForm] = useState({
    name: "",
    content: "",
  });
  const [feedbackDone, setFeedbackDone] = useState(false);
  const [testimonialDone, setTestimonialDone] = useState(false);

  const allTestimonials =
    testimonials && testimonials.length > 0
      ? testimonials
      : STATIC_TESTIMONIALS;

  const handleFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.rating || !form.message) {
      toast.error("Please fill in all fields and select a rating");
      return;
    }
    try {
      await submitFeedback.mutateAsync({
        parentName: form.name,
        email: form.email,
        rating: BigInt(form.rating),
        message: form.message,
      });
      setFeedbackDone(true);
      toast.success("Thank you for your feedback!");
    } catch {
      toast.error("Submission failed. Please try again.");
    }
  };

  const handleTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testimonialForm.name || !testimonialForm.content) {
      toast.error("Please fill in both fields");
      return;
    }
    try {
      await submitTestimonial.mutateAsync({
        parentName: testimonialForm.name,
        content: testimonialForm.content,
      });
      setTestimonialDone(true);
      toast.success("Your testimonial has been shared!");
    } catch {
      toast.error("Submission failed. Please try again.");
    }
  };

  return (
    <div className="py-12" data-ocid="feedback.page">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="section-divider" />
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Survey & Feedback
          </h1>
          <p className="text-muted-foreground max-w-2xl text-sm sm:text-base">
            Your experiences shape our platform. Share feedback, rate your
            journey, and inspire other parents with your story.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="font-display font-semibold text-foreground text-lg mb-4">
            What Parents Are Saying
          </h2>
          <TestimonialsCarousel testimonials={allTestimonials} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Feedback Form */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="wellness-card p-6" data-ocid="feedback.form_card">
              <h2 className="font-display font-semibold text-foreground text-lg mb-1">
                Share Your Feedback
              </h2>
              <p className="text-sm text-muted-foreground mb-5">
                How has this platform helped you as a parent?
              </p>
              {feedbackDone ? (
                <div
                  className="flex flex-col items-center py-8 text-center"
                  data-ocid="feedback.success_state"
                >
                  <CheckCircle className="w-10 h-10 text-secondary mb-3" />
                  <p className="font-semibold text-foreground">Thank you!</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your feedback helps us improve the platform for all parents.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleFeedback}
                  className="space-y-4"
                  data-ocid="feedback.feedback_form"
                >
                  <div className="space-y-1.5">
                    <Label htmlFor="f-name">Your Name</Label>
                    <Input
                      id="f-name"
                      placeholder="Enter your name"
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      data-ocid="feedback.name_input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="f-email">Email Address</Label>
                    <Input
                      id="f-email"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, email: e.target.value }))
                      }
                      data-ocid="feedback.email_input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Rating</Label>
                    <StarRating
                      value={form.rating}
                      onChange={(r) => setForm((f) => ({ ...f, rating: r }))}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="f-message">Your Message</Label>
                    <Textarea
                      id="f-message"
                      placeholder="What did you learn? How has this helped your family?"
                      rows={4}
                      value={form.message}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, message: e.target.value }))
                      }
                      data-ocid="feedback.message_textarea"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow transition-smooth"
                    disabled={submitFeedback.isPending}
                    data-ocid="feedback.submit_button"
                  >
                    {submitFeedback.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <Send className="w-4 h-4 mr-2" />
                    )}
                    Submit Feedback
                  </Button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Testimonial Submission */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div
              className="wellness-card p-6"
              data-ocid="feedback.testimonial_form_card"
            >
              <h2 className="font-display font-semibold text-foreground text-lg mb-1">
                Share Your Story
              </h2>
              <p className="text-sm text-muted-foreground mb-5">
                Inspire other parents with your transformation journey.
              </p>
              {testimonialDone ? (
                <div
                  className="flex flex-col items-center py-8 text-center"
                  data-ocid="feedback.testimonial_success_state"
                >
                  <CheckCircle className="w-10 h-10 text-secondary mb-3" />
                  <p className="font-semibold text-foreground">Story shared!</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Thank you for inspiring the community.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleTestimonial}
                  className="space-y-4"
                  data-ocid="feedback.testimonial_form"
                >
                  <div className="space-y-1.5">
                    <Label htmlFor="t-name">Your Name</Label>
                    <Input
                      id="t-name"
                      placeholder="Enter your name"
                      value={testimonialForm.name}
                      onChange={(e) =>
                        setTestimonialForm((f) => ({
                          ...f,
                          name: e.target.value,
                        }))
                      }
                      data-ocid="feedback.testimonial_name_input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="t-content">Your Story</Label>
                    <Textarea
                      id="t-content"
                      placeholder="Share how this platform changed your relationship with your child..."
                      rows={6}
                      value={testimonialForm.content}
                      onChange={(e) =>
                        setTestimonialForm((f) => ({
                          ...f,
                          content: e.target.value,
                        }))
                      }
                      data-ocid="feedback.testimonial_textarea"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow transition-smooth"
                    disabled={submitTestimonial.isPending}
                    data-ocid="feedback.testimonial_submit_button"
                  >
                    {submitTestimonial.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <MessageSquare className="w-4 h-4 mr-2" />
                    )}
                    Share Story
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

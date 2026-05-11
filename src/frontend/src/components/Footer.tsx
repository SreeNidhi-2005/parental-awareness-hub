import { Link } from "@tanstack/react-router";
import { ExternalLink, Heart, Mail, MapPin, Phone } from "lucide-react";

const QUICK_LINKS = [
  { label: "Home", href: "/home" },
  { label: "Learning Modules", href: "/modules" },
  { label: "Mental Health", href: "/mental-health" },
  { label: "Workshops", href: "/workshops" },
  { label: "Resources", href: "/resources" },
  { label: "Feedback", href: "/feedback" },
];

const SUPPORT_LINKS = [
  {
    label: "Emergency Helpline: 1800-599-0019",
    href: "tel:18005990019",
    icon: Phone,
  },
  {
    label: "support@parentalawareness.org",
    href: "mailto:support@parentalawareness.org",
    icon: Mail,
  },
  {
    label: "NIMHANS Online Support",
    href: "https://nimhans.ac.in",
    icon: ExternalLink,
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  const utmUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center">
                <Heart className="w-4 h-4 text-primary" />
              </div>
              <span className="font-display font-semibold text-foreground">
                Parental Awareness Hub
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Helping parents understand today's generation with emotional
              intelligence, compassion, and evidence-based guidance. Because
              understanding children begins with listening.
            </p>
            <p className="mt-4 text-xs text-muted-foreground/70">
              A platform for emotional wellness, healthy communication, and
              family connection.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Quick Links
            </h3>
            <ul className="space-y-1.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-smooth"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Support & Contact
            </h3>
            <ul className="space-y-2">
              {SUPPORT_LINKS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex items-start gap-2 text-sm text-muted-foreground hover:text-primary transition-smooth"
                  >
                    <item.icon className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 p-3 bg-primary/8 rounded-lg">
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">
                  Mental Health Crisis?
                </span>{" "}
                iCall:{" "}
                <a
                  href="tel:09152987821"
                  className="text-primary hover:underline"
                >
                  9152987821
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {year}. Built with love using{" "}
            <a
              href={utmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Heart className="w-3 h-3 text-primary" />
            <span>Made for parents, by people who care</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";
import { useAuth } from "@/hooks/useAuth";
import { Link, useRouter } from "@tanstack/react-router";
import {
  ChevronDown,
  Heart,
  LogOut,
  Menu,
  Moon,
  Sun,
  User,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/home" },
  { label: "Modules", href: "/modules" },
  { label: "Mental Health", href: "/mental-health" },
  { label: "Relationship", href: "/relationship" },
  { label: "Workshops", href: "/workshops" },
  { label: "Resources", href: "/resources" },
  { label: "Feedback", href: "/feedback" },
];

export function Navbar() {
  const { theme, toggleTheme } = useAppContext();
  const { isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const router = useRouter();

  const currentPath = router.state.location.pathname;

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/home"
            className="flex items-center gap-2 group"
            data-ocid="nav.home_link"
          >
            <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 transition-smooth">
              <Heart className="w-4 h-4 text-primary" />
            </div>
            <span className="font-display font-semibold text-foreground text-sm leading-tight hidden sm:block">
              Parental
              <br />
              <span className="text-primary">Awareness Hub</span>
            </span>
            <span className="font-display font-semibold text-foreground text-sm sm:hidden">
              PAHub
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                  currentPath === link.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
                data-ocid={`nav.${link.label.toLowerCase().replace(/ /g, "_")}_link`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-smooth"
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              data-ocid="nav.theme_toggle"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </button>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium transition-smooth"
                  onClick={() => setUserMenuOpen((o) => !o)}
                  data-ocid="nav.user_menu_button"
                >
                  <User className="w-3.5 h-3.5" />
                  <span className="hidden sm:block">Account</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-44 bg-card border border-border rounded-xl shadow-elevation py-1.5"
                      data-ocid="nav.user_dropdown"
                    >
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted/60 transition-smooth"
                        onClick={() => setUserMenuOpen(false)}
                        data-ocid="nav.profile_link"
                      >
                        <User className="w-4 h-4 text-muted-foreground" />
                        My Profile
                      </Link>
                      <button
                        type="button"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-smooth w-full text-left"
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                        }}
                        data-ocid="nav.logout_button"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow transition-smooth"
                onClick={() => router.navigate({ to: "/login" })}
                data-ocid="nav.login_button"
              >
                Sign In
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="md:hidden p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-smooth"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle mobile menu"
              data-ocid="nav.mobile_menu_button"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden pb-3"
              data-ocid="nav.mobile_menu"
            >
              <div className="flex flex-col gap-0.5 pt-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-smooth ${
                      currentPath === link.href
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                    }`}
                    onClick={() => setMobileOpen(false)}
                    data-ocid={`nav.mobile_${link.label.toLowerCase().replace(/ /g, "_")}_link`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

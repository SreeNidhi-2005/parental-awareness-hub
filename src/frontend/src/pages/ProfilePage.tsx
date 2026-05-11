import { ProgressStatus } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import {
  useMyBookmarks,
  useMyProfile,
  useMyProgress,
  useMyWorkshops,
  useUpsertProfile,
} from "@/hooks/useBackend";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  Bookmark,
  Calendar,
  CheckCircle,
  Clock,
  Edit3,
  ExternalLink,
  Loader2,
  Save,
  User,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const PROGRESS_STATUS_LABELS: Record<ProgressStatus, string> = {
  [ProgressStatus.completed]: "Completed",
  [ProgressStatus.inProgress]: "In Progress",
  [ProgressStatus.notStarted]: "Not Started",
};

const PROGRESS_STATUS_COLORS: Record<ProgressStatus, string> = {
  [ProgressStatus.completed]: "bg-secondary/20 text-secondary-foreground",
  [ProgressStatus.inProgress]: "bg-primary/15 text-primary",
  [ProgressStatus.notStarted]: "bg-muted text-muted-foreground",
};

function formatDate(ts: bigint): string {
  const ms = Number(ts / BigInt(1_000_000));
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function ProfilePage() {
  const { isAuthenticated } = useAuth();
  const { data: profile, isLoading: profileLoading } = useMyProfile();
  const { data: progress } = useMyProgress();
  const { data: bookmarks } = useMyBookmarks();
  const { data: myWorkshops } = useMyWorkshops();
  const upsert = useUpsertProfile();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", bio: "", ages: "" });

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name,
        bio: profile.bio,
        ages: profile.childrenAges.join(", "),
      });
    }
  }, [profile]);

  const handleSave = async () => {
    const ages = form.ages
      .split(",")
      .map((a) => BigInt(Number.parseInt(a.trim(), 10)))
      .filter((a) => !Number.isNaN(Number(a)));
    try {
      await upsert.mutateAsync({
        name: form.name,
        bio: form.bio,
        childrenAges: ages,
      });
      setEditing(false);
      toast.success("Profile updated!");
    } catch {
      toast.error("Failed to save profile.");
    }
  };

  const completedCount =
    progress?.filter((p) => p.status === ProgressStatus.completed).length ?? 0;
  const inProgressCount =
    progress?.filter((p) => p.status === ProgressStatus.inProgress).length ?? 0;

  if (!isAuthenticated) {
    return (
      <div
        className="py-20 flex flex-col items-center gap-4"
        data-ocid="profile.unauthenticated_state"
      >
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <User className="w-8 h-8 text-primary" />
        </div>
        <h2 className="font-display font-semibold text-foreground text-xl">
          Sign in to view your profile
        </h2>
        <p className="text-muted-foreground text-sm text-center max-w-xs">
          Track your learning progress, manage bookmarks, and stay connected
          with your workshops.
        </p>
        <Button
          asChild
          className="bg-primary text-primary-foreground"
          data-ocid="profile.sign_in_button"
        >
          <Link to="/login">Sign In</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="py-12" data-ocid="profile.page">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="section-divider" />
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            My Profile
          </h1>
          <p className="text-muted-foreground text-sm">
            Your personal dashboard — track progress, manage bookmarks, view
            workshops.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
            >
              <div
                className="wellness-card p-6"
                data-ocid="profile.profile_card"
              >
                {/* Avatar */}
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mb-3">
                    {profileLoading ? (
                      <Loader2 className="w-6 h-6 text-primary animate-spin" />
                    ) : (
                      <span className="text-xl font-bold text-primary">
                        {profile?.name
                          ? profile.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()
                              .slice(0, 2)
                          : "P"}
                      </span>
                    )}
                  </div>
                  {profileLoading ? (
                    <div className="h-4 bg-muted rounded w-28 animate-pulse" />
                  ) : (
                    <p className="font-semibold text-foreground">
                      {profile?.name || "Parent"}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Parental Awareness Member
                  </p>
                  {profile?.joinedAt && (
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Joined {formatDate(profile.joinedAt)}
                    </p>
                  )}
                </div>

                {editing ? (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label htmlFor="p-name" className="text-xs">
                        Name
                      </Label>
                      <Input
                        id="p-name"
                        value={form.name}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, name: e.target.value }))
                        }
                        className="h-8 text-sm"
                        data-ocid="profile.name_input"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="p-bio" className="text-xs">
                        About You
                      </Label>
                      <Textarea
                        id="p-bio"
                        value={form.bio}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, bio: e.target.value }))
                        }
                        rows={3}
                        className="text-sm"
                        data-ocid="profile.bio_textarea"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="p-ages" className="text-xs">
                        Children's Ages (comma-separated)
                      </Label>
                      <Input
                        id="p-ages"
                        value={form.ages}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, ages: e.target.value }))
                        }
                        placeholder="8, 13"
                        className="h-8 text-sm"
                        data-ocid="profile.ages_input"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => setEditing(false)}
                        data-ocid="profile.cancel_button"
                      >
                        <X className="w-3.5 h-3.5 mr-1" />
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                        onClick={handleSave}
                        disabled={upsert.isPending}
                        data-ocid="profile.save_button"
                      >
                        {upsert.isPending ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" />
                        ) : (
                          <Save className="w-3.5 h-3.5 mr-1" />
                        )}
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {profile?.bio && (
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {profile.bio}
                      </p>
                    )}
                    {profile?.childrenAges &&
                      profile.childrenAges.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {profile.childrenAges.map((age) => (
                            <Badge
                              key={age.toString()}
                              variant="secondary"
                              className="text-xs bg-primary/10 text-primary"
                            >
                              Child age {age.toString()}
                            </Badge>
                          ))}
                        </div>
                      )}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => setEditing(true)}
                      data-ocid="profile.edit_button"
                    >
                      <Edit3 className="w-3.5 h-3.5 mr-1" />
                      Edit Profile
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Stats + Content */}
          <div className="lg:col-span-2 space-y-5">
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="grid grid-cols-3 gap-4"
            >
              {[
                {
                  icon: CheckCircle,
                  label: "Completed",
                  value: completedCount,
                  color: "text-secondary-foreground",
                },
                {
                  icon: BookOpen,
                  label: "In Progress",
                  value: inProgressCount,
                  color: "text-primary",
                },
                {
                  icon: Bookmark,
                  label: "Bookmarks",
                  value: bookmarks?.length ?? 0,
                  color: "text-accent-foreground",
                },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="wellness-card p-4 text-center"
                  data-ocid={`profile.stat_card.${i + 1}`}
                >
                  <stat.icon className={`w-5 h-5 mx-auto mb-1 ${stat.color}`} />
                  <div className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground leading-tight mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Learning Progress */}
            {progress && progress.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 }}
                className="wellness-card p-5"
                data-ocid="profile.progress_section"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground text-sm">
                    Learning Progress
                  </h3>
                  <Link
                    to="/modules"
                    className="text-xs text-primary hover:underline"
                  >
                    View all modules
                  </Link>
                </div>
                <div className="space-y-2">
                  {progress.slice(0, 6).map((p, i) => (
                    <div
                      key={p.moduleId.toString()}
                      className="flex items-center justify-between py-1"
                      data-ocid={`profile.progress_item.${i + 1}`}
                    >
                      <span className="text-sm text-foreground">
                        Module {p.moduleId.toString()}
                      </span>
                      <Badge
                        variant="secondary"
                        className={`text-xs ${PROGRESS_STATUS_COLORS[p.status]}`}
                      >
                        {p.status === ProgressStatus.completed && (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        )}
                        {PROGRESS_STATUS_LABELS[p.status]}
                      </Badge>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* My Workshops */}
            {myWorkshops && myWorkshops.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.25 }}
                className="wellness-card p-5"
                data-ocid="profile.workshops_section"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground text-sm">
                    My Workshops
                  </h3>
                  <Link
                    to="/workshops"
                    className="text-xs text-primary hover:underline"
                  >
                    View all
                  </Link>
                </div>
                <div className="space-y-2">
                  {myWorkshops.slice(0, 4).map((w, i) => (
                    <div
                      key={w.id.toString()}
                      className="flex items-center gap-3 py-1"
                      data-ocid={`profile.workshop_item.${i + 1}`}
                    >
                      <Calendar className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm text-foreground truncate">
                        {w.title}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Saved Resources */}
            {bookmarks && bookmarks.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.3 }}
                className="wellness-card p-5"
                data-ocid="profile.bookmarks_section"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground text-sm">
                    Saved Resources
                  </h3>
                  <Link
                    to="/resources"
                    className="text-xs text-primary hover:underline"
                  >
                    View all
                  </Link>
                </div>
                <div className="space-y-2">
                  {bookmarks.slice(0, 4).map((r, i) => (
                    <a
                      key={r.id.toString()}
                      href={r.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 py-1 group"
                      data-ocid={`profile.bookmark_item.${i + 1}`}
                    >
                      <Bookmark className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm text-foreground group-hover:text-primary transition-smooth truncate">
                        {r.title}
                      </span>
                      <ExternalLink className="w-3 h-3 text-muted-foreground shrink-0 ml-auto" />
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

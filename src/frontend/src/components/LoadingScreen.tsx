import { motion } from "motion/react";

export function LoadingScreen({
  message = "Loading...",
}: { message?: string }) {
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center z-50"
      style={{ background: "#0f172a" }}
    >
      {/* Ambient glow orbs */}
      <div
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
          top: "20%",
          left: "30%",
        }}
      />
      <div
        className="absolute w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
          bottom: "20%",
          right: "25%",
        }}
      />

      <motion.div
        className="relative flex flex-col items-center gap-6"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Logo */}
        <motion.div
          className="relative"
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <img
            src="/assets/generated/inksync-logo-transparent.dim_200x200.png"
            alt="InkSync"
            className="w-20 h-20 drop-shadow-lg"
            style={{ filter: "drop-shadow(0 0 24px rgba(139,92,246,0.7))" }}
          />
        </motion.div>

        {/* Brand name */}
        <motion.h1
          className="text-4xl font-bold tracking-tight font-display"
          style={{
            background: "linear-gradient(135deg, #8b5cf6, #06b6d4, #ec4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          InkSync
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-sm font-mono tracking-widest uppercase"
          style={{ color: "rgba(248,250,252,0.45)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {message}
        </motion.p>

        {/* Progress bar */}
        <motion.div
          className="w-48 h-0.5 rounded-full overflow-hidden"
          style={{ background: "rgba(139,92,246,0.15)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #8b5cf6, #06b6d4, #ec4899)",
            }}
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: 0.5,
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

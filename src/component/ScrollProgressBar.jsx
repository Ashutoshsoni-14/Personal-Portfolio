import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";

export const ScrollProgressBar = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const rafRef = useRef(null);
  const scrollTimerRef = useRef(null);

  // --- KEY FIX: use a MotionValue, not React state ---
  // useSpring only reacts to changes if given a MotionValue as its source.
  const rawProgress = useMotionValue(0);

  const springProgress = useSpring(rawProgress, {
    stiffness: 130,
    damping: 24,
    mass: 0.5,
  });

  // Orb Y position — travels from top:0 to top:calc(100vh - half-orb)
  const orbY = useTransform(
    springProgress,
    [0, 1],
    ["0px", "calc(100vh - 14px)"]
  );

  // Glow intensity scales with progress
  const glowOpacity = useTransform(springProgress, [0, 0.3, 1], [0.25, 0.55, 1.0]);
  const barGlow = useTransform(springProgress, [0, 1], [4, 10]);

  const updateProgress = useCallback(() => {
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const prog = window.scrollY / totalHeight;
      // .set() pushes the new value into the spring chain
      rawProgress.set(prog);
      setPercentage(Math.round(prog * 100));
    }
    rafRef.current = null;
  }, [rawProgress]);

  useEffect(() => {
    const onScroll = () => {
      // Batch DOM reads via rAF for zero jank
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updateProgress);
      }
      setIsScrolling(true);
      clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => setIsScrolling(false), 200);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateProgress(); // seed initial position
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearTimeout(scrollTimerRef.current);
    };
  }, [updateProgress]);

  // Tooltip is visible while scrolling OR hovering the bar
  const tooltipVisible = isHovering || isScrolling;

  return (
    <div
      className="fixed left-0 top-0 bottom-0 z-50"
      style={{ width: "22px" }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* ── Track (faint background line) ── */}
      <div
        className="absolute top-0 bottom-0 rounded-full"
        style={{
          left: "7px",
          width: "3px",
          background: "rgba(139,92,246,0.10)",
        }}
      />

      {/* ── Filled gradient bar ── */}
      <motion.div
        className="absolute top-0 rounded-full origin-top"
        style={{
          left: "7px",
          width: "3px",
          height: "100%",
          scaleY: springProgress,
          transformOrigin: "top",
          background:
            "linear-gradient(to bottom, #c4b5fd 0%, #a78bfa 30%, #8b5cf6 60%, #6366f1 80%, #22d3ee 100%)",
        }}
      />

      {/* ── Blurred glow layer behind the bar ── */}
      <motion.div
        className="absolute top-0 rounded-full origin-top pointer-events-none"
        style={{
          left: "6px",
          width: "5px",
          height: "100%",
          scaleY: springProgress,
          transformOrigin: "top",
          background:
            "linear-gradient(to bottom, #c4b5fd 0%, #a78bfa 30%, #8b5cf6 60%, #6366f1 80%, #22d3ee 100%)",
          filter: "blur(5px)",
          opacity: glowOpacity,
        }}
      />

      {/* ══════════════════════════════════════════
          MOVING ORB — positioned by springProgress
          via orbY (0px → 100vh).
          Everything inside moves with the scroll.
         ══════════════════════════════════════════ */}
      <motion.div
        className="absolute left-0 pointer-events-none"
        style={{ top: orbY }}
      >
        {/* Outer slow-pulse ring (visible while scrolling) */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 20,
            height: 20,
            left: -2,
            top: -10,
            border: "1.5px solid rgba(167,139,250,0.5)",
          }}
          animate={
            isScrolling
              ? { scale: [1, 1.6, 1], opacity: [0.7, 0, 0.7] }
              : { scale: 1, opacity: 0 }
          }
          transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Core glowing orb */}
        <motion.div
          style={{
            position: "absolute",
            width: 13,
            height: 13,
            left: "1px",
            top: "-6.5px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 35% 30%, #e9d5ff, #a78bfa 45%, #7c3aed)",
            boxShadow: isHovering
              ? "0 0 0 3px rgba(167,139,250,0.25), 0 0 14px 5px rgba(139,92,246,0.9), 0 0 28px 10px rgba(139,92,246,0.4)"
              : isScrolling
              ? "0 0 0 2px rgba(167,139,250,0.2), 0 0 10px 4px rgba(139,92,246,0.8), 0 0 20px 7px rgba(139,92,246,0.3)"
              : "0 0 0 1.5px rgba(167,139,250,0.15), 0 0 7px 3px rgba(139,92,246,0.6), 0 0 14px 5px rgba(139,92,246,0.2)",
          }}
          animate={
            isScrolling
              ? { scale: [1, 1.18, 0.95, 1] }
              : { scale: isHovering ? 1.25 : 1 }
          }
          transition={
            isScrolling
              ? { duration: 0.35, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.22, ease: "easeOut" }
          }
        />

        {/* Trailing downward streak (active while scrolling) */}
        <motion.div
          style={{
            position: "absolute",
            width: 3,
            left: "5px",
            top: "7px",
            borderRadius: "9999px",
            background:
              "linear-gradient(to bottom, rgba(167,139,250,0.7), rgba(99,102,241,0.3), transparent)",
          }}
          animate={{ height: isScrolling ? [8, 22, 8] : 4 }}
          transition={{ duration: 0.45, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ── Percentage tooltip — travels with orb ──
            Visible while scrolling or hovering the bar */}
        <motion.div
          style={{
            position: "absolute",
            left: "20px",
            top: "-11px",
            padding: "2px 8px",
            borderRadius: "999px",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.06em",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            background:
              "linear-gradient(135deg, rgba(167,139,250,0.18), rgba(99,102,241,0.18))",
            border: "1px solid rgba(139,92,246,0.40)",
            color: "#a78bfa",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            boxShadow: "0 2px 12px rgba(139,92,246,0.2)",
          }}
          initial={{ opacity: 0, x: -6 }}
          animate={{
            opacity: tooltipVisible ? 1 : 0,
            x: tooltipVisible ? 0 : -6,
          }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          {percentage}%
        </motion.div>
      </motion.div>

      {/* ── Ambient wide glow column (intensifies near 100%) ── */}
      <motion.div
        className="absolute top-0 rounded-full origin-top pointer-events-none"
        style={{
          left: "4px",
          width: "9px",
          height: "100%",
          scaleY: springProgress,
          transformOrigin: "top",
          background:
            "linear-gradient(to bottom, rgba(167,139,250,0.12), rgba(99,102,241,0.12), rgba(34,211,238,0.08))",
          filter: "blur(8px)",
          opacity: glowOpacity,
        }}
      />
    </div>
  );
};

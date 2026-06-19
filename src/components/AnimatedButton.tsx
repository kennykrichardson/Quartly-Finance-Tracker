import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type CommonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

type AnchorProps = CommonProps &
  Omit<HTMLMotionProps<"a">, "children" | "ref"> & {
    href: string;
  };

type ButtonProps = CommonProps &
  Omit<HTMLMotionProps<"button">, "children" | "ref"> & {
    href?: never;
  };

type AnimatedButtonProps = AnchorProps | ButtonProps;

const baseClass =
  "focus-ring group relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded px-6 py-3 text-sm font-black uppercase tracking-[0.08em] transition-colors duration-300 sm:px-8";

const variantClass = {
  primary:
    "bg-[#F0C34A] text-[#0A1016] shadow-[0_0_28px_rgba(240,195,74,0.32)] hover:shadow-[0_0_42px_rgba(240,195,74,0.48)]",

  secondary:
    "border border-black bg-black/30 text-black backdrop-blur hover:bg-[#1679BF]/10",

  ghost:
    "border border-[#F0C34A]/70 bg-[#F0C34A]/10 text-white hover:bg-[#F0C34A]/20",
};

const buttonSpring = { type: "spring", stiffness: 310, damping: 24, mass: 0.75 } as const;

export default function AnimatedButton(props: AnimatedButtonProps) {
  const { children, variant = "primary", className = "", ...rest } = props;
  const classNames = `${baseClass} ${variantClass[variant]} ${className}`;
  const content = (
    <>
      <motion.span
        className="absolute inset-0 bg-white/25 opacity-0 blur-xl"
        initial={false}
        whileHover={{ opacity: variant === "primary" ? 0.35 : 0.16 }}
      />
      <motion.span
        className="absolute left-1/2 top-1/2 h-6 w-6 rounded-full bg-white/35"
        initial={{ x: "-50%", y: "-50%", scale: 0, opacity: 0 }}
        whileTap={{ scale: 12, opacity: [0.28, 0] }}
        transition={{ duration: 0.45 }}
      />
      <span className="relative z-10">{children}</span>
    </>
  );

  if ("href" in props && props.href) {
    return (
      <motion.a
        className={classNames}
        whileHover={{ scale: 1.035, y: -3 }}
        whileTap={{ scale: 0.965, y: 0 }}
        transition={buttonSpring}
        {...(rest as Omit<HTMLMotionProps<"a">, "children" | "ref">)}
        href={props.href}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classNames}
      whileHover={{ scale: 1.035, y: -3 }}
      whileTap={{ scale: 0.965, y: 0 }}
      transition={buttonSpring}
      {...(rest as Omit<HTMLMotionProps<"button">, "children" | "ref">)}
    >
      {content}
    </motion.button>
  );
}

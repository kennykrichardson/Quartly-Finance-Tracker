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
  "focus-ring group relative inline-flex min-h-11 items-center justify-center overflow-hidden rounded-2xl px-5 py-3 text-sm font-semibold tracking-wide transition-colors duration-300 sm:px-6";

const variantClass = {
  primary:
    "bg-slate-900 text-white shadow-[0_10px_26px_rgba(15,23,42,.16)] hover:bg-teal-700 hover:shadow-[0_14px_34px_rgba(20,184,166,.22)] dark:bg-teal-300 dark:text-slate-950 dark:hover:bg-teal-200",

  secondary:
    "border border-slate-200/80 bg-white/70 text-slate-800 backdrop-blur hover:border-teal-300 hover:bg-teal-50/80 dark:border-white/10 dark:bg-white/[.04] dark:text-slate-100 dark:hover:bg-teal-400/10",

  ghost:
    "bg-teal-500/10 text-teal-800 hover:bg-teal-500/15 dark:text-teal-200 dark:hover:bg-teal-400/20",
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

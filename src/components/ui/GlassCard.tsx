import type {
  ReactNode,
} from "react";

import clsx from "clsx";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({
  children,
  className,
}: GlassCardProps) {

  return (

    <div
      className={clsx(

        `
        glass
        rounded-[32px]

        transition-all
        duration-300

        hover:-translate-y-1

        hover:border-red-400/30\n        hover:shadow-[0_18px_48px_rgba(29,41,57,.10)]\n        dark:hover:shadow-[0_18px_48px_rgba(0,0,0,.24)]
        `,

        className
      )}
    >

      {children}

    </div>

  );
}
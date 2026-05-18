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

        hover:shadow-[0_0_45px_rgba(64,224,208,0.22)]
        `,

        className
      )}
    >

      {children}

    </div>

  );
}
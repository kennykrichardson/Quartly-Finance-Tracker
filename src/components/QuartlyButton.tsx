import type {
  ButtonHTMLAttributes,
} from "react";

interface QuartlyButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
  export default function QuartlyButton({
  children,
  className = "",
}: QuartlyButtonProps) {
  return (
    <button
      className={`
        group
        relative

        h-[50px]
        w-[200px]

        cursor-pointer
        overflow-hidden

        rounded-[30px]

        border-2
        border-[#252525]

        bg-transparent

        text-[#111111]

        transition-all
        duration-500
        ease-in-out

        hover:border-transparent
        hover:text-white
        hover:shadow-[1px_1px_200px_#252525]

        ${className}
      `}
    >
      <span
        className="
          absolute
          left-0
          top-0

          h-[10px]
          w-[10px]

          rounded-[30px]

          bg-[#333333]

          invisible

          -z-10

          transition-all
          duration-500
          ease-in-out

          group-hover:visible
          group-hover:scale-[100]
          group-hover:translate-x-[2px]
        "
      />

      <span
        className="
          relative
          z-10

          font-extrabold
          tracking-[4px]
        "
      >
        {children}
      </span>
    </button>
  );
}
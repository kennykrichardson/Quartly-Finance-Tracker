import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

export default function HoverCard({
  children,
}: Props) {
  return (
<motion.div
  className="h-full"
  whileHover={{
    y: -12,
    scale: 1.03,
  }}
  transition={{
    type: "spring",
    stiffness: 300,
    damping: 20,
  }}
>
  {children}
</motion.div>
  );
}
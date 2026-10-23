import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

export default function HoverCard({ children }: Props) {
  return (
    <motion.div
      className="glass-premium h-full rounded-[30px] p-2"
      whileHover={{ y: -2, scale: 1.008 }}
      transition={{ type: "tween", duration: 0.22, ease: "easeOut" }}
    >
      <div className="h-full rounded-[24px]">
        {children}
      </div>
    </motion.div>
  );
}

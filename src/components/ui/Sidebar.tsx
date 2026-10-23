import { LayoutDashboard, Receipt, PieChart, Target, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  activePage: string;
  setActivePage: (page: string) => void;
  isDarkMode: boolean;
}

const items = [
  { icon: LayoutDashboard, label: "Overview", page: "dashboard" },
  { icon: Receipt, label: "Transactions", page: "dashboard", anchor: "transactions" },
  { icon: PieChart, label: "Charts", page: "charts-page" },
  { icon: Target, label: "Budget Goals", page: "budgets" },
];

export default function Sidebar({ open, setOpen, activePage, setActivePage, isDarkMode }: Props) {
  return (
    <div className="xl:hidden">
      <button
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen(!open)}
        className={`fixed left-4 top-4 z-[80] grid h-12 w-12 place-items-center rounded-2xl border backdrop-blur-2xl shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:shadow-xl active:scale-95 ${isDarkMode ? "border-white/10 bg-slate-900/90 text-white" : "border-white/80 bg-white/90 text-slate-900"}`}
      >
        {open ? <X size={22} /> : <span className="flex flex-col gap-1"><i className="h-[2px] w-6 rounded bg-current"/><i className="h-[2px] w-6 rounded bg-current"/><i className="h-[2px] w-6 rounded bg-current"/></span>}
      </button>
      <AnimatePresence>
        {open && <>
          <motion.button aria-label="Close navigation" onClick={() => setOpen(false)} className="fixed inset-0 z-[70] bg-black/30" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .12 }} />
          <motion.aside className="glass fixed inset-y-0 left-0 z-[75] w-72 rounded-r-[28px] p-4 shadow-2xl" initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }} transition={{ duration: .16, ease: "easeOut" }}>
            <div className="px-3 pb-8 pt-16 text-2xl font-semibold tracking-tight">Quartly</div>
            <nav className="space-y-2">
              {items.map(item => <button key={item.label} onClick={() => {
                setActivePage(item.page);
                setOpen(false);
                if (item.anchor) window.setTimeout(() => document.getElementById(item.anchor!)?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
                else if (item.page === "dashboard") window.scrollTo({ top: 0, behavior: "smooth" });
              }} className={`flex h-12 w-full items-center gap-3 rounded-2xl px-4 text-left font-medium transition-all duration-200 hover:translate-x-1 ${activePage === item.page ? "bg-teal-500/15 text-teal-700 dark:text-teal-200" : "hover:bg-black/5 dark:hover:bg-white/5"}`}>
                <item.icon size={19}/>{item.label}
              </button>)}
            </nav>
          </motion.aside>
        </>}
      </AnimatePresence>
    </div>
  );
}

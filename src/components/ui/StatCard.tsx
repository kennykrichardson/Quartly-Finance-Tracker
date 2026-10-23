interface Props {
  title: string;
  value: string;
}

export default function StatCard({ title, value }: Props) {
  return (
    <div className="glass group relative overflow-hidden rounded-[28px] p-6 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.025] hover:border-red-400/30 hover:shadow-[0_18px_48px_rgba(25,45,58,.11)] dark:hover:shadow-[0_18px_48px_rgba(0,0,0,.28)]">
      <div className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-red-400/10 blur-2xl transition-transform duration-500 group-hover:scale-150" />
      <p className="relative text-sm font-medium tracking-wide text-slate-500 dark:text-slate-400">
        {title}
      </p>
      <h2 className="relative mt-3 text-3xl font-semibold tracking-[-.045em] sm:text-4xl">
        {value}
      </h2>
      <div className="mt-5 h-1 w-10 rounded-full bg-gradient-to-r from-red-400 to-red-300 transition-all duration-300 group-hover:w-16" />
    </div>
  );
}

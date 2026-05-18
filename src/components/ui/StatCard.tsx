import GlassCard from "./GlassCard";

interface Props {
  title: string;
  value: string;
}

export default function StatCard({
  title,
  value,
}: Props) {

  return (

    <GlassCard
      className="
        h-[140px]
        p-6
        flex flex-col
        justify-between
      "
    >

      <p className="
        text-sm text-gray-500
        font-medium
      ">
        {title}
      </p>

      <h2 className="
        text-4xl
        font-semibold
        tracking-tight
        leading-none
        overflow-hidden
      ">
        {value}
      </h2>

    </GlassCard>

  );
}
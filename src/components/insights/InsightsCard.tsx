interface InsightsCardProps {

  title: string;

  value: string;

  subtitle?: string;

  positive?: boolean;
}

export default function InsightsCard({

  title,

  value,

  subtitle,

  positive = true,

}: InsightsCardProps) {

  return (

    <div
      className="
        glass

        rounded-3xl

        p-6

        h-full

        transition-all
        duration-300

        hover:scale-[1.02]
      "
    >

      <p
        className="
          text-sm

          text-[#8ea0b5]

          mb-3
        "
      >

        {title}

      </p>

      <h3
        className="
          text-3xl

          font-bold

          mb-2
        "
      >

        {value}

      </h3>

      {subtitle && (

        <p
          className={`
            text-sm

            ${
              positive

                ? "text-emerald-500"

                : "text-red-500"
            }
          `}
        >

          {subtitle}

        </p>

      )}

    </div>

  );
}
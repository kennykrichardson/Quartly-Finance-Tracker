interface Props {

  title: string;

  value: string;
}

export default function StatCard({
  title,
  value,
}: Props) {

  return (

    <div
      className="
        glass

        rounded-[32px]

        p-6

        will-change-transform
      "

      style={{

        transition:
          "transform 280ms ease, background-color 220ms ease, box-shadow 220ms ease",
      }}

      onMouseEnter={(e) => {

        e.currentTarget.style.transform =
          "scale(1.03)";
      }}

      onMouseLeave={(e) => {

        e.currentTarget.style.transform =
          "scale(1)";
      }}
    >

      <p className="
        text-[#8ea0b5]
      ">

        {title}

      </p>

      <h2 className="
        text-4xl
        font-semibold

        mt-3
      ">

        {value}

      </h2>

    </div>
  );
}
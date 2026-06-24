import { useFinance }
from "../../context/FinanceContext";

export default function ExpenseHeatmap() {

  const { transactions } =
    useFinance();

  const dailyMap:
    Record<
      number,
      number
    > = {};

  transactions.forEach(
    (transaction) => {

      const day =
        new Date(
          transaction.date
        ).getDay();

      dailyMap[day] =
        (
          dailyMap[day] || 0
        ) + 1;
    }
  );

  const labels = [

    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  return (

    <div
      className="
        glass
        rounded-[32px]
        p-6
      "
    >

      <h2
        className="
          text-2xl
          font-semibold
          mb-6
        "
      >

        Spending Heatmap

      </h2>

      <div
        className="
          grid
          grid-cols-7
          gap-3
        "
      >

        {labels.map(
          (
            label,
            index
          ) => {

            const count =
              dailyMap[
                index
              ] || 0;

            return (

              <div
                key={label}
                className="
                  text-center
                "
              >

                <div
                  className="
                    text-sm
                    mb-2
                  "
                >

                  {label}

                </div>

                <div

                  className="
                    h-[400px]
                    rounded-xl

                    flex
                    items-center
                    justify-center

                    font-bold
                  "

                  style={{
                    background:
                      `rgba(34,211,238,${
                        Math.max(
                          count /
                            5,
                          0.15
                        )
                      })`,
                  }}
                >

                  {count}

                </div>

              </div>

            );
          }
        )}

      </div>

    </div>

  );
}
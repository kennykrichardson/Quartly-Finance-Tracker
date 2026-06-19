import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";

import {
  useFinance,
} from "../../context/FinanceContext";

const COLORS = [
  "#67D6E8", // Soft Turquoise
  "#5F86D9", // Muted Royal Blue
  "#4FA88B", // Soft Emerald
  "#8BC5FF", // Mist Blue
  "#6FC9C2", // Aqua Teal
  "#7898E8", // Pastel Indigo
  "#72C7A1", // Sage Green
  "#A8D8FF", // Ice Blue
];

export default function ExpenseChart() {

  const { transactions } =
    useFinance();

  const categoryMap:
    Record<string, number> = {};

  transactions.forEach((t) => {

    if (!categoryMap[t.category]) {

      categoryMap[t.category] = 0;

    }

    categoryMap[t.category] += t.amount;
  });

  const data =
    Object.entries(categoryMap).map(
      ([name, value]) => ({
        name,
        value,
      })
    );

  return (

    <div
      id="insights"
      className="
        glass rounded-[32px]
        p-6
      "
    >

      <div>

        <h2 className="
          text-2xl font-semibold
        ">
          Spending Insights
        </h2>

        <p className="
          text-gray-500 mt-1
        ">
          Category distribution
        </p>

      </div>

      <div className="
        h-[250px] mt-6
      ">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <PieChart>

            <Pie
              data={data}
              dataKey="value"

              innerRadius={60}
              outerRadius={95}

              paddingAngle={4}
            >

              {data.map((_, index) => (

                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index %
                      COLORS.length
                    ]
                  }
                />

              ))}

            </Pie>

<Tooltip
  contentStyle={{
    background: "#ffffff",
    border: "1px solid #2D2D2D",
    borderRadius: "16px",
    color: "#ffffff",
  }}
/>

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>

  );
}
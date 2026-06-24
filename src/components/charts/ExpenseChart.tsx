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
  "#38BDF8", // Sky Blue
  "#60A5FA", // Blue
  "#3B82F6", // Bright Blue
  "#2563EB", // Royal Blue
  "#1D4ED8", // Deep Blue
  "#93C5FD", // Soft Blue
  "#0EA5E9", // Cyan Blue
  "#7DD3FC", // Ice Blue
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
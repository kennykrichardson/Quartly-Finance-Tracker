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
  "#06b6d4",
  "#8b5cf6",
  "#ec4899",
  "#f59e0b",
  "#10b981",
  "#ef4444",
  "#3b82f6",
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
        h-[300px] mt-6
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

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>

  );
}
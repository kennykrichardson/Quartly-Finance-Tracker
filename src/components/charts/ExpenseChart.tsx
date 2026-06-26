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
  "#38BDF8",
  "#60A5FA",
  "#3B82F6",
  "#2563EB",
  "#1D4ED8",
  "#93C5FD",
  "#0EA5E9",
  "#7DD3FC",
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
        glass
        rounded-[32px]
        p-6
      "
    >

      <div>

        <h2
          className="
            text-2xl
            font-semibold
          "
        >
          Spending Insights
        </h2>

        <p
          className="
            text-gray-500
            mt-1
          "
        >
          Category distribution
        </p>

      </div>

      <div
        className="
          h-[250px]
          mt-6
        "
      >

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

              stroke="none"
              strokeWidth={0}

              isAnimationActive
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
                  stroke="none"
                  strokeWidth={0}
                />

              ))}

            </Pie>

            <Tooltip
              contentStyle={{
                background: "#ffffff",
                border: "1px solid #E5E7EB",
                borderRadius: "16px",
                color: "#111827",
                boxShadow:
                  "0 12px 40px rgba(0,0,0,0.12)",
              }}
              itemStyle={{
                color: "#111827",
              }}
              labelStyle={{
                color: "#111827",
                fontWeight: 600,
              }}
              cursor={{
                fill: "rgba(56,189,248,0.08)",
              }}
            />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>

  );
}
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from "recharts";

import { useFinance } from "../../context/FinanceContext";

export default function CategoryRadarChart() {

  const { transactions } =
    useFinance();

  const categoryMap:
    Record<
      string,
      number
    > = {};

  transactions.forEach(
    (transaction) => {

      categoryMap[
        transaction.category
      ] =
        (
          categoryMap[
            transaction.category
          ] || 0
        ) +
        transaction.amount;
    }
  );

  const chartData =
    Object.entries(
      categoryMap
    ).map(
      ([category, value]) => ({
        category,
        value,
      })
    );

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

        Category Balance

      </h2>

      <div
        className="
          h-[350px]
        "
      >

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <RadarChart
            data={chartData}
          >

            <PolarGrid />

            <PolarAngleAxis
              dataKey="category"
            />

            <PolarRadiusAxis />

            <Radar
              dataKey="value"
              fill="#3B82F6"
              fillOpacity={
                0.55
              }
              stroke="#3B82F6"
            />

            <Tooltip />

          </RadarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );
}
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { useFinance } from "../../context/FinanceContext";

export default function SpendingTrendChart() {

  const { transactions } =
    useFinance();

  const dailyTotals =
    transactions.reduce(
      (acc, transaction) => {

const date =
  new Date(
    transaction.date
  ).toLocaleDateString(
    "en-US",
    {
      month: "short",
      year: "numeric",
    }
  );

        acc[date] =
          (
            acc[date] || 0
          ) +
          transaction.amount;

        return acc;

      },
      {} as Record<
        string,
        number
      >
    );

  const chartData =
    Object.entries(
      dailyTotals
    ).map(
      ([date, amount]) => ({
        date:
          date.slice(5),
        amount,
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

        Spending Trend

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

          <LineChart
            data={chartData}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              opacity={0.15}
            />

            <XAxis
              dataKey="date"
            />

            <YAxis />

            <Tooltip
  contentStyle={{
    background: "#ffffff",
    border: "1px solid #2D2D2D",
    borderRadius: "16px",
    color: "#000000",
  }}
/>


            <Line
              type="monotone"
              dataKey="amount"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{
                r: 4,
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>

  );
}
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import {
  useFinance,
} from "../../context/FinanceContext";

export default function WeeklyActivity() {

  const { transactions } =
    useFinance();

  const grouped:
    Record<string, number> = {};

  transactions.forEach((transaction) => {

    if (!grouped[transaction.date]) {

      grouped[transaction.date] = 0;
    }

    grouped[transaction.date] +=
      transaction.amount;
  });

  const data =
    Object.entries(grouped).map(
      ([date, amount]) => ({
        date:
          new Date(date)
            .toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "numeric",
              }
            ),

        amount,
      })
    );

  return (

    <div className="
      glass rounded-[32px]
      p-6
    ">

      <div>

        <h2 className="
          text-2xl font-semibold
        ">
          Daily Expenses
        </h2>

        <p className="
          text-gray-500 mt-1
        ">
          Spending activity over time
        </p>

      </div>

      <div className="
        h-[250px]
        mt-6
      ">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
            />

            <XAxis
              dataKey="date"
              stroke="#9ca3af"
            />

            <YAxis
              stroke="#9ca3af"
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="amount"

              stroke="#8b5cf6"

              strokeWidth={3}

              dot={{
                r: 4,
                fill: "#8b5cf6",
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>

  );
}
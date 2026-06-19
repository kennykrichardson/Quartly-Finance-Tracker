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

<Tooltip
  contentStyle={{
    background: "#ffffff",
    border: "1px solid #2D2D2D",
    borderRadius: "16px",
    color: "#ffffff",
  }}
/>

<Line
  type="monotone"
  dataKey="amount"

  stroke="#7bc9d8"

  strokeWidth={4}

  dot={{
    r: 5,
    fill: "#7bc9d8",
    stroke: "#ffffff",
    strokeWidth: 2,
  }}

  activeDot={{
    r: 8,
    fill: "#9cccf0",
    stroke: "#ffffff",
    strokeWidth: 2,
  }}
/>

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>

  );
}
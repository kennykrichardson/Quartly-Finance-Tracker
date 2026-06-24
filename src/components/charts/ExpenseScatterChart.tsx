import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { useFinance } from "../../context/FinanceContext";

export default function ExpenseScatterChart() {

  const { transactions } =
    useFinance();

  const data =
    transactions.map(
      (transaction) => ({

        day:
          new Date(
            transaction.date
          ).getDate(),

        amount:
          transaction.amount,

        title:
          transaction.title,
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

        Expense Scatter

      </h2>

      <div
        className="
          h-[400px]
        "
      >

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <ScatterChart>

            <CartesianGrid
              opacity={0.15}
            />

            <XAxis
              dataKey="day"
              name="Day"
            />

            <YAxis
              dataKey="amount"
              name="Amount"
            />

            <Tooltip />

            <Scatter
              data={data}
              fill="#3B82F6"
            />

          </ScatterChart>

        </ResponsiveContainer>

      </div>

    </div>

  );
}
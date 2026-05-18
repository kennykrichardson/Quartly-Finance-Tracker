import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  YAxis,
  CartesianGrid,
} from "recharts";

import {
  useFinance,
} from "../../context/FinanceContext";

export default function MonthlyBarChart() {

  const { transactions } =
    useFinance();

  const grouped:
    Record<string, number> = {};

  transactions.forEach((transaction) => {

    if (!grouped[transaction.category]) {

      grouped[
        transaction.category
      ] = 0;
    }

    grouped[
      transaction.category
    ] += transaction.amount;
  });

  const data =
    Object.entries(grouped).map(
      ([category, amount]) => ({
        category,
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
          Category Comparison
        </h2>

        <p className="
          text-gray-500 mt-1
        ">
          Expense distribution by category
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

          <BarChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
            />

            <XAxis
              dataKey="category"
              stroke="#9ca3af"
            />

            <YAxis
              stroke="#9ca3af"
            />

            <Tooltip />

            <Bar
  dataKey="amount"

  fill="#402327"
  strokeWidth={1}
  radius={[
    12,
    12,
    0,
    0,
  ]}
/>

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );
}
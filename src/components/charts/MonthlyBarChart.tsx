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

const QUARTLY_COLORS = [
  "#67D6E8", // Soft Turquoise
  "#5F86D9", // Muted Royal Blue
  "#4FA88B", // Soft Emerald
  "#8BC5FF", // Mist Blue
  "#6FC9C2", // Aqua Teal
  "#7898E8", // Pastel Indigo
  "#72C7A1", // Sage Green
  "#A8D8FF", // Ice Blue
];


  const data =
    Object.entries(grouped).map(
      ([category, amount], index) => ({
        category,
        amount,
        fill:
          QUARTLY_COLORS[
            index %
            QUARTLY_COLORS.length
          ],
      })
    );

  return (

    <div className="
      glass
      rounded-[32px]
      p-6
    ">

      <div>

        <h2 className="
          text-2xl
          font-semibold
        ">
          Category Comparison
        </h2>

        <p className="
          text-gray-500
          mt-1
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

          <BarChart
            data={data}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              opacity={0.5}
            />

            <XAxis
              dataKey="category"
              stroke="#9ca3af"
            />

            <YAxis
              stroke="#9ca3af"
            />

            <Tooltip
              contentStyle={{
                background:
                  "#111111",
                border:
                  "1px solid #2D2D2D",
                borderRadius:
                  "16px",
                color:
                  "#ffffff",
              }}
            />

            <Bar
              dataKey="amount"
              radius={[
                12,
                12,
                0,
                0,
              ]}
              fill="#DC143C"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );
}
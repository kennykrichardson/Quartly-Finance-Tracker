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
  "#38BDF8", // Sky Blue
  "#60A5FA", // Blue
  "#3B82F6", // Bright Blue
  "#2563EB", // Royal Blue
  "#1D4ED8", // Deep Blue
  "#93C5FD", // Soft Blue
  "#0EA5E9", // Cyan Blue
  "#7DD3FC", // Ice Blue
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
              stroke="#0091ffed"
              strokeDasharray="4 4"
              opacity={0.08}
              vertical={false}
            />

<XAxis
  dataKey="category"
  stroke="#3eabffed"
  tickLine={false}
  axisLine={false}
/>

<YAxis
  stroke="#3eabffed"
  tickLine={false}
  axisLine={false}
/>

            <Tooltip
              contentStyle={{
                background:
                  "#ffffff",
                border:
                  "1px solid #2D2D2D",
                borderRadius:
                  "16px",
                color:
                  "#000000",
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
              fill="#6bd8f7"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );
}
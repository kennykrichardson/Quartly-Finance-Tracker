import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";

import { useFinance } from "../../context/FinanceContext";

export default function BudgetBurnRate() {

  const { transactions } =
    useFinance();

  const budget = Number(
    localStorage.getItem(
      "quartly-budget"
    ) || 50000
  );

  const spent =
    transactions.reduce(
      (sum, transaction) =>
        sum +
        transaction.amount,
      0
    );

  const percentage =
    Math.min(
      (spent / budget) *
        100,
      100
    );

  const data = [
    {
      name: "Budget",
      value:
        percentage,
      fill: "#3B82F6",
    },
  ];

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

        Budget Burn Rate

      </h2>

      <div
        className="
          h-[400px]
        "
      >
        <div className="h-[350px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <RadialBarChart
            data={data}
            innerRadius="70%"
            outerRadius="100%"
            startAngle={90}
            endAngle={-270}
          >

            <PolarAngleAxis
              type="number"
              domain={[
                0,
                100,
              ]}
              tick={false}
            />

            <RadialBar
              dataKey="value"
              cornerRadius={
                20
              }
            />

          </RadialBarChart>

        </ResponsiveContainer>
        </div>

      </div>

      <div
        className="
          text-center
          -mt-10
        "
      >

        <h3
          className="
            text-4xl
            font-bold
          "
        >

          {
            percentage.toFixed(
              1
            )
          }
          %

        </h3>

        <p
          className="
            text-[#8ea0b5]
          "
        >

          Budget Used

        </p>

      </div>

    </div>

  );
}
import {
  ResponsiveContainer,
  Treemap,
  Tooltip,
} from "recharts";

import { useFinance } from "../../context/FinanceContext";

export default function SpendingTreemap() {

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

  const data =
    Object.entries(
      categoryMap
    ).map(
      ([name, size]) => ({
        name,
        size,
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

        Spending Treemap

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

          <Treemap
            data={data}
            dataKey="size"
            aspectRatio={
              4 / 3
            }
            stroke="#0f172a"
            fill="#0066a5"
          >

            <Tooltip />

          </Treemap>

        </ResponsiveContainer>

      </div>

    </div>

  );
}
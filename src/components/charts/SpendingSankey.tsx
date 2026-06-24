import {
  ResponsiveContainer,
  Sankey,
  Tooltip,
} from "recharts";

import { useFinance }
from "../../context/FinanceContext";

export default function SpendingSankey() {

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

  const nodes = [
    {
      name:
        "Total Spending",
    },

    ...Object.keys(
      categoryMap
    ).map(
      (category) => ({
        name: category,
      })
    ),
  ];

  const links =
    Object.entries(
      categoryMap
    ).map(
      (
        [category,
        amount]
      ) => ({

        source: 0,

        target:
          nodes.findIndex(
            (
              node
            ) =>
              node.name ===
              category
          ),

        value:
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

        Spending Flow

      </h2>

      <div
        className="
          h-[450px]
        "
      >

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <Sankey
            data={{
              nodes,
              links,
            }}
              link={{
                stroke: "#18606e",
                strokeOpacity: 0.65,
            }}
          >

            <Tooltip />

          </Sankey>

        </ResponsiveContainer>

      </div>

    </div>

  );
}
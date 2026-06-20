import {
  LayoutDashboard,
  Receipt,
  PieChart,
  Target,
  Menu,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

interface Props {
  open: boolean;

  setOpen: (
    open: boolean
  ) => void;

  activePage: string;

  setActivePage: (
    page: string
  ) => void;
}

const dashboardItems = [

  {
    icon: LayoutDashboard,
    label: "Overview",
    id: "overview",
  },

  {
    icon: Receipt,
    label: "Transactions",
    id: "transactions",
  },

  {
    icon: PieChart,
    label: "Charts",
    id: "insights",
  },
];

export default function Sidebar({
  open,
  setOpen,
  activePage,
  setActivePage,
}: Props) {

  return (

    <>

      <button
        onClick={() =>
          setOpen(!open)
        }

        className="
          fixed
          top-6
          left-6

          z-50

          glass

          w-12
          h-12

          rounded-2xl

          flex
          items-center
          justify-center

          hover:scale-105

          transition-all
          duration-150
        "
      >

        <Menu size={20} />

      </button>

      <AnimatePresence>

        {open && (

          <>

            <motion.div

              initial={{
                opacity: 0,
              }}

              animate={{
                opacity: 1,
              }}

              exit={{
                opacity: 0,
              }}

              transition={{
                duration: 0.12,
              }}

              onClick={() =>
                setOpen(false)
              }

              className="
                fixed
                inset-0

                z-30

                bg-black/10
              "
            />

            <motion.aside

              initial={{
                x: -260,
              }}

              animate={{
                x: 0,
              }}

              exit={{
                x: -260,
              }}

              transition={{
                type: "tween",

                ease: "easeOut",

                duration: 0.14,
              }}

              className="
                fixed
                top-0
                left-0

                glass

                z-40

                w-72
                h-screen

                p-2
              "
            >

              <div
                className="
                  glass

                  w-full
                  h-full

                  rounded-[32px]

                  p-6
                "
              >

                <h1
                  className="
                    mt-16

                    text-3xl
                    font-semibold

                    tracking-tight
                  "
                >

                  Quartly

                </h1>

                <div
                  className="
                    mt-10
                  "
                >

                  <p
                    className="
                      text-xs

                      uppercase

                      tracking-[0.18em]

                      text-[#8ea0b5]

                      mb-4

                      px-4
                    "
                  >

                    Dashboard

                  </p>

                  <div
                    className="
                      space-y-2
                    "
                  >

                    {dashboardItems.map(
                      (item) => (

                        <button
                          key={item.label}

                          onClick={() => {

                            if (
                              activePage !==
                              "dashboard"
                            ) {

                              setActivePage(
                                "dashboard"
                              );

                              setTimeout(
                                () => {

                                  document
                                    .getElementById(
                                      item.id
                                    )
                                    ?.scrollIntoView({
                                      behavior:
                                        "smooth",
                                    });

                                },
                                150
                              );

                            } else {

                              document
                                .getElementById(
                                  item.id
                                )
                                ?.scrollIntoView({
                                  behavior:
                                    "smooth",
                                });
                            }

                            setOpen(
                              false
                            );
                          }}

                          className="
                            flex
                            items-center

                            gap-4

                            w-full
                            h-14

                            px-4

                            rounded-2xl

                            hover:bg-white/10

                            transition-all
                            duration-150
                          "
                        >

                          <item.icon
                            size={20}
                          />

                          <span
                            className="
                              font-medium
                            "
                          >

                            {item.label}

                          </span>

                        </button>

                      )
                    )}

                  </div>

                </div>

                <div
                  className="
                    mt-8

                    border-t
                    border-white/10

                    pt-6

                    space-y-2
                  "
                >

                  <button

                    onClick={() => {

                      setActivePage(
                        "insights-page"
                      );

                      setOpen(
                        false
                      );
                    }}

                    className={`
                      flex
                      items-center

                      gap-4

                      w-full
                      h-14

                      px-4

                      rounded-2xl

                      transition-all
                      duration-150

                      ${
                        activePage ===
                        "insights-page"

                          ? "bg-white/10"

                          : "hover:bg-white/10"
                      }
                    `}
                  >

                    <PieChart
                      size={20}
                    />

                    <span
                      className="
                        font-medium
                      "
                    >

                      Insights

                    </span>

                  </button>

                  <button

                    onClick={() => {

                      setActivePage(
                        "budgets"
                      );

                      setOpen(
                        false
                      );
                    }}

                    className={`
                      flex
                      items-center

                      gap-4

                      w-full
                      h-14

                      px-4

                      rounded-2xl

                      transition-all
                      duration-150

                      ${
                        activePage ===
                        "budgets"

                          ? "bg-white/10"

                          : "hover:bg-white/10"
                      }
                    `}
                  >

                    <Target
                      size={20}
                    />

                    <span
                      className="
                        font-medium
                      "
                    >

                      Budget Goals

                    </span>

                  </button>

                </div>

              </div>

            </motion.aside>

          </>

        )}

      </AnimatePresence>

    </>

  );
}
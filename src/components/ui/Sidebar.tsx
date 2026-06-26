import {
  LayoutDashboard,
  Receipt,
  PieChart,
  Target,
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

  isDarkMode: boolean;
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
    label: "Analytics",
    id: "insights",
  },
];

export default function Sidebar({
  open,
  setOpen,
  activePage,
  setActivePage,
  isDarkMode,
}: Props) {

  return (

    <>

<button
  onClick={() =>
    setOpen(!open)
  }

  className={`
    fixed

    top-4
    left-4

    z-[60]

    w-14
    h-14

    rounded-2xl

    backdrop-blur-xl

    flex
    items-center
    justify-center

    transition-all
    duration-300

    hover:scale-105

    ${
      isDarkMode

        ? `
          bg-[#171b22]/90

          border
          border-white/10

          shadow-[0_10px_35px_rgba(0,0,0,0.45)]
        `

        : `
          bg-white/90

          border
          border-slate-200

          shadow-[0_10px_35px_rgba(0,0,0,0.12)]
        `
    }
  `}
>

  <motion.div

    animate={{
      rotate: open ? 90 : 0,
    }}

    transition={{
      duration: 0.25,
    }}

    className="
      flex
      flex-col
      gap-[5px]
    "
  >

    <motion.div

      animate={{
        width: open ? 20 : 28,
      }}

      className={`
        h-[3px]

        rounded-full

        ${
          isDarkMode

            ? "bg-white"

            : "bg-[#20242b]"
        }
      `}
    />

    <motion.div

      className={`
        w-7
        h-[3px]

        rounded-full

        ${
          isDarkMode

            ? "bg-white"

            : "bg-[#20242b]"
        }
      `}
    />

    <motion.div

      animate={{
        width: open ? 28 : 20,
      }}

      className={`
        h-[3px]

        rounded-full

        ${
          isDarkMode

            ? "bg-white"

            : "bg-[#20242b]"
        }
      `}
    />

  </motion.div>

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
      "charts-page"
    );

    setOpen(false);
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
      "charts-page"

        ? "bg-white/10"

        : "hover:bg-white/10"
    }
  `}
>

  <PieChart size={20} />

  <span
    className="
      font-medium
    "
  >

    Charts

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
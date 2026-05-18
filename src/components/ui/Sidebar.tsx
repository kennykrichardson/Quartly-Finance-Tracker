import {
  LayoutDashboard,
  Receipt,
  PieChart,
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
}

const items = [

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
    label: "Insights",
    id: "insights",
  },
];

export default function Sidebar({
  open,
  setOpen,
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

              <div className="
  glass

  w-full
  h-full

  rounded-[32px]

  p-6
">

              <h1 className="
                mt-16

                text-3xl
                font-semibold

                tracking-tight
              ">

                Quartly

              </h1>

              <div className="
                mt-10
                space-y-2
              ">

                {items.map((item) => (

                  <button
                    key={item.label}

                    onClick={() => {

                      document
                        .getElementById(
                          item.id
                        )
                        ?.scrollIntoView({
                          behavior: "smooth",
                        });

                      setOpen(false);
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

                    <span className="
                      font-medium
                    ">

                      {item.label}

                    </span>

                  </button>

                ))}

              </div>
            </div>
            </motion.aside>

          </>

        )}

      </AnimatePresence>

    </>

  );
}
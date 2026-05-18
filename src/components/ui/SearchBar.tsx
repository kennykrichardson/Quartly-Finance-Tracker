import {
  Search,
  SlidersHorizontal,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  useState,
} from "react";

const filters = [
  "All",
  "Food",
  "Clothing",
  "Transport",
  "Entertainment",
  "Bills",
  "Shopping",
  "Health",
  "Other",
];

interface Props {

  selected: string;

  setSelected: (
    value: string
  ) => void;

  search: string;

  setSearch: (
    value: string
  ) => void;
}

export default function SearchBar({
  selected,
  setSelected,
  search,
  setSearch,
}: Props) {

  const [open, setOpen] =
    useState(false);

  return (

    <div className="
      glass rounded-[32px]
      p-4
    ">

      <div className="
        flex items-center
        gap-4
      ">

        <Search
          size={18}
          className="
            text-[#8ea0b5]
          "
        />

        <input
          value={search}

          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }

          placeholder="Search transactions..."

          className="
            flex-1

            bg-transparent

            border-none

            outline-none

            text-inherit
          "
        />

        <button
          onClick={() =>
            setOpen(!open)
          }

          className="
            w-10 h-10

            rounded-2xl

            hover:bg-white/10

            flex items-center
            justify-center

            transition
          "
        >

          <SlidersHorizontal
            size={18}
          />

        </button>

      </div>

      <AnimatePresence>

        {open && (

          <motion.div

            initial={{
              opacity: 0,
              height: 0,
            }}

            animate={{
              opacity: 1,
              height: "auto",
            }}

            exit={{
              opacity: 0,
              height: 0,
            }}

            transition={{
              duration: 0.25,
            }}

            className="
              overflow-hidden
            "
          >

            <div className="
              flex flex-wrap
              gap-2

              mt-4
            ">

              {filters.map((filter) => (

                <button
                  key={filter}

                  onClick={() =>
                    setSelected(filter)
                  }

                  className={`
                    px-4 py-2

                    rounded-full

                    text-sm

                    transition-all

                    ${
                      selected === filter

                        ? `
                          bg-[#16181d]
                          text-white
                        `

                        : `
                          bg-white/10
                        `
                    }
                  `}
                >

                  {filter}

                </button>

              ))}

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
}
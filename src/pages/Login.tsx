import { ArrowUpRight, LogIn, ShieldCheck, Sparkles } from "lucide-react";
import { loginWithGoogle } from "../firebase/auth";
import backgroundImage from "../assets/quartly-bg.png";

export default function Login() {

  return (

    <div
      className="
        relative

        min-h-screen

        overflow-hidden

        flex
        items-center
        justify-center
      "
    >

      {/* Background */}

      <img
        src={backgroundImage}
        alt="Quartly Background"
        className="
          absolute
          inset-0

          w-full
          h-full

          object-cover

          scale-110

          blur-[1px]
        "
      />

      {/* Dark Overlay */}

      <div
        className="
          absolute
          inset-0

          bg-white/55
          dark:bg-black/55

          backdrop-blur-[3px]
        "
      />

      {/* Floating Orb */}

      <div
        className="
          absolute

          w-[500px]
          h-[500px]

          rounded-full

          bg-cyan-400/20

          blur-[150px]

          animate-pulse
        "
      />

      {/* Main Card */}

      <div
        className="
          relative

          w-full
          max-w-2xl

          glass

          rounded-[40px]

          p-12

          text-center

          border

          border-white/20

          shadow-[0_28px_100px_rgba(28,43,60,0.18)]

          animate-[float_8s_ease-in-out_infinite] overflow-hidden
        "
      >

        <div className="mx-auto mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-teal-400/25 bg-teal-400/10 text-teal-600 shadow-[0_8px_30px_rgba(64,224,208,.16)] dark:text-teal-300">
          <Sparkles size={25} strokeWidth={1.8} />
        </div>

        <p className="mb-2 text-xs font-semibold uppercase tracking-[.28em] text-teal-700 dark:text-teal-300">
          Your money, in focus
        </p>
        <h1 className="mb-4 text-5xl font-semibold tracking-[-.065em] sm:text-6xl">
          Quartly<span className="text-teal-500">.</span>
        </h1>

        <p
          className="
            text-xl

            text-[#6f8198]

            mb-10
          "
        >

          A clearer view of your money starts here.
        </p>

        <button

          onClick={loginWithGoogle}

          className="
            mx-auto

            w-full
            max-w-md

            h-16

            rounded-2xl

            bg-[#101522]

            text-white

            font-semibold

            flex
            items-center
            justify-center
            gap-3

            transition-all
            duration-300

            hover:-translate-y-0.5

            hover:shadow-[0_16px_40px_rgba(15,23,42,0.22)]
          "
        >

          <LogIn size={20} />
          Continue with Google
          <ArrowUpRight size={17} className="ml-1 opacity-60" />

        </button>

        <div className="mt-9 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <ShieldCheck size={14} className="text-teal-600 dark:text-teal-300" />
          Private workspace · Secure Google sign-in
        </div>

        <div
          className="
            mt-8
            border-t
            border-slate-200/70 dark:border-white/10
            pt-7
          "
        >

          <p
            className="
              text-sm

              uppercase

              tracking-[0.25em]

              text-[#8ea0b5]
            "
          >
            Creator
          </p>

          <h3
            className="
              mt-3

              text-2xl

              font-bold
            "
          >
            Kenny Richardson
          </h3>

          <p
            className="
              mt-2

              text-[#8ea0b5]
            "
          >
            Engineer • Builder • Creator of Quartly
          </p>

        </div>

      </div>

    </div>

  );
}
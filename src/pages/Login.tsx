import { LogIn } from "lucide-react";
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

          shadow-[0_0_100px_rgba(64,224,208,0.18)]

          animate-[float_8s_ease-in-out_infinite]
        "
      >

        <h1
          className="
            text-6xl

            font-bold

            tracking-tight

            mb-4
          "
        >

          Quartly

        </h1>

        <p
          className="
            text-xl

            text-[#6f8198]

            mb-10
          "
        >

          Know where your money goes.
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

            hover:scale-[1.03]

            hover:shadow-[0_0_40px_rgba(64,224,208,0.35)]
          "
        >

          <LogIn size={22} />

          Continue with Google

        </button>

        <div
          className="
            mt-10

            border-t

            border-white/20

            pt-8
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
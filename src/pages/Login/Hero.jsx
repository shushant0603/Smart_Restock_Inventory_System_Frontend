import React from "react";
import {
  Network,
  Sparkles,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

function Hero() {
  return (
    <section className="relative h-screen overflow-hidden text-white">
      {/* =========================================
          LOGO / BRAND
      ========================================= */}

      <div
        className="
          absolute
          left-8
          top-8
          z-20
          flex
          items-center
          gap-3
          sm:left-10
          sm:top-10
        "
      >
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-white/15
            backdrop-blur-md
            sm:h-14
            sm:w-14
          "
        >
          <Network
            size={25}
            strokeWidth={2}
          />
        </div>

        <h2
          className="
            text-2xl
            font-bold
            tracking-tight
            sm:text-3xl
          "
        >
          SmartStock
        </h2>
      </div>

      {/* =========================================
          HERO CONTENT
      ========================================= */}

      <div
        className="
          relative
          z-10
          flex
          h-full
          flex-col
          justify-center
          px-8
          pb-12
          pt-24
          sm:px-10
        "
      >
        <div className="max-w-[650px]">

          {/* =====================================
              BADGE
          ===================================== */}

          <div
            className="
              mb-6
              flex
              w-fit
              items-center
              gap-2
              rounded-full
              border
              border-white/15
              bg-white/10
              px-4
              py-2
              backdrop-blur-md
            "
          >
            <Sparkles
              size={16}
              strokeWidth={2}
            />

            <span
              className="
                text-sm
                font-medium
                sm:text-[15px]
              "
            >
              Inventory intelligence, simplified
            </span>
          </div>

          {/* =====================================
              HEADING
          ===================================== */}

          <h1
            className="
              max-w-[580px]
              text-[52px]
              font-bold
              leading-[0.98]
              tracking-[-0.045em]
              sm:text-[58px]
              lg:text-[60px]
            "
          >
            Know your stock.
            <br />
            Grow with
            <br />
            confidence.
          </h1>

          {/* =====================================
              DESCRIPTION
          ===================================== */}

          <p
            className="
              mt-6
              max-w-[590px]
              text-[15px]
              font-medium
              leading-7
              text-white/65
              sm:text-base
              sm:leading-7
            "
          >
            SmartStock helps businesses monitor inventory
            in real time, detect low-stock risks, forecast
            demand, and make smarter reorder decisions —
            all from one intelligent workspace.
          </p>

          {/* =====================================
              FEATURE CARDS
          ===================================== */}

          <div
            className="
              mt-7
              flex
              gap-3
            "
          >
            {/* CARD 1 */}

            <div
              className="
                w-[205px]
                rounded-2xl
                border
                border-white/10
                bg-white/10
                px-4
                py-4
                backdrop-blur-md
              "
            >
              <TrendingUp
                size={20}
                strokeWidth={2}
                className="mb-3"
              />

              <div className="text-lg font-semibold">
                Real-time
              </div>

              <div
                className="
                  mt-1
                  text-xs
                  text-white/50
                "
              >
                inventory monitoring
              </div>
            </div>

            {/* CARD 2 */}

            <div
              className="
                w-[205px]
                rounded-2xl
                border
                border-white/10
                bg-white/10
                px-4
                py-4
                backdrop-blur-md
              "
            >
              <ShieldCheck
                size={20}
                strokeWidth={2}
                className="mb-3"
              />

              <div className="text-lg font-semibold">
                Smart alerts
              </div>

              <div
                className="
                  mt-1
                  text-xs
                  text-white/50
                "
              >
                before stock runs out
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          FOOTER
      ========================================= */}

      <div
        className="
          absolute
          bottom-6
          left-8
          right-8
          z-20
          flex
          items-center
          justify-between
          text-xs
          text-white/40
          sm:left-10
          sm:right-10
          sm:text-sm
        "
      >
        <span>
          © 2026 SmartStock Inc.
        </span>

        <div className="flex gap-4">
          <span className="cursor-pointer transition hover:text-white">
            Privacy
          </span>

          <span className="cursor-pointer transition hover:text-white">
            Help center
          </span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
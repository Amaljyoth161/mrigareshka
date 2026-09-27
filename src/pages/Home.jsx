import {
  Activity,
  ArrowRight,
  Bell,
  HeartPulse,
  MapPin,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-[#f6f8f5] text-gray-900">

      {/* NAVBAR */}

      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          {/* LOGO */}

          <Link
            to="/"
            className="flex items-center gap-3"
          >

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-700 text-white shadow-sm">
              <HeartPulse size={22} />
            </div>

            <div>

              <h1 className="text-xl font-bold tracking-tight text-green-800">
                MRIGARESHKA
              </h1>

              <p className="text-xs text-gray-500">
                Livestock Health Intelligence
              </p>

            </div>

          </Link>


          {/* NAVIGATION */}

          <div className="hidden items-center gap-8 md:flex">

            <a
              href="#home"
              className="text-sm font-medium text-green-700"
            >
              Home
            </a>

            <a
              href="#how-it-works"
              className="text-sm text-gray-600 transition hover:text-green-700"
            >
              How It Works
            </a>

            <a
              href="#features"
              className="text-sm text-gray-600 transition hover:text-green-700"
            >
              Features
            </a>

            <Link
              to="/roles"
              className="rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
            >
              Sign In
            </Link>

          </div>

        </div>

      </nav>


      {/* HERO */}

      <section id="home">

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">

          {/* HERO CONTENT */}

          <div>

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-100 px-4 py-2 text-sm font-medium text-green-800">

              <Activity size={16} />

              AI-assisted livestock health intelligence

            </div>


            <h2 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-6xl">

              Detect livestock health risks

              <span className="text-green-700">
                {" "}earlier.
              </span>

            </h2>


            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">

              MRIGARESHKA connects farmer health reports,
              animal records, symptom patterns and
              village-level signals to support faster
              veterinary response.

            </p>


            {/* CTA BUTTONS */}

            <div className="mt-8 flex flex-wrap gap-4">

              <Link
                to="/roles"
                className="flex items-center gap-2 rounded-lg bg-green-700 px-6 py-3.5 font-semibold text-white shadow-sm transition hover:bg-green-800"
              >

                Report Animal Issue

                <ArrowRight size={18} />

              </Link>


              <Link
                to="/roles"
                className="rounded-lg border border-gray-300 bg-white px-6 py-3.5 font-semibold text-gray-700 transition hover:border-green-600 hover:text-green-700"
              >
                Explore Platform
              </Link>

            </div>


            <p className="mt-4 text-xs text-gray-500">
              AI-assisted risk assessment supports decision-making
              and does not replace veterinary diagnosis.
            </p>

          </div>


          {/* HERO INFORMATION CARD */}

          <div className="relative">

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg">

              {/* CARD HEADER */}

              <div className="mb-6 flex items-center justify-between">

                <div>

                  <p className="text-sm text-gray-500">
                    Village Health Overview
                  </p>

                  <h3 className="mt-1 text-xl font-bold text-gray-900">
                    Livestock Health Signals
                  </h3>

                </div>


                <div className="rounded-xl bg-green-100 p-3 text-green-700">
                  <Activity size={24} />
                </div>

              </div>


              {/* SIGNAL 1 */}

              <div className="space-y-4">

                <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-4">

                  <div className="flex items-center gap-3">

                    <MapPin
                      className="text-green-700"
                      size={20}
                    />

                    <div>

                      <p className="font-semibold">
                        Village A
                      </p>

                      <p className="text-sm text-gray-500">
                        8 health reports
                      </p>

                    </div>

                  </div>


                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                    Elevated
                  </span>

                </div>


                {/* SIGNAL 2 */}

                <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-4">

                  <div className="flex items-center gap-3">

                    <Stethoscope
                      className="text-green-700"
                      size={20}
                    />

                    <div>

                      <p className="font-semibold">
                        Veterinary Response
                      </p>

                      <p className="text-sm text-gray-500">
                        5 cases awaiting review
                      </p>

                    </div>

                  </div>


                  <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                    Priority
                  </span>

                </div>


                {/* SIGNAL 3 */}

                <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-4">

                  <div className="flex items-center gap-3">

                    <Bell
                      className="text-green-700"
                      size={20}
                    />

                    <div>

                      <p className="font-semibold">
                        Vaccination
                      </p>

                      <p className="text-sm text-gray-500">
                        12 vaccinations due
                      </p>

                    </div>

                  </div>


                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    Upcoming
                  </span>

                </div>

              </div>

            </div>


            {/* SMALL FLOATING INFO */}

            <div className="absolute -bottom-5 -left-5 hidden rounded-xl border border-gray-200 bg-white px-5 py-3 shadow-md sm:block">

              <p className="text-xs text-gray-500">
                Response model
              </p>

              <p className="mt-1 text-sm font-bold text-green-700">
                Report → Detect → Prioritize → Respond
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* HOW IT WORKS */}

      <section
        id="how-it-works"
        className="border-y border-gray-200 bg-white"
      >

        <div className="mx-auto max-w-7xl px-6 py-16">

          <div className="text-center">

            <p className="text-sm font-semibold uppercase tracking-wider text-green-700">
              How it works
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              From a farmer's report to coordinated response
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              MRIGARESHKA connects health information across
              the livestock health response process.
            </p>

          </div>


          {/* WORKFLOW */}

          <div className="mt-12 grid gap-6 md:grid-cols-5">

            {[
              [
                "01",
                "Report",
                "Farmer reports an animal health issue.",
              ],
              [
                "02",
                "Understand",
                "Symptoms and animal history are structured.",
              ],
              [
                "03",
                "Detect",
                "Potential local health patterns are identified.",
              ],
              [
                "04",
                "Prioritize",
                "Veterinary resources are prioritized.",
              ],
              [
                "05",
                "Respond",
                "Veterinary and field teams coordinate action.",
              ],
            ].map(
              ([number, title, description]) => (

                <div
                  key={number}
                  className="rounded-2xl border border-gray-200 bg-gray-50 p-5 transition hover:-translate-y-1 hover:border-green-200 hover:shadow-sm"
                >

                  <span className="text-sm font-bold text-green-700">
                    {number}
                  </span>

                  <h3 className="mt-3 font-bold text-gray-900">
                    {title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {description}
                  </p>

                </div>

              )
            )}

          </div>

        </div>

      </section>


      {/* FEATURES */}

      <section id="features">

        <div className="mx-auto max-w-7xl px-6 py-16">

          <div className="max-w-2xl">

            <p className="text-sm font-semibold uppercase tracking-wider text-green-700">
              Platform
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              Built around livestock health intelligence
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              A connected platform for farmers, veterinarians,
              field workers and administrators.
            </p>

          </div>


          <div className="mt-10 grid gap-6 md:grid-cols-3">

            <FeatureCard
              icon={<HeartPulse size={22} />}
              title="Animal Health Records"
              description="Maintain a structured health history for individual animals."
            />


            <FeatureCard
              icon={<Activity size={22} />}
              title="Health Risk Signals"
              description="Use symptom patterns to identify potential health risks for review."
            />


            <FeatureCard
              icon={<MapPin size={22} />}
              title="Village Intelligence"
              description="Connect nearby reports to identify potential local health signals."
            />


            <FeatureCard
              icon={<Stethoscope size={22} />}
              title="Veterinary Prioritization"
              description="Help veterinary teams organize cases requiring attention."
            />


            <FeatureCard
              icon={<Bell size={22} />}
              title="Prevention & Alerts"
              description="Support vaccination reminders and health-related alerts."
            />


            <FeatureCard
              icon={<ShieldCheck size={22} />}
              title="Farmer Support"
              description="Connect farmers with knowledge, schemes and support resources."
            />

          </div>

        </div>

      </section>


      {/* FINAL CTA */}

      <section className="border-t border-gray-200 bg-green-800">

        <div className="mx-auto max-w-7xl px-6 py-16 text-center">

          <p className="text-sm font-semibold uppercase tracking-wider text-green-200">
            MRIGARESHKA
          </p>

          <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-bold text-white md:text-4xl">
            From one animal's symptoms to coordinated veterinary response.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-green-100">
            Connect farmers, animal health records, village-level
            intelligence and veterinary action in one platform.
          </p>


          <Link
            to="/roles"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3.5 font-semibold text-green-800 transition hover:bg-gray-100"
          >

            Enter Platform

            <ArrowRight size={18} />

          </Link>

        </div>

      </section>


      {/* FOOTER */}

      <footer className="border-t border-gray-200 bg-white">

        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-8 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">

          <p>
            © 2026 MRIGARESHKA
          </p>

          <p>
            AI-assisted livestock health intelligence
          </p>

        </div>

      </footer>

    </div>
  );
}


/* FEATURE CARD */

function FeatureCard({
  icon,
  title,
  description,
}) {

  return (

    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-green-200 hover:shadow-md">

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-bold text-gray-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-600">
        {description}
      </p>

    </div>

  );
}


export default Home;
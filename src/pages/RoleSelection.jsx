import {
  ArrowRight,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  Tractor,
} from "lucide-react";
import { Link } from "react-router-dom";

const roles = [
  {
    title: "Farmer",
    description:
      "Manage livestock, report health issues, and track individual animal health records.",
    responsibility:
      "Animal health & reporting",
    icon: Tractor,
    path: "/farmer",
  },
  {
    title: "Veterinarian",
    description:
      "Review health cases, assess priority, monitor village signals, and coordinate veterinary response.",
    responsibility:
      "Diagnosis support & response",
    icon: Stethoscope,
    path: "/veterinarian",
  },
  {
    title: "Field Worker",
    description:
      "Manage assigned cases, field visits, follow-ups, and livestock health activities.",
    responsibility:
      "Field response & follow-up",
    icon: HeartPulse,
    path: "/field-worker",
  },
  {
    title: "Admin / Government",
    description:
      "Monitor livestock health reports, village-level signals, and veterinary resource activity.",
    responsibility:
      "Monitoring & coordination",
    icon: ShieldCheck,
    path: "/admin",
  },
];


function RoleSelection() {

  return (

    <div className="min-h-screen bg-[#f6f8f5]">

      {/* HEADER */}

      <header className="border-b border-gray-200 bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

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


          <Link
            to="/"
            className="hidden text-sm font-medium text-gray-500 transition hover:text-green-700 sm:block"
          >
            ← Back to Home
          </Link>

        </div>

      </header>


      {/* MAIN */}

      <main className="mx-auto max-w-6xl px-6 py-16">

        {/* TITLE */}

        <div className="text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-700">

            <HeartPulse size={28} />

          </div>


          <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-green-700">
            Get Started
          </p>


          <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Welcome to MRIGARESHKA
          </h2>


          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600 md:text-lg">
            Select your role to access the livestock health tools,
            information, and workflows relevant to you.
          </p>

        </div>


        {/* ROLE CARDS */}

        <div className="mt-12 grid gap-6 md:grid-cols-2">

          {roles.map((role) => {

            const Icon = role.icon;

            return (

              <Link
                key={role.title}
                to={role.path}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg"
              >

                {/* TOP */}

                <div className="flex items-start justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 transition group-hover:bg-green-700 group-hover:text-white">

                    <Icon size={24} />

                  </div>


                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition group-hover:bg-green-50 group-hover:text-green-700">

                    <ArrowRight
                      size={19}
                      className="transition group-hover:translate-x-0.5"
                    />

                  </div>

                </div>


                {/* ROLE */}

                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  {role.title}
                </h3>


                <p className="mt-2 leading-7 text-gray-600">
                  {role.description}
                </p>


                {/* RESPONSIBILITY */}

                <div className="mt-5 inline-flex rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600">

                  {role.responsibility}

                </div>


                {/* ACTION */}

                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">

                  <span className="text-sm font-semibold text-green-700">
                    Enter Dashboard
                  </span>

                  <span className="text-sm text-gray-400 transition group-hover:translate-x-1 group-hover:text-green-700">
                    →
                  </span>

                </div>

              </Link>

            );

          })}

        </div>


        {/* PLATFORM FLOW */}

        <div className="mt-12 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">

          <div className="text-center">

            <p className="text-sm font-semibold uppercase tracking-wider text-green-700">
              Connected Workflow
            </p>

            <h3 className="mt-2 text-xl font-bold text-gray-900">
              One platform, connected response
            </h3>

            <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-gray-500">
              Each role contributes to the livestock health response process.
            </p>

          </div>


          <div className="mt-8 grid gap-4 sm:grid-cols-4">

            <WorkflowItem
              number="01"
              title="Farmer"
              text="Reports"
            />

            <WorkflowItem
              number="02"
              title="Veterinarian"
              text="Assesses"
            />

            <WorkflowItem
              number="03"
              title="Field Worker"
              text="Responds"
            />

            <WorkflowItem
              number="04"
              title="Admin"
              text="Monitors"
            />

          </div>

        </div>


        {/* INFORMATION */}

        <div className="mt-8 rounded-xl border border-green-100 bg-green-50 p-5 text-center">

          <p className="text-sm font-medium text-green-800">
            MRIGARESHKA uses AI-assisted health intelligence to
            support livestock health monitoring and veterinary response.
          </p>

          <p className="mt-2 text-xs leading-5 text-green-700">
            AI-assisted risk assessment is a decision-support feature
            and does not replace veterinary diagnosis or professional
            decision-making.
          </p>

        </div>

      </main>


      {/* FOOTER */}

      <footer className="border-t border-gray-200 bg-white">

        <div className="mx-auto max-w-6xl px-6 py-6 text-center text-xs text-gray-500">

          © 2026 MRIGARESHKA · Livestock Health Intelligence

        </div>

      </footer>

    </div>

  );
}


/* WORKFLOW ITEM */

function WorkflowItem({
  number,
  title,
  text,
}) {

  return (

    <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-center">

      <span className="text-xs font-bold text-green-700">
        {number}
      </span>

      <p className="mt-2 font-semibold text-gray-900">
        {title}
      </p>

      <p className="mt-1 text-xs text-gray-500">
        {text}
      </p>

    </div>

  );

}


export default RoleSelection;
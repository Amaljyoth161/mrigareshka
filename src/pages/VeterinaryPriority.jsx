import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle,
  MapPin,
  Stethoscope,
  UserRoundCheck,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import { getVeterinaryPriorities } from "../data/vetPrioritization";


function VeterinaryPriority() {
  const [priorities, setPriorities] = useState([]);

  useEffect(() => {
    setPriorities(getVeterinaryPriorities());
  }, []);


  const highPriority = priorities.filter(
    (item) => item.priority === "High"
  ).length;

  const moderatePriority = priorities.filter(
    (item) => item.priority === "Moderate"
  ).length;

  const lowPriority = priorities.filter(
    (item) => item.priority === "Low"
  ).length;


  return (
    <DashboardLayout role="Veterinarian">

      {/* BACK */}
      <Link
        to="/veterinarian"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-green-700"
      >
        <ArrowLeft size={17} />
        Back to Veterinarian Dashboard
      </Link>


      {/* HEADER */}
      <div className="mt-6">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-700">
            <Stethoscope size={25} />
          </div>

          <div>

            <p className="text-sm font-medium text-red-700">
              Veterinary Response
            </p>

            <h1 className="text-3xl font-bold text-gray-900">
              Veterinary Resource Prioritization
            </h1>

          </div>

        </div>

        <p className="mt-3 max-w-3xl text-gray-600">
          Prioritize veterinary review using reported
          health signals, affected animals and severity
          indicators from village-level reports.
        </p>

      </div>


      {/* INFORMATION BANNER */}
      <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">

        <div className="flex gap-4">

          <Stethoscope
            size={23}
            className="mt-0.5 shrink-0 text-blue-700"
          />

          <div>

            <h2 className="font-bold text-blue-900">
              AI-assisted response prioritization
            </h2>

            <p className="mt-1 text-sm leading-6 text-blue-800">
              The prototype converts village health signals
              into transparent priority levels so veterinary
              teams can review cases in a structured order.
            </p>

          </div>

        </div>

      </div>


      {/* SUMMARY */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">

        <SummaryCard
          label="High Priority"
          value={highPriority}
          type="high"
        />

        <SummaryCard
          label="Moderate Priority"
          value={moderatePriority}
          type="moderate"
        />

        <SummaryCard
          label="Low Priority"
          value={lowPriority}
          type="low"
        />

      </div>


      {/* PRIORITY LIST */}
      <section className="mt-6">

        <div className="mb-4">

          <h2 className="text-xl font-bold text-gray-900">
            Veterinary Action Queue
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Villages are grouped according to the
            prototype's response-priority rules.
          </p>

        </div>


        {priorities.length === 0 ? (

          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">

            <CheckCircle
              size={40}
              className="mx-auto text-green-500"
            />

            <h2 className="mt-4 text-lg font-bold text-gray-900">
              No active village signals
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              No health reports are currently available
              for veterinary prioritization.
            </p>

          </div>

        ) : (

          <div className="space-y-4">

            {[...priorities]
              .sort((a, b) => {

                const order = {
                  High: 1,
                  Moderate: 2,
                  Low: 3,
                };

                return (
                  order[a.priority] -
                  order[b.priority]
                );

              })
              .map((village) => (

                <PriorityCard
                  key={village.village}
                  village={village}
                />

              ))}

          </div>

        )}

      </section>


      {/* DISCLAIMER */}
      <div className="mt-6 rounded-xl border border-yellow-100 bg-yellow-50 p-5">

        <p className="text-sm font-semibold text-yellow-800">
          Important veterinary notice
        </p>

        <p className="mt-1 text-sm leading-6 text-yellow-700">
          Priority levels are generated from reported
          signals and predefined prototype rules. They
          do not diagnose disease or confirm an outbreak.
          Veterinary professionals should verify cases
          before taking clinical or field action.
        </p>

      </div>

    </DashboardLayout>
  );
}


/* ================= SUMMARY CARD ================= */

function SummaryCard({
  label,
  value,
  type,
}) {

  const styles = {

    high:
      "border-red-100 bg-red-50 text-red-700",

    moderate:
      "border-yellow-100 bg-yellow-50 text-yellow-700",

    low:
      "border-green-100 bg-green-50 text-green-700",

  };


  return (
    <div
      className={`rounded-2xl border p-5 ${styles[type]}`}
    >

      <p className="text-sm font-semibold">
        {label}
      </p>

      <p className="mt-2 text-3xl font-bold">
        {value}
      </p>

      <p className="mt-1 text-xs">
        Villages
      </p>

    </div>
  );
}


/* ================= ASSIGN FIELD WORKER ================= */

function assignFieldWorker(village) {

  const existingTasks = JSON.parse(
    localStorage.getItem(
      "mrigare-shka-field-tasks"
    ) || "[]"
  );


  const task = {

    id: `TASK-${Date.now()}`,

    village: village.village,

    priority: village.priority,

    reportCount: village.reportCount,

    affectedAnimals: village.affectedAnimals,

    severeReports: village.severeReports,

    symptoms: village.topSymptoms || [],

    action: village.action,

    status: "Assigned",

    assignedTo: "Field Worker",

    createdAt: new Date().toISOString(),

  };


  localStorage.setItem(
    "mrigare-shka-field-tasks",
    JSON.stringify([
      task,
      ...existingTasks,
    ])
  );


  alert(
    `Field worker task created for ${village.village}.`
  );
}


/* ================= PRIORITY CARD ================= */

function PriorityCard({ village }) {

  const isHigh =
    village.priority === "High";

  const isModerate =
    village.priority === "Moderate";


  const priorityStyle = isHigh
    ? "border-red-200 bg-red-50 text-red-800"
    : isModerate
    ? "border-yellow-200 bg-yellow-50 text-yellow-800"
    : "border-green-200 bg-green-50 text-green-800";


  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      {/* TOP SECTION */}

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

        <div>

          <div className="flex items-center gap-2">

            <MapPin
              size={19}
              className="text-gray-500"
            />

            <h3 className="text-lg font-bold text-gray-900">
              {village.village}
            </h3>

          </div>

          <p className="mt-2 text-sm text-gray-600">
            {village.reason}
          </p>

        </div>


        {/* PRIORITY BADGE */}

        <span
          className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold ${priorityStyle}`}
        >

          {isHigh && (
            <AlertTriangle size={14} />
          )}

          {village.priority} Priority

        </span>

      </div>


      {/* STATISTICS */}

      <div className="mt-5 grid gap-3 sm:grid-cols-3">

        <Info
          label="Health Reports"
          value={village.reportCount}
        />

        <Info
          label="Affected Animals"
          value={village.affectedAnimals}
        />

        <Info
          label="Severe Reports"
          value={village.severeReports}
        />

      </div>


      {/* COMMON SYMPTOMS */}

      {village.topSymptoms?.length > 0 && (

        <div className="mt-5">

          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Common Symptoms
          </p>

          <div className="mt-2 flex flex-wrap gap-2">

            {village.topSymptoms.map(
              ([symptom, count]) => (

                <span
                  key={symptom}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                >
                  {symptom} · {count}
                </span>

              )
            )}

          </div>

        </div>

      )}


      {/* RESPONSE ACTION */}

      <div className="mt-5 rounded-xl bg-gray-50 p-4">

        <p className="text-xs font-semibold text-gray-500">
          Suggested Response
        </p>

        <p className="mt-1 text-sm font-semibold text-gray-800">
          {village.action}
        </p>


        {/* ASSIGN FIELD WORKER */}

        <button
          type="button"
          onClick={() =>
            assignFieldWorker(village)
          }
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-800"
        >

          <UserRoundCheck size={17} />

          Assign Field Worker

        </button>

      </div>

    </div>
  );
}


/* ================= INFO BOX ================= */

function Info({
  label,
  value,
}) {

  return (
    <div className="rounded-lg bg-gray-50 p-4">

      <p className="text-xs text-gray-500">
        {label}
      </p>

      <p className="mt-1 text-lg font-bold text-gray-800">
        {value}
      </p>

    </div>
  );
}


export default VeterinaryPriority;
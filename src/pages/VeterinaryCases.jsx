import {
  ArrowLeft,
  AlertTriangle,
  ClipboardList,
  MapPin,
  Stethoscope,
} from "lucide-react";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import { calculatePriority } from "../data/priorityEngine";

import {
  createCasesFromReports,
  updateCase,
} from "../data/caseService";


function VeterinaryCases() {

  const [cases, setCases] = useState([]);


  useEffect(() => {

    loadCases();

    const handleFocus = () => {
      loadCases();
    };

    window.addEventListener(
      "focus",
      handleFocus
    );

    return () => {
      window.removeEventListener(
        "focus",
        handleFocus
      );
    };

  }, []);


  function loadCases() {

    const savedReports =
      JSON.parse(
        localStorage.getItem(
          "mrigare-shka-health-reports"
        ) || "[]"
      );


    const prioritizedReports =
      savedReports.map((report) => {

        const priority =
          calculatePriority(report);

        return {
          ...report,
          priorityScore: priority.score,
          priority: priority.priority,
        };

      });


    prioritizedReports.sort(
      (a, b) =>
        b.priorityScore -
        a.priorityScore
    );


    const generatedCases =
      createCasesFromReports(
        prioritizedReports
      );


    setCases(generatedCases);

  }


  function markUnderReview(caseId) {

    const updatedCases =
      updateCase(
        caseId,
        {
          status: "Under Review",
        }
      );


    setCases(updatedCases);

  }


  function assignCase(caseId) {

    const worker =
      window.prompt(
        "Enter field worker name:"
      );


    if (!worker) {
      return;
    }


    const updatedCases =
      updateCase(
        caseId,
        {
          assignedTo: worker,
          status: "Assigned",
        }
      );


    setCases(updatedCases);

  }


  function scheduleVisit(caseId) {

    const visitDate =
      window.prompt(
        "Enter visit date (YYYY-MM-DD):"
      );


    if (!visitDate) {
      return;
    }


    const updatedCases =
      updateCase(
        caseId,
        {
          visitDate,
          status: "Visit Scheduled",
        }
      );


    setCases(updatedCases);

  }


  const highPriority =
    cases.filter(
      (item) =>
        item.priority === "High"
    ).length;


  const mediumPriority =
    cases.filter(
      (item) =>
        item.priority === "Medium"
    ).length;


  return (

    <DashboardLayout role="Veterinarian">


      {/* HEADER */}

      <div className="mb-8">

        <Link
          to="/veterinarian"
          className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-800"
        >
          <ArrowLeft size={16} />
          Back to Veterinarian Dashboard
        </Link>


        <p className="mt-6 text-sm font-medium text-green-700">
          Veterinary Operations
        </p>


        <h1 className="mt-1 text-3xl font-bold text-gray-900">
          Priority Cases
        </h1>


        <p className="mt-2 text-gray-600">
          Review farmer-submitted livestock health cases and coordinate veterinary response.
        </p>

      </div>


      {/* SUMMARY */}

      <div className="grid gap-5 md:grid-cols-3">

        <SummaryCard
          icon={
            <ClipboardList size={21} />
          }
          title="Total Cases"
          value={cases.length}
          description="Reported livestock cases"
        />


        <SummaryCard
          icon={
            <AlertTriangle size={21} />
          }
          title="High Priority"
          value={highPriority}
          description="Require faster review"
        />


        <SummaryCard
          icon={
            <Stethoscope size={21} />
          }
          title="Moderate Priority"
          value={mediumPriority}
          description="Require monitoring"
        />

      </div>


      {/* CASE LIST */}

      <section className="mt-8 rounded-2xl border border-gray-200 bg-white">

        <div className="border-b border-gray-200 p-6">

          <h2 className="text-lg font-bold text-gray-900">
            Veterinary Case Queue
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Cases are prioritized using reported severity, symptoms and health indicators.
          </p>

        </div>


        {cases.length === 0 ? (

          <div className="p-10 text-center">

            <ClipboardList
              size={42}
              className="mx-auto text-gray-300"
            />


            <h3 className="mt-4 font-semibold text-gray-900">
              No health cases yet
            </h3>


            <p className="mt-1 text-sm text-gray-500">
              Farmer health reports will appear here automatically.
            </p>

          </div>

        ) : (

          <div className="divide-y divide-gray-100">

            {cases.map(
              (caseItem) => (

                <CaseCard
                  key={caseItem.id}
                  caseItem={caseItem}
                  onReview={markUnderReview}
                  onAssign={assignCase}
                  onSchedule={scheduleVisit}
                />

              )
            )}

          </div>

        )}

      </section>


      {/* DISCLAIMER */}

      <div className="mt-6 rounded-xl border border-green-100 bg-green-50 p-5">

        <p className="text-sm font-semibold text-green-800">
          Veterinary decision support
        </p>


        <p className="mt-1 text-sm leading-6 text-green-700">
          Priority levels help organize veterinary response.
          They are not disease diagnoses and should not replace
          professional clinical assessment.
        </p>

      </div>


    </DashboardLayout>

  );
}


/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({
  icon,
  title,
  value,
  description,
}) {

  return (

    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">
        {icon}
      </div>


      <p className="mt-5 text-sm text-gray-500">
        {title}
      </p>


      <p className="mt-1 text-2xl font-bold text-gray-900">
        {value}
      </p>


      <p className="mt-1 text-xs text-gray-500">
        {description}
      </p>

    </div>

  );
}


/* =========================================================
   CASE CARD
========================================================= */

function CaseCard({
  caseItem,
  onReview,
  onAssign,
  onSchedule,
}) {

  const priorityStyle =
    caseItem.priority === "High"
      ? "bg-red-100 text-red-700"
      : caseItem.priority === "Medium"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";


  return (

    <div className="p-6">

      <div className="flex flex-col gap-5">


        {/* HEADER */}

        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

          <div>

            <div className="flex flex-wrap items-center gap-3">

              <h3 className="text-lg font-bold text-gray-900">
                {caseItem.animalName ||
                  "Livestock Animal"}
              </h3>


              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityStyle}`}
              >
                {caseItem.priority} Priority
              </span>


              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                {caseItem.status || "Submitted"}
              </span>

            </div>


            <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">

              <span className="flex items-center gap-1">

                <MapPin size={15} />

                {caseItem.location ||
                  "Location not recorded"}

              </span>


              <span>
                Case: {caseItem.id}
              </span>

            </div>

          </div>


          {/* PRIORITY SCORE */}

          <div className="rounded-xl bg-gray-50 p-4 lg:min-w-40">

            <p className="text-xs text-gray-500">
              Priority Score
            </p>


            <p className="mt-1 text-2xl font-bold text-gray-900">
              {caseItem.priorityScore}
            </p>


            <p className="mt-1 text-xs text-gray-500">
              Severity:{" "}
              {caseItem.severity ||
                "Not specified"}
            </p>

          </div>

        </div>


        {/* SYMPTOMS */}

        <div>

          <p className="text-sm font-semibold text-gray-700">
            Reported Symptoms
          </p>


          <div className="mt-2 flex flex-wrap gap-2">

            {caseItem.symptoms?.length > 0 ? (

              caseItem.symptoms.map(
                (symptom) => (

                  <span
                    key={symptom}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                  >
                    {symptom}
                  </span>

                )
              )

            ) : (

              <span className="text-sm text-gray-400">
                No symptoms recorded
              </span>

            )}

          </div>

        </div>


        {/* CASE INFORMATION */}

        <div className="grid gap-3 md:grid-cols-3">

          <InfoBox
            label="Assigned Field Worker"
            value={
              caseItem.assignedTo ||
              "Not assigned"
            }
          />


          <InfoBox
            label="Visit Date"
            value={
              caseItem.visitDate ||
              "Not scheduled"
            }
          />


          <InfoBox
            label="Severity"
            value={
              caseItem.severity ||
              "Not specified"
            }
          />

        </div>


        {/* ACTIONS */}

        <div className="flex flex-wrap gap-3 border-t border-gray-100 pt-4">

          <button
            type="button"
            onClick={() =>
              onReview(caseItem.id)
            }
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-green-600 hover:text-green-700"
          >
            Mark Under Review
          </button>


          <button
            type="button"
            onClick={() =>
              onAssign(caseItem.id)
            }
            className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800"
          >
            Assign Field Worker
          </button>


          <button
            type="button"
            onClick={() =>
              onSchedule(caseItem.id)
            }
            className="rounded-lg border border-green-700 px-4 py-2 text-sm font-semibold text-green-700 hover:bg-green-50"
          >
            Schedule Visit
          </button>

        </div>

      </div>

    </div>

  );
}


/* =========================================================
   INFO BOX
========================================================= */

function InfoBox({
  label,
  value,
}) {

  return (

    <div className="rounded-lg bg-gray-50 p-4">

      <p className="text-xs text-gray-500">
        {label}
      </p>


      <p className="mt-1 text-sm font-semibold text-gray-800">
        {value}
      </p>

    </div>

  );
}


export default VeterinaryCases;
import {
  Activity,
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


function VeterinarianDashboard() {

  const [reports, setReports] = useState([]);
  const [priorityCases, setPriorityCases] = useState([]);
  const [cases, setCases] = useState([]);


  useEffect(() => {
    loadReports();
  }, []);


  function loadReports() {

    const savedReports = JSON.parse(
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


    setReports(savedReports);

    setPriorityCases(
      prioritizedReports
    );

    setCases(
      generatedCases
    );

  }


  function assignCase(caseId) {

    const worker = window.prompt(
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

    const visitDate = window.prompt(
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


  const highPriority =
    priorityCases.filter(
      (item) =>
        item.priority === "High"
    );


  const mediumPriority =
    priorityCases.filter(
      (item) =>
        item.priority === "Medium"
    );


  const healthSignals =
    new Set(
      reports.map(
        (report) =>
          report.location
      )
    ).size;


  /*
   * VETERINARY RESPONSE STATUS
   */

  const underReviewCases =
    cases.filter(
      (item) =>
        item.status === "Under Review"
    ).length;


  const assignedCases =
    cases.filter(
      (item) =>
        item.status === "Assigned"
    ).length;


  const scheduledCases =
    cases.filter(
      (item) =>
        item.status === "Visit Scheduled"
    ).length;


  const completedCases =
    cases.filter(
      (item) =>
        item.status === "Visit Completed"
    ).length;


  return (

    <DashboardLayout role="Veterinarian">


      {/* HEADER */}

      <div>

        <p className="text-sm font-medium text-green-700">
          Veterinary Operations
        </p>

        <h1 className="mt-1 text-3xl font-bold text-gray-900">
          Veterinarian Dashboard
        </h1>

        <p className="mt-2 text-gray-600">
          Review livestock health reports and prioritize veterinary response.
        </p>

      </div>


      {/* AI INFORMATION */}

      <div className="mt-6 flex gap-3 rounded-xl border border-blue-100 bg-blue-50 p-5">

        <Activity
          size={21}
          className="mt-0.5 shrink-0 text-blue-700"
        />

        <div>

          <p className="font-semibold text-blue-900">
            AI-assisted veterinary prioritization
          </p>

          <p className="mt-1 text-sm leading-6 text-blue-800">
            Priority is calculated from reported severity,
            symptoms and observed health indicators.
            It supports veterinary workflow and does not
            replace professional clinical judgment.
          </p>

        </div>

      </div>


      {/* SUMMARY CARDS */}

      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

        <SummaryCard
          icon={
            <AlertTriangle size={21} />
          }
          title="Priority Cases"
          value={highPriority.length}
          description="Require review"
        />


        <SummaryCard
          icon={
            <ClipboardList size={21} />
          }
          title="Health Reports"
          value={reports.length}
          description="Submitted reports"
        />


        <SummaryCard
          icon={
            <MapPin size={21} />
          }
          title="Health Signals"
          value={healthSignals}
          description="Locations reporting cases"
        />


        <SummaryCard
          icon={
            <Stethoscope size={21} />
          }
          title="Follow-up Cases"
          value={mediumPriority.length}
          description="Require monitoring"
        />

      </div>


      {/* VETERINARY RESPONSE OVERVIEW */}

      <section className="mt-8">

        <div className="mb-4">

          <h2 className="text-lg font-bold text-gray-900">
            Veterinary Response Overview
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Track how reported livestock cases move through the veterinary response workflow.
          </p>

        </div>


        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

          <ResponseStatusCard
            title="Under Review"
            value={underReviewCases}
            description="Cases being assessed"
            badge="Review"
            icon={
              <ClipboardList size={20} />
            }
          />


          <ResponseStatusCard
            title="Assigned"
            value={assignedCases}
            description="Field worker assigned"
            badge="Assigned"
            icon={
              <Stethoscope size={20} />
            }
          />


          <ResponseStatusCard
            title="Visit Scheduled"
            value={scheduledCases}
            description="Field visits planned"
            badge="Scheduled"
            icon={
              <MapPin size={20} />
            }
          />


          <ResponseStatusCard
            title="Visit Completed"
            value={completedCases}
            description="Field visits completed"
            badge="Completed"
            icon={
              <Activity size={20} />
            }
          />

        </div>

      </section>


      {/* VETERINARY INTELLIGENCE TOOLS */}

      <section className="mt-8">

        <div className="mb-4">

          <h2 className="text-lg font-bold text-gray-900">
            Veterinary Intelligence
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Use health intelligence to support field-level veterinary decisions.
          </p>

        </div>


        <div className="grid gap-5 md:grid-cols-3">


          {/* VILLAGE HEALTH INTELLIGENCE */}

          <Link
            to="/veterinarian/village-intelligence"
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-green-300 hover:shadow-md"
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700">

              <MapPin size={22} />

            </div>


            <h3 className="mt-4 font-bold text-gray-900">
              Village Health Intelligence
            </h3>


            <p className="mt-2 text-sm leading-6 text-gray-500">
              Identify villages showing repeated livestock health signals.
            </p>


            <p className="mt-4 text-sm font-semibold text-green-700">
              View village signals →
            </p>

          </Link>


          {/* VACCINATION INTELLIGENCE */}

          <Link
            to="/veterinarian/vaccination-intelligence"
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-green-300 hover:shadow-md"
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700">

              <Activity size={22} />

            </div>


            <h3 className="mt-4 font-bold text-gray-900">
              Vaccination Intelligence
            </h3>


            <p className="mt-2 text-sm leading-6 text-gray-500">
              Review vaccination coverage and identify preventive gaps.
            </p>


            <p className="mt-4 text-sm font-semibold text-green-700">
              View vaccination gaps →
            </p>

          </Link>


          {/* VETERINARY RESOURCE PRIORITIZATION */}

          <Link
            to="/veterinarian/priority"
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-green-300 hover:shadow-md"
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700">

              <Stethoscope size={22} />

            </div>


            <h3 className="mt-4 font-bold text-gray-900">
              Veterinary Resource Prioritization
            </h3>


            <p className="mt-2 text-sm leading-6 text-gray-500">
              Prioritize villages requiring faster veterinary response.
            </p>


            <p className="mt-4 text-sm font-semibold text-green-700">
              Open action queue →
            </p>

          </Link>


        </div>

      </section>


      {/* PRIORITY CASES */}

      <section className="mt-8 rounded-2xl border border-gray-200 bg-white">

        <div className="border-b border-gray-200 p-6">

          <h2 className="text-lg font-bold text-gray-900">
            Priority Cases
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Cases organized using the AI-assisted priority engine.
          </p>

        </div>


        {cases.length === 0 ? (

          <div className="p-10 text-center">

            <ClipboardList
              size={36}
              className="mx-auto text-gray-300"
            />


            <h3 className="mt-4 font-semibold text-gray-900">
              No health reports yet
            </h3>


            <p className="mt-1 text-sm text-gray-500">
              Farmer-submitted health reports will appear here.
            </p>

          </div>

        ) : (

          <div className="divide-y divide-gray-100">

            {cases.map((caseItem) => (

              <PriorityCase
                key={caseItem.id}
                caseItem={caseItem}
                onAssign={assignCase}
                onSchedule={scheduleVisit}
                onReview={markUnderReview}
              />

            ))}

          </div>

        )}

      </section>


      {/* DISCLAIMER */}

      <div className="mt-6 rounded-xl border border-green-100 bg-green-50 p-5">

        <p className="text-sm font-semibold text-green-800">
          Veterinary decision support
        </p>

        <p className="mt-1 text-sm leading-6 text-green-700">
          MRIGARESHKA prioritizes reported cases to
          support faster response. Priority levels are
          not disease diagnoses. Veterinary professionals
          remain responsible for clinical assessment and
          action.
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
   RESPONSE STATUS CARD
========================================================= */

function ResponseStatusCard({
  title,
  value,
  description,
  badge,
  icon,
}) {

  return (

    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

      <div className="flex items-start justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">

          {icon}

        </div>


        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">

          {badge}

        </span>

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
   PRIORITY CASE
========================================================= */

function PriorityCase({
  caseItem,
  onAssign,
  onSchedule,
  onReview,
}) {

  const priorityColor =
    caseItem.priority === "High"
      ? "bg-red-100 text-red-700"
      : caseItem.priority === "Medium"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";


  return (

    <div className="p-6">

      <div className="flex flex-col gap-5">


        {/* CASE HEADER */}

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="flex flex-wrap items-center gap-3">

              <h3 className="text-lg font-bold text-gray-900">
                {caseItem.animalName}
              </h3>


              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityColor}`}
              >
                {caseItem.priority} Priority
              </span>


              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                {caseItem.status}
              </span>

            </div>


            <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">

              <span className="flex items-center gap-1">

                <MapPin size={15} />

                {caseItem.location}

              </span>


              <span>
                Case: {caseItem.id}
              </span>

            </div>

          </div>


          {/* SCORE */}

          <div className="rounded-xl bg-gray-50 p-4 lg:min-w-40">

            <p className="text-xs text-gray-500">
              Priority Score
            </p>


            <p className="mt-1 text-2xl font-bold text-gray-900">
              {caseItem.priorityScore}
            </p>


            <p className="mt-1 text-xs text-gray-500">
              Severity: {caseItem.severity}
            </p>

          </div>

        </div>


        {/* SYMPTOMS */}

        <div>

          <p className="text-sm font-semibold text-gray-700">
            Reported Symptoms
          </p>


          <div className="mt-2 flex flex-wrap gap-2">

            {caseItem.symptoms?.map(
              (symptom) => (

                <span
                  key={symptom}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                >
                  {symptom}
                </span>

              )
            )}

          </div>

        </div>


        {/* ASSIGNMENT DETAILS */}

        <div className="grid gap-3 md:grid-cols-3">

          <div className="rounded-lg bg-gray-50 p-4">

            <p className="text-xs text-gray-500">
              Assigned Field Worker
            </p>


            <p className="mt-1 text-sm font-semibold text-gray-800">
              {caseItem.assignedTo ||
                "Not assigned"}
            </p>

          </div>


          <div className="rounded-lg bg-gray-50 p-4">

            <p className="text-xs text-gray-500">
              Visit Date
            </p>


            <p className="mt-1 text-sm font-semibold text-gray-800">
              {caseItem.visitDate ||
                "Not scheduled"}
            </p>

          </div>


          <div className="rounded-lg bg-gray-50 p-4">

            <p className="text-xs text-gray-500">
              Severity
            </p>


            <p className="mt-1 text-sm font-semibold text-gray-800">
              {caseItem.severity}
            </p>

          </div>

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


export default VeterinarianDashboard;
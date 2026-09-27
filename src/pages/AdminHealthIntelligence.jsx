import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ClipboardList,
  Map,
  Syringe,
  Users,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import { getAnimals } from "../data/animals";
import { getVaccinationStatus } from "../data/vaccinationService";
import { getVillageReports } from "../data/villageIntelligence";
import { getVeterinaryPriorities } from "../data/vetPrioritization";


function AdminHealthIntelligence() {
  const [animals, setAnimals] = useState([]);
  const [reports, setReports] = useState([]);
  const [villageSignals, setVillageSignals] = useState([]);
  const [priorities, setPriorities] = useState([]);

  useEffect(() => {
    loadData();

    const handleStorageChange = () => {
      loadData();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("focus", loadData);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("focus", loadData);
    };
  }, []);

  function loadData() {
    const savedAnimals = getAnimals();

    const savedReports = JSON.parse(
      localStorage.getItem("mrigare-shka-health-reports") || "[]"
    );

    const savedVillageSignals = getVillageReports();

    const savedPriorities = getVeterinaryPriorities();

    setAnimals(savedAnimals);
    setReports(savedReports);
    setVillageSignals(savedVillageSignals);
    setPriorities(savedPriorities);
  }

  // =====================================================
  // SYSTEM STATISTICS
  // =====================================================

  const vaccinationStatuses = animals.map((animal) =>
    getVaccinationStatus(animal)
  );

  const vaccinatedAnimals = vaccinationStatuses.filter(
    (item) => item.status === "Up to date"
  ).length;

  const vaccinationCoverage =
    animals.length > 0
      ? Math.round((vaccinatedAnimals / animals.length) * 100)
      : 0;

  const activeHealthSignals = villageSignals.filter(
    (village) =>
      village.signalLevel === "High" ||
      village.signalLevel === "Moderate"
  ).length;

  const highPriorityCases = priorities.filter(
    (item) => item.priority === "High"
  ).length;

  const reportsAwaitingReview = reports.filter(
    (report) =>
      !report.status ||
      report.status === "Submitted" ||
      report.status === "Priority Review"
  ).length;

  const completedReports = reports.filter(
    (report) =>
      report.status === "Resolved" ||
      report.status === "Completed"
  ).length;

  // =====================================================
  // RECENT REPORTS
  // =====================================================

  const recentReports = [...reports]
    .sort(
      (a, b) =>
        new Date(b.createdAt || b.submittedAt) -
        new Date(a.createdAt || a.submittedAt)
    )
    .slice(0, 6);

  // =====================================================
  // VILLAGE SIGNALS
  // =====================================================

  const sortedVillageSignals = [...villageSignals]
    .sort((a, b) => b.reportCount - a.reportCount)
    .slice(0, 8);

  return (
    <DashboardLayout role="Admin / Government">

      {/* ================================================= */}
      {/* BACK */}
      {/* ================================================= */}

      <Link
        to="/admin"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-green-700"
      >
        <ArrowLeft size={17} />
        Back to Admin Dashboard
      </Link>


      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="mt-6 mb-8">

        <p className="text-sm font-medium text-green-700">
          Government Monitoring
        </p>

        <h1 className="mt-1 text-3xl font-bold text-gray-900">
          Health Intelligence
        </h1>

        <p className="mt-2 max-w-3xl text-gray-600">
          Monitor livestock health reports, village-level signals,
          priority cases and system response activity across the
          monitored area.
        </p>

      </div>


      {/* ================================================= */}
      {/* TOP SUMMARY */}
      {/* ================================================= */}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

        <DashboardCard
          icon={<Activity size={21} />}
          title="Total Health Reports"
          value={reports.length}
          description="Reports submitted through the platform"
        />

        <DashboardCard
          icon={<AlertTriangle size={21} />}
          title="Active Health Signals"
          value={activeHealthSignals}
          description="Villages requiring monitoring"
          alert
        />

        <DashboardCard
          icon={<ClipboardList size={21} />}
          title="Priority Cases"
          value={highPriorityCases}
          description="High-priority veterinary cases"
          alert
        />

        <DashboardCard
          icon={<Map size={21} />}
          title="Villages Monitored"
          value={villageSignals.length}
          description="Locations with health signals"
        />

      </div>


      {/* ================================================= */}
      {/* SYSTEM HEALTH OVERVIEW */}
      {/* ================================================= */}

      <section className="mt-8">

        <div className="mb-4">

          <h2 className="text-lg font-bold text-gray-900">
            System Health Overview
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Current livestock health and response indicators.
          </p>

        </div>


        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <DashboardCard
            icon={<Users size={21} />}
            title="Registered Animals"
            value={animals.length}
            description="Animals in health records"
          />

          <DashboardCard
            icon={<Clock3 size={21} />}
            title="Awaiting Review"
            value={reportsAwaitingReview}
            description="Health reports awaiting review"
          />

          <DashboardCard
            icon={<CheckCircle2 size={21} />}
            title="Completed Reports"
            value={completedReports}
            description="Reports with completed response"
          />

          <DashboardCard
            icon={<Syringe size={21} />}
            title="Vaccination Coverage"
            value={`${vaccinationCoverage}%`}
            description="Animals currently up to date"
          />

        </div>

      </section>


      {/* ================================================= */}
      {/* HEALTH SIGNALS + VILLAGE MONITORING */}
      {/* ================================================= */}

      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        {/* HEALTH SIGNALS */}

        <InfoCard
          title="Village Health Signals"
          description="Villages with reported health activity."
        >

          {sortedVillageSignals.length === 0 ? (

            <EmptyState message="No village health signals yet." />

          ) : (

            <div className="mt-5 space-y-3">

              {sortedVillageSignals.map((village) => (

                <div
                  key={village.village}
                  className="flex items-center justify-between gap-4 rounded-xl bg-gray-50 p-4"
                >

                  <div>

                    <p className="font-semibold text-gray-900">
                      {village.village}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {village.reportCount}{" "}
                      {village.reportCount === 1
                        ? "report"
                        : "reports"}{" "}
                      ·{" "}
                      {village.affectedAnimals}{" "}
                      {village.affectedAnimals === 1
                        ? "affected animal"
                        : "affected animals"}
                    </p>

                  </div>


                  <SignalBadge
                    level={village.signalLevel}
                  />

                </div>

              ))}

            </div>

          )}

        </InfoCard>


        {/* PRIORITY OVERVIEW */}

        <InfoCard
          title="Priority Health Cases"
          description="Current veterinary cases requiring attention."
        >

          {priorities.length === 0 ? (

            <EmptyState message="No veterinary priority cases yet." />

          ) : (

            <div className="mt-5 space-y-3">

              {priorities
                .slice()
                .sort((a, b) => {
                  const order = {
                    High: 1,
                    Moderate: 2,
                    Low: 3,
                  };

                  return (
                    (order[a.priority] || 4) -
                    (order[b.priority] || 4)
                  );
                })
                .slice(0, 6)
                .map((item, index) => (

                  <div
                    key={
                      item.id ||
                      item.caseId ||
                      `${item.animalId || "case"}-${index}`
                    }
                    className="rounded-xl bg-gray-50 p-4"
                  >

                    <div className="flex items-start justify-between gap-3">

                      <div>

                        <p className="font-semibold text-gray-900">
                          {item.animalName ||
                            item.animalId ||
                            "Animal Case"}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          {item.village ||
                            item.location ||
                            "Location not recorded"}
                        </p>

                      </div>


                      <PriorityBadge
                        priority={item.priority}
                      />

                    </div>

                  </div>

                ))}

            </div>

          )}

        </InfoCard>

      </div>


      {/* ================================================= */}
      {/* VACCINATION COVERAGE */}
      {/* ================================================= */}

      <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h2 className="font-bold text-gray-900">
              Vaccination Coverage
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Current vaccination status across registered animals.
            </p>

          </div>


          <div className="text-right">

            <p className="text-3xl font-bold text-gray-900">
              {vaccinationCoverage}%
            </p>

            <p className="text-xs text-gray-500">
              {vaccinatedAnimals} of {animals.length} animals
            </p>

          </div>

        </div>


        <div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-100">

          <div
            className="h-full rounded-full bg-green-600 transition-all"
            style={{
              width: `${vaccinationCoverage}%`,
            }}
          />

        </div>


        <div className="mt-4 flex flex-wrap gap-5 text-sm">

          <div className="flex items-center gap-2">

            <span className="h-2.5 w-2.5 rounded-full bg-green-600" />

            <span className="text-gray-600">
              Up to date:{" "}
              <strong className="text-gray-900">
                {vaccinatedAnimals}
              </strong>
            </span>

          </div>


          <div className="flex items-center gap-2">

            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />

            <span className="text-gray-600">
              Due / Overdue:{" "}
              <strong className="text-gray-900">
                {animals.length - vaccinatedAnimals}
              </strong>
            </span>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* RECENT HEALTH REPORTS */}
      {/* ================================================= */}

      <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="font-bold text-gray-900">
              Recent Health Reports
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Latest health reports submitted to the platform.
            </p>

          </div>

        </div>


        {recentReports.length === 0 ? (

          <EmptyState message="No health reports have been submitted yet." />

        ) : (

          <div className="mt-5 overflow-x-auto">

            <table className="w-full min-w-[700px] text-left">

              <thead>

                <tr className="border-b border-gray-200">

                  <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Report ID
                  </th>

                  <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Animal
                  </th>

                  <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Symptoms
                  </th>

                  <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Severity
                  </th>

                  <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Status
                  </th>

                </tr>

              </thead>


              <tbody>

                {recentReports.map((report) => (

                  <tr
                    key={report.id}
                    className="border-b border-gray-100 last:border-0"
                  >

                    <td className="px-3 py-4 text-sm font-medium text-gray-900">
                      {report.id}
                    </td>

                    <td className="px-3 py-4">

                      <p className="text-sm font-semibold text-gray-900">
                        {report.animalName ||
                          report.animalId ||
                          "Animal"}
                      </p>

                      <p className="text-xs text-gray-500">
                        {report.species || "Livestock"}
                      </p>

                    </td>

                    <td className="px-3 py-4">

                      <div className="flex max-w-xs flex-wrap gap-1.5">

                        {(report.symptoms || [])
                          .slice(0, 3)
                          .map((symptom) => (

                            <span
                              key={symptom}
                              className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700"
                            >
                              {symptom}
                            </span>

                          ))}

                      </div>

                    </td>

                    <td className="px-3 py-4">
                      <SeverityBadge
                        severity={report.severity}
                      />
                    </td>

                    <td className="px-3 py-4">
                      <StatusBadge
                        status={report.status}
                      />
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </section>


      {/* ================================================= */}
      {/* SYSTEM NOTE */}
      {/* ================================================= */}

      <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-5">

        <p className="text-sm font-semibold text-blue-900">
          Government monitoring view
        </p>

        <p className="mt-1 text-sm leading-6 text-blue-800">
          This intelligence view aggregates farmer health reports,
          village-level signals, vaccination information and
          veterinary priority data to support system-level
          monitoring and resource planning.
        </p>

      </div>


      {/* ================================================= */}
      {/* DISCLAIMER */}
      {/* ================================================= */}

      <div className="mt-4 rounded-xl border border-green-100 bg-green-50 p-5">

        <p className="text-sm font-semibold text-green-800">
          Decision-support notice
        </p>

        <p className="mt-1 text-sm leading-6 text-green-700">
          Health signals and priority levels are intended to
          support monitoring and veterinary coordination.
          They do not constitute disease diagnosis.
        </p>

      </div>

    </DashboardLayout>
  );
}


/* =========================================================
   DASHBOARD CARD
========================================================= */

function DashboardCard({
  icon,
  title,
  value,
  description,
  alert = false,
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
          alert
            ? "bg-red-100 text-red-700"
            : "bg-green-100 text-green-700"
        }`}
      >
        {icon}
      </div>

      <p className="mt-5 text-sm text-gray-500">
        {title}
      </p>

      <p className="mt-1 text-3xl font-bold text-gray-900">
        {value}
      </p>

      <p className="mt-1 text-xs text-gray-500">
        {description}
      </p>

    </div>
  );
}


/* =========================================================
   INFO CARD
========================================================= */

function InfoCard({
  title,
  description,
  children,
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">

      <h2 className="font-bold text-gray-900">
        {title}
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        {description}
      </p>

      {children}

    </div>
  );
}


/* =========================================================
   SIGNAL BADGE
========================================================= */

function SignalBadge({ level }) {
  const style =
    level === "High"
      ? "bg-red-100 text-red-700"
      : level === "Moderate"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${style}`}
    >
      {level || "Low"}
    </span>
  );
}


/* =========================================================
   PRIORITY BADGE
========================================================= */

function PriorityBadge({ priority }) {
  const style =
    priority === "High"
      ? "bg-red-100 text-red-700"
      : priority === "Moderate"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${style}`}
    >
      {priority || "Low"}
    </span>
  );
}


/* =========================================================
   SEVERITY BADGE
========================================================= */

function SeverityBadge({ severity }) {
  const style =
    severity === "Severe"
      ? "bg-red-100 text-red-700"
      : severity === "Moderate"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${style}`}
    >
      {severity || "Not specified"}
    </span>
  );
}


/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({ status }) {
  const style =
    status === "Priority Review"
      ? "bg-red-100 text-red-700"
      : status === "Submitted"
      ? "bg-yellow-100 text-yellow-700"
      : status === "Resolved" || status === "Completed"
      ? "bg-green-100 text-green-700"
      : "bg-gray-100 text-gray-700";

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${style}`}
    >
      {status || "Submitted"}
    </span>
  );
}


/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({ message }) {
  return (
    <div className="mt-5 rounded-xl bg-gray-50 p-6 text-center">
      <p className="text-sm text-gray-500">
        {message}
      </p>
    </div>
  );
}


export default AdminHealthIntelligence;
import {
  Activity,
  AlertTriangle,
  Map,
  Syringe,
  Users,
  ClipboardList,
  CheckCircle,
} from "lucide-react";

import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import { getAnimals } from "../data/animals";
import { getVaccinationStatus } from "../data/vaccinationService";
import { getVillageReports } from "../data/villageIntelligence";
import { getVeterinaryPriorities } from "../data/vetPrioritization";


function AdminDashboard() {

  const [animals, setAnimals] = useState([]);
  const [reports, setReports] = useState([]);
  const [fieldTasks, setFieldTasks] = useState([]);
  const [villageSignals, setVillageSignals] = useState([]);
  const [priorities, setPriorities] = useState([]);


  useEffect(() => {

    loadDashboardData();

    const handleStorageChange = () => {
      loadDashboardData();
    };

    window.addEventListener(
      "storage",
      handleStorageChange
    );

    window.addEventListener(
      "focus",
      loadDashboardData
    );

    return () => {

      window.removeEventListener(
        "storage",
        handleStorageChange
      );

      window.removeEventListener(
        "focus",
        loadDashboardData
      );

    };

  }, []);


  function loadDashboardData() {

    const savedAnimals =
      getAnimals();

    const savedReports =
      JSON.parse(
        localStorage.getItem(
          "mrigare-shka-health-reports"
        ) || "[]"
      );

    const savedFieldTasks =
      JSON.parse(
        localStorage.getItem(
          "mrigare-shka-field-tasks"
        ) || "[]"
      );

    const savedVillageSignals =
      getVillageReports();

    const savedPriorities =
      getVeterinaryPriorities();


    setAnimals(savedAnimals);
    setReports(savedReports);
    setFieldTasks(savedFieldTasks);
    setVillageSignals(savedVillageSignals);
    setPriorities(savedPriorities);

  }


  /*
   * VACCINATION STATISTICS
   */

  const vaccinationStatuses =
    animals.map((animal) =>
      getVaccinationStatus(animal)
    );


  const vaccinatedAnimals =
    vaccinationStatuses.filter(
      (item) =>
        item.status === "Up to date"
    ).length;


  const vaccinationCoverage =
    animals.length > 0
      ? Math.round(
          (vaccinatedAnimals /
            animals.length) *
            100
        )
      : 0;


  /*
   * HEALTH SIGNALS
   */

  const activeHealthSignals =
    villageSignals.filter(
      (village) =>
        village.signalLevel === "High" ||
        village.signalLevel === "Moderate"
    ).length;


  /*
   * PRIORITY CASES
   */

  const highPriorityCases =
    priorities.filter(
      (item) =>
        item.priority === "High"
    ).length;


  /*
   * FIELD RESPONSE
   */

  const pendingFieldVisits =
    fieldTasks.filter(
      (task) =>
        task.status !== "Visit Completed"
    ).length;


  const completedFieldVisits =
    fieldTasks.filter(
      (task) =>
        task.status === "Visit Completed"
    ).length;


  /*
   * REPORTS AWAITING REVIEW
   */

  const reportsAwaitingReview =
    reports.filter(
      (report) =>
        !report.status ||
        report.status === "Submitted" ||
        report.status === "Priority Review"
    ).length;


  return (

    <DashboardLayout role="Admin / Government">


      {/* HEADER */}

      <div className="mb-8">

        <p className="text-sm font-medium text-green-700">
          System Overview
        </p>

        <h1 className="mt-1 text-3xl font-bold text-gray-900">
          Livestock Health Intelligence
        </h1>

        <p className="mt-2 text-gray-600">
          Monitor health signals, vaccination coverage and veterinary response.
        </p>

      </div>


      {/* MAIN SUMMARY */}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">


        <DashboardCard
          icon={
            <Activity size={21} />
          }
          title="Total Reports"
          value={reports.length}
          description="Submitted health reports"
        />


        <DashboardCard
          icon={
            <AlertTriangle size={21} />
          }
          title="Active Health Signals"
          value={activeHealthSignals}
          description="Villages requiring monitoring"
        />


        <DashboardCard
          icon={
            <Map size={21} />
          }
          title="Villages Monitored"
          value={villageSignals.length}
          description="Locations with health reports"
        />


        <DashboardCard
          icon={
            <Syringe size={21} />
          }
          title="Vaccination Coverage"
          value={`${vaccinationCoverage}%`}
          description="Animals up to date"
        />

      </div>


      {/* SYSTEM RESPONSE OVERVIEW */}

      <section className="mt-8">

        <div className="mb-4">

          <h2 className="text-lg font-bold text-gray-900">
            System Response Overview
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Monitor veterinary workload and field response across the system.
          </p>

        </div>


        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">


          <DashboardCard
            icon={
              <Users size={21} />
            }
            title="Registered Animals"
            value={animals.length}
            description="Animals in health records"
          />


          <DashboardCard
            icon={
              <AlertTriangle size={21} />
            }
            title="Priority Cases"
            value={highPriorityCases}
            description="High-priority veterinary cases"
          />


          <DashboardCard
            icon={
              <ClipboardList size={21} />
            }
            title="Pending Field Visits"
            value={pendingFieldVisits}
            description="Visits awaiting completion"
          />


          <DashboardCard
            icon={
              <CheckCircle size={21} />
            }
            title="Completed Visits"
            value={completedFieldVisits}
            description="Field responses completed"
          />

        </div>

      </section>


      {/* HEALTH SIGNALS + RESOURCES */}

      <div className="mt-8 grid gap-6 lg:grid-cols-2">


        {/* HEALTH SIGNALS */}

        <InfoCard
          title="Health Signals"
          description="Potential local health signals requiring monitoring."
        >

          {villageSignals.length === 0 ? (

            <EmptyState
              message="No village health signals yet."
            />

          ) : (

            <div className="mt-5 space-y-3">

              {villageSignals
                .slice()
                .sort(
                  (a, b) =>
                    b.reportCount -
                    a.reportCount
                )
                .slice(0, 5)
                .map(
                  (village) => (

                    <SignalRow
                      key={
                        village.village
                      }
                      village={
                        village.village
                      }
                      reports={
                        village.reportCount
                      }
                      animals={
                        village.affectedAnimals
                      }
                      level={
                        village.signalLevel
                      }
                    />

                  )
                )}

            </div>

          )}

        </InfoCard>


        {/* VETERINARY RESOURCES */}

        <InfoCard
          title="Veterinary Resources"
          description="Current veterinary response workload."
        >

          <div className="mt-5 space-y-4">

            <ResourceRow
              label="Priority Cases"
              value={
                highPriorityCases
              }
            />


            <ResourceRow
              label="Pending Field Visits"
              value={
                pendingFieldVisits
              }
            />


            <ResourceRow
              label="Reports Awaiting Review"
              value={
                reportsAwaitingReview
              }
            />


            <ResourceRow
              label="Completed Field Visits"
              value={
                completedFieldVisits
              }
            />

          </div>

        </InfoCard>

      </div>


      {/* VACCINATION OVERVIEW */}

      <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h2 className="font-bold text-gray-900">
              Vaccination Coverage
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Current vaccination status across registered animals.
            </p>

          </div>

          <div className="text-right">

            <p className="text-2xl font-bold text-gray-900">
              {vaccinationCoverage}%
            </p>

            <p className="text-xs text-gray-500">
              {vaccinatedAnimals} of{" "}
              {animals.length} animals
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


        <div className="mt-4 flex flex-wrap gap-4 text-sm">

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
                {animals.length -
                  vaccinatedAnimals}
              </strong>
            </span>

          </div>

        </div>

      </section>


      {/* SYSTEM NOTE */}

      <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-5">

        <p className="text-sm font-semibold text-blue-900">
          Government monitoring view
        </p>

        <p className="mt-1 text-sm leading-6 text-blue-800">
          This dashboard aggregates farmer health reports,
          village-level signals, vaccination information and
          veterinary response activity to support system-level
          monitoring and resource planning.
        </p>

      </div>


      {/* DISCLAIMER */}

      <div className="mt-4 rounded-xl border border-green-100 bg-green-50 p-5">

        <p className="text-sm font-semibold text-green-800">
          Decision-support notice
        </p>

        <p className="mt-1 text-sm leading-6 text-green-700">
          Health signals and priority levels are intended
          to support monitoring and veterinary coordination.
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
}) {

  return (

    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">

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
   SIGNAL ROW
========================================================= */

function SignalRow({
  village,
  reports,
  animals,
  level,
}) {

  const levelStyle =
    level === "High"
      ? "bg-red-100 text-red-700"
      : level === "Moderate"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";


  return (

    <div className="flex items-center justify-between gap-4 rounded-xl bg-gray-50 p-4">

      <div>

        <p className="font-semibold text-gray-900">
          {village}
        </p>

        <p className="text-sm text-gray-500">
          {reports} report
          {reports !== 1 ? "s" : ""} ·{" "}
          {animals} affected animal
          {animals !== 1 ? "s" : ""}
        </p>

      </div>


      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold ${levelStyle}`}
      >
        {level}
      </span>

    </div>

  );
}


/* =========================================================
   RESOURCE ROW
========================================================= */

function ResourceRow({
  label,
  value,
}) {

  return (

    <div className="flex items-center justify-between border-b border-gray-100 pb-3">

      <span className="text-sm text-gray-600">
        {label}
      </span>


      <span className="font-bold text-gray-900">
        {value}
      </span>

    </div>

  );
}


/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({
  message,
}) {

  return (

    <div className="mt-5 rounded-xl bg-gray-50 p-6 text-center">

      <p className="text-sm text-gray-500">
        {message}
      </p>

    </div>

  );
}


export default AdminDashboard;
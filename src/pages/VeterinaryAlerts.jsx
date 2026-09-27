import {
  ArrowLeft,
  AlertTriangle,
  Bell,
  MapPin,
  ClipboardList,
} from "lucide-react";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import { getVillageReports } from "../data/villageIntelligence";
import { getVeterinaryPriorities } from "../data/vetPrioritization";


function VeterinaryAlerts() {

  const [alerts, setAlerts] = useState([]);


  useEffect(() => {

    loadAlerts();

    const handleFocus = () => {
      loadAlerts();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };

  }, []);


  function loadAlerts() {

    const villages = getVillageReports();
    const priorities = getVeterinaryPriorities();

    const priorityMap = {};

    priorities.forEach((priority) => {
      priorityMap[priority.village] = priority;
    });


    const generatedAlerts = [];


    villages.forEach((village) => {

      const priority =
        priorityMap[village.village];


      if (village.signalLevel === "High") {

        generatedAlerts.push({
          id: `HIGH-${village.village}`,
          type: "High Health Signal",
          level: "High",
          village: village.village,
          message:
            `${village.reportCount} health reports with ${village.severeReports} severe report(s) require close veterinary attention.`,
          action:
            priority?.action ||
            "Veterinary review recommended.",
          reports: village.reportCount,
          animals: village.affectedAnimals,
        });

      }


      if (village.signalLevel === "Moderate") {

        generatedAlerts.push({
          id: `MOD-${village.village}`,
          type: "Moderate Health Signal",
          level: "Moderate",
          village: village.village,
          message:
            `${village.reportCount} health reports indicate a developing local health signal.`,
          action:
            priority?.action ||
            "Veterinary review recommended.",
          reports: village.reportCount,
          animals: village.affectedAnimals,
        });

      }

    });


    const reports = JSON.parse(
      localStorage.getItem(
        "mrigare-shka-health-reports"
      ) || "[]"
    );


    reports
      .filter(
        (report) =>
          report.severity === "Severe" ||
          report.status === "Priority Review"
      )
      .forEach((report) => {

        generatedAlerts.push({
          id: `REPORT-${report.id}`,
          type: "Priority Animal Report",
          level: "High",
          village:
            report.location ||
            "Unknown Location",
          message:
            `${report.animalName || "Animal"} has a priority health report requiring veterinary review.`,
          action:
            "Review the animal report and determine the required response.",
          reports: 1,
          animals: 1,
          animalName:
            report.animalName,
        });

      });


    const uniqueAlerts = Array.from(
      new Map(
        generatedAlerts.map(
          (alert) => [alert.id, alert]
        )
      ).values()
    );


    uniqueAlerts.sort((a, b) => {

      const order = {
        High: 3,
        Moderate: 2,
        Low: 1,
      };

      return (
        (order[b.level] || 0) -
        (order[a.level] || 0)
      );

    });


    setAlerts(uniqueAlerts);

  }


  const highAlerts =
    alerts.filter(
      (alert) =>
        alert.level === "High"
    ).length;


  const moderateAlerts =
    alerts.filter(
      (alert) =>
        alert.level === "Moderate"
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
          Veterinary Response
        </p>


        <h1 className="mt-1 text-3xl font-bold text-gray-900">
          Veterinary Alerts
        </h1>


        <p className="mt-2 text-gray-600">
          Review health signals and priority animal reports that may require veterinary action.
        </p>

      </div>


      {/* SUMMARY */}

      <div className="grid gap-5 md:grid-cols-3">

        <SummaryCard
          icon={<Bell size={21} />}
          title="Active Alerts"
          value={alerts.length}
          description="Generated from current reports"
        />


        <SummaryCard
          icon={<AlertTriangle size={21} />}
          title="High Alerts"
          value={highAlerts}
          description="Require closer review"
        />


        <SummaryCard
          icon={<ClipboardList size={21} />}
          title="Moderate Alerts"
          value={moderateAlerts}
          description="Require monitoring"
        />

      </div>


      {/* ALERT LIST */}

      <section className="mt-8 rounded-2xl border border-gray-200 bg-white">

        <div className="border-b border-gray-200 p-6">

          <h2 className="text-lg font-bold text-gray-900">
            Active Veterinary Alerts
          </h2>


          <p className="mt-1 text-sm text-gray-500">
            Alerts are derived from current livestock health reports and village signals.
          </p>

        </div>


        {alerts.length === 0 ? (

          <div className="p-10 text-center">

            <Bell
              size={42}
              className="mx-auto text-gray-300"
            />


            <h3 className="mt-4 font-semibold text-gray-900">
              No active alerts
            </h3>


            <p className="mt-1 text-sm text-gray-500">
              New alerts will appear when priority health signals are reported.
            </p>

          </div>

        ) : (

          <div className="divide-y divide-gray-100">

            {alerts.map(
              (alert) => (

                <AlertCard
                  key={alert.id}
                  alert={alert}
                />

              )
            )}

          </div>

        )}

      </section>


      {/* INFORMATION */}

      <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-5">

        <p className="text-sm font-semibold text-blue-900">
          How alerts are generated
        </p>


        <p className="mt-1 text-sm leading-6 text-blue-800">
          MRIGARESHKA combines individual priority reports with
          village-level health signals to highlight situations that
          may require veterinary review. Alerts are decision-support
          indicators and do not independently confirm a disease outbreak.
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
   ALERT CARD
========================================================= */

function AlertCard({ alert }) {

  const alertStyle =
    alert.level === "High"
      ? {
          container:
            "border-red-100 bg-red-50",
          icon:
            "bg-red-100 text-red-700",
          badge:
            "bg-red-100 text-red-700",
        }
      : {
          container:
            "border-yellow-100 bg-yellow-50",
          icon:
            "bg-yellow-100 text-yellow-700",
          badge:
            "bg-yellow-100 text-yellow-700",
        };


  return (

    <div className="p-6">

      <div
        className={`rounded-xl border p-5 ${alertStyle.container}`}
      >

        <div className="flex flex-col gap-5">


          {/* TOP */}

          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

            <div className="flex gap-4">

              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${alertStyle.icon}`}
              >
                <AlertTriangle size={21} />
              </div>


              <div>

                <div className="flex flex-wrap items-center gap-3">

                  <h3 className="font-bold text-gray-900">
                    {alert.type}
                  </h3>


                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${alertStyle.badge}`}
                  >
                    {alert.level}
                  </span>

                </div>


                <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">

                  <MapPin size={15} />

                  {alert.village}

                </div>

              </div>

            </div>

          </div>


          {/* MESSAGE */}

          <div>

            <p className="text-sm leading-6 text-gray-700">
              {alert.message}
            </p>


            {alert.animalName && (

              <p className="mt-2 text-sm font-semibold text-gray-800">
                Animal: {alert.animalName}
              </p>

            )}

          </div>


          {/* DATA */}

          <div className="grid gap-3 sm:grid-cols-2">

            <InfoBox
              label="Related Reports"
              value={alert.reports}
            />


            <InfoBox
              label="Affected Animals"
              value={alert.animals}
            />

          </div>


          {/* ACTION */}

          <div className="rounded-lg bg-white/70 p-4">

            <p className="text-xs font-semibold text-gray-500">
              Recommended Response
            </p>


            <p className="mt-1 text-sm leading-6 text-gray-700">
              {alert.action}
            </p>

          </div>

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

    <div className="rounded-lg bg-white/70 p-4">

      <p className="text-xs text-gray-500">
        {label}
      </p>


      <p className="mt-1 text-lg font-bold text-gray-900">
        {value}
      </p>

    </div>

  );
}


export default VeterinaryAlerts;
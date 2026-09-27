import {
  ArrowLeft,
  AlertTriangle,
  MapPin,
  Activity,
  Users,
} from "lucide-react";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import { getVillageReports } from "../data/villageIntelligence";


function VeterinarySignals() {

  const [villages, setVillages] = useState([]);


  useEffect(() => {

    loadSignals();

    const handleFocus = () => {
      loadSignals();
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


  function loadSignals() {

    const data =
      getVillageReports();

    const sorted =
      data
        .slice()
        .sort((a, b) => {

          const levelOrder = {
            High: 3,
            Moderate: 2,
            Low: 1,
          };

          const levelDifference =
            (levelOrder[b.signalLevel] || 0) -
            (levelOrder[a.signalLevel] || 0);

          if (levelDifference !== 0) {
            return levelDifference;
          }

          return (
            b.reportCount -
            a.reportCount
          );

        });

    setVillages(sorted);

  }


  const highSignals =
    villages.filter(
      (village) =>
        village.signalLevel === "High"
    ).length;


  const moderateSignals =
    villages.filter(
      (village) =>
        village.signalLevel === "Moderate"
    ).length;


  const affectedAnimals =
    villages.reduce(
      (total, village) =>
        total +
        village.affectedAnimals,
      0
    );


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
          Veterinary Intelligence
        </p>


        <h1 className="mt-1 text-3xl font-bold text-gray-900">
          Health Signals
        </h1>


        <p className="mt-2 text-gray-600">
          Monitor village-level livestock health signals from farmer reports.
        </p>

      </div>


      {/* INFORMATION BANNER */}

      <div className="flex gap-3 rounded-xl border border-blue-100 bg-blue-50 p-5">

        <Activity
          size={21}
          className="mt-0.5 shrink-0 text-blue-700"
        />


        <div>

          <p className="font-semibold text-blue-900">
            Village-level health intelligence
          </p>


          <p className="mt-1 text-sm leading-6 text-blue-800">
            These signals are generated from reported livestock
            health observations. They help veterinary teams identify
            locations that may need closer monitoring.
          </p>

        </div>

      </div>


      {/* SUMMARY */}

      <div className="mt-6 grid gap-5 md:grid-cols-3">

        <SummaryCard
          icon={
            <AlertTriangle size={21} />
          }
          title="High Signals"
          value={highSignals}
          description="Require closer attention"
        />


        <SummaryCard
          icon={
            <Activity size={21} />
          }
          title="Moderate Signals"
          value={moderateSignals}
          description="Require monitoring"
        />


        <SummaryCard
          icon={
            <Users size={21} />
          }
          title="Affected Animals"
          value={affectedAnimals}
          description="Across reported villages"
        />

      </div>


      {/* VILLAGE SIGNALS */}

      <section className="mt-8 rounded-2xl border border-gray-200 bg-white">

        <div className="border-b border-gray-200 p-6">

          <h2 className="text-lg font-bold text-gray-900">
            Village Health Signals
          </h2>


          <p className="mt-1 text-sm text-gray-500">
            Locations are organized by reported health signal level.
          </p>

        </div>


        {villages.length === 0 ? (

          <div className="p-10 text-center">

            <MapPin
              size={42}
              className="mx-auto text-gray-300"
            />


            <h3 className="mt-4 font-semibold text-gray-900">
              No health signals yet
            </h3>


            <p className="mt-1 text-sm text-gray-500">
              Village signals will appear when farmer health reports are submitted.
            </p>

          </div>

        ) : (

          <div className="divide-y divide-gray-100">

            {villages.map(
              (village) => (

                <VillageSignalCard
                  key={village.village}
                  village={village}
                />

              )
            )}

          </div>

        )}

      </section>


      {/* DISCLAIMER */}

      <div className="mt-6 rounded-xl border border-yellow-100 bg-yellow-50 p-5">

        <p className="text-sm font-semibold text-yellow-900">
          Important
        </p>


        <p className="mt-1 text-sm leading-6 text-yellow-800">
          A health signal does not confirm an outbreak or disease.
          It represents a pattern in reported observations and should
          be reviewed by qualified veterinary professionals.
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
   VILLAGE SIGNAL CARD
========================================================= */

function VillageSignalCard({
  village,
}) {

  const signalStyle =
    village.signalLevel === "High"
      ? "bg-red-100 text-red-700"
      : village.signalLevel === "Moderate"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";


  return (

    <div className="p-6">

      <div className="flex flex-col gap-5">


        {/* HEADER */}

        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

          <div>

            <div className="flex flex-wrap items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">

                <MapPin size={20} />

              </div>


              <div>

                <h3 className="text-lg font-bold text-gray-900">
                  {village.village}
                </h3>


                <p className="text-sm text-gray-500">
                  Local livestock health signal
                </p>

              </div>

            </div>

          </div>


          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${signalStyle}`}
          >
            {village.signalLevel} Signal
          </span>

        </div>


        {/* STATISTICS */}

        <div className="grid gap-3 md:grid-cols-3">

          <InfoBox
            label="Health Reports"
            value={village.reportCount}
          />


          <InfoBox
            label="Affected Animals"
            value={village.affectedAnimals}
          />


          <InfoBox
            label="Severe Reports"
            value={village.severeReports}
          />

        </div>


        {/* TOP SYMPTOMS */}

        <div>

          <p className="text-sm font-semibold text-gray-700">
            Commonly Reported Symptoms
          </p>


          {village.topSymptoms?.length > 0 ? (

            <div className="mt-3 flex flex-wrap gap-2">

              {village.topSymptoms.map(
                ([symptom, count]) => (

                  <span
                    key={symptom}
                    className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700"
                  >
                    {symptom} · {count}
                  </span>

                )
              )}

            </div>

          ) : (

            <p className="mt-2 text-sm text-gray-400">
              No symptoms recorded.
            </p>

          )}

        </div>


        {/* RESPONSE NOTE */}

        <div className="rounded-xl bg-gray-50 p-4">

          <p className="text-xs font-semibold text-gray-500">
            Suggested Monitoring
          </p>


          <p className="mt-1 text-sm leading-6 text-gray-700">

            {village.signalLevel === "High"
              ? "Veterinary review and closer field-level monitoring recommended."
              : village.signalLevel === "Moderate"
              ? "Continue veterinary review and monitor additional reports."
              : "Continue routine monitoring of reported livestock health."}

          </p>

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


      <p className="mt-1 text-xl font-bold text-gray-900">
        {value}
      </p>

    </div>

  );
}


export default VeterinarySignals;
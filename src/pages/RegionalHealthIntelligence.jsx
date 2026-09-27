import {
  ArrowLeft,
  Map,
  MapPin,
  Activity,
  AlertTriangle,
  Users,
} from "lucide-react";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  getRegionalIntelligence,
} from "../data/regionalIntelligence";


function RegionalHealthIntelligence() {

  const [regionalData, setRegionalData] = useState({
    blocks: [],
    districts: [],
  });


  useEffect(() => {

    loadRegionalData();

    const handleFocus = () => {
      loadRegionalData();
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


  function loadRegionalData() {

    const data =
      getRegionalIntelligence();

    setRegionalData(data);

  }


  const {
    blocks,
    districts,
  } = regionalData;


  const totalReports =
    districts.reduce(
      (total, district) =>
        total + district.reportCount,
      0
    );


  const totalAnimals =
    districts.reduce(
      (total, district) =>
        total + district.affectedAnimals,
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
          Regional Surveillance
        </p>


        <h1 className="mt-1 text-3xl font-bold text-gray-900">
          Block & District Intelligence
        </h1>


        <p className="mt-2 max-w-3xl text-gray-600">
          Aggregate livestock health signals beyond the village level
          to support block and district-level veterinary planning.
        </p>

      </div>


      {/* SUMMARY */}

      <div className="grid gap-5 md:grid-cols-4">

        <SummaryCard
          icon={<Map size={21} />}
          title="Districts"
          value={districts.length}
          description="District areas monitored"
        />


        <SummaryCard
          icon={<MapPin size={21} />}
          title="Blocks"
          value={blocks.length}
          description="Blocks with reports"
        />


        <SummaryCard
          icon={<Activity size={21} />}
          title="Health Reports"
          value={totalReports}
          description="Reports across regions"
        />


        <SummaryCard
          icon={<Users size={21} />}
          title="Affected Animals"
          value={totalAnimals}
          description="Animals represented in reports"
        />

      </div>


      {/* EMPTY STATE */}

      {blocks.length === 0 && (

        <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">

          <Map
            size={42}
            className="mx-auto text-gray-300"
          />


          <h2 className="mt-4 text-lg font-bold text-gray-900">
            No regional health data yet
          </h2>


          <p className="mt-2 text-sm text-gray-500">
            Submit livestock health reports from farmer accounts
            to generate regional intelligence.
          </p>

        </div>

      )}


      {/* DISTRICT INTELLIGENCE */}

      {districts.length > 0 && (

        <section className="mt-8">

          <div className="mb-5">

            <h2 className="text-xl font-bold text-gray-900">
              District-Level Intelligence
            </h2>


            <p className="mt-1 text-sm text-gray-500">
              Higher-level aggregation of village and block health reports.
            </p>

          </div>


          <div className="grid gap-6 lg:grid-cols-2">

            {districts.map(
              (district) => (

                <DistrictCard
                  key={district.district}
                  district={district}
                />

              )
            )}

          </div>

        </section>

      )}


      {/* BLOCK INTELLIGENCE */}

      {blocks.length > 0 && (

        <section className="mt-10">

          <div className="mb-5">

            <h2 className="text-xl font-bold text-gray-900">
              Block-Level Intelligence
            </h2>


            <p className="mt-1 text-sm text-gray-500">
              Monitor emerging health patterns across multiple villages.
            </p>

          </div>


          <div className="grid gap-5 md:grid-cols-2">

            {blocks.map(
              (block) => (

                <BlockCard
                  key={block.block}
                  block={block}
                />

              )
            )}

          </div>

        </section>

      )}


      {/* DISCLAIMER */}

      <div className="mt-8 rounded-xl border border-yellow-100 bg-yellow-50 p-5">

        <p className="text-sm font-semibold text-yellow-900">
          Regional intelligence is decision support
        </p>


        <p className="mt-1 text-sm leading-6 text-yellow-800">
          Block and district signals are generated by aggregating
          reported livestock health observations. They do not
          independently confirm disease outbreaks and should be
          reviewed by veterinary authorities.
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
   DISTRICT CARD
========================================================= */

function DistrictCard({
  district,
}) {

  const signalStyle =
    district.signalLevel === "High"
      ? "bg-red-100 text-red-700"
      : district.signalLevel === "Moderate"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";


  return (

    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <div className="flex items-start justify-between gap-4">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700">

            <Map size={21} />

          </div>


          <div>

            <h3 className="text-lg font-bold text-gray-900">
              {district.district}
            </h3>


            <p className="text-sm text-gray-500">
              District health overview
            </p>

          </div>

        </div>


        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${signalStyle}`}
        >
          {district.signalLevel} Signal
        </span>

      </div>


      <div className="mt-6 grid grid-cols-2 gap-3">

        <InfoBox
          label="Blocks"
          value={district.blockCount}
        />


        <InfoBox
          label="Villages"
          value={district.villageCount}
        />


        <InfoBox
          label="Reports"
          value={district.reportCount}
        />


        <InfoBox
          label="Affected Animals"
          value={district.affectedAnimals}
        />

      </div>


      <div className="mt-5">

        <p className="text-sm font-semibold text-gray-700">
          Common Symptoms
        </p>


        <div className="mt-3 flex flex-wrap gap-2">

          {district.topSymptoms.map(
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

      </div>

    </div>

  );
}


/* =========================================================
   BLOCK CARD
========================================================= */

function BlockCard({
  block,
}) {

  const signalStyle =
    block.signalLevel === "High"
      ? "bg-red-100 text-red-700"
      : block.signalLevel === "Moderate"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";


  return (

    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <div className="flex items-start justify-between gap-4">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">

            <MapPin size={20} />

          </div>


          <div>

            <h3 className="font-bold text-gray-900">
              {block.block}
            </h3>


            <p className="text-xs text-gray-500">
              {block.district}
            </p>

          </div>

        </div>


        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${signalStyle}`}
        >
          {block.signalLevel}
        </span>

      </div>


      <div className="mt-5 grid grid-cols-3 gap-3">

        <InfoBox
          label="Villages"
          value={block.villageCount}
        />


        <InfoBox
          label="Reports"
          value={block.reportCount}
        />


        <InfoBox
          label="Animals"
          value={block.affectedAnimals}
        />

      </div>


      <div className="mt-5 rounded-xl bg-gray-50 p-4">

        <p className="text-xs font-semibold text-gray-500">
          Severe Reports
        </p>


        <p className="mt-1 text-lg font-bold text-gray-900">
          {block.severeReports}
        </p>

      </div>


      {block.topSymptoms.length > 0 && (

        <div className="mt-5">

          <p className="text-sm font-semibold text-gray-700">
            Common Symptoms
          </p>


          <div className="mt-3 flex flex-wrap gap-2">

            {block.topSymptoms.map(
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

        </div>

      )}

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

    <div className="rounded-lg bg-gray-50 p-3">

      <p className="text-xs text-gray-500">
        {label}
      </p>


      <p className="mt-1 text-lg font-bold text-gray-900">
        {value}
      </p>

    </div>

  );
}


export default RegionalHealthIntelligence;
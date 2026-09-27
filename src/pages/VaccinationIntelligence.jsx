import {
  Activity,
  AlertTriangle,
  CheckCircle,
  MapPin,
} from "lucide-react";

import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import { getVaccinationGap } from "../data/vaccinationGap";


function VaccinationIntelligence() {

  const [villages, setVillages] = useState([]);


  useEffect(() => {

    setVillages(getVaccinationGap());

  }, []);


  return (
    <DashboardLayout role="Veterinarian">

      {/* HEADER */}

      <div>

        <p className="text-sm font-medium text-green-700">
          Preventive Health
        </p>

        <h1 className="mt-1 text-3xl font-bold text-gray-900">
          Vaccination Gap Intelligence
        </h1>

        <p className="mt-2 max-w-2xl text-gray-600">
          Identify locations with lower recorded vaccination
          coverage so preventive action can be prioritized.
        </p>

      </div>


      {/* INFORMATION BANNER */}

      <div className="mt-6 flex gap-3 rounded-xl border border-blue-100 bg-blue-50 p-5">

        <Activity
          size={21}
          className="mt-0.5 shrink-0 text-blue-700"
        />

        <div>

          <p className="font-semibold text-blue-900">
            Vaccination coverage signal
          </p>

          <p className="mt-1 text-sm leading-6 text-blue-800">
            This view is based on vaccination records stored
            in MRIGARESHKA. It indicates coverage gaps and
            does not establish disease risk by itself.
          </p>

        </div>

      </div>


      {/* VILLAGE CARDS */}

      {villages.length === 0 ? (

        <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">

          <MapPin
            size={38}
            className="mx-auto text-gray-300"
          />

          <h2 className="mt-4 text-lg font-bold text-gray-900">
            No vaccination records found
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Add vaccination information to animal records
            to generate vaccination coverage intelligence.
          </p>

        </div>

      ) : (

        <div className="mt-8 grid gap-6 lg:grid-cols-2">

          {villages.map((village) => (

            <VaccinationCard
              key={village.village}
              village={village}
            />

          ))}

        </div>

      )}

    </DashboardLayout>
  );
}


/* VACCINATION CARD */

function VaccinationCard({ village }) {

  const high =
    village.riskLevel === "High";


  const moderate =
    village.riskLevel === "Moderate";


  const badgeColor =
    high
      ? "bg-red-100 text-red-700"
      : moderate
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";


  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      {/* HEADER */}

      <div className="flex items-center justify-between gap-4">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700">

            <MapPin size={21} />

          </div>

          <div>

            <h2 className="font-bold text-gray-900">
              {village.village}
            </h2>

            <p className="text-sm text-gray-500">
              Vaccination coverage
            </p>

          </div>

        </div>


        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeColor}`}
        >
          {village.riskLevel} Gap
        </span>

      </div>


      {/* COVERAGE */}

      <div className="mt-6">

        <div className="flex items-center justify-between">

          <p className="text-sm font-semibold text-gray-700">
            Vaccination Coverage
          </p>

          <p className="text-sm font-bold text-gray-900">
            {village.coverage}%
          </p>

        </div>


        <div className="mt-2 h-3 overflow-hidden rounded-full bg-gray-100">

          <div
            className="h-full rounded-full bg-green-600"
            style={{
              width: `${village.coverage}%`,
            }}
          />

        </div>

      </div>


      {/* STATISTICS */}

      <div className="mt-6 grid grid-cols-3 gap-3">

        <div className="rounded-lg bg-gray-50 p-3 text-center">

          <p className="text-xs text-gray-500">
            Animals
          </p>

          <p className="mt-1 font-bold text-gray-900">
            {village.totalAnimals}
          </p>

        </div>


        <div className="rounded-lg bg-green-50 p-3 text-center">

          <p className="text-xs text-green-700">
            Up to date
          </p>

          <p className="mt-1 font-bold text-green-800">
            {village.vaccinated}
          </p>

        </div>


        <div className="rounded-lg bg-red-50 p-3 text-center">

          <p className="text-xs text-red-700">
            Overdue
          </p>

          <p className="mt-1 font-bold text-red-800">
            {village.overdue}
          </p>

        </div>

      </div>


      {/* SIGNAL */}

      <div className="mt-5 flex items-center gap-2 rounded-lg bg-gray-50 p-3">

        {high || moderate ? (

          <AlertTriangle
            size={18}
            className="text-yellow-600"
          />

        ) : (

          <CheckCircle
            size={18}
            className="text-green-600"
          />

        )}


        <p className="text-xs text-gray-600">

          {high
            ? "Higher vaccination gap. Consider preventive outreach."
            : moderate
            ? "Moderate vaccination gap. Review records and follow-up."
            : "Recorded vaccination coverage is currently higher."}

        </p>

      </div>

    </div>
  );
}


export default VaccinationIntelligence;
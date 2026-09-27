import {
  AlertTriangle,
  Activity,
  MapPin,
  ShieldCheck,
  CloudSun,
  Droplets,
  Thermometer,
  CloudRain,
} from "lucide-react";

import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import { getVillageReports } from "../data/villageIntelligence";
import {
  getVillageWeather,
  calculateWeatherRisk,
} from "../data/weatherRisk";


function VillageHealthIntelligence() {

  const [villages, setVillages] = useState([]);


  useEffect(() => {

    loadVillageIntelligence();

  }, []);


  function loadVillageIntelligence() {

    const villageReports =
      getVillageReports();


    const combinedData =
      villageReports.map((village) => {

        const weather =
          getVillageWeather(
            village.village
          );

        const weatherRisk =
          calculateWeatherRisk(
            weather
          );

        return {
          ...village,
          weather,
          weatherRisk,
        };

      });


    setVillages(combinedData);

  }


  return (
    <DashboardLayout role="Veterinarian">

      {/* HEADER */}

      <div>

        <p className="text-sm font-medium text-green-700">
          Disease Surveillance
        </p>

        <h1 className="mt-1 text-3xl font-bold text-gray-900">
          Village Health Intelligence
        </h1>

        <p className="mt-2 max-w-2xl text-gray-600">
          Monitor local health signals by combining
          livestock health reports, locations,
          symptom patterns and environmental risk.
        </p>

      </div>


      {/* INFORMATION BANNER */}

      <div className="mt-6 flex gap-3 rounded-xl border border-blue-100 bg-blue-50 p-5">

        <ShieldCheck
          size={21}
          className="mt-0.5 shrink-0 text-blue-700"
        />

        <div>

          <p className="font-semibold text-blue-900">
            Early warning intelligence
          </p>

          <p className="mt-1 text-sm leading-6 text-blue-800">
            These signals combine reported livestock
            health patterns with environmental indicators
            to support veterinary investigation. They do
            not confirm a disease outbreak.
          </p>

        </div>

      </div>


      {/* EMPTY STATE */}

      {villages.length === 0 && (

        <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">

          <Activity
            size={35}
            className="mx-auto text-gray-300"
          />

          <h2 className="mt-4 text-lg font-bold text-gray-900">
            No village health reports yet
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Submit health reports from farmer accounts
            to generate village-level intelligence.
          </p>

        </div>

      )}


      {/* VILLAGES */}

      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        {villages.map((village) => (

          <VillageCard
            key={village.village}
            village={village}
          />

        ))}

      </div>


    </DashboardLayout>
  );
}


/* =========================================================
   VILLAGE CARD
========================================================= */

function VillageCard({ village }) {

  const isHigh =
    village.signalLevel === "High";

  const isModerate =
    village.signalLevel === "Moderate";


  const weatherRisk =
    village.weatherRisk?.level || "Unknown";


  const weatherRiskStyle =
    weatherRisk === "High"
      ? "border-red-200 bg-red-50 text-red-700"
      : weatherRisk === "Moderate"
      ? "border-yellow-200 bg-yellow-50 text-yellow-700"
      : weatherRisk === "Low"
      ? "border-green-200 bg-green-50 text-green-700"
      : "border-gray-200 bg-gray-50 text-gray-600";


  return (

    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      {/* HEADER */}

      <div className="flex items-start justify-between gap-4">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700">

            <MapPin size={21} />

          </div>

          <div>

            <h2 className="text-lg font-bold text-gray-900">
              {village.village}
            </h2>

            <p className="text-sm text-gray-500">
              Local livestock health signal
            </p>

          </div>

        </div>


        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            isHigh
              ? "bg-red-100 text-red-700"
              : isModerate
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {village.signalLevel} Signal
        </span>

      </div>


      {/* HEALTH STATISTICS */}

      <div className="mt-6 grid grid-cols-2 gap-4">

        <div className="rounded-xl bg-gray-50 p-4">

          <p className="text-xs text-gray-500">
            Health reports
          </p>

          <p className="mt-1 text-2xl font-bold text-gray-900">
            {village.reportCount}
          </p>

        </div>


        <div className="rounded-xl bg-gray-50 p-4">

          <p className="text-xs text-gray-500">
            Affected animals
          </p>

          <p className="mt-1 text-2xl font-bold text-gray-900">
            {village.affectedAnimals}
          </p>

        </div>

      </div>


      {/* TOP SYMPTOMS */}

      <div className="mt-6">

        <p className="text-sm font-semibold text-gray-700">
          Common reported symptoms
        </p>

        <div className="mt-3 flex flex-wrap gap-2">

          {village.topSymptoms?.map(
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


      {/* WEATHER RISK */}

      <div
        className={`mt-6 rounded-xl border p-5 ${weatherRiskStyle}`}
      >

        <div className="flex items-start gap-3">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/70">

            <CloudSun size={20} />

          </div>


          <div className="flex-1">

            <div className="flex flex-wrap items-center justify-between gap-2">

              <div>

                <p className="text-xs font-medium opacity-75">
                  Environmental Risk
                </p>

                <p className="mt-1 font-bold">
                  {weatherRisk} Weather Risk
                </p>

              </div>


              <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold">
                Score: {village.weatherRisk?.score || 0}
              </span>

            </div>


            {/* WEATHER VALUES */}

            {village.weather?.temperature !== null && (

              <div className="mt-4 grid grid-cols-3 gap-2">

                <WeatherValue
                  icon={<Thermometer size={14} />}
                  label="Temp"
                  value={`${village.weather.temperature}°C`}
                />


                <WeatherValue
                  icon={<Droplets size={14} />}
                  label="Humidity"
                  value={`${village.weather.humidity}%`}
                />


                <WeatherValue
                  icon={<CloudRain size={14} />}
                  label="Rainfall"
                  value={`${village.weather.rainfall} mm`}
                />

              </div>

            )}


            {/* WEATHER REASONS */}

            {village.weatherRisk?.reasons?.length > 0 && (

              <div className="mt-4">

                <p className="text-xs font-semibold opacity-80">
                  Risk indicators
                </p>

                <ul className="mt-2 space-y-1">

                  {village.weatherRisk.reasons.map(
                    (reason, index) => (

                      <li
                        key={index}
                        className="text-xs leading-5 opacity-80"
                      >
                        • {reason}
                      </li>

                    )
                  )}

                </ul>

              </div>

            )}

          </div>

        </div>

      </div>


      {/* SIGNAL */}

      <div
        className={`mt-6 rounded-xl border p-4 ${
          isHigh
            ? "border-red-200 bg-red-50"
            : isModerate
            ? "border-yellow-200 bg-yellow-50"
            : "border-green-200 bg-green-50"
        }`}
      >

        <div className="flex gap-3">

          <AlertTriangle
            size={20}
            className={
              isHigh
                ? "text-red-600"
                : isModerate
                ? "text-yellow-600"
                : "text-green-600"
            }
          />

          <div>

            <p className="font-semibold text-gray-900">

              {isHigh || isModerate
                ? "Potential local health signal"
                : "No significant cluster signal"}

            </p>

            <p className="mt-1 text-xs leading-5 text-gray-600">

              {isHigh || isModerate
                ? "Similar reports are being observed in this location. Veterinary review is recommended."
                : "Current reports do not show a strong local pattern."}

            </p>

          </div>

        </div>

      </div>


      {/* ACTION */}

      <button
        type="button"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 hover:border-green-600 hover:text-green-700"
      >

        <Activity size={17} />

        Review Village Reports

      </button>

    </div>

  );
}


/* =========================================================
   WEATHER VALUE
========================================================= */

function WeatherValue({
  icon,
  label,
  value,
}) {

  return (

    <div className="rounded-lg bg-white/60 p-2">

      <div className="flex items-center gap-1 text-xs opacity-70">
        {icon}
        {label}
      </div>

      <p className="mt-1 text-sm font-bold">
        {value}
      </p>

    </div>

  );
}


export default VillageHealthIntelligence;
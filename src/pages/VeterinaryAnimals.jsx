import {
  ArrowLeft,
  Search,
  PawPrint,
  MapPin,
  CalendarDays,
  Syringe,
  Activity,
} from "lucide-react";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import { getAnimals } from "../data/animals";
import { getVaccinationStatus } from "../data/vaccinationService";


function VeterinaryAnimals() {

  const [animals, setAnimals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {

    loadAnimals();

    const handleFocus = () => {
      loadAnimals();
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


  function loadAnimals() {
    setAnimals(getAnimals());
  }


  const filteredAnimals =
    animals.filter((animal) => {

      const search =
        searchTerm
          .toLowerCase()
          .trim();

      if (!search) {
        return true;
      }

      return (
        animal.name
          ?.toLowerCase()
          .includes(search) ||

        animal.species
          ?.toLowerCase()
          .includes(search) ||

        animal.breed
          ?.toLowerCase()
          .includes(search) ||

        animal.id
          ?.toLowerCase()
          .includes(search) ||

        animal.location
          ?.toLowerCase()
          .includes(search)
      );

    });


  const healthyAnimals =
    animals.filter(
      (animal) =>
        animal.status === "Healthy"
    ).length;


  const underReview =
    animals.filter(
      (animal) =>
        animal.status === "Under Review"
    ).length;


  const vaccinationDue =
    animals.filter(
      (animal) => {

        const vaccination =
          getVaccinationStatus(animal);

        return (
          vaccination.status ===
            "Due Soon" ||
          vaccination.status ===
            "Overdue"
        );

      }
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
          Livestock Records
        </p>


        <h1 className="mt-1 text-3xl font-bold text-gray-900">
          Animal Records
        </h1>


        <p className="mt-2 text-gray-600">
          View registered livestock and their current health and vaccination information.
        </p>

      </div>


      {/* SUMMARY */}

      <div className="grid gap-5 md:grid-cols-3">

        <SummaryCard
          icon={
            <PawPrint size={21} />
          }
          title="Registered Animals"
          value={animals.length}
          description="Animals in the system"
        />


        <SummaryCard
          icon={
            <Activity size={21} />
          }
          title="Healthy Animals"
          value={healthyAnimals}
          description="Currently marked healthy"
        />


        <SummaryCard
          icon={
            <Syringe size={21} />
          }
          title="Vaccination Attention"
          value={vaccinationDue}
          description="Due soon or overdue"
        />

      </div>


      {/* SEARCH */}

      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5">

        <div className="relative">

          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />


          <input
            type="text"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(
                event.target.value
              )
            }
            placeholder="Search by animal name, species, breed, ID or village..."
            className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
          />

        </div>

      </div>


      {/* ANIMAL LIST */}

      <section className="mt-6 rounded-2xl border border-gray-200 bg-white">

        <div className="border-b border-gray-200 p-6">

          <h2 className="text-lg font-bold text-gray-900">
            Registered Livestock
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {filteredAnimals.length} animal
            {filteredAnimals.length !== 1
              ? "s"
              : ""}{" "}
            displayed.
          </p>

        </div>


        {filteredAnimals.length === 0 ? (

          <div className="p-10 text-center">

            <PawPrint
              size={42}
              className="mx-auto text-gray-300"
            />


            <h3 className="mt-4 font-semibold text-gray-900">
              No animals found
            </h3>


            <p className="mt-1 text-sm text-gray-500">
              Try changing your search.
            </p>

          </div>

        ) : (

          <div className="divide-y divide-gray-100">

            {filteredAnimals.map(
              (animal) => (

                <AnimalRecord
                  key={animal.id}
                  animal={animal}
                />

              )
            )}

          </div>

        )}

      </section>


      {/* INFORMATION NOTE */}

      <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-5">

        <p className="text-sm font-semibold text-blue-900">
          Veterinary record view
        </p>

        <p className="mt-1 text-sm leading-6 text-blue-800">
          Animal information is retrieved from the registered
          livestock records used throughout MRIGARESHKA.
          Veterinary professionals should verify information
          during clinical assessment.
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
   ANIMAL RECORD
========================================================= */

function AnimalRecord({
  animal,
}) {

  const vaccination =
    getVaccinationStatus(animal);


  const healthStatus =
    animal.status || "Not recorded";


  const healthStatusStyle =
    healthStatus === "Healthy"
      ? "bg-green-100 text-green-700"
      : healthStatus === "Under Review"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-gray-100 text-gray-700";


  const vaccinationStyle =
    vaccination.status === "Overdue"
      ? "bg-red-100 text-red-700"
      : vaccination.status === "Due Soon"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";


  return (

    <div className="p-6">

      <div className="flex flex-col gap-5">


        {/* TOP */}

        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

          <div>

            <div className="flex flex-wrap items-center gap-3">

              <h3 className="text-lg font-bold text-gray-900">
                {animal.name}
              </h3>


              <span className="text-sm text-gray-500">
                {animal.species}
              </span>


              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${healthStatusStyle}`}
              >
                {healthStatus}
              </span>

            </div>


            <p className="mt-2 text-sm text-gray-500">
              {animal.breed || "Breed not recorded"} · ID:{" "}
              {animal.id}
            </p>

          </div>


          <Link
            to={`/farmer/animals/${animal.id}`}
            className="inline-flex items-center justify-center rounded-lg border border-green-700 px-4 py-2 text-sm font-semibold text-green-700 hover:bg-green-50"
          >
            View Health Passport
          </Link>

        </div>


        {/* DETAILS */}

        <div className="grid gap-3 md:grid-cols-4">

          <InfoBox
            label="Age"
            value={
              animal.age
                ? `${animal.age} years`
                : "Not recorded"
            }
          />


          <InfoBox
            label="Weight"
            value={
              animal.weight
                ? `${animal.weight} kg`
                : "Not recorded"
            }
          />


          <InfoBox
            label="Location"
            value={
              animal.location ||
              "Not recorded"
            }
            icon={
              <MapPin size={14} />
            }
          />


          <InfoBox
            label="Last Checkup"
            value={
              animal.lastCheckup
                ? new Date(
                    animal.lastCheckup
                  ).toLocaleDateString()
                : "Not recorded"
            }
            icon={
              <CalendarDays size={14} />
            }
          />

        </div>


        {/* VACCINATION */}

        <div className="rounded-xl bg-gray-50 p-4">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-green-700">

                <Syringe size={18} />

              </div>


              <div>

                <p className="text-xs text-gray-500">
                  Vaccination Status
                </p>


                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {vaccination.label}
                </p>

              </div>

            </div>


            <div className="flex items-center gap-3">

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${vaccinationStyle}`}
              >
                {vaccination.status}
              </span>


              {animal.nextVaccinationDate && (

                <span className="text-xs text-gray-500">

                  Next:{" "}
                  {new Date(
                    animal.nextVaccinationDate
                  ).toLocaleDateString()}

                </span>

              )}

            </div>

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
  icon,
}) {

  return (

    <div className="rounded-lg bg-gray-50 p-4">

      <p className="flex items-center gap-1 text-xs text-gray-500">

        {icon}

        {label}

      </p>


      <p className="mt-1 text-sm font-semibold text-gray-800">
        {value}
      </p>

    </div>

  );
}


export default VeterinaryAnimals;
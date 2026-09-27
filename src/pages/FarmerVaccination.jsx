import {
  ArrowLeft,
  CalendarDays,
  CheckCircle,
  Syringe,
  AlertTriangle,
} from "lucide-react";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import { getAnimals } from "../data/animals";
import { getVaccinationStatus } from "../data/vaccinationService";
import { useLanguage } from "../context/LanguageContext";


function FarmerVaccination() {

  const { language } = useLanguage();

  const [animals, setAnimals] = useState([]);


  /* =========================================================
     TRANSLATIONS
  ========================================================= */

  const text = {

    backToDashboard: {
      english: "Back to Dashboard",
      hindi: "डैशबोर्ड पर वापस जाएं",
    },

    preventiveAnimalCare: {
      english: "Preventive Animal Care",
      hindi: "निवारक पशु देखभाल",
    },

    vaccinationRecords: {
      english: "Vaccination Records",
      hindi: "टीकाकरण रिकॉर्ड",
    },

    vaccinationDescription: {
      english:
        "Track vaccination status and upcoming vaccination needs for your animals.",
      hindi:
        "अपने पशुओं की टीकाकरण स्थिति और आगामी टीकाकरण आवश्यकताओं को ट्रैक करें।",
    },

    upToDate: {
      english: "Up to Date",
      hindi: "अद्यतन",
    },

    animalsProtected: {
      english: "Animals protected",
      hindi: "सुरक्षित पशु",
    },

    dueSoon: {
      english: "Due Soon",
      hindi: "जल्द देय",
    },

    vaccinationApproaching: {
      english: "Vaccination approaching",
      hindi: "टीकाकरण की तिथि निकट है",
    },

    overdue: {
      english: "Overdue",
      hindi: "अतिदेय",
    },

    needsAttention: {
      english: "Needs attention",
      hindi: "ध्यान देने की आवश्यकता",
    },

    animalVaccinationStatus: {
      english: "Animal Vaccination Status",
      hindi: "पशु टीकाकरण स्थिति",
    },

    currentVaccinationInformation: {
      english:
        "Current vaccination information for your registered animals.",
      hindi:
        "आपके पंजीकृत पशुओं की वर्तमान टीकाकरण जानकारी।",
    },

    noAnimalsRegistered: {
      english: "No animals registered yet.",
      hindi: "अभी तक कोई पशु पंजीकृत नहीं है।",
    },

    addAnimal: {
      english: "Add Animal",
      hindi: "पशु जोड़ें",
    },

    vaccinationReminder: {
      english: "Vaccination reminder",
      hindi: "टीकाकरण अनुस्मारक",
    },

    vaccinationReminderText: {
      english:
        "Vaccination status shown here is based on the animal records in MRIGARESHKA. Confirm vaccination schedules and due dates with a qualified veterinary professional.",
      hindi:
        "यहां दिखाई गई टीकाकरण स्थिति MRIGARESHKA में मौजूद पशु रिकॉर्ड पर आधारित है। टीकाकरण कार्यक्रम और देय तिथियों की पुष्टि योग्य पशु चिकित्सा विशेषज्ञ से करें।",
    },

    breedNotRecorded: {
      english: "Breed not recorded",
      hindi: "नस्ल दर्ज नहीं है",
    },

    locationNotRecorded: {
      english: "Location not recorded",
      hindi: "स्थान दर्ज नहीं है",
    },

    nextVaccination: {
      english: "Next Vaccination",
      hindi: "अगला टीकाकरण",
    },

    notScheduled: {
      english: "Not scheduled",
      hindi: "निर्धारित नहीं है",
    },

    daysOverdue: {
      english: "days overdue",
      hindi: "दिन अतिदेय",
    },

    dueToday: {
      english: "Due today",
      hindi: "आज देय",
    },

    daysRemaining: {
      english: "days remaining",
      hindi: "दिन शेष",
    },

    viewPassport: {
      english: "View Passport",
      hindi: "पासपोर्ट देखें",
    },

    cow: {
      english: "Cow",
      hindi: "गाय",
    },

    buffalo: {
      english: "Buffalo",
      hindi: "भैंस",
    },

    goat: {
      english: "Goat",
      hindi: "बकरी",
    },

    sheep: {
      english: "Sheep",
      hindi: "भेड़",
    },

    other: {
      english: "Other",
      hindi: "अन्य",
    },

    upToDateStatus: {
      english: "Up to date",
      hindi: "अद्यतन",
    },

    dueSoonStatus: {
      english: "Due Soon",
      hindi: "जल्द देय",
    },

    overdueStatus: {
      english: "Overdue",
      hindi: "अतिदेय",
    },

  };


  /* =========================================================
     TRANSLATION HELPER
  ========================================================= */

  const t = (key) => {
    return (
      text[key]?.[language] ||
      text[key]?.english ||
      key
    );
  };


  /* =========================================================
     SPECIES TRANSLATION
  ========================================================= */

  const translateSpecies = (species) => {

    const speciesMap = {
      Cow: t("cow"),
      Buffalo: t("buffalo"),
      Goat: t("goat"),
      Sheep: t("sheep"),
      Other: t("other"),
    };

    return speciesMap[species] || species;

  };


  /* =========================================================
     LOAD ANIMALS
  ========================================================= */

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


  /* =========================================================
     VACCINATION STATUS
  ========================================================= */

  const statuses =
    animals.map((animal) => ({
      animal,
      vaccination:
        getVaccinationStatus(animal),
    }));


  const upToDate =
    statuses.filter(
      (item) =>
        item.vaccination.status ===
        "Up to date"
    ).length;


  const dueSoon =
    statuses.filter(
      (item) =>
        item.vaccination.status ===
        "Due Soon"
    ).length;


  const overdue =
    statuses.filter(
      (item) =>
        item.vaccination.status ===
        "Overdue"
    ).length;


  return (

    <DashboardLayout role="Farmer">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-8">

        <Link
          to="/farmer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-800"
        >
          <ArrowLeft size={16} />
          {t("backToDashboard")}
        </Link>


        <p className="mt-6 text-sm font-medium text-green-700">
          {t("preventiveAnimalCare")}
        </p>


        <h1 className="mt-1 text-3xl font-bold text-gray-900">
          {t("vaccinationRecords")}
        </h1>


        <p className="mt-2 text-gray-600">
          {t("vaccinationDescription")}
        </p>

      </div>


      {/* =====================================================
          SUMMARY
      ===================================================== */}

      <div className="grid gap-5 md:grid-cols-3">

        <VaccinationSummary
          icon={
            <CheckCircle size={21} />
          }
          title={t("upToDate")}
          value={upToDate}
          description={t("animalsProtected")}
        />


        <VaccinationSummary
          icon={
            <CalendarDays size={21} />
          }
          title={t("dueSoon")}
          value={dueSoon}
          description={t("vaccinationApproaching")}
        />


        <VaccinationSummary
          icon={
            <AlertTriangle size={21} />
          }
          title={t("overdue")}
          value={overdue}
          description={t("needsAttention")}
        />

      </div>


      {/* =====================================================
          ANIMAL RECORDS
      ===================================================== */}

      <section className="mt-8 rounded-2xl border border-gray-200 bg-white">

        <div className="border-b border-gray-200 p-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">

              <Syringe size={20} />

            </div>


            <div>

              <h2 className="font-bold text-gray-900">
                {t("animalVaccinationStatus")}
              </h2>

              <p className="text-sm text-gray-500">
                {t("currentVaccinationInformation")}
              </p>

            </div>

          </div>

        </div>


        {statuses.length === 0 ? (

          <div className="p-10 text-center">

            <p className="text-sm text-gray-500">
              {t("noAnimalsRegistered")}
            </p>

            <Link
              to="/farmer/animals/add"
              className="mt-4 inline-flex rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white"
            >
              {t("addAnimal")}
            </Link>

          </div>

        ) : (

          <div className="divide-y divide-gray-100">

            {statuses.map(
              ({
                animal,
                vaccination,
              }) => (

                <VaccinationRow
                  key={animal.id}
                  animal={animal}
                  vaccination={vaccination}
                  t={t}
                  language={language}
                  translateSpecies={translateSpecies}
                />

              )
            )}

          </div>

        )}

      </section>


      {/* =====================================================
          REMINDER
      ===================================================== */}

      <div className="mt-6 rounded-xl border border-yellow-100 bg-yellow-50 p-5">

        <p className="text-sm font-semibold text-yellow-900">
          {t("vaccinationReminder")}
        </p>

        <p className="mt-1 text-sm leading-6 text-yellow-800">
          {t("vaccinationReminderText")}
        </p>

      </div>

    </DashboardLayout>

  );
}


/* =========================================================
   SUMMARY
========================================================= */

function VaccinationSummary({
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
   VACCINATION ROW
========================================================= */

function VaccinationRow({
  animal,
  vaccination,
  t,
  language,
  translateSpecies,
}) {

  const statusStyle =
    vaccination.status === "Overdue"
      ? "bg-red-100 text-red-700"
      : vaccination.status === "Due Soon"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";


  /* =======================================================
     TRANSLATE VACCINATION LABEL
  ======================================================= */

  const translatedLabel =
    vaccination.status === "Overdue"
      ? t("overdueStatus")
      : vaccination.status === "Due Soon"
      ? t("dueSoonStatus")
      : vaccination.status === "Up to date"
      ? t("upToDateStatus")
      : vaccination.label;


  /* =======================================================
     NEXT VACCINATION DATE
  ======================================================= */

  const formattedDate =
    animal.nextVaccinationDate
      ? new Date(
          animal.nextVaccinationDate
        ).toLocaleDateString(
          language === "hindi"
            ? "hi-IN"
            : "en-IN"
        )
      : t("notScheduled");


  return (

    <div className="p-6">

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <div className="flex flex-wrap items-center gap-3">

            <h3 className="text-lg font-bold text-gray-900">
              {animal.name}
            </h3>


            <span className="text-sm text-gray-500">
              {translateSpecies(animal.species)}
            </span>


            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle}`}
            >
              {translatedLabel}
            </span>

          </div>


          <p className="mt-2 text-sm text-gray-500">

            {animal.breed ||
              t("breedNotRecorded")}

            {" · "}

            {animal.location ||
              t("locationNotRecorded")}

          </p>

        </div>


        <div className="rounded-xl bg-gray-50 p-4 lg:min-w-52">

          <p className="text-xs text-gray-500">
            {t("nextVaccination")}
          </p>


          <p className="mt-1 font-semibold text-gray-900">
            {formattedDate}
          </p>


          {vaccination.daysUntilDue !== null && (

            <p className="mt-1 text-xs text-gray-500">

              {vaccination.daysUntilDue < 0
                ? `${Math.abs(
                    vaccination.daysUntilDue
                  )} ${t("daysOverdue")}`

                : vaccination.daysUntilDue === 0
                ? t("dueToday")

                : `${vaccination.daysUntilDue} ${t(
                    "daysRemaining"
                  )}`}

            </p>

          )}

        </div>


        <Link
          to={`/farmer/animals/${animal.id}`}
          className="inline-flex items-center justify-center rounded-lg border border-green-700 px-4 py-2 text-sm font-semibold text-green-700 hover:bg-green-50"
        >
          {t("viewPassport")}
        </Link>

      </div>

    </div>

  );
}


export default FarmerVaccination;
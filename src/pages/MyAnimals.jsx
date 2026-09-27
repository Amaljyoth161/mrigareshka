import {
  Plus,
  Search,
  PawPrint,
  MapPin,
  CalendarDays,
  ArrowRight,
  Activity,
} from "lucide-react";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { getAnimals } from "../data/animals";
import { getVaccinationStatus } from "../data/vaccinationService";
import { useLanguage } from "../context/LanguageContext";


// ======================================================
// TRANSLATIONS
// ======================================================

const text = {
  english: {
    livestockManagement: "Livestock Management",
    myAnimals: "My Animals",
    description:
      "View your registered livestock, monitor vaccination status and access individual animal health records.",
    addAnimal: "Add Animal",

    searchPlaceholder:
      "Search by name, species, breed or ID...",

    totalAnimals: "Total animals",

    showing: "Showing",
    result: "result(s) for",

    noAnimals: "No animals found",
    noAnimalsDescription:
      "Try searching with a different animal name, species, breed or animal ID.",

    animalId: "Animal ID",
    notRecorded: "Not recorded",

    age: "Age",
    years: "years",
    weight: "Weight",
    kg: "kg",
    sex: "Sex",
    vaccination: "Vaccination",

    lastCheckup: "Last check-up",

    viewPassport: "View Animal Health Passport",

    vaccinationStatus: "Vaccination Status",
    vaccinationReminder: "Vaccination Reminder",

    nextVaccinationIn: "Next vaccination in",
    dueIn: "Due in",
    days: "days.",

    healthy: "Healthy",
    underReview: "Under Review",

    upToDate: "Up to date",
    dueSoon: "Due Soon",
    overdue: "Overdue",
    due: "Due",

    male: "Male",
    female: "Female",

    cow: "Cow",
    buffalo: "Buffalo",
    goat: "Goat",
    sheep: "Sheep",
    other: "Other",

    jersey: "Jersey",
    holsteinFriesian: "Holstein Friesian",
    murrah: "Murrah",
    gir: "Gir",
    malabari: "Malabari",

    villageA: "Village A",
    villageB: "Village B",
    villageC: "Village C",
  },

  hindi: {
    livestockManagement: "पशुधन प्रबंधन",
    myAnimals: "मेरे पशु",
    description:
      "अपने पंजीकृत पशुओं को देखें, टीकाकरण की स्थिति की निगरानी करें और प्रत्येक पशु के स्वास्थ्य रिकॉर्ड तक पहुँचें।",
    addAnimal: "पशु जोड़ें",

    searchPlaceholder:
      "नाम, प्रजाति, नस्ल या आईडी से खोजें...",

    totalAnimals: "कुल पशु",

    showing: "दिखाए जा रहे हैं",
    result: "परिणाम",

    noAnimals: "कोई पशु नहीं मिला",
    noAnimalsDescription:
      "किसी अन्य पशु के नाम, प्रजाति, नस्ल या पशु आईडी से खोजने का प्रयास करें।",

    animalId: "पशु आईडी",
    notRecorded: "रिकॉर्ड नहीं किया गया",

    age: "आयु",
    years: "वर्ष",
    weight: "वजन",
    kg: "किग्रा",
    sex: "लिंग",
    vaccination: "टीकाकरण",

    lastCheckup: "अंतिम स्वास्थ्य जाँच",

    viewPassport: "पशु स्वास्थ्य पासपोर्ट देखें",

    vaccinationStatus: "टीकाकरण स्थिति",
    vaccinationReminder: "टीकाकरण अनुस्मारक",

    nextVaccinationIn: "अगला टीकाकरण",
    dueIn: "देय है",
    days: "दिन में।",

    healthy: "स्वस्थ",
    underReview: "समीक्षा के अधीन",

    upToDate: "अद्यतन",
    dueSoon: "जल्द देय",
    overdue: "अतिदेय",
    due: "देय",

    male: "नर",
    female: "मादा",

    cow: "गाय",
    buffalo: "भैंस",
    goat: "बकरी",
    sheep: "भेड़",
    other: "अन्य",

    jersey: "जर्सी",
    holsteinFriesian: "होल्स्टीन फ़्रिज़ियन",
    murrah: "मुर्रा",
    gir: "गिर",
    malabari: "मालाबारी",

    villageA: "गाँव A",
    villageB: "गाँव B",
    villageC: "गाँव C",
  },
};


// ======================================================
// DYNAMIC DISPLAY TRANSLATIONS
// ======================================================

function getDisplayValue(value, language, translations) {
  if (!value) return translations.notRecorded;

  const map = {
    Healthy: translations.healthy,
    "Under Review": translations.underReview,

    "Up to date": translations.upToDate,
    "Due Soon": translations.dueSoon,
    Overdue: translations.overdue,
    Due: translations.due,

    Male: translations.male,
    Female: translations.female,

    Cow: translations.cow,
    Buffalo: translations.buffalo,
    Goat: translations.goat,
    Sheep: translations.sheep,
    Other: translations.other,

    Jersey: translations.jersey,
    "Holstein Friesian": translations.holsteinFriesian,
    Murrah: translations.murrah,
    Gir: translations.gir,
    Malabari: translations.malabari,

    "Village A": translations.villageA,
    "Village B": translations.villageB,
    "Village C": translations.villageC,
  };

  return map[value] || value;
}


function getAnimalName(name, language) {
  if (language === "hindi") {
    const names = {
      Lakshmi: "लक्ष्मी",
      Ganga: "गंगा",
      Kali: "काली",
      Raja: "राजा",
      Meena: "मीना",
    };

    return names[name] || name;
  }

  return name;
}


// ======================================================
// MY ANIMALS
// ======================================================

function MyAnimals() {
  const { language } = useLanguage();

  const t = text[language];

  const [animals, setAnimals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    setAnimals(getAnimals());
  }, []);


  const filteredAnimals = animals.filter((animal) => {
    const search = searchTerm.toLowerCase().trim();

    return (
      animal.name
        .toLowerCase()
        .includes(search) ||

      animal.species
        .toLowerCase()
        .includes(search) ||

      animal.breed
        .toLowerCase()
        .includes(search) ||

      animal.id
        .toLowerCase()
        .includes(search)
    );
  });


  return (
    <DashboardLayout role="Farmer">

      {/* PAGE HEADER */}

      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

        <div>

          <p className="text-sm font-medium text-green-700">
            {t.livestockManagement}
          </p>

          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            {t.myAnimals}
          </h1>

          <p className="mt-2 max-w-2xl text-gray-600">
            {t.description}
          </p>

        </div>


        {/* ADD ANIMAL */}

        <Link
          to="/farmer/animals/add"
          className="flex w-fit items-center gap-2 rounded-lg bg-green-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-green-800"
        >

          <Plus size={18} />

          {t.addAnimal}

        </Link>

      </div>


      {/* SEARCH + SUMMARY */}

      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        {/* SEARCH */}

        <div className="relative w-full md:max-w-md">

          <Search
            size={19}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
            placeholder={t.searchPlaceholder}
            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
          />

        </div>


        {/* TOTAL */}

        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-5 py-3">

          <PawPrint
            size={18}
            className="text-green-700"
          />

          <span className="text-sm text-gray-500">
            {t.totalAnimals}
          </span>

          <span className="font-bold text-gray-900">
            {animals.length}
          </span>

        </div>

      </div>


      {/* SEARCH STATUS */}

      {searchTerm && (

        <p className="mt-5 text-sm text-gray-500">

          {t.showing}{" "}

          <span className="font-semibold text-gray-800">
            {filteredAnimals.length}
          </span>

          {" "}

          {language === "english"
            ? `${t.result} `
            : `${t.result} के लिए `}

          <span className="font-semibold text-gray-800">
            "{searchTerm}"
          </span>

        </p>

      )}


      {/* EMPTY STATE */}

      {filteredAnimals.length === 0 && (

        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-10 text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-500">

            <PawPrint size={26} />

          </div>


          <h2 className="mt-4 text-lg font-bold text-gray-900">
            {t.noAnimals}
          </h2>


          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
            {t.noAnimalsDescription}
          </p>

        </div>

      )}


      {/* ANIMAL LIST */}

      {filteredAnimals.length > 0 && (

        <div className="mt-6 grid gap-5 lg:grid-cols-2">

          {filteredAnimals.map((animal) => (

            <AnimalCard
              key={animal.id}
              animal={animal}
              language={language}
              t={t}
            />

          ))}

        </div>

      )}

    </DashboardLayout>
  );
}


// ======================================================
// ANIMAL CARD
// ======================================================

function AnimalCard({ animal, language, t }) {

  const healthy =
    animal.status === "Healthy";


  return (

    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-green-200 hover:shadow-md">

      {/* HEADER */}

      <div className="flex items-start justify-between gap-4">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">

            <PawPrint size={27} />

          </div>


          <div>

            <h2 className="text-lg font-bold text-gray-900">
              {getAnimalName(animal.name, language)}
            </h2>

            <p className="text-sm text-gray-500">
              {getDisplayValue(animal.species, language, t)}
              {" · "}
              {getDisplayValue(animal.breed, language, t)}
            </p>

            <p className="mt-1 text-xs text-gray-400">
              {t.animalId}: {animal.id}
            </p>

          </div>

        </div>


        {/* STATUS */}

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
            healthy
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >

          {getDisplayValue(
            animal.status,
            language,
            t
          )}

        </span>

      </div>


      {/* BASIC DETAILS */}

      <div className="mt-6 grid grid-cols-2 gap-4">

        <Detail
          label={t.age}
          value={
            animal.age
              ? `${animal.age} ${t.years}`
              : t.notRecorded
          }
        />

        <Detail
          label={t.weight}
          value={
            animal.weight
              ? `${animal.weight} ${t.kg}`
              : t.notRecorded
          }
        />

        <Detail
          label={t.sex}
          value={getDisplayValue(
            animal.sex,
            language,
            t
          )}
        />

        <Detail
          label={t.vaccination}
          value={getDisplayValue(
            animal.vaccinationStatus,
            language,
            t
          )}
        />

      </div>


      {/* LOCATION */}

      <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">

        <MapPin
          size={16}
          className="shrink-0 text-green-700"
        />

        <span>
          {getDisplayValue(
            animal.location,
            language,
            t
          )}
        </span>

      </div>


      {/* LAST CHECKUP */}

      <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">

        <CalendarDays
          size={16}
          className="shrink-0 text-green-700"
        />

        <span>
          {t.lastCheckup}:{" "}
          {animal.lastCheckup || t.notRecorded}
        </span>

      </div>


      {/* VACCINATION REMINDER */}

      <VaccinationReminder
        animal={animal}
        language={language}
        t={t}
      />


      {/* PROFILE BUTTON */}

      <Link
        to={`/farmer/animals/${animal.id}`}
        className="mt-6 flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-green-600 hover:bg-green-50 hover:text-green-700"
      >

        {t.viewPassport}

        <ArrowRight size={17} />

      </Link>

    </div>
  );
}


// ======================================================
// DETAIL
// ======================================================

function Detail({
  label,
  value,
}) {

  return (

    <div className="rounded-lg bg-gray-50 p-3">

      <p className="text-xs text-gray-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-gray-800">
        {value || "Not recorded"}
      </p>

    </div>

  );
}


// ======================================================
// VACCINATION REMINDER
// ======================================================

function VaccinationReminder({
  animal,
  language,
  t,
}) {

  const vaccination =
    getVaccinationStatus(animal);


  const isOverdue =
    vaccination.status === "Overdue";


  const isDueSoon =
    vaccination.status === "Due Soon";


  /* UP TO DATE */

  if (
    vaccination.status ===
    "Up to date"
  ) {

    return (

      <div className="mt-4 rounded-lg border border-green-100 bg-green-50 p-3">

        <div className="flex items-center gap-2">

          <Activity
            size={15}
            className="text-green-700"
          />

          <p className="text-xs font-semibold text-green-800">
            {t.vaccinationStatus}
          </p>

        </div>


        <p className="mt-1 text-sm text-green-700">
          {getDisplayValue(
            vaccination.status,
            language,
            t
          )}
        </p>


        {vaccination.daysUntilDue !== null && (

          <p className="mt-1 text-xs text-green-600">

            {t.nextVaccinationIn}{" "}

            <span className="font-semibold">
              {vaccination.daysUntilDue}
            </span>

            {" "}

            {t.days}

          </p>

        )}

      </div>

    );
  }


  /* OVERDUE / DUE SOON */

  return (

    <div
      className={`mt-4 rounded-lg border p-3 ${
        isOverdue
          ? "border-red-100 bg-red-50"
          : isDueSoon
          ? "border-yellow-100 bg-yellow-50"
          : "border-gray-200 bg-gray-50"
      }`}
    >

      <p
        className={`text-xs font-semibold ${
          isOverdue
            ? "text-red-800"
            : "text-yellow-800"
        }`}
      >
        {t.vaccinationReminder}
      </p>


      <p
        className={`mt-1 text-sm ${
          isOverdue
            ? "text-red-700"
            : "text-yellow-700"
        }`}
      >
        {getDisplayValue(
          vaccination.status,
          language,
          t
        )}
      </p>


      {vaccination.daysUntilDue !== null && (

        <p className="mt-1 text-xs text-gray-600">

          {t.dueIn}{" "}

          <span className="font-semibold">
            {Math.abs(vaccination.daysUntilDue)}
          </span>

          {" "}

          {t.days}

        </p>

      )}

    </div>

  );
}


export default MyAnimals;
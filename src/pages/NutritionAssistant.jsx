import {
  ArrowLeft,
  Droplets,
  Leaf,
  PawPrint,
  ShieldAlert,
  Utensils,
} from "lucide-react";

import { Link, useParams } from "react-router-dom";

import { getAnimals } from "../data/animals";
import { getNutritionGuidance } from "../data/nutritionRules";
import DashboardLayout from "../layouts/DashboardLayout";

import { useLanguage } from "../context/LanguageContext";


// ======================================================
// TRANSLATIONS
// ======================================================

const text = {
  english: {
    farmerSupport: "Farmer Support",
    title: "Feed & Nutrition Assistant",
    description:
      "Basic feeding guidance based on the recorded information for your animal.",

    backToProfile: "Back to Animal Profile",
    animalNotFound: "Animal not found",
    backToAnimals: "Back to My Animals",

    age: "Age",
    years: "years",
    weight: "Weight",
    kg: "kg",
    location: "Location",

    suggestedFeedTypes: "Suggested Feed Types",
    feedDescription:
      "General feed categories for this animal.",

    waterGuidance: "Water Guidance",

    nutritionNotes: "Nutrition Notes",

    importantNotice: "Important nutrition notice",
    notice:
      "This assistant provides general educational guidance. It does not calculate a veterinary diet or replace advice from a qualified veterinarian or animal nutrition professional.",

    notRecorded: "Not recorded",

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
    farmerSupport: "किसान सहायता",
    title: "चारा और पोषण सहायक",
    description:
      "आपके पशु के रिकॉर्ड की गई जानकारी के आधार पर सामान्य आहार संबंधी मार्गदर्शन।",

    backToProfile: "पशु प्रोफ़ाइल पर वापस जाएँ",
    animalNotFound: "पशु नहीं मिला",
    backToAnimals: "मेरे पशुओं पर वापस जाएँ",

    age: "आयु",
    years: "वर्ष",
    weight: "वजन",
    kg: "किग्रा",
    location: "स्थान",

    suggestedFeedTypes: "सुझाए गए चारे के प्रकार",
    feedDescription:
      "इस पशु के लिए सामान्य चारा श्रेणियाँ।",

    waterGuidance: "पानी संबंधी मार्गदर्शन",

    nutritionNotes: "पोषण संबंधी सुझाव",

    importantNotice: "महत्वपूर्ण पोषण सूचना",
    notice:
      "यह सहायक सामान्य शैक्षिक मार्गदर्शन प्रदान करता है। यह पशु चिकित्सा आहार की गणना नहीं करता और योग्य पशु चिकित्सक या पशु पोषण विशेषज्ञ की सलाह का विकल्प नहीं है।",

    notRecorded: "रिकॉर्ड नहीं किया गया",

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

function translateAnimalValue(value, language, t) {
  if (!value) return t.notRecorded;

  const translations = {
    Cow: t.cow,
    Buffalo: t.buffalo,
    Goat: t.goat,
    Sheep: t.sheep,
    Other: t.other,

    Jersey: t.jersey,
    "Holstein Friesian": t.holsteinFriesian,
    Murrah: t.murrah,
    Gir: t.gir,
    Malabari: t.malabari,

    "Village A": t.villageA,
    "Village B": t.villageB,
    "Village C": t.villageC,
  };

  return translations[value] || value;
}


function translateAnimalName(name, language) {
  if (language !== "hindi") {
    return name;
  }

  const names = {
    Lakshmi: "लक्ष्मी",
    Ganga: "गंगा",
    Kali: "काली",
    Raja: "राजा",
    Meena: "मीना",
  };

  return names[name] || name;
}


// ======================================================
// NUTRITION CONTENT TRANSLATIONS
// ======================================================

function translateNutritionText(value, language) {
  if (!value || language === "english") {
    return value;
  }

  const exactTranslations = {

    "Green fodder":
      "हरा चारा",

    "Dry fodder":
      "सूखा चारा",

    "Concentrate feed":
      "सांद्रित आहार",

    "Mineral mixture":
      "खनिज मिश्रण",

    "Fresh grass":
      "ताज़ी घास",

    "Legume fodder":
      "दलहनी चारा",

    "Clean drinking water":
      "स्वच्छ पीने का पानी",

    "Clean drinking water should always be available.":
      "स्वच्छ पीने का पानी हमेशा उपलब्ध होना चाहिए।",

    "Provide clean drinking water throughout the day.":
      "पूरे दिन स्वच्छ पीने का पानी उपलब्ध कराएँ।",

    "Ensure access to clean drinking water at all times.":
      "हर समय स्वच्छ पीने के पानी की उपलब्धता सुनिश्चित करें।",

    "Feed should be fresh and free from mould.":
      "चारा ताज़ा और फफूंद से मुक्त होना चाहिए।",

    "Avoid sudden changes in feed.":
      "चारे में अचानक बदलाव से बचें।",

    "Provide balanced nutrition according to the animal's age and condition.":
      "पशु की आयु और स्थिति के अनुसार संतुलित पोषण दें।",

    "Do not feed spoiled or mouldy feed.":
      "खराब या फफूंद लगे चारे को न खिलाएँ।",

    "Monitor the animal's appetite and activity.":
      "पशु की भूख और गतिविधि पर नज़र रखें।",

    "Consult a veterinarian if the animal shows signs of illness.":
      "यदि पशु में बीमारी के लक्षण दिखाई दें तो पशु चिकित्सक से सलाह लें।",
  };

  if (exactTranslations[value]) {
    return exactTranslations[value];
  }

  /*
   * Common individual terms.
   * Unknown content is kept unchanged so that
   * existing nutritionRules data is never broken.
   */

  const wordTranslations = [
    ["Green fodder", "हरा चारा"],
    ["Dry fodder", "सूखा चारा"],
    ["Concentrate feed", "सांद्रित आहार"],
    ["Mineral mixture", "खनिज मिश्रण"],
    ["Fresh grass", "ताज़ी घास"],
    ["Legume fodder", "दलहनी चारा"],
    ["clean drinking water", "स्वच्छ पीने का पानी"],
    ["Clean drinking water", "स्वच्छ पीने का पानी"],
    ["fresh", "ताज़ा"],
    ["feed", "चारा"],
    ["water", "पानी"],
    ["nutrition", "पोषण"],
    ["animal", "पशु"],
    ["animals", "पशुओं"],
    ["age", "आयु"],
    ["weight", "वजन"],
    ["healthy", "स्वस्थ"],
    ["health", "स्वास्थ्य"],
    ["day", "दिन"],
    ["days", "दिन"],
  ];

  let translated = value;

  wordTranslations.forEach(([english, hindi]) => {
    translated = translated.replace(
      new RegExp(english, "gi"),
      hindi
    );
  });

  return translated;
}


// ======================================================
// NUTRITION ASSISTANT
// ======================================================

function NutritionAssistant() {

  const { language } = useLanguage();

  const t = text[language];

  const { animalId } = useParams();

  const animals = getAnimals();

  const animal = animals.find(
    (item) => item.id === animalId
  );


  // ====================================================
  // ANIMAL NOT FOUND
  // ====================================================

  if (!animal) {

    return (
      <DashboardLayout role="Farmer">

        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">

          <PawPrint
            size={40}
            className="mx-auto text-gray-300"
          />

          <h1 className="mt-4 text-xl font-bold text-gray-900">
            {t.animalNotFound}
          </h1>

          <Link
            to="/farmer/animals"
            className="mt-5 inline-flex rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white"
          >
            {t.backToAnimals}
          </Link>

        </div>

      </DashboardLayout>
    );

  }


  const guidance =
    getNutritionGuidance(animal);


  return (
    <DashboardLayout role="Farmer">

      {/* ================================================= */}
      {/* BACK */}
      {/* ================================================= */}

      <Link
        to={`/farmer/animals/${animal.id}`}
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-green-700"
      >

        <ArrowLeft size={17} />

        {t.backToProfile}

      </Link>


      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="mt-6">

        <p className="text-sm font-medium text-green-700">
          {t.farmerSupport}
        </p>

        <h1 className="mt-1 text-3xl font-bold text-gray-900">
          {t.title}
        </h1>

        <p className="mt-2 max-w-2xl text-gray-600">
          {t.description}
        </p>

      </div>


      {/* ================================================= */}
      {/* ANIMAL CARD */}
      {/* ================================================= */}

      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 text-green-700">

            <PawPrint size={27} />

          </div>

          <div>

            <h2 className="text-xl font-bold text-gray-900">
              {translateAnimalName(
                animal.name,
                language
              )}
            </h2>

            <p className="text-sm text-gray-500">

              {translateAnimalValue(
                animal.species,
                language,
                t
              )}

              {" · "}

              {translateAnimalValue(
                animal.breed,
                language,
                t
              )}

            </p>

          </div>

        </div>


        {/* ================================================= */}
        {/* ANIMAL DETAILS */}
        {/* ================================================= */}

        <div className="mt-6 grid gap-4 sm:grid-cols-3">

          <Info
            label={t.age}
            value={
              animal.age
                ? `${animal.age} ${t.years}`
                : t.notRecorded
            }
          />

          <Info
            label={t.weight}
            value={
              animal.weight
                ? `${animal.weight} ${t.kg}`
                : t.notRecorded
            }
          />

          <Info
            label={t.location}
            value={translateAnimalValue(
              animal.location,
              language,
              t
            )}
          />

        </div>

      </div>


      {/* ================================================= */}
      {/* FEED GUIDANCE */}
      {/* ================================================= */}

      <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">

            <Utensils size={20} />

          </div>

          <div>

            <h2 className="text-lg font-bold text-gray-900">
              {t.suggestedFeedTypes}
            </h2>

            <p className="text-sm text-gray-500">
              {t.feedDescription}
            </p>

          </div>

        </div>


        <div className="mt-6 grid gap-4 sm:grid-cols-2">

          {guidance.feedTypes.map(
            (feed, index) => (

              <div
                key={`${feed}-${index}`}
                className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4"
              >

                <Leaf
                  size={19}
                  className="text-green-700"
                />

                <span className="text-sm font-semibold text-gray-800">

                  {translateNutritionText(
                    feed,
                    language
                  )}

                </span>

              </div>

            )
          )}

        </div>

      </section>


      {/* ================================================= */}
      {/* WATER */}
      {/* ================================================= */}

      <section className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-6">

        <div className="flex gap-3">

          <Droplets
            size={22}
            className="mt-0.5 shrink-0 text-blue-700"
          />

          <div>

            <h2 className="font-bold text-blue-900">
              {t.waterGuidance}
            </h2>

            <p className="mt-2 text-sm leading-6 text-blue-800">

              {translateNutritionText(
                guidance.water,
                language
              )}

            </p>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* NOTES */}
      {/* ================================================= */}

      <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">

        <h2 className="text-lg font-bold text-gray-900">
          {t.nutritionNotes}
        </h2>

        <div className="mt-4 space-y-3">

          {guidance.notes.map(
            (note, index) => (

              <div
                key={index}
                className="rounded-lg bg-gray-50 p-4"
              >

                <p className="text-sm leading-6 text-gray-700">

                  {translateNutritionText(
                    note,
                    language
                  )}

                </p>

              </div>

            )
          )}

        </div>

      </section>


      {/* ================================================= */}
      {/* SAFETY NOTICE */}
      {/* ================================================= */}

      <div className="mt-6 flex gap-3 rounded-xl border border-yellow-100 bg-yellow-50 p-5">

        <ShieldAlert
          size={21}
          className="mt-0.5 shrink-0 text-yellow-700"
        />

        <div>

          <p className="text-sm font-semibold text-yellow-800">
            {t.importantNotice}
          </p>

          <p className="mt-1 text-sm leading-6 text-yellow-700">
            {t.notice}
          </p>

        </div>

      </div>

    </DashboardLayout>
  );
}


// ======================================================
// INFORMATION CARD
// ======================================================

function Info({ label, value }) {

  return (
    <div className="rounded-lg bg-gray-50 p-4">

      <p className="text-xs text-gray-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-gray-800">
        {value}
      </p>

    </div>
  );
}


export default NutritionAssistant;
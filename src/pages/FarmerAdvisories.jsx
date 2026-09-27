import {
  ArrowLeft,
  CheckCircle2,
  ShieldAlert,
  Stethoscope,
} from "lucide-react";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  getAdvisory,
} from "../data/advisoryService";

import { useLanguage } from "../context/LanguageContext";


const text = {
  english: {
    farmerSupport: "Farmer Support",
    healthAdvisories: "Health Advisories",
    description:
      "View simple livestock health guidance based on your submitted reports.",

    backToDashboard: "Back to Farmer Dashboard",

    noAdvisories: "No Health Advisories Yet",
    noAdvisoriesDescription:
      "Submit a livestock health report to receive an advisory.",
    goToDashboard: "Go to Farmer Dashboard",

    healthAdvisory: "Health Advisory",
    livestockAnimal: "Livestock Animal",
    animal: "Animal",
    locationNotRecorded: "Location not recorded",

    recommendedAction: "Recommended Action",
    reportedSymptoms: "Reported Symptoms",

    farmerHealthGuidance: "Farmer health guidance",
    disclaimer:
      "These advisories provide general decision support based on submitted health information. They are not disease diagnoses and should not replace professional veterinary assessment.",

    reported: "Reported",

    mild: "Mild",
    moderate: "Moderate",
    severe: "Severe",

    cow: "Cow",
    buffalo: "Buffalo",
    goat: "Goat",
    sheep: "Sheep",
    other: "Other",

    villageA: "Village A",
    villageB: "Village B",
    villageC: "Village C",

    fever: "Fever",
    reducedAppetite: "Reduced appetite",
    cough: "Cough",
    difficultyBreathing: "Difficulty breathing",
    nasalDischarge: "Nasal discharge",
    diarrhea: "Diarrhea",
    vomiting: "Vomiting",
    swelling: "Swelling",
    skinLesions: "Skin lesions",
    lameness: "Lameness",
    excessiveSalivation: "Excessive salivation",
    reducedActivity: "Reduced activity",
  },

  hindi: {
    farmerSupport: "किसान सहायता",
    healthAdvisories: "स्वास्थ्य सलाह",
    description:
      "अपनी जमा की गई रिपोर्ट के आधार पर सरल पशुधन स्वास्थ्य मार्गदर्शन देखें।",

    backToDashboard: "किसान डैशबोर्ड पर वापस जाएँ",

    noAdvisories: "अभी कोई स्वास्थ्य सलाह नहीं है",
    noAdvisoriesDescription:
      "सलाह प्राप्त करने के लिए पशुधन स्वास्थ्य रिपोर्ट जमा करें।",
    goToDashboard: "किसान डैशबोर्ड पर जाएँ",

    healthAdvisory: "स्वास्थ्य सलाह",
    livestockAnimal: "पशुधन पशु",
    animal: "पशु",
    locationNotRecorded: "स्थान रिकॉर्ड नहीं किया गया",

    recommendedAction: "अनुशंसित कार्रवाई",
    reportedSymptoms: "रिपोर्ट किए गए लक्षण",

    farmerHealthGuidance: "किसान स्वास्थ्य मार्गदर्शन",
    disclaimer:
      "ये सलाह जमा की गई स्वास्थ्य जानकारी के आधार पर सामान्य निर्णय सहायता प्रदान करती हैं। ये बीमारी का निदान नहीं हैं और पेशेवर पशु चिकित्सा जाँच का विकल्प नहीं हैं।",

    reported: "रिपोर्ट किया गया",

    mild: "हल्का",
    moderate: "मध्यम",
    severe: "गंभीर",

    cow: "गाय",
    buffalo: "भैंस",
    goat: "बकरी",
    sheep: "भेड़",
    other: "अन्य",

    villageA: "गाँव A",
    villageB: "गाँव B",
    villageC: "गाँव C",

    fever: "बुखार",
    reducedAppetite: "भूख कम लगना",
    cough: "खाँसी",
    difficultyBreathing: "साँस लेने में कठिनाई",
    nasalDischarge: "नाक से स्राव",
    diarrhea: "दस्त",
    vomiting: "उल्टी",
    swelling: "सूजन",
    skinLesions: "त्वचा पर घाव",
    lameness: "लंगड़ापन",
    excessiveSalivation: "अत्यधिक लार आना",
    reducedActivity: "गतिविधि में कमी",
  },
};


// ======================================================
// DISPLAY TRANSLATIONS
// ======================================================

function translateValue(value, language, t) {
  if (!value) return "";

  const map = {
    Cow: t.cow,
    Buffalo: t.buffalo,
    Goat: t.goat,
    Sheep: t.sheep,
    Other: t.other,

    "Village A": t.villageA,
    "Village B": t.villageB,
    "Village C": t.villageC,

    Fever: t.fever,
    "Reduced appetite": t.reducedAppetite,
    Cough: t.cough,
    "Difficulty breathing": t.difficultyBreathing,
    "Nasal discharge": t.nasalDischarge,
    Diarrhea: t.diarrhea,
    Vomiting: t.vomiting,
    Swelling: t.swelling,
    "Skin lesions": t.skinLesions,
    Lameness: t.lameness,
    "Excessive salivation": t.excessiveSalivation,
    "Reduced activity": t.reducedActivity,
  };

  return map[value] || value;
}


function translateAnimalName(name, language) {
  if (language !== "hindi") return name;

  const names = {
    Lakshmi: "लक्ष्मी",
    Ganga: "गंगा",
    Kali: "काली",
    Raja: "राजा",
    Meena: "मीना",
  };

  return names[name] || name;
}


function translateSeverity(value, t) {
  if (value === "Severe") return t.severe;
  if (value === "Moderate") return t.moderate;
  if (value === "Mild") return t.mild;

  return value || t.reported;
}


// ======================================================
// FARMER ADVISORIES
// ======================================================

function FarmerAdvisories() {

  const { language } = useLanguage();

  const t = text[language];

  const [reports, setReports] = useState([]);


  useEffect(() => {
    loadReports();
  }, []);


  function loadReports() {

    const savedReports =
      JSON.parse(
        localStorage.getItem(
          "mrigare-shka-health-reports"
        ) || "[]"
      );

    setReports(savedReports);
  }


  const latestReports =
    [...reports]
      .sort(
        (a, b) =>
          new Date(
            b.createdAt || b.submittedAt
          ) -
          new Date(
            a.createdAt || a.submittedAt
          )
      )
      .slice(0, 5);


  return (
    <DashboardLayout role="Farmer">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="mb-8">

        <Link
          to="/farmer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-800"
        >

          <ArrowLeft size={16} />

          {t.backToDashboard}

        </Link>


        <p className="mt-6 text-sm font-medium text-green-700">
          {t.farmerSupport}
        </p>


        <h1 className="mt-1 text-3xl font-bold text-gray-900">
          {t.healthAdvisories}
        </h1>


        <p className="mt-2 text-gray-600">
          {t.description}
        </p>

      </div>


      {/* ================================================= */}
      {/* NO REPORTS */}
      {/* ================================================= */}

      {latestReports.length === 0 ? (

        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-10 text-center">

          <ShieldAlert
            size={42}
            className="mx-auto text-gray-300"
          />

          <h2 className="mt-4 text-lg font-bold text-gray-900">
            {t.noAdvisories}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {t.noAdvisoriesDescription}
          </p>

          <Link
            to="/farmer"
            className="mt-5 inline-flex rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-800"
          >
            {t.goToDashboard}
          </Link>

        </div>

      ) : (

        <div className="mt-8 space-y-5">

          {latestReports.map((report) => {

            const advisory =
              getAdvisory(
                report,
                language
              );


            return (

              <article
                key={report.id}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >

                {/* ================================================= */}
                {/* REPORT HEADER */}
                {/* ================================================= */}

                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      {t.healthAdvisory}
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-gray-900">

                      {translateAnimalName(
                        report.animalName ||
                        t.livestockAnimal,
                        language
                      )}

                    </h2>

                    <p className="mt-1 text-sm text-gray-500">

                      {translateValue(
                        report.species ||
                        t.animal,
                        language,
                        t
                      )}

                      {" • "}

                      {translateValue(
                        report.location ||
                        t.locationNotRecorded,
                        language,
                        t
                      )}

                    </p>

                  </div>


                  {/* SEVERITY */}

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      report.severity === "Severe"
                        ? "bg-red-100 text-red-700"
                        : report.severity === "Moderate"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >

                    {translateSeverity(
                      report.severity,
                      t
                    )}

                  </span>

                </div>


                {/* ================================================= */}
                {/* ADVISORY */}
                {/* ================================================= */}

                <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-5">

                  <div className="flex gap-3">

                    <Stethoscope
                      size={22}
                      className="mt-0.5 shrink-0 text-blue-700"
                    />

                    <div>

                      <h3 className="font-bold text-blue-900">
                        {advisory.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-blue-800">
                        {advisory.message}
                      </p>

                    </div>

                  </div>

                </div>


                {/* ================================================= */}
                {/* RECOMMENDED ACTION */}
                {/* ================================================= */}

                <div className="mt-4 rounded-xl border border-green-100 bg-green-50 p-5">

                  <div className="flex gap-3">

                    <CheckCircle2
                      size={21}
                      className="mt-0.5 shrink-0 text-green-700"
                    />

                    <div>

                      <p className="font-semibold text-green-900">
                        {t.recommendedAction}
                      </p>

                      <p className="mt-1 text-sm leading-6 text-green-800">
                        {advisory.action}
                      </p>

                    </div>

                  </div>

                </div>


                {/* ================================================= */}
                {/* REPORTED SYMPTOMS */}
                {/* ================================================= */}

                {report.symptoms?.length > 0 && (

                  <div className="mt-5">

                    <p className="text-sm font-semibold text-gray-700">
                      {t.reportedSymptoms}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-2">

                      {report.symptoms.map(
                        (symptom) => (

                          <span
                            key={symptom}
                            className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                          >

                            {translateValue(
                              symptom,
                              language,
                              t
                            )}

                          </span>

                        )
                      )}

                    </div>

                  </div>

                )}

              </article>

            );

          })}

        </div>

      )}


      {/* ================================================= */}
      {/* DISCLAIMER */}
      {/* ================================================= */}

      <div className="mt-6 rounded-xl border border-green-100 bg-green-50 p-5">

        <p className="text-sm font-semibold text-green-800">
          {t.farmerHealthGuidance}
        </p>

        <p className="mt-1 text-sm leading-6 text-green-700">
          {t.disclaimer}
        </p>

      </div>

    </DashboardLayout>
  );
}


export default FarmerAdvisories;
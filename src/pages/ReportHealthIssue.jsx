import {
  ArrowLeft,
  Camera,
  CheckCircle2,
  Mic,
  Send,
} from "lucide-react";

import { useState } from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import { getAnimals } from "../data/animals";

import { symptomRules } from "../data/symptomRules";

import SymptomFingerprint from "../components/SymptomFingerprint";

import { useLanguage } from "../context/LanguageContext";


function ReportHealthIssue() {

  const { language } = useLanguage();

  const { animalId } = useParams();

  const navigate = useNavigate();

  const animals = getAnimals();

  const animal = animals.find(
    (item) => item.id === animalId
  );


  /* ================= LANGUAGE ================= */

  const text = {
    english: {
      animalNotFound: "Animal Not Found",
      couldNotFindAnimal:
        "We could not find this animal.",
      backToMyAnimals: "Back to My Animals",

      backToAnimalProfile:
        "Back to Animal Profile",

      livestockHealthReporting:
        "Livestock Health Reporting",

      reportAnimalHealthIssue:
        "Report Animal Health Issue",

      recordSymptoms:
        "Record symptoms and observations for veterinary review.",

      reportingFor: "Reporting for",
      location: "Location",

      selectSymptoms:
        "Select Symptoms",

      selectAllSymptoms:
        "Select all symptoms currently observed.",

      selectedSymptoms:
        "Selected symptoms",

      healthObservations:
        "Health Observations",

      addAdditionalInformation:
        "Add additional information about the animal.",

      severity: "Severity",

      mild: "Mild",
      moderate: "Moderate",
      severe: "Severe",

      symptomsStarted:
        "Symptoms started",

      durationPlaceholder:
        "Example: 2 days ago",

      temperature:
        "Temperature",

      temperaturePlaceholder:
        "Example: 39.2",

      appetite:
        "Appetite",

      normal:
        "Normal",

      reduced:
        "Reduced",

      noAppetite:
        "No appetite",

      activityLevel:
        "Activity Level",

      veryLow:
        "Very low",

      additionalObservations:
        "Additional observations",

      observationsPlaceholder:
        "Describe anything else you observed...",

      supportingEvidence:
        "Supporting Evidence",

      photoVoiceLater:
        "Photo and voice reporting will be connected in a later stage.",

      addAnimalPhoto:
        "Add Animal Photo",

      recordVoiceReport:
        "Record Voice Report",

      reportSummary:
        "Report Summary",

      animal:
        "Animal",

      village:
        "Village",

      symptoms:
        "Symptoms",

      cancel:
        "Cancel",

      submitHealthReport:
        "Submit Health Report",

      important:
        "Important",

      disclaimer:
        "MRIGARESHKA provides an AI-assisted risk signal based on reported information. It does not provide a veterinary diagnosis or prescribe treatment. Please consult a qualified veterinary professional for clinical assessment.",

      selectAtLeastOne:
        "Please select at least one symptom before submitting the report.",

      submittedSuccessfully:
        "Health report submitted successfully.",
    },

    hindi: {
      animalNotFound:
        "पशु नहीं मिला",

      couldNotFindAnimal:
        "हमें यह पशु नहीं मिला।",

      backToMyAnimals:
        "मेरे पशुओं पर वापस जाएँ",

      backToAnimalProfile:
        "पशु प्रोफ़ाइल पर वापस जाएँ",

      livestockHealthReporting:
        "पशुधन स्वास्थ्य रिपोर्टिंग",

      reportAnimalHealthIssue:
        "पशु स्वास्थ्य समस्या की रिपोर्ट करें",

      recordSymptoms:
        "पशु चिकित्सा जाँच के लिए लक्षण और निरीक्षण दर्ज करें।",

      reportingFor:
        "रिपोर्ट किसके लिए",

      location:
        "स्थान",

      selectSymptoms:
        "लक्षण चुनें",

      selectAllSymptoms:
        "वर्तमान में दिखाई देने वाले सभी लक्षण चुनें।",

      selectedSymptoms:
        "चयनित लक्षण",

      healthObservations:
        "स्वास्थ्य निरीक्षण",

      addAdditionalInformation:
        "पशु के बारे में अतिरिक्त जानकारी जोड़ें।",

      severity:
        "गंभीरता",

      mild:
        "हल्का",

      moderate:
        "मध्यम",

      severe:
        "गंभीर",

      symptomsStarted:
        "लक्षण कब शुरू हुए",

      durationPlaceholder:
        "उदाहरण: 2 दिन पहले",

      temperature:
        "तापमान",

      temperaturePlaceholder:
        "उदाहरण: 39.2",

      appetite:
        "भूख",

      normal:
        "सामान्य",

      reduced:
        "कम",

      noAppetite:
        "भूख नहीं",

      activityLevel:
        "गतिविधि स्तर",

      veryLow:
        "बहुत कम",

      additionalObservations:
        "अतिरिक्त निरीक्षण",

      observationsPlaceholder:
        "आपने और क्या देखा, उसका विवरण दें...",

      supportingEvidence:
        "सहायक प्रमाण",

      photoVoiceLater:
        "फोटो और वॉइस रिपोर्टिंग को बाद के चरण में जोड़ा जाएगा।",

      addAnimalPhoto:
        "पशु की फोटो जोड़ें",

      recordVoiceReport:
        "वॉइस रिपोर्ट रिकॉर्ड करें",

      reportSummary:
        "रिपोर्ट सारांश",

      animal:
        "पशु",

      village:
        "गाँव",

      symptoms:
        "लक्षण",

      cancel:
        "रद्द करें",

      submitHealthReport:
        "स्वास्थ्य रिपोर्ट जमा करें",

      important:
        "महत्वपूर्ण",

      disclaimer:
        "MRIGARESHKA रिपोर्ट की गई जानकारी के आधार पर एआई-सहायित जोखिम संकेत प्रदान करता है। यह पशु चिकित्सा निदान या उपचार निर्धारित नहीं करता है। चिकित्सकीय जाँच के लिए योग्य पशु चिकित्सा विशेषज्ञ से परामर्श करें।",

      selectAtLeastOne:
        "रिपोर्ट जमा करने से पहले कम से कम एक लक्षण चुनें।",

      submittedSuccessfully:
        "स्वास्थ्य रिपोर्ट सफलतापूर्वक जमा की गई।",
    },
  };

  const t = text[language];


  /* ================= DISPLAY TRANSLATIONS ================= */

  const speciesTranslations = {
    Cow: "गाय",
    Buffalo: "भैंस",
    Goat: "बकरी",
    Sheep: "भेड़",
    Other: "अन्य",
  };

  const breedTranslations = {
    Jersey: "जर्सी",
    "Holstein Friesian": "होल्स्टीन फ़्रिज़ियन",
    Murrah: "मुर्रा",
    Gir: "गिर",
    Malabari: "मालाबारी",
  };

  const locationTranslations = {
    "Village A": "गाँव A",
    "Village B": "गाँव B",
    "Village C": "गाँव C",
  };

  const animalNameTranslations = {
    Lakshmi: "लक्ष्मी",
    Ganga: "गंगा",
    Kali: "काली",
    Raja: "राजा",
    Meena: "मीना",
  };

  const symptomTranslations = {
    Fever: "बुखार",
    "Reduced appetite": "भूख कम लगना",
    Cough: "खाँसी",
    "Difficulty breathing":
      "साँस लेने में कठिनाई",
    "Nasal discharge":
      "नाक से स्राव",
    Diarrhea: "दस्त",
    Vomiting: "उल्टी",
    Swelling: "सूजन",
    "Skin lesions":
      "त्वचा पर घाव",
    Lameness: "लंगड़ापन",
    "Excessive salivation":
      "अत्यधिक लार आना",
    "Reduced activity":
      "गतिविधि में कमी",
  };

  const categoryTranslations = {
    General: "सामान्य",
    Respiratory: "श्वसन",
    Digestive: "पाचन",
    Skin: "त्वचा",
    Mobility: "गतिशीलता",
    Oral: "मौखिक",
  };

  const displayAnimalName = (name) =>
    language === "hindi"
      ? animalNameTranslations[name] || name
      : name;

  const displaySpecies = (species) =>
    language === "hindi"
      ? speciesTranslations[species] || species
      : species;

  const displayBreed = (breed) =>
    language === "hindi"
      ? breedTranslations[breed] || breed
      : breed;

  const displayLocation = (location) =>
    language === "hindi"
      ? locationTranslations[location] || location
      : location;

  const displaySymptom = (symptom) =>
    language === "hindi"
      ? symptomTranslations[symptom] || symptom
      : symptom;

  const displayCategory = (category) =>
    language === "hindi"
      ? categoryTranslations[category] || category
      : category;

  const displaySeverity = (value) => {
    if (language === "hindi") {
      if (value === "Mild") return t.mild;
      if (value === "Moderate") return t.moderate;
      if (value === "Severe") return t.severe;
    }

    return value;
  };


  /* ================= FORM STATE ================= */

  const [selectedSymptoms, setSelectedSymptoms] =
    useState([]);

  const [severity, setSeverity] =
    useState("Mild");

  const [duration, setDuration] =
    useState("");

  const [temperature, setTemperature] =
    useState("");

  const [appetite, setAppetite] =
    useState("Normal");

  const [activity, setActivity] =
    useState("Normal");

  const [notes, setNotes] =
    useState("");


  /* ================= ANIMAL NOT FOUND ================= */

  if (!animal) {

    return (
      <DashboardLayout role="Farmer">

        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">

          <h1 className="text-2xl font-bold text-gray-900">
            {t.animalNotFound}
          </h1>

          <p className="mt-2 text-gray-500">
            {t.couldNotFindAnimal}
          </p>

          <Link
            to="/farmer/animals"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800"
          >

            <ArrowLeft size={18} />

            {t.backToMyAnimals}

          </Link>

        </div>

      </DashboardLayout>
    );
  }


  /* ================= TOGGLE SYMPTOM ================= */

  function toggleSymptom(symptom) {

    setSelectedSymptoms((current) => {

      if (current.includes(symptom)) {

        return current.filter(
          (item) => item !== symptom
        );

      }

      return [
        ...current,
        symptom,
      ];

    });
  }


  /* ================= SUBMIT REPORT ================= */

  function handleSubmit(event) {

    event.preventDefault();


    if (selectedSymptoms.length === 0) {

      window.alert(
        t.selectAtLeastOne
      );

      return;
    }


    /* ================= CREATE REPORT ================= */

    const newReport = {

      id: `REP-${Date.now()}`,

      /* Animal identity */

      animalId: animal.id,

      animalName: animal.name,

      species: animal.species,

      breed: animal.breed,

      location: animal.location,


      /* Health information */

      symptoms: selectedSymptoms,

      severity,

      duration,

      temperature,

      appetite,

      activity,

      notes,


      /* Reporting information */

      source: "Farmer Portal",

      status:
        severity === "Severe"
          ? "Priority Review"
          : "Submitted",

      createdAt:
        new Date().toISOString(),

      submittedAt:
        new Date().toISOString(),

    };


    /* ================= GET EXISTING REPORTS ================= */

    const existingReports = JSON.parse(
      localStorage.getItem(
        "mrigare-shka-health-reports"
      ) || "[]"
    );


    /* ================= ADD NEW REPORT ================= */

    const updatedReports = [
      newReport,
      ...existingReports,
    ];


    /* ================= SAVE ALL REPORTS ================= */

    localStorage.setItem(
      "mrigare-shka-health-reports",
      JSON.stringify(updatedReports)
    );


    /* ================= SAVE LATEST REPORT ================= */

    localStorage.setItem(
      "mrigare-shka-latest-report",
      JSON.stringify(newReport)
    );


    /* ================= CONFIRMATION ================= */

    window.alert(
      t.submittedSuccessfully
    );


    /* ================= RETURN TO HEALTH PASSPORT ================= */

    navigate(
      `/farmer/animals/${animal.id}`
    );

  }


  return (
    <DashboardLayout role="Farmer">


      {/* ================= BACK ================= */}

      <Link
        to={`/farmer/animals/${animal.id}`}
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-green-700"
      >

        <ArrowLeft size={17} />

        {t.backToAnimalProfile}

      </Link>


      {/* ================= HEADER ================= */}

      <div className="mt-6">

        <p className="text-sm font-medium text-green-700">
          {t.livestockHealthReporting}
        </p>

        <h1 className="mt-1 text-3xl font-bold text-gray-900">
          {t.reportAnimalHealthIssue}
        </h1>

        <p className="mt-2 text-gray-600">
          {t.recordSymptoms}
        </p>

      </div>


      {/* ================= ANIMAL INFORMATION ================= */}

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5">

        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
          {t.reportingFor}
        </p>


        <div className="mt-2 flex flex-wrap items-center gap-3">

          <h2 className="text-xl font-bold text-gray-900">
            {displayAnimalName(animal.name)}
          </h2>


          <span className="text-sm text-gray-500">
            {displaySpecies(animal.species)} ·{" "}
            {displayBreed(animal.breed)}
          </span>


          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
            {animal.id}
          </span>

        </div>


        <p className="mt-2 text-sm text-gray-500">
          {t.location}: {displayLocation(animal.location)}
        </p>

      </div>


      {/* ================= FORM ================= */}

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-6"
      >


        {/* ================= 1. SYMPTOMS ================= */}

        <section className="rounded-2xl border border-gray-200 bg-white p-6">

          <h2 className="text-lg font-bold text-gray-900">
            1. {t.selectSymptoms}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {t.selectAllSymptoms}
          </p>


          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

            {symptomRules.map((symptom) => {

              const selected =
                selectedSymptoms.includes(
                  symptom.name
                );


              return (
                <button
                  key={symptom.name}
                  type="button"
                  onClick={() =>
                    toggleSymptom(
                      symptom.name
                    )
                  }
                  className={`flex items-center justify-between rounded-xl border p-4 text-left transition ${
                    selected
                      ? "border-green-600 bg-green-50 text-green-800"
                      : "border-gray-200 bg-white text-gray-700 hover:border-green-300 hover:bg-gray-50"
                  }`}
                >

                  <div>

                    <p className="text-sm font-semibold">
                      {displaySymptom(symptom.name)}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      {displayCategory(symptom.category)}
                    </p>

                  </div>


                  {selected && (

                    <CheckCircle2
                      size={19}
                      className="text-green-700"
                    />

                  )}

                </button>
              );

            })}

          </div>


          {/* SELECTED COUNT */}

          <div className="mt-4 rounded-lg bg-gray-50 px-4 py-3">

            <p className="text-sm text-gray-600">

              {t.selectedSymptoms}:{" "}

              <span className="font-semibold text-gray-900">
                {selectedSymptoms.length}
              </span>

            </p>

          </div>

        </section>


        {/* ================= 2. HEALTH OBSERVATIONS ================= */}

        <section className="rounded-2xl border border-gray-200 bg-white p-6">

          <h2 className="text-lg font-bold text-gray-900">
            2. {t.healthObservations}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {t.addAdditionalInformation}
          </p>


          <div className="mt-5 grid gap-5 md:grid-cols-2">


            {/* SEVERITY */}

            <div>

              <label className="text-sm font-semibold text-gray-700">
                {t.severity}
              </label>


              <select
                value={severity}
                onChange={(event) =>
                  setSeverity(
                    event.target.value
                  )
                }
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              >

                <option value="Mild">
                  {t.mild}
                </option>

                <option value="Moderate">
                  {t.moderate}
                </option>

                <option value="Severe">
                  {t.severe}
                </option>

              </select>

            </div>


            {/* DURATION */}

            <div>

              <label className="text-sm font-semibold text-gray-700">
                {t.symptomsStarted}
              </label>


              <input
                type="text"
                value={duration}
                onChange={(event) =>
                  setDuration(
                    event.target.value
                  )
                }
                placeholder={
                  t.durationPlaceholder
                }
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />

            </div>


            {/* TEMPERATURE */}

            <div>

              <label className="text-sm font-semibold text-gray-700">
                {t.temperature}
              </label>


              <input
                type="number"
                step="0.1"
                value={temperature}
                onChange={(event) =>
                  setTemperature(
                    event.target.value
                  )
                }
                placeholder={
                  t.temperaturePlaceholder
                }
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />

            </div>


            {/* APPETITE */}

            <div>

              <label className="text-sm font-semibold text-gray-700">
                {t.appetite}
              </label>


              <select
                value={appetite}
                onChange={(event) =>
                  setAppetite(
                    event.target.value
                  )
                }
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              >

                <option value="Normal">
                  {t.normal}
                </option>

                <option value="Reduced">
                  {t.reduced}
                </option>

                <option value="No appetite">
                  {t.noAppetite}
                </option>

              </select>

            </div>


            {/* ACTIVITY */}

            <div>

              <label className="text-sm font-semibold text-gray-700">
                {t.activityLevel}
              </label>


              <select
                value={activity}
                onChange={(event) =>
                  setActivity(
                    event.target.value
                  )
                }
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              >

                <option value="Normal">
                  {t.normal}
                </option>

                <option value="Reduced">
                  {t.reduced}
                </option>

                <option value="Very low">
                  {t.veryLow}
                </option>

              </select>

            </div>

          </div>


          {/* NOTES */}

          <div className="mt-5">

            <label className="text-sm font-semibold text-gray-700">
              {t.additionalObservations}
            </label>


            <textarea
              value={notes}
              onChange={(event) =>
                setNotes(
                  event.target.value
                )
              }
              rows={4}
              placeholder={
                t.observationsPlaceholder
              }
              className="mt-2 w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />

          </div>

        </section>


        {/* ================= 3. SUPPORTING EVIDENCE ================= */}

        <section className="rounded-2xl border border-gray-200 bg-white p-6">

          <h2 className="text-lg font-bold text-gray-900">
            3. {t.supportingEvidence}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {t.photoVoiceLater}
          </p>


          <div className="mt-5 grid gap-4 sm:grid-cols-2">

            <button
              type="button"
              className="flex items-center justify-center gap-3 rounded-xl border border-dashed border-gray-300 p-5 text-sm font-semibold text-gray-600 hover:border-green-500 hover:text-green-700"
            >

              <Camera size={20} />

              {t.addAnimalPhoto}

            </button>


            <button
              type="button"
              className="flex items-center justify-center gap-3 rounded-xl border border-dashed border-gray-300 p-5 text-sm font-semibold text-gray-600 hover:border-green-500 hover:text-green-700"
            >

              <Mic size={20} />

              {t.recordVoiceReport}

            </button>

          </div>

        </section>


        {/* ================= 4. SYMPTOM FINGERPRINT ================= */}

        <SymptomFingerprint
          symptoms={selectedSymptoms}
        />


        {/* ================= REPORT SUMMARY ================= */}

        <section className="rounded-2xl border border-blue-100 bg-blue-50 p-6">

          <h2 className="text-lg font-bold text-blue-900">
            {t.reportSummary}
          </h2>


          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            <SummaryItem
              label={t.animal}
              value={displayAnimalName(animal.name)}
            />

            <SummaryItem
              label={t.village}
              value={displayLocation(animal.location)}
            />

            <SummaryItem
              label={t.symptoms}
              value={selectedSymptoms.length}
            />

            <SummaryItem
              label={t.severity}
              value={displaySeverity(severity)}
            />

          </div>

        </section>


        {/* ================= ACTIONS ================= */}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">

          <Link
            to={`/farmer/animals/${animal.id}`}
            className="rounded-lg border border-gray-300 px-5 py-3 text-center text-sm font-semibold text-gray-700 hover:border-gray-400"
          >
            {t.cancel}
          </Link>


          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-lg bg-green-700 px-6 py-3 text-sm font-semibold text-white hover:bg-green-800"
          >

            <Send size={18} />

            {t.submitHealthReport}

          </button>

        </div>

      </form>


      {/* ================= DISCLAIMER ================= */}

      <div className="mt-6 rounded-xl border border-green-100 bg-green-50 p-5">

        <p className="text-sm font-semibold text-green-800">
          {t.important}
        </p>

        <p className="mt-1 text-sm leading-6 text-green-700">
          {t.disclaimer}
        </p>

      </div>


    </DashboardLayout>
  );
}


/* ================= SUMMARY ITEM ================= */

function SummaryItem({
  label,
  value,
}) {

  return (
    <div className="rounded-lg border border-blue-100 bg-white p-4">

      <p className="text-xs font-medium uppercase tracking-wide text-blue-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-blue-900">
        {value}
      </p>

    </div>
  );
}


export default ReportHealthIssue;
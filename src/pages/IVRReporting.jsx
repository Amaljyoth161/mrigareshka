import {
  ArrowLeft,
  CheckCircle,
  Mic,
  Phone,
  Wifi,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import { useLanguage } from "../context/LanguageContext";


const text = {
  english: {
    backToDashboard: "Back to Farmer Dashboard",
    accessibleReporting: "Accessible Reporting",
    title: "IVR Disease Reporting",
    description:
      "Simulated phone-based livestock health reporting for farmers with limited smartphone or internet access.",

    ivrCallSimulation: "IVR Call Simulation",
    ivrCallDescription:
      "In a real deployment, the farmer could call a dedicated number and report the animal's symptoms through voice prompts.",

    selectLanguage: "1. Select Language",

    identifyAnimal: "2. Identify Animal",
    animalIdDescription:
      "Enter the animal identification number.",
    animalIdPlaceholder: "Example: AN001",

    reportSymptoms: "3. Report Symptoms",
    symptomsDescription:
      "In the real IVR system, these would be selected through voice prompts.",

    submitReport: "4. Submit Report",
    submitDescription:
      "The report will be stored locally in this prototype and made available to the dashboard.",
    submitButton: "Submit IVR Health Report",

    prototypeNotice: "Prototype notice",
    prototypeDescription:
      "This page simulates the IVR workflow. A production version would connect the workflow to a telephony service and multilingual voice system.",

    healthReportSubmitted: "Health Report Submitted",
    submittedDescription:
      "Your IVR health report has been recorded and can be reviewed by the veterinary team.",
    reportId: "Report ID",
    reportingMethod: "Reporting method",
    ivrPhone: "IVR / Phone",

    alertMessage:
      "Please enter the animal ID and select at least one symptom.",

    lossOfAppetite: "Loss of appetite",
    fever: "Fever",
    coughing: "Coughing",
    weakness: "Weakness",
    reducedActivity: "Reduced activity",
    abnormalBreathing: "Abnormal breathing",
  },

  hindi: {
    backToDashboard: "किसान डैशबोर्ड पर वापस जाएँ",
    accessibleReporting: "सुलभ रिपोर्टिंग",
    title: "आईवीआर रोग रिपोर्टिंग",
    description:
      "कम स्मार्टफोन या इंटरनेट सुविधा वाले किसानों के लिए फोन आधारित पशुधन स्वास्थ्य रिपोर्टिंग का सिमुलेशन।",

    ivrCallSimulation: "आईवीआर कॉल सिमुलेशन",
    ivrCallDescription:
      "वास्तविक प्रणाली में किसान एक समर्पित नंबर पर कॉल करके वॉइस निर्देशों के माध्यम से पशु के लक्षणों की जानकारी दे सकता है।",

    selectLanguage: "1. भाषा चुनें",

    identifyAnimal: "2. पशु की पहचान करें",
    animalIdDescription:
      "पशु पहचान संख्या दर्ज करें।",
    animalIdPlaceholder: "उदाहरण: AN001",

    reportSymptoms: "3. लक्षण रिपोर्ट करें",
    symptomsDescription:
      "वास्तविक आईवीआर प्रणाली में इन लक्षणों का चयन वॉइस निर्देशों के माध्यम से किया जाएगा।",

    submitReport: "4. रिपोर्ट जमा करें",
    submitDescription:
      "इस प्रोटोटाइप में रिपोर्ट स्थानीय रूप से संग्रहीत की जाएगी और डैशबोर्ड पर उपलब्ध कराई जाएगी।",
    submitButton: "आईवीआर स्वास्थ्य रिपोर्ट जमा करें",

    prototypeNotice: "प्रोटोटाइप सूचना",
    prototypeDescription:
      "यह पृष्ठ आईवीआर कार्यप्रवाह का सिमुलेशन करता है। वास्तविक संस्करण में यह कार्यप्रवाह टेलीफोनी सेवा और बहुभाषी वॉइस सिस्टम से जुड़ा होगा।",

    healthReportSubmitted: "स्वास्थ्य रिपोर्ट जमा हो गई",
    submittedDescription:
      "आपकी आईवीआर स्वास्थ्य रिपोर्ट दर्ज कर ली गई है और पशु चिकित्सा टीम इसकी समीक्षा कर सकती है।",
    reportId: "रिपोर्ट आईडी",
    reportingMethod: "रिपोर्टिंग विधि",
    ivrPhone: "आईवीआर / फोन",

    alertMessage:
      "कृपया पशु आईडी दर्ज करें और कम से कम एक लक्षण चुनें।",

    lossOfAppetite: "भूख में कमी",
    fever: "बुखार",
    coughing: "खाँसी",
    weakness: "कमजोरी",
    reducedActivity: "गतिविधि में कमी",
    abnormalBreathing: "असामान्य साँस लेना",
  },
};


function IVRReporting() {

  const { language } = useLanguage();

  const t = text[language];

  const [animalId, setAnimalId] = useState("");

  const [symptoms, setSymptoms] = useState([]);

  const [submitted, setSubmitted] = useState(false);

  const [submittedReportId, setSubmittedReportId] = useState("");


  // Internal values remain English.
  // Only their display text changes.
  const symptomOptions = [
    {
      value: "Loss of appetite",
      label: t.lossOfAppetite,
    },
    {
      value: "Fever",
      label: t.fever,
    },
    {
      value: "Coughing",
      label: t.coughing,
    },
    {
      value: "Weakness",
      label: t.weakness,
    },
    {
      value: "Reduced activity",
      label: t.reducedActivity,
    },
    {
      value: "Abnormal breathing",
      label: t.abnormalBreathing,
    },
  ];


  function toggleSymptom(symptom) {

    setSymptoms((current) => {

      if (current.includes(symptom)) {
        return current.filter(
          (item) => item !== symptom
        );
      }

      return [...current, symptom];
    });

  }


  function submitReport() {

    if (!animalId || symptoms.length === 0) {

      alert(t.alertMessage);

      return;
    }


    const existingReports =
      JSON.parse(
        localStorage.getItem(
          "mrigare-shka-health-reports"
        ) || "[]"
      );


    const reportId = `IVR-${Date.now()}`;


    const report = {
      id: reportId,
      animalId,
      symptoms,
      language,
      severity: "Moderate",
      source: "IVR",
      status: "Submitted",
      submittedAt:
        new Date().toISOString(),
    };


    localStorage.setItem(
      "mrigare-shka-health-reports",
      JSON.stringify([
        ...existingReports,
        report,
      ])
    );


    setSubmittedReportId(reportId);
    setSubmitted(true);
  }


  // =====================================================
  // SUBMITTED STATE
  // =====================================================

  if (submitted) {

    return (
      <DashboardLayout role="Farmer">

        <div className="mx-auto max-w-2xl">

          <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">

            <CheckCircle
              size={50}
              className="mx-auto text-green-600"
            />

            <h1 className="mt-5 text-2xl font-bold text-green-900">
              {t.healthReportSubmitted}
            </h1>

            <p className="mt-3 text-sm leading-6 text-green-800">
              {t.submittedDescription}
            </p>


            <div className="mt-6 rounded-xl bg-white p-4 text-left">

              <p className="text-xs text-gray-500">
                {t.reportId}
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                {submittedReportId}
              </p>


              <p className="mt-4 text-xs text-gray-500">
                {t.reportingMethod}
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                {t.ivrPhone}
              </p>

            </div>


            <Link
              to="/farmer"
              className="mt-6 inline-flex rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white hover:bg-green-800"
            >
              {t.backToDashboard}
            </Link>

          </div>

        </div>

      </DashboardLayout>
    );
  }


  // =====================================================
  // MAIN PAGE
  // =====================================================

  return (
    <DashboardLayout role="Farmer">

      <Link
        to="/farmer"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-green-700"
      >

        <ArrowLeft size={17} />

        {t.backToDashboard}

      </Link>


      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="mt-6">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700">

            <Phone size={25} />

          </div>


          <div>

            <p className="text-sm font-medium text-green-700">
              {t.accessibleReporting}
            </p>

            <h1 className="text-3xl font-bold text-gray-900">
              {t.title}
            </h1>

          </div>

        </div>


        <p className="mt-3 max-w-2xl text-gray-600">
          {t.description}
        </p>

      </div>


      {/* ================================================= */}
      {/* IVR STATUS */}
      {/* ================================================= */}

      <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">

        <div className="flex items-start gap-4">

          <Phone
            size={24}
            className="mt-1 text-blue-700"
          />

          <div>

            <h2 className="font-bold text-blue-900">
              {t.ivrCallSimulation}
            </h2>

            <p className="mt-1 text-sm leading-6 text-blue-800">
              {t.ivrCallDescription}
            </p>

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* LANGUAGE */}
      {/* ================================================= */}

      <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">

        <h2 className="text-lg font-bold text-gray-900">
          {t.selectLanguage}
        </h2>


        <div className="mt-4">

          <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1">

            <button
              type="button"
              onClick={() => {
                // IVR language is stored separately from UI language.
                // English is the default supported voice option.
              }}
              className={`rounded-md px-5 py-2.5 text-sm font-semibold ${
                language === "english"
                  ? "bg-green-700 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              English
            </button>


            <button
              type="button"
              onClick={() => {
                // Hindi is controlled by the global Farmer language setting.
              }}
              className={`rounded-md px-5 py-2.5 text-sm font-semibold ${
                language === "hindi"
                  ? "bg-green-700 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              हिंदी
            </button>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* ANIMAL */}
      {/* ================================================= */}

      <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">

        <h2 className="text-lg font-bold text-gray-900">
          {t.identifyAnimal}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {t.animalIdDescription}
        </p>


        <input
          type="text"
          value={animalId}
          onChange={(event) =>
            setAnimalId(event.target.value)
          }
          placeholder={t.animalIdPlaceholder}
          className="mt-4 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500"
        />

      </section>


      {/* ================================================= */}
      {/* SYMPTOMS */}
      {/* ================================================= */}

      <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">

        <div className="flex items-center gap-3">

          <Mic
            size={21}
            className="text-green-700"
          />

          <div>

            <h2 className="text-lg font-bold text-gray-900">
              {t.reportSymptoms}
            </h2>

            <p className="text-sm text-gray-500">
              {t.symptomsDescription}
            </p>

          </div>

        </div>


        <div className="mt-5 grid gap-3 sm:grid-cols-2">

          {symptomOptions.map((symptom) => (

            <button
              key={symptom.value}
              type="button"
              onClick={() =>
                toggleSymptom(symptom.value)
              }
              className={`rounded-xl border p-4 text-left text-sm font-medium ${
                symptoms.includes(symptom.value)
                  ? "border-green-500 bg-green-50 text-green-800"
                  : "border-gray-200 bg-gray-50 text-gray-700"
              }`}
            >

              {symptom.label}

            </button>

          ))}

        </div>

      </section>


      {/* ================================================= */}
      {/* SUBMIT */}
      {/* ================================================= */}

      <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">

        <div className="flex items-center gap-3">

          <Wifi
            size={21}
            className="text-green-700"
          />

          <div>

            <h2 className="text-lg font-bold text-gray-900">
              {t.submitReport}
            </h2>

            <p className="text-sm text-gray-500">
              {t.submitDescription}
            </p>

          </div>

        </div>


        <button
          type="button"
          onClick={submitReport}
          className="mt-5 w-full rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white hover:bg-green-800"
        >
          {t.submitButton}
        </button>

      </section>


      {/* ================================================= */}
      {/* NOTICE */}
      {/* ================================================= */}

      <div className="mt-6 rounded-xl border border-yellow-100 bg-yellow-50 p-5">

        <p className="text-sm font-semibold text-yellow-800">
          {t.prototypeNotice}
        </p>

        <p className="mt-1 text-sm leading-6 text-yellow-700">
          {t.prototypeDescription}
        </p>

      </div>

    </DashboardLayout>
  );
}


export default IVRReporting;
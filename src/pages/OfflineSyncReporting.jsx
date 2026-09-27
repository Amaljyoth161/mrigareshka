import {
  ArrowLeft,
  CheckCircle,
  CloudOff,
  RefreshCw,
  Wifi,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import { useLanguage } from "../context/LanguageContext";


const text = {
  english: {
    backToDashboard: "Back to Farmer Dashboard",
    connectivitySupport: "Connectivity Support",
    title: "Offline → Sync Reporting",
    description:
      "Record livestock health reports even when internet connectivity is unavailable and sync them when connectivity returns.",

    connectionStatus: "Connection Status",
    syncedSuccessfully: "Reports synced successfully.",
    waitingForSync:
      "Report saved locally — waiting for sync.",
    offlineSimulation: "Offline mode simulation.",

    createHealthReport: "Create Health Report",
    createHealthReportDescription:
      "This report can be stored locally before syncing.",

    animalId: "Animal ID",
    animalIdPlaceholder: "Example: AN001",

    symptom: "Symptom",
    selectSymptom: "Select a symptom",

    lossOfAppetite: "Loss of appetite",
    fever: "Fever",
    coughing: "Coughing",
    weakness: "Weakness",
    reducedActivity: "Reduced activity",

    saveReportOffline: "Save Report Offline",

    synchronizePendingReports:
      "Synchronize Pending Reports",
    synchronizeDescription:
      "When internet connectivity becomes available, pending reports can be synchronized with the health-report system.",
    syncReports: "Sync Reports",

    prototypeNotice: "Prototype notice",
    prototypeDescription:
      "This prototype simulates offline storage using browser local storage. A production system would use secure device storage and background synchronization with a central server.",

    validationMessage:
      "Please enter the animal ID and symptom.",

    savedMessage:
      "Report saved on the device. It will be synced when connectivity is restored.",

    noPendingReports:
      "There are no pending reports to sync.",

    syncedCount:
      "report(s) successfully synced.",
  },

  hindi: {
    backToDashboard: "किसान डैशबोर्ड पर वापस जाएँ",
    connectivitySupport: "कनेक्टिविटी सहायता",
    title: "ऑफ़लाइन → सिंक रिपोर्टिंग",
    description:
      "इंटरनेट कनेक्टिविटी उपलब्ध न होने पर भी पशुधन स्वास्थ्य रिपोर्ट दर्ज करें और कनेक्टिविटी वापस आने पर उन्हें सिंक करें।",

    connectionStatus: "कनेक्शन स्थिति",
    syncedSuccessfully:
      "रिपोर्ट सफलतापूर्वक सिंक हो गई हैं।",
    waitingForSync:
      "रिपोर्ट स्थानीय रूप से सहेजी गई है — सिंक होने की प्रतीक्षा में।",
    offlineSimulation:
      "ऑफ़लाइन मोड सिमुलेशन।",

    createHealthReport: "स्वास्थ्य रिपोर्ट बनाएँ",
    createHealthReportDescription:
      "सिंक करने से पहले इस रिपोर्ट को स्थानीय रूप से संग्रहीत किया जा सकता है।",

    animalId: "पशु आईडी",
    animalIdPlaceholder: "उदाहरण: AN001",

    symptom: "लक्षण",
    selectSymptom: "एक लक्षण चुनें",

    lossOfAppetite: "भूख में कमी",
    fever: "बुखार",
    coughing: "खाँसी",
    weakness: "कमजोरी",
    reducedActivity: "गतिविधि में कमी",

    saveReportOffline:
      "रिपोर्ट ऑफ़लाइन सहेजें",

    synchronizePendingReports:
      "लंबित रिपोर्ट सिंक्रोनाइज़ करें",
    synchronizeDescription:
      "जब इंटरनेट कनेक्टिविटी उपलब्ध हो जाती है, तो लंबित रिपोर्टों को स्वास्थ्य रिपोर्ट प्रणाली के साथ सिंक्रोनाइज़ किया जा सकता है।",
    syncReports: "रिपोर्ट सिंक करें",

    prototypeNotice: "प्रोटोटाइप सूचना",
    prototypeDescription:
      "यह प्रोटोटाइप ब्राउज़र लोकल स्टोरेज का उपयोग करके ऑफ़लाइन संग्रहण का सिमुलेशन करता है। वास्तविक प्रणाली सुरक्षित डिवाइस स्टोरेज और केंद्रीय सर्वर के साथ बैकग्राउंड सिंक्रोनाइज़ेशन का उपयोग करेगी।",

    validationMessage:
      "कृपया पशु आईडी और लक्षण दर्ज करें।",

    savedMessage:
      "रिपोर्ट डिवाइस पर सहेज दी गई है। कनेक्टिविटी बहाल होने पर इसे सिंक किया जाएगा।",

    noPendingReports:
      "सिंक करने के लिए कोई लंबित रिपोर्ट नहीं है।",

    syncedCount:
      "रिपोर्ट सफलतापूर्वक सिंक की गई हैं।",
  },
};


// =====================================================
// OFFLINE → SYNC REPORTING
// =====================================================

function OfflineSyncReporting() {

  const { language } = useLanguage();

  const t = text[language];


  const [animalId, setAnimalId] =
    useState("");

  const [symptom, setSymptom] =
    useState("");

  const [status, setStatus] =
    useState("offline");

  const [message, setMessage] =
    useState("");


  // Internal values remain English.
  // Only the visible labels are translated.
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
  ];


  // =====================================================
  // SAVE OFFLINE
  // =====================================================

  function saveOffline() {

    if (!animalId || !symptom) {

      setMessage(
        t.validationMessage
      );

      return;
    }


    const existingReports =
      JSON.parse(
        localStorage.getItem(
          "mrigare-shka-offline-reports"
        ) || "[]"
      );


    const report = {
      id: `OFF-${Date.now()}`,
      animalId,
      symptom,
      status: "Pending Sync",
      createdAt:
        new Date().toISOString(),
    };


    localStorage.setItem(
      "mrigare-shka-offline-reports",
      JSON.stringify([
        ...existingReports,
        report,
      ])
    );


    setStatus("pending");

    setMessage(
      t.savedMessage
    );
  }


  // =====================================================
  // SYNC REPORTS
  // =====================================================

  function syncReports() {

    const offlineReports =
      JSON.parse(
        localStorage.getItem(
          "mrigare-shka-offline-reports"
        ) || "[]"
      );


    if (offlineReports.length === 0) {

      setMessage(
        t.noPendingReports
      );

      return;
    }


    const existingReports =
      JSON.parse(
        localStorage.getItem(
          "mrigare-shka-health-reports"
        ) || "[]"
      );


    const syncedReports =
      offlineReports.map((report) => ({
        ...report,
        status: "Synced",
        source: "Offline Sync",
        severity: "Moderate",
        symptoms: [report.symptom],
        submittedAt:
          new Date().toISOString(),
      }));


    localStorage.setItem(
      "mrigare-shka-health-reports",
      JSON.stringify([
        ...existingReports,
        ...syncedReports,
      ])
    );


    localStorage.removeItem(
      "mrigare-shka-offline-reports"
    );


    setStatus("synced");

    setMessage(
      `${syncedReports.length} ${t.syncedCount}`
    );
  }


  return (
    <DashboardLayout role="Farmer">

      {/* ================================================= */}
      {/* BACK */}
      {/* ================================================= */}

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

            <CloudOff size={25} />

          </div>


          <div>

            <p className="text-sm font-medium text-green-700">
              {t.connectivitySupport}
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
      {/* CONNECTION STATUS */}
      {/* ================================================= */}

      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

        <div className="flex items-center gap-4">

          {status === "synced" ? (

            <CheckCircle
              size={25}
              className="text-green-600"
            />

          ) : status === "pending" ? (

            <CloudOff
              size={25}
              className="text-yellow-600"
            />

          ) : (

            <Wifi
              size={25}
              className="text-blue-600"
            />

          )}


          <div>

            <p className="text-sm font-semibold text-gray-900">
              {t.connectionStatus}
            </p>


            <p className="mt-1 text-sm text-gray-600">

              {status === "synced"
                ? t.syncedSuccessfully
                : status === "pending"
                ? t.waitingForSync
                : t.offlineSimulation}

            </p>

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* REPORT FORM */}
      {/* ================================================= */}

      <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">

        <h2 className="text-lg font-bold text-gray-900">
          {t.createHealthReport}
        </h2>


        <p className="mt-1 text-sm text-gray-500">
          {t.createHealthReportDescription}
        </p>


        {/* ANIMAL ID */}

        <div className="mt-5">

          <label className="text-sm font-medium text-gray-700">
            {t.animalId}
          </label>


          <input
            value={animalId}
            onChange={(event) =>
              setAnimalId(event.target.value)
            }
            placeholder={t.animalIdPlaceholder}
            className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500"
          />

        </div>


        {/* SYMPTOM */}

        <div className="mt-5">

          <label className="text-sm font-medium text-gray-700">
            {t.symptom}
          </label>


          <select
            value={symptom}
            onChange={(event) =>
              setSymptom(event.target.value)
            }
            className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500"
          >

            <option value="">
              {t.selectSymptom}
            </option>


            {symptomOptions.map(
              (item) => (

                <option
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </option>

              )
            )}

          </select>

        </div>


        {/* SAVE */}

        <button
          type="button"
          onClick={saveOffline}
          className="mt-6 w-full rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white hover:bg-green-800"
        >
          {t.saveReportOffline}
        </button>

      </section>


      {/* ================================================= */}
      {/* SYNC */}
      {/* ================================================= */}

      <section className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-6">

        <div className="flex items-start gap-4">

          <RefreshCw
            size={23}
            className="mt-1 text-blue-700"
          />


          <div className="flex-1">

            <h2 className="font-bold text-blue-900">
              {t.synchronizePendingReports}
            </h2>


            <p className="mt-1 text-sm leading-6 text-blue-800">
              {t.synchronizeDescription}
            </p>


            <button
              type="button"
              onClick={syncReports}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
            >

              <RefreshCw size={17} />

              {t.syncReports}

            </button>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* MESSAGE */}
      {/* ================================================= */}

      {message && (

        <div className="mt-6 rounded-xl border border-green-100 bg-green-50 p-5">

          <p className="text-sm font-semibold text-green-800">
            {message}
          </p>

        </div>

      )}


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


export default OfflineSyncReporting;
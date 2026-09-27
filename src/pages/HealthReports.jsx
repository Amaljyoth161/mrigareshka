import {
  ArrowLeft,
  ClipboardList,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
} from "lucide-react";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import { useLanguage } from "../context/LanguageContext";

function HealthReports() {
  const { language } = useLanguage();

  const [reports, setReports] = useState([]);

  /* =========================================================
     TRANSLATIONS
  ========================================================= */

  const text = {
    backToDashboard: {
      english: "Back to Dashboard",
      hindi: "डैशबोर्ड पर वापस जाएं",
    },

    animalHealthMonitoring: {
      english: "Animal Health Monitoring",
      hindi: "पशु स्वास्थ्य निगरानी",
    },

    myHealthReports: {
      english: "My Health Reports",
      hindi: "मेरी स्वास्थ्य रिपोर्ट",
    },

    viewHealthReports: {
      english:
        "View the health reports submitted for your livestock.",
      hindi:
        "अपने पशुधन के लिए जमा की गई स्वास्थ्य रिपोर्ट देखें।",
    },

    totalReports: {
      english: "Total Reports",
      hindi: "कुल रिपोर्ट",
    },

    reportsSubmitted: {
      english: "Reports submitted",
      hindi: "जमा की गई रिपोर्ट",
    },

    priorityReports: {
      english: "Priority Reports",
      hindi: "प्राथमिकता रिपोर्ट",
    },

    needFasterReview: {
      english: "Need faster review",
      hindi: "शीघ्र समीक्षा आवश्यक",
    },

    underReview: {
      english: "Under Review",
      hindi: "समीक्षा के अधीन",
    },

    beingAssessed: {
      english: "Being assessed",
      hindi: "मूल्यांकन किया जा रहा है",
    },

    reportHistory: {
      english: "Report History",
      hindi: "रिपोर्ट इतिहास",
    },

    recentlySubmittedReports: {
      english:
        "Your recently submitted livestock health reports.",
      hindi:
        "आपके द्वारा हाल ही में जमा की गई पशुधन स्वास्थ्य रिपोर्ट।",
    },

    noHealthReports: {
      english: "No health reports yet",
      hindi: "अभी तक कोई स्वास्थ्य रिपोर्ट नहीं है",
    },

    reportIssueWillAppear: {
      english:
        "When you report an animal health issue, it will appear here.",
      hindi:
        "जब आप किसी पशु की स्वास्थ्य समस्या की रिपोर्ट करेंगे, तो वह यहां दिखाई देगी।",
    },

    viewMyAnimals: {
      english: "View My Animals",
      hindi: "मेरे पशुओं को देखें",
    },

    aboutHealthReports: {
      english: "About health reports",
      hindi: "स्वास्थ्य रिपोर्ट के बारे में",
    },

    healthReportInfo: {
      english:
        "These reports help connect farmer observations with veterinary review. Priority levels are decision-support signals and do not represent a confirmed disease diagnosis.",
      hindi:
        "ये रिपोर्ट किसान द्वारा दी गई जानकारी को पशु चिकित्सा समीक्षा से जोड़ने में मदद करती हैं। प्राथमिकता स्तर केवल निर्णय सहायता संकेत हैं और किसी पुष्टि की गई बीमारी का निदान नहीं दर्शाते हैं।",
    },

    livestockAnimal: {
      english: "Livestock Animal",
      hindi: "पशुधन पशु",
    },

    submitted: {
      english: "Submitted",
      hindi: "जमा किया गया",
    },

    priorityReview: {
      english: "Priority Review",
      hindi: "प्राथमिकता समीक्षा",
    },

    resolved: {
      english: "Resolved",
      hindi: "समाधान किया गया",
    },

    completed: {
      english: "Completed",
      hindi: "पूरा किया गया",
    },

    notSpecified: {
      english: "Not specified",
      hindi: "निर्दिष्ट नहीं",
    },

    reportId: {
      english: "Report ID",
      hindi: "रिपोर्ट आईडी",
    },

    species: {
      english: "Species",
      hindi: "प्रजाति",
    },

    duration: {
      english: "Duration",
      hindi: "अवधि",
    },

    source: {
      english: "Source",
      hindi: "स्रोत",
    },

    farmerPortal: {
      english: "Farmer Portal",
      hindi: "किसान पोर्टल",
    },

    notRecorded: {
      english: "Not recorded",
      hindi: "दर्ज नहीं किया गया",
    },

    reportedSymptoms: {
      english: "Reported Symptoms",
      hindi: "रिपोर्ट किए गए लक्षण",
    },

    farmerNotes: {
      english: "Farmer Notes",
      hindi: "किसान की टिप्पणियां",
    },

    severe: {
      english: "Severe",
      hindi: "गंभीर",
    },

    moderate: {
      english: "Moderate",
      hindi: "मध्यम",
    },

    mild: {
      english: "Mild",
      hindi: "हल्का",
    },

    high: {
      english: "High",
      hindi: "उच्च",
    },

    medium: {
      english: "Medium",
      hindi: "मध्यम",
    },

    low: {
      english: "Low",
      hindi: "कम",
    },

    recently: {
      english: "Recently",
      hindi: "हाल ही में",
    },
  };

  const t = (key) => {
    return (
      text[key]?.[language] ||
      text[key]?.english ||
      key
    );
  };

  /* =========================================================
     STATUS TRANSLATION
  ========================================================= */

  const translateStatus = (status) => {
    const statusMap = {
      Submitted: t("submitted"),
      "Priority Review": t("priorityReview"),
      "Under Review": t("underReview"),
      Resolved: t("resolved"),
      Completed: t("completed"),
    };

    return statusMap[status] || status;
  };

  /* =========================================================
     SEVERITY TRANSLATION
  ========================================================= */

  const translateSeverity = (severity) => {
    const severityMap = {
      Severe: t("severe"),
      Moderate: t("moderate"),
      Mild: t("mild"),
      High: t("high"),
      Medium: t("medium"),
      Low: t("low"),
    };

    return severityMap[severity] || severity || t("notSpecified");
  };

  /* =========================================================
     SPECIES TRANSLATION
  ========================================================= */

  const translateSpecies = (species) => {
    const speciesMap = {
      Cow: language === "hindi" ? "गाय" : "Cow",
      Buffalo: language === "hindi" ? "भैंस" : "Buffalo",
      Goat: language === "hindi" ? "बकरी" : "Goat",
      Sheep: language === "hindi" ? "भेड़" : "Sheep",
      Other: language === "hindi" ? "अन्य" : "Other",
    };

    return speciesMap[species] || species || t("notRecorded");
  };

  /* =========================================================
     LOAD REPORTS
  ========================================================= */

  useEffect(() => {
    loadReports();

    const handleFocus = () => {
      loadReports();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  function loadReports() {
    const savedReports = JSON.parse(
      localStorage.getItem(
        "mrigare-shka-health-reports"
      ) || "[]"
    );

    setReports(
      savedReports
        .slice()
        .sort(
          (a, b) =>
            new Date(
              b.createdAt || b.submittedAt || 0
            ) -
            new Date(
              a.createdAt || a.submittedAt || 0
            )
        )
    );
  }

  /* =========================================================
     SUMMARY COUNTS
  ========================================================= */

  const priorityReports = reports.filter(
    (report) =>
      report.status === "Priority Review" ||
      report.severity === "Severe"
  ).length;

  const reviewReports = reports.filter(
    (report) =>
      report.status === "Under Review"
  ).length;

  const completedReports = reports.filter(
    (report) =>
      report.status === "Resolved" ||
      report.status === "Completed"
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
          {t("animalHealthMonitoring")}
        </p>

        <h1 className="mt-1 text-3xl font-bold text-gray-900">
          {t("myHealthReports")}
        </h1>

        <p className="mt-2 text-gray-600">
          {t("viewHealthReports")}
        </p>

      </div>

      {/* =====================================================
          SUMMARY
      ===================================================== */}

      <div className="grid gap-5 md:grid-cols-3">

        <SummaryCard
          icon={<ClipboardList size={21} />}
          title={t("totalReports")}
          value={reports.length}
          description={t("reportsSubmitted")}
        />

        <SummaryCard
          icon={<AlertTriangle size={21} />}
          title={t("priorityReports")}
          value={priorityReports}
          description={t("needFasterReview")}
        />

        <SummaryCard
          icon={<Clock size={21} />}
          title={t("underReview")}
          value={reviewReports}
          description={t("beingAssessed")}
        />

      </div>

      {/* =====================================================
          REPORT LIST
      ===================================================== */}

      <section className="mt-8 rounded-2xl border border-gray-200 bg-white">

        <div className="border-b border-gray-200 p-6">

          <h2 className="text-lg font-bold text-gray-900">
            {t("reportHistory")}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {t("recentlySubmittedReports")}
          </p>

        </div>

        {reports.length === 0 ? (

          <div className="p-10 text-center">

            <ClipboardList
              size={40}
              className="mx-auto text-gray-300"
            />

            <h3 className="mt-4 font-semibold text-gray-900">
              {t("noHealthReports")}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {t("reportIssueWillAppear")}
            </p>

            <Link
              to="/farmer/animals"
              className="mt-5 inline-flex rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-800"
            >
              {t("viewMyAnimals")}
            </Link>

          </div>

        ) : (

          <div className="divide-y divide-gray-100">

            {reports.map((report) => (
              <ReportCard
                key={report.id}
                report={report}
                t={t}
                language={language}
                translateStatus={translateStatus}
                translateSeverity={translateSeverity}
                translateSpecies={translateSpecies}
              />
            ))}

          </div>

        )}

      </section>

      {/* =====================================================
          NOTE
      ===================================================== */}

      <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-5">

        <p className="text-sm font-semibold text-blue-900">
          {t("aboutHealthReports")}
        </p>

        <p className="mt-1 text-sm leading-6 text-blue-800">
          {t("healthReportInfo")}
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
   REPORT CARD
========================================================= */

function ReportCard({
  report,
  t,
  language,
  translateStatus,
  translateSeverity,
  translateSpecies,
}) {

  const status =
    report.status || "Submitted";

  const statusStyle =
    status === "Priority Review"
      ? "bg-red-100 text-red-700"
      : status === "Under Review"
      ? "bg-yellow-100 text-yellow-700"
      : status === "Resolved" ||
        status === "Completed"
      ? "bg-green-100 text-green-700"
      : "bg-blue-100 text-blue-700";

  const severityStyle =
    report.severity === "Severe"
      ? "bg-red-100 text-red-700"
      : report.severity === "Moderate"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";

  const reportDate =
    report.createdAt ||
    report.submittedAt;

  return (
    <div className="p-6">

      <div className="flex flex-col gap-5">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">

          <div>

            <div className="flex flex-wrap items-center gap-2">

              <h3 className="text-lg font-bold text-gray-900">
                {report.animalName ||
                  t("livestockAnimal")}
              </h3>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle}`}
              >
                {translateStatus(status)}
              </span>

            </div>

            <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">

              <span>
                {t("reportId")}: {report.id}
              </span>

              {reportDate && (
                <span>
                  {new Date(
                    reportDate
                  ).toLocaleDateString(
                    language === "hindi"
                      ? "hi-IN"
                      : "en-IN"
                  )}
                </span>
              )}

            </div>

          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${severityStyle}`}
          >
            {translateSeverity(report.severity)}
          </span>

        </div>

        {/* =================================================
            DETAILS
        ================================================= */}

        <div className="grid gap-4 md:grid-cols-3">

          <div className="rounded-xl bg-gray-50 p-4">

            <p className="text-xs text-gray-500">
              {t("species")}
            </p>

            <p className="mt-1 font-semibold text-gray-900">
              {translateSpecies(report.species)}
            </p>

          </div>

          <div className="rounded-xl bg-gray-50 p-4">

            <p className="text-xs text-gray-500">
              {t("duration")}
            </p>

            <p className="mt-1 font-semibold text-gray-900">
              {report.duration ||
                t("notRecorded")}
            </p>

          </div>

          <div className="rounded-xl bg-gray-50 p-4">

            <p className="text-xs text-gray-500">
              {t("source")}
            </p>

            <p className="mt-1 font-semibold text-gray-900">
              {report.source ||
                t("farmerPortal")}
            </p>

          </div>

        </div>

        {/* =================================================
            LOCATION
        ================================================= */}

        {report.location && (

          <div className="flex items-center gap-2 text-sm text-gray-600">

            <MapPin size={16} />

            {report.location}

          </div>

        )}

        {/* =================================================
            SYMPTOMS
        ================================================= */}

        {report.symptoms?.length > 0 && (

          <div>

            <p className="text-sm font-semibold text-gray-700">
              {t("reportedSymptoms")}
            </p>

            <div className="mt-2 flex flex-wrap gap-2">

              {report.symptoms.map(
                (symptom) => (

                  <span
                    key={symptom}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                  >
                    {symptom}
                  </span>

                )
              )}

            </div>

          </div>

        )}

        {/* =================================================
            NOTES
        ================================================= */}

        {report.notes && (

          <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">

            <p className="text-xs font-semibold text-gray-500">
              {t("farmerNotes")}
            </p>

            <p className="mt-1 text-sm leading-6 text-gray-700">
              {report.notes}
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default HealthReports;
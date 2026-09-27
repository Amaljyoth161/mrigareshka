import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  HeartPulse,
  MapPin,
  PawPrint,
  Syringe,
  Stethoscope,
  Activity,
  AlertTriangle,
  ShieldCheck,
  Utensils,
  Clock3,
  CircleDot,
} from "lucide-react";

import { Link, useParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

import DashboardLayout from "../layouts/DashboardLayout";

import { getAnimals } from "../data/animals";

import { getVaccinationStatus } from "../data/vaccinationService";

import { getCases } from "../data/caseService";



const translations = {
  "Animal Not Found": "पशु नहीं मिला",
  "The requested animal could not be found in your livestock records.": "अनुरोधित पशु आपके पशुधन रिकॉर्ड में नहीं मिला।",
  "Back to My Animals": "मेरे पशुओं पर वापस जाएँ",
  "Last check-up": "अंतिम स्वास्थ्य जाँच",
  "Age": "आयु",
  "Weight": "वजन",
  "Sex": "लिंग",
  "Color": "रंग",
  "years": "वर्ष",
  "kg": "किग्रा",
  "Not scheduled": "निर्धारित नहीं",
  "Completed:": "पूर्ण:",
  "Visit completed:": "दौरा पूरा हुआ:",
  "Observation": "अवलोकन",
  "Field visit has been assigned but no observation has been recorded yet.": "क्षेत्रीय दौरा सौंपा गया है, लेकिन अभी तक कोई अवलोकन दर्ज नहीं किया गया है।",
  "Continue monitoring and maintaining this animal's health record.": "इस पशु के स्वास्थ्य रिकॉर्ड की निगरानी और रखरखाव जारी रखें।",
  "Report Health Issue": "स्वास्थ्य समस्या रिपोर्ट करें",
  "Nutrition Assistant": "पोषण सहायक",
  "Animal Information": "पशु की जानकारी",
  "Health Overview": "स्वास्थ्य अवलोकन",
  "A quick view of the current health record for": "के वर्तमान स्वास्थ्य रिकॉर्ड का त्वरित अवलोकन।",
  "Health Status": "स्वास्थ्य स्थिति",
  "Current recorded status": "वर्तमान दर्ज स्थिति",
  "Vaccination": "टीकाकरण",
  "Current vaccination record": "वर्तमान टीकाकरण रिकॉर्ड",
  "Health Reports": "स्वास्थ्य रिपोर्ट",
  "Submitted health reports": "जमा की गई स्वास्थ्य रिपोर्ट",
  "Health Case Status": "स्वास्थ्य मामले की स्थिति",
  "Follow the progress of": "की रिपोर्ट की गई स्वास्थ्य समस्या की प्रगति देखें।",
  "Report Submitted": "रिपोर्ट जमा की गई",
  "No health report has been submitted yet.": "अभी तक कोई स्वास्थ्य रिपोर्ट जमा नहीं की गई है।",
  "Veterinary Review": "पशु चिकित्सा समीक्षा",
  "The reported health information has entered the veterinary review workflow.": "रिपोर्ट की गई स्वास्थ्य जानकारी पशु चिकित्सा समीक्षा प्रक्रिया में प्रवेश कर चुकी है।",
  "Waiting for veterinary review.": "पशु चिकित्सा समीक्षा की प्रतीक्षा है।",
  "Priority Assessment": "प्राथमिकता आकलन",
  "The case has been identified for veterinary attention based on the recorded health signals.": "दर्ज स्वास्थ्य संकेतों के आधार पर इस मामले को पशु चिकित्सा ध्यान के लिए चिन्हित किया गया है।",
  "Priority assessment will appear when the report requires further attention.": "जब रिपोर्ट पर आगे ध्यान देने की आवश्यकता होगी, तब प्राथमिकता आकलन यहाँ दिखाई देगा।",
  "Field Visit": "क्षेत्रीय दौरा",
  "A veterinary or field visit has been completed.": "पशु चिकित्सा या क्षेत्रीय दौरा पूरा हो चुका है।",
  "A veterinary field response has been assigned or is in progress.": "पशु चिकित्सा क्षेत्रीय प्रतिक्रिया सौंपी गई है या प्रगति पर है।",
  "Field visit will appear here when assigned.": "सौंपे जाने पर क्षेत्रीय दौरा यहाँ दिखाई देगा।",
  "Veterinary Response": "पशु चिकित्सा प्रतिक्रिया",
  "Veterinary or field visit observations have been recorded.": "पशु चिकित्सा या क्षेत्रीय दौरे के अवलोकन दर्ज किए गए हैं।",
  "The final veterinary response will appear after the visit observation is recorded.": "दौरे का अवलोकन दर्ज होने के बाद अंतिम पशु चिकित्सा प्रतिक्रिया यहाँ दिखाई देगी।",
  "Completed": "पूर्ण",
  "In Progress": "प्रगति पर",
  "This timeline reflects recorded workflow activity in the demo system. It does not independently confirm a disease diagnosis or replace examination by a qualified veterinarian.": "यह समयरेखा डेमो सिस्टम में दर्ज कार्यप्रवाह गतिविधि को दर्शाती है। यह स्वतंत्र रूप से किसी बीमारी के निदान की पुष्टि नहीं करती और योग्य पशु चिकित्सक की जाँच का विकल्प नहीं है।",
  "No veterinary field response recorded.": "कोई पशु चिकित्सा क्षेत्रीय प्रतिक्रिया दर्ज नहीं है।",
  "Veterinary response activity for this village will appear here when assigned.": "इस गाँव के लिए पशु चिकित्सा प्रतिक्रिया सौंपी जाने पर यहाँ दिखाई देगी।",
  "Health History": "स्वास्थ्य इतिहास",
  "Recorded health observations and check-ups.": "दर्ज स्वास्थ्य अवलोकन और जाँच।",
  "No health history recorded.": "कोई स्वास्थ्य इतिहास दर्ज नहीं है।",
  "Vaccination History": "टीकाकरण इतिहास",
  "Vaccinations recorded for this animal.": "इस पशु के लिए दर्ज टीकाकरण।",
  "No vaccination records available.": "कोई टीकाकरण रिकॉर्ड उपलब्ध नहीं है।",
  "Treatment History": "उपचार इतिहास",
  "Previously recorded veterinary treatments.": "पहले दर्ज किए गए पशु चिकित्सा उपचार।",
  "No treatment records available.": "कोई उपचार रिकॉर्ड उपलब्ध नहीं है।",
  "Dose": "खुराक",
  "Recorded": "दर्ज",
  "Report ID": "रिपोर्ट आईडी",
  "Submitted": "जमा किया गया",
  "Reported Symptoms": "रिपोर्ट किए गए लक्षण",
  "No symptoms selected": "कोई लक्षण चयनित नहीं हैं",
  "Appetite": "भूख",
  "Activity": "गतिविधि",
  "Temperature": "तापमान",
  "Not recorded": "रिकॉर्ड नहीं किया गया",
  "Symptoms Started": "लक्षण शुरू हुए",
  "Additional Observation": "अतिरिक्त अवलोकन",
  "No health reports submitted yet.": "अभी तक कोई स्वास्थ्य रिपोर्ट जमा नहीं की गई है।",
  "Report a health issue if you notice unusual symptoms.": "यदि आपको असामान्य लक्षण दिखाई दें तो स्वास्थ्य समस्या रिपोर्ट करें।",
  "Submit First Report": "पहली रिपोर्ट जमा करें",
  "Animal Health Actions": "पशु स्वास्थ्य कार्यवाही",
  "Continue monitoring and maintaining this animal's health record.": "इस पशु के स्वास्थ्य रिकॉर्ड की निगरानी और रखरखाव जारी रखें।",
  "Record new symptoms": "नए लक्षण दर्ज करें",
  "View feeding guidance": "आहार संबंधी मार्गदर्शन देखें",
  "Knowledge Hub": "ज्ञान केंद्र",
  "Learn prevention practices": "रोकथाम के तरीके सीखें",
  "Health record information": "स्वास्थ्य रिकॉर्ड जानकारी",
  "This health passport organizes recorded livestock information and reported observations. It does not replace examination or diagnosis by a qualified veterinary professional.": "यह स्वास्थ्य पासपोर्ट दर्ज पशुधन जानकारी और रिपोर्ट किए गए अवलोकनों को व्यवस्थित करता है। यह योग्य पशु चिकित्सा पेशेवर की जाँच या निदान का विकल्प नहीं है।",
  "Field Visit Observation": "क्षेत्रीय दौरे का अवलोकन",
  "Task ID": "कार्य आईडी",
  "Priority": "प्राथमिकता",
  "Affected Animals": "प्रभावित पशु",
  "Case ID": "मामला आईडी",
  "Veterinary Case Response": "पशु चिकित्सा मामले की प्रतिक्रिया",
  "Visit Date": "दौरे की तारीख",
  "Severity": "गंभीरता",
  "Field visit has been assigned but no observation has been recorded yet.": "क्षेत्रीय दौरा सौंपा गया है, लेकिन अभी तक कोई अवलोकन दर्ज नहीं किया गया है।",
  "Visit completed": "दौरा पूरा हुआ",
  "Visit Completed": "दौरा पूरा हुआ",
  "Visit In Progress": "दौरा प्रगति पर",
  "Field Visit Assigned": "क्षेत्रीय दौरा सौंपा गया",
  "High Priority": "उच्च प्राथमिकता",
  "Moderate Priority": "मध्यम प्राथमिकता",
  "Low Priority": "कम प्राथमिकता",
  "Low": "कम",
  "Severe": "गंभीर",
  "Moderate": "मध्यम",
  "Mild": "हल्का",
  "Priority Review": "प्राथमिकता समीक्षा",
  "Under Review": "समीक्षा के अधीन",
  "Resolved": "समाधान किया गया",
  "Synced": "सिंक किया गया",
  "Assigned": "सौंपा गया",
  "Healthy": "स्वस्थ",
  "Under Review": "समीक्षा के अधीन",
  "Up to date": "अद्यतन",
  "Due Soon": "जल्द देय",
  "Overdue": "अतिदेय",
  "Male": "नर",
  "Female": "मादा",
  "Cow": "गाय",
  "Buffalo": "भैंस",
  "Goat": "बकरी",
  "Sheep": "भेड़",
  "Other": "अन्य",
  "Jersey": "जर्सी",
  "Holstein Friesian": "होल्स्टीन फ़्रिज़ियन",
  "Murrah": "मुर्रा",
  "Gir": "गिर",
  "Malabari": "मालाबारी",
  "Village A": "गाँव A",
  "Village B": "गाँव B",
  "Village C": "गाँव C",
  "Lakshmi": "लक्ष्मी",
  "Ganga": "गंगा",
  "Kali": "काली",
  "Raja": "राजा",
  "Meena": "मीना",
};

function tr(value, language) {
  return language === "hindi" ? (translations[value] || value) : value;
}

function displayValue(value, language) {
  return value ? tr(value, language) : tr("Not recorded", language);
}

function displayAnimalName(value, language) {
  return displayValue(value, language);
}

function AnimalProfile() {

  const { language } = useLanguage();
  const { animalId } = useParams();

  const animals = getAnimals();

  const animal = animals.find(
    (item) => item.id === animalId
  );


  /* ================= HEALTH REPORTS ================= */

  const allReports = JSON.parse(
    localStorage.getItem(
      "mrigare-shka-health-reports"
    ) || "[]"
  );


  const animalReports = allReports.filter(
    (report) =>
      report.animalId === animalId
  );


  /* ================= FIELD RESPONSE DATA ================= */

  const allFieldTasks = JSON.parse(
    localStorage.getItem(
      "mrigare-shka-field-tasks"
    ) || "[]"
  );


  const animalFieldTasks =
    allFieldTasks.filter(
      (task) =>
        task.village === animal?.location
    );


  /* ================= INDIVIDUAL VETERINARY CASES ================= */

  const allCases = getCases();


  const animalCases =
    allCases.filter(
      (caseItem) =>
        caseItem.animalId === animalId ||
        (
          caseItem.animalName === animal?.name &&
          caseItem.location === animal?.location
        )
    );


  /* ================= ANIMAL NOT FOUND ================= */

  if (!animal) {

    return (
      <DashboardLayout role="Farmer">

        <div className="flex min-h-[60vh] items-center justify-center">

          <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">

              <AlertTriangle size={30} />

            </div>


            <h1 className="mt-5 text-2xl font-bold text-gray-900">
              {tr("Animal Not Found", language)}
            </h1>


            <p className="mt-2 text-sm leading-6 text-gray-500">
              {tr("The requested animal could not be found in your livestock records.", language)}
            </p>


            <Link
              to="/farmer/animals"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
            >

              <ArrowLeft size={18} />

              {tr("Back to My Animals", language)}

            </Link>

          </div>

        </div>

      </DashboardLayout>
    );
  }


  const healthy =
    animal.status === "Healthy";


  const vaccination =
    getVaccinationStatus(animal);


  const vaccinationColor =
    vaccination.status === "Overdue"
      ? "red"
      : vaccination.status === "Due Soon"
      ? "yellow"
      : vaccination.status === "Up to date"
      ? "green"
      : "gray";


  /*
   * ============================================================
   * CASE STATUS INFORMATION
   * ============================================================
   *
   * We use the existing reports, cases and field tasks.
   * No separate database is required.
   */

  const latestReport =
    [...animalReports]
      .sort(
        (a, b) =>
          new Date(
            b.submittedAt ||
            b.createdAt ||
            0
          ) -
          new Date(
            a.submittedAt ||
            a.createdAt ||
            0
          )
      )[0] || null;


  const latestCase =
    [...animalCases]
      .sort(
        (a, b) =>
          new Date(
            b.completedAt ||
            b.updatedAt ||
            b.createdAt ||
            0
          ) -
          new Date(
            a.completedAt ||
            a.updatedAt ||
            a.createdAt ||
            0
          )
      )[0] || null;


  const latestFieldTask =
    [...animalFieldTasks]
      .sort(
        (a, b) =>
          new Date(
            b.completedAt ||
            b.startedAt ||
            b.createdAt ||
            0
          ) -
          new Date(
            a.completedAt ||
            a.startedAt ||
            a.createdAt ||
            0
          )
      )[0] || null;


  const priorityDetected =
    animalReports.some(
      (report) =>
        report.severity === "Severe" ||
        report.status === "Priority Review"
    ) ||
    animalCases.some(
      (caseItem) =>
        caseItem.priority === "High" ||
        caseItem.priority === "Moderate"
    ) ||
    animalFieldTasks.some(
      (task) =>
        task.priority === "High" ||
        task.priority === "Moderate"
    );


  const fieldVisitCompleted =
    animalCases.some(
      (caseItem) =>
        caseItem.status === "Visit Completed"
    ) ||
    animalFieldTasks.some(
      (task) =>
        task.status === "Visit Completed"
    );


  const veterinaryResponseAvailable =
    animalCases.some(
      (caseItem) =>
        Boolean(caseItem.visitNotes)
    ) ||
    animalFieldTasks.some(
      (task) =>
        Boolean(task.visitNotes)
    );


  const veterinaryReviewStarted =
    animalCases.length > 0 ||
    animalFieldTasks.length > 0 ||
    animalReports.some(
      (report) =>
        report.status === "Under Review" ||
        report.status === "Priority Review" ||
        report.status === "Resolved"
    );


  const timelineSteps = [
    {
      title: "Report Submitted",
      description:
        latestReport
          ? `Health report ${latestReport.id} was submitted for ${displayAnimalName(animal.name, language)}.`
          : "No health report has been submitted yet.",
      completed: animalReports.length > 0,
      active: animalReports.length > 0,
      icon: <ClipboardList size={17} />,
      date: latestReport
        ? new Date(
            latestReport.submittedAt ||
            latestReport.createdAt ||
            Date.now()
          ).toLocaleString()
        : null,
    },

    {
      title: "Veterinary Review",
      description:
        veterinaryReviewStarted
          ? "The reported health information has entered the veterinary review workflow."
          : "Waiting for veterinary review.",
      completed: veterinaryReviewStarted,
      active:
        veterinaryReviewStarted &&
        !priorityDetected &&
        !fieldVisitCompleted,
      icon: <Stethoscope size={17} />,
      date: latestCase?.createdAt
        ? new Date(
            latestCase.createdAt
          ).toLocaleString()
        : null,
    },

    {
      title: "Priority Assessment",
      description:
        priorityDetected
          ? "The case has been identified for veterinary attention based on the recorded health signals."
          : "Priority assessment will appear when the report requires further attention.",
      completed: priorityDetected,
      active:
        priorityDetected &&
        !fieldVisitCompleted,
      icon: <AlertTriangle size={17} />,
      date: null,
    },

    {
      title: "Field Visit",
      description:
        fieldVisitCompleted
          ? "A veterinary or field visit has been completed."
          : animalCases.length > 0 ||
            animalFieldTasks.length > 0
          ? "A veterinary field response has been assigned or is in progress."
          : "Field visit will appear here when assigned.",
      completed: fieldVisitCompleted,
      active:
        (animalCases.length > 0 ||
          animalFieldTasks.length > 0) &&
        !fieldVisitCompleted,
      icon: <MapPin size={17} />,
      date:
        latestFieldTask?.completedAt
          ? new Date(
              latestFieldTask.completedAt
            ).toLocaleString()
          : latestCase?.completedAt
          ? new Date(
              latestCase.completedAt
            ).toLocaleString()
          : null,
    },

    {
      title: "Veterinary Response",
      description:
        veterinaryResponseAvailable
          ? "Veterinary or field visit observations have been recorded."
          : "The final veterinary response will appear after the visit observation is recorded.",
      completed: veterinaryResponseAvailable,
      active:
        veterinaryResponseAvailable,
      icon: <CheckCircle2 size={17} />,
      date:
        latestFieldTask?.completedAt
          ? new Date(
              latestFieldTask.completedAt
            ).toLocaleString()
          : latestCase?.completedAt
          ? new Date(
              latestCase.completedAt
            ).toLocaleString()
          : null,
    },
  ];


  return (
    <DashboardLayout role="Farmer">

      <div className="space-y-6">


        {/* ================================================= */}
        {/* BACK NAVIGATION */}
        {/* ================================================= */}

        <Link
          to="/farmer/animals"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-green-700"
        >

          <ArrowLeft size={17} />

          Back to My Animals

        </Link>


        {/* ================================================= */}
        {/* PAGE HEADER / HEALTH PASSPORT HEADER */}
        {/* ================================================= */}

        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          <div className="bg-gradient-to-r from-green-50 to-white p-6 md:p-8">

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              <div className="flex items-start gap-5">

                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700 shadow-sm">

                  <PawPrint size={38} />

                </div>


                <div>

                  <div className="flex flex-wrap items-center gap-3">

                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                      {displayAnimalName(animal.name, language)}
                    </h1>


                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        healthy
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {displayValue(animal.status, language)}
                    </span>

                  </div>


                  <p className="mt-2 text-sm text-gray-500">
                    {displayValue(animal.species, language)} · {displayValue(animal.breed, language)} · ID: {animal.id}
                  </p>


                  <div className="mt-4 flex flex-wrap gap-4">

                    <div className="flex items-center gap-2 text-sm text-gray-600">

                      <MapPin
                        size={16}
                        className="text-green-700"
                      />

                      {displayValue(animal.location, language)}

                    </div>


                    <div className="flex items-center gap-2 text-sm text-gray-600">

                      <CalendarDays
                        size={16}
                        className="text-green-700"
                      />

                      {tr("Last check-up", language)}: {animal.lastCheckup}

                    </div>

                  </div>

                </div>

              </div>


              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">

                <Link
                  to={`/farmer/animals/${animal.id}/report`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                >

                  <HeartPulse size={18} />

                  {tr("Report Health Issue", language)}

                </Link>


                <Link
                  to={`/farmer/animals/${animal.id}/nutrition`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-green-300 hover:text-green-700"
                >

                  <Utensils size={18} />

                  {tr("Nutrition Assistant", language)}

                </Link>

              </div>

            </div>

          </div>


          {/* BASIC DETAILS */}

          <div className="border-t border-gray-100 p-6 md:p-8">

            <div className="mb-4 flex items-center gap-2">

              <Activity
                size={18}
                className="text-green-700"
              />

              <h2 className="font-semibold text-gray-900">
                {tr("Animal Information", language)}
              </h2>

            </div>


            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              <InfoItem
                label="Age"
                value={`${animal.age} ${language === "hindi" ? "वर्ष" : "years"}`}
              />

              <InfoItem
                label="Weight"
                value={`${animal.weight} ${language === "hindi" ? "किग्रा" : "kg"}`}
              />

              <InfoItem
                label="Sex"
                value={displayValue(animal.sex, language)}
              />

              <InfoItem
                label="Color"
                value={displayValue(animal.color, language)}
              />

            </div>

          </div>

        </section>


        {/* ================================================= */}
        {/* HEALTH OVERVIEW */}
        {/* ================================================= */}

        <section>

          <div className="mb-4">

            <h2 className="text-xl font-bold text-gray-900">
              {tr("Health Overview", language)}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {language === "hindi" ? `${displayAnimalName(animal.name, language)} के वर्तमान स्वास्थ्य रिकॉर्ड का त्वरित अवलोकन।` : `A quick view of the current health record for ${displayAnimalName(animal.name, language)}.`}
            </p>

          </div>


          <div className="grid gap-4 md:grid-cols-3">

            <SummaryCard
              icon={<HeartPulse size={21} />}
              title="Health Status"
              value={displayValue(animal.status, language)}
              description="Current recorded status"
              tone={healthy ? "green" : "yellow"}
            />


            <SummaryCard
              icon={<Syringe size={21} />}
              title="Vaccination"
              value={displayValue(vaccination.status, language)}
              description={
                vaccination.daysUntilDue !== null
                  ? vaccination.daysUntilDue >= 0
                    ? `${vaccination.daysUntilDue} ${
                        language === "hindi" ? "दिन शेष" : "day(s) until due"
                      }`
                    : `${Math.abs(vaccination.daysUntilDue)} ${
                        language === "hindi" ? "दिन अतिदेय" : "day(s) overdue"
                      }`
                  : tr("Current vaccination record", language)
              }
              tone={vaccinationColor}
            />


            <SummaryCard
              icon={<ClipboardList size={21} />}
              title="Health Reports"
              value={animalReports.length}
              description="Submitted health reports"
              tone="blue"
            />

          </div>

        </section>


        {/* ================================================= */}
        {/* CASE STATUS TIMELINE */}
        {/* ================================================= */}

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">

          <div className="flex items-start gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">

              <Clock3 size={20} />

            </div>


            <div>

              <h2 className="font-bold text-gray-900">
                {tr("Health Case Status", language)}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {language === "hindi" ? `${displayAnimalName(animal.name, language)} की रिपोर्ट की गई स्वास्थ्य समस्या की प्रगति देखें।` : `Follow the progress of ${displayAnimalName(animal.name, language)}'s reported health issue.`}
              </p>

            </div>

          </div>


          <div className="mt-7">

            {timelineSteps.map(
              (step, index) => {

                const isLast =
                  index ===
                  timelineSteps.length - 1;


                return (

                  <div
                    key={step.title}
                    className="relative flex gap-4"
                  >

                    {/* CONNECTING LINE */}

                    {!isLast && (

                      <div
                        className={`absolute left-[15px] top-9 h-[calc(100%-8px)] w-0.5 ${
                          step.completed
                            ? "bg-green-300"
                            : "bg-gray-200"
                        }`}
                      />

                    )}


                    {/* ICON */}

                    <div
                      className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 ${
                        step.completed
                          ? "border-green-600 bg-green-600 text-white"
                          : step.active
                          ? "border-blue-500 bg-blue-50 text-blue-600"
                          : "border-gray-200 bg-white text-gray-300"
                      }`}
                    >

                      {step.completed ? (
                        <CheckCircle2 size={16} />
                      ) : (
                        step.icon
                      )}

                    </div>


                    {/* CONTENT */}

                    <div
                      className={`min-h-[92px] flex-1 ${
                        isLast ? "" : "pb-6"
                      }`}
                    >

                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                        <div>

                          <div className="flex flex-wrap items-center gap-2">

                            <h3
                              className={`font-semibold ${
                                step.completed ||
                                step.active
                                  ? "text-gray-900"
                                  : "text-gray-400"
                              }`}
                            >
                              {step.title}
                            </h3>


                            {step.completed && (

                              <span className="rounded-full bg-green-100 px-2.5 py-1 text-[11px] font-semibold text-green-700">
                                Completed
                              </span>

                            )}


                            {!step.completed &&
                              step.active && (

                                <span className="rounded-full bg-blue-100 px-2.5 py-1 text-[11px] font-semibold text-blue-700">
                                  In Progress
                                </span>

                            )}

                          </div>


                          <p
                            className={`mt-1 text-sm leading-6 ${
                              step.completed ||
                              step.active
                                ? "text-gray-600"
                                : "text-gray-400"
                            }`}
                          >
                            {step.description}
                          </p>

                        </div>


                        {step.date && (

                          <span className="flex shrink-0 items-center gap-1 text-xs text-gray-400">

                            <CalendarDays size={13} />

                            {step.date}

                          </span>

                        )}

                      </div>

                    </div>

                  </div>

                );

              }
            )}

          </div>


          <div className="mt-5 rounded-xl border border-green-100 bg-green-50 p-4">

            <div className="flex items-start gap-3">

              <ShieldCheck
                size={19}
                className="mt-0.5 shrink-0 text-green-700"
              />

              <p className="text-xs leading-5 text-green-800">
                {tr("This timeline reflects recorded workflow activity in the demo system. It does not independently confirm a disease diagnosis or replace examination by a qualified veterinarian.", language)}
              </p>

            </div>

          </div>

        </section>


        {/* ================================================= */}
        {/* VETERINARY RESPONSE */}
        {/* ================================================= */}

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">

          <div className="flex items-start gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">

              <Stethoscope size={20} />

            </div>


            <div>

              <h2 className="font-bold text-gray-900">
                {tr("Veterinary Response", language)}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {language === "hindi" ? `${displayValue(animal.location, language)} से जुड़ी क्षेत्रीय प्रतिक्रिया गतिविधि।` : `Field response activity connected to ${displayValue(animal.location, language)}.`}
              </p>

            </div>

          </div>


          {animalFieldTasks.length === 0 &&
          animalCases.length === 0 ? (

            <div className="mt-6 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-7 text-center">

              <CheckCircle2
                size={30}
                className="mx-auto text-gray-300"
              />

              <p className="mt-3 text-sm font-medium text-gray-600">
                {tr("No veterinary field response recorded.", language)}
              </p>

              <p className="mt-1 text-xs text-gray-400">
                {tr("Veterinary response activity for this village will appear here when assigned.", language)}
              </p>

            </div>

          ) : (

            <div className="mt-6 space-y-4">


              {/* VILLAGE-LEVEL FIELD TASKS */}

              {animalFieldTasks.map(
                (task) => (

                  <VeterinaryResponseCard
                    key={`task-${task.id}`}
                    task={task}
                  />

                )
              )}


              {/* INDIVIDUAL VETERINARY CASES */}

              {animalCases.map(
                (caseItem) => (

                  <VeterinaryCaseResponseCard
                    key={`case-${caseItem.id}`}
                    caseItem={caseItem}
                  />

                )
              )}

            </div>

          )}

        </section>


        {/* ================================================= */}
        {/* HEALTH HISTORY */}
        {/* ================================================= */}

        <HistorySection
          icon={<HeartPulse size={20} />}
          iconClass="bg-green-100 text-green-700"
          title="Health History"
          description="Recorded health observations and check-ups."
        >

          {(animal.healthHistory || []).length === 0 ? (

            <EmptyState
              text="No health history recorded."
            />

          ) : (

            animal.healthHistory.map(
              (item, index) => (

                <HistoryRow
                  key={index}
                  icon={<HeartPulse size={18} />}
                  title={item.type}
                  description={item.description}
                  date={item.date}
                  status={item.status}
                />

              )
            )

          )}

        </HistorySection>


        {/* ================================================= */}
        {/* VACCINATION HISTORY */}
        {/* ================================================= */}

        <HistorySection
          icon={<Syringe size={20} />}
          iconClass="bg-blue-100 text-blue-700"
          title="Vaccination History"
          description="Vaccinations recorded for this animal."
        >

          {(animal.vaccinationHistory || []).length === 0 ? (

            <EmptyState
              text="No vaccination records available."
            />

          ) : (

            animal.vaccinationHistory.map(
              (item, index) => (

                <HistoryRow
                  key={index}
                  icon={<Syringe size={18} />}
                  title={item.vaccine}
                  description={`${tr("Dose", language)}: ${item.dose}`}
                  date={item.date}
                  status={item.status}
                />

              )
            )

          )}

        </HistorySection>


        {/* ================================================= */}
        {/* TREATMENT HISTORY */}
        {/* ================================================= */}

        <HistorySection
          icon={<Stethoscope size={20} />}
          iconClass="bg-purple-100 text-purple-700"
          title="Treatment History"
          description="Previously recorded veterinary treatments."
        >

          {(animal.treatmentHistory || []).length === 0 ? (

            <EmptyState
              text="No treatment records available."
            />

          ) : (

            animal.treatmentHistory.map(
              (item, index) => (

                <HistoryRow
                  key={index}
                  icon={<Stethoscope size={18} />}
                  title={item.treatment}
                  description={item.notes}
                  date={item.date}
                  status="Recorded"
                />

              )
            )

          )}

        </HistorySection>


        {/* ================================================= */}
        {/* HEALTH REPORTS */}
        {/* ================================================= */}

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">

          <div className="flex items-start gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-700">

              <ClipboardList size={20} />

            </div>


            <div>

              <h2 className="font-bold text-gray-900">
                {tr("Health Reports", language)}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {tr("Submitted health reports", language)} for {displayAnimalName(animal.name, language)}.
              </p>

            </div>

          </div>


          {animalReports.length === 0 ? (

            <div className="mt-6 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center">

              <ClipboardList
                size={30}
                className="mx-auto text-gray-300"
              />

              <p className="mt-3 text-sm font-medium text-gray-600">
                {tr("No health reports submitted yet.", language)}
              </p>

              <p className="mt-1 text-xs text-gray-400">
                {tr("Report a health issue if you notice unusual symptoms.", language)}
              </p>


              <Link
                to={`/farmer/animals/${animal.id}/report`}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
              >

                <HeartPulse size={16} />

                Submit First Report

              </Link>

            </div>

          ) : (

            <div className="mt-6 space-y-5">

              {animalReports.map(
                (report) => (

                  <div
                    key={report.id}
                    className="rounded-xl border border-gray-200 bg-gray-50 p-5"
                  >

                    {/* REPORT HEADER */}

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                      <div>

                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                          Report ID
                        </p>

                        <p className="mt-1 font-semibold text-gray-900">
                          {report.id}
                        </p>

                      </div>


                      <div className="flex flex-wrap gap-2">

                        <StatusBadge
                          value={
                            report.severity ||
                            "Moderate"
                          }
                          type="severity"
                        />


                        <StatusBadge
                          value={
                            report.status ||
                            "Submitted"
                          }
                          type="status"
                        />

                      </div>

                    </div>


                    {/* DATE */}

                    <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">

                      <CalendarDays size={14} />

                      Submitted:{" "}

                      {new Date(
                        report.createdAt ||
                        report.submittedAt ||
                        Date.now()
                      ).toLocaleString()}

                    </div>


                    {/* SYMPTOMS */}

                    <div className="mt-5">

                      <p className="text-sm font-semibold text-gray-700">
                        Reported Symptoms
                      </p>


                      <div className="mt-2 flex flex-wrap gap-2">

                        {report.symptoms &&
                        report.symptoms.length > 0 ? (

                          report.symptoms.map(
                            (symptom, index) => (

                              <span
                                key={`${displayValue(symptom, language)}-${index}`}
                                className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700"
                              >
                                {displayValue(symptom, language)}
                              </span>

                            )
                          )

                        ) : (

                          <span className="text-sm text-gray-400">
                            No symptoms selected
                          </span>

                        )}

                      </div>

                    </div>


                    {/* OBSERVATIONS */}

                    <div className="mt-5 grid gap-3 sm:grid-cols-3">

                      <ObservationItem
                        label="Appetite"
                        value={
                          report.appetite ||
                          "Not recorded"
                        }
                      />


                      <ObservationItem
                        label="Activity"
                        value={
                          report.activity ||
                          "Not recorded"
                        }
                      />


                      <ObservationItem
                        label="Temperature"
                        value={
                          report.temperature
                            ? `${report.temperature} °C`
                            : "Not recorded"
                        }
                      />

                    </div>


                    {/* DURATION */}

                    {report.duration && (

                      <div className="mt-4 rounded-lg border border-gray-100 bg-white p-4">

                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                          Symptoms Started
                        </p>

                        <p className="mt-1 text-sm text-gray-700">
                          {report.duration}
                        </p>

                      </div>

                    )}


                    {/* NOTES */}

                    {report.notes && (

                      <div className="mt-4 rounded-lg border border-gray-100 bg-white p-4">

                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                          Additional Observation
                        </p>

                        <p className="mt-1 text-sm leading-6 text-gray-700">
                          {report.notes}
                        </p>

                      </div>

                    )}

                  </div>

                )
              )}

            </div>

          )}

        </section>


        {/* ================================================= */}
        {/* QUICK ACTIONS */}
        {/* ================================================= */}

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">

          <div className="flex items-start gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">

              <ShieldCheck size={20} />

            </div>


            <div>

              <h2 className="font-bold text-gray-900">
                {tr("Animal Health Actions", language)}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {tr("Continue monitoring and maintaining this animal's health record.", language)}
              </p>

            </div>

          </div>


          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

            <ActionLink
              to={`/farmer/animals/${animal.id}/report`}
              icon={<HeartPulse size={18} />}
              title="Report Health Issue"
              description="Record new symptoms"
            />


            <ActionLink
              to={`/farmer/animals/${animal.id}/nutrition`}
              icon={<Utensils size={18} />}
              title="Nutrition Assistant"
              description="View feeding guidance"
            />


            <ActionLink
              to="/farmer/knowledge"
              icon={<ClipboardList size={18} />}
              title="Knowledge Hub"
              description="Learn prevention practices"
            />

          </div>

        </section>


        {/* ================================================= */}
        {/* DISCLAIMER */}
        {/* ================================================= */}

        <div className="rounded-xl border border-green-100 bg-green-50 p-5">

          <div className="flex items-start gap-3">

            <ShieldCheck
              size={20}
              className="mt-0.5 shrink-0 text-green-700"
            />

            <div>

              <p className="text-sm font-semibold text-green-800">
                {tr("Health record information", language)}
              </p>

              <p className="mt-1 text-sm leading-6 text-green-700">
                {tr("This health passport organizes recorded livestock information and reported observations. It does not replace examination or diagnosis by a qualified veterinary professional.", language)}
              </p>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}


/* ================================================= */
/* VILLAGE FIELD RESPONSE CARD */
/* ================================================= */

function VeterinaryResponseCard({
  task,
}) {

  const { language } = useLanguage();

  const isCompleted =
    task.status === "Visit Completed";

  const isInProgress =
    task.status === "Visit In Progress";


  const statusStyle =
    isCompleted
      ? "bg-green-100 text-green-700"
      : isInProgress
      ? "bg-blue-100 text-blue-700"
      : "bg-yellow-100 text-yellow-700";


  const statusLabel =
    isCompleted
      ? "Visit Completed"
      : isInProgress
      ? "Visit In Progress"
      : "Field Visit Assigned";


  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

        <div>

          <div className="flex items-center gap-2">

            <MapPin
              size={17}
              className="text-gray-500"
            />

            <h3 className="font-semibold text-gray-900">
              {displayValue(task.village, language)}
            </h3>

          </div>


          <p className="mt-1 text-xs text-gray-500">
            {tr("Task ID", language)}: {task.id}
          </p>

        </div>


        <span
          className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${statusStyle}`}
        >
          {tr(statusLabel, language)}
        </span>

      </div>


      <div className="mt-4 grid gap-3 sm:grid-cols-3">

        <ObservationItem
          label="Priority"
          value={`${displayValue(task.priority || "Low", language)} ${language === "hindi" ? "प्राथमिकता" : "Priority"}`}
        />


        <ObservationItem
          label="Affected Animals"
          value={
            task.affectedAnimals ??
            "Not recorded"
          }
        />


        <ObservationItem
          label="Health Reports"
          value={
            task.reportCount ??
            "Not recorded"
          }
        />

      </div>


      {task.action && (

        <div className="mt-4 rounded-lg border border-gray-100 bg-white p-4">

          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            {tr("Veterinary Response", language)}
          </p>

          <p className="mt-1 text-sm leading-6 text-gray-700">
            {task.action}
          </p>

        </div>

      )}


      {task.visitNotes && (

        <div className="mt-4 rounded-lg border border-green-100 bg-green-50 p-4">

          <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
            {tr("Field Visit", language)} {tr("Observation", language)}
          </p>

          <p className="mt-1 text-sm leading-6 text-green-900">
            {task.visitNotes}
          </p>

        </div>

      )}


      {task.completedAt && (

        <p className="mt-3 text-xs text-gray-400">

          {tr("Completed:", language)}{" "}

          {new Date(
            task.completedAt
          ).toLocaleString()}

        </p>

      )}

    </div>
  );
}


/* ================================================= */
/* INDIVIDUAL VETERINARY CASE RESPONSE */
/* ================================================= */

function VeterinaryCaseResponseCard({
  caseItem,
}) {

  const { language } = useLanguage();

  const isCompleted =
    caseItem.status ===
    "Visit Completed";

  const isInProgress =
    caseItem.status ===
    "Visit In Progress";


  const statusStyle =
    isCompleted
      ? "bg-green-100 text-green-700"
      : isInProgress
      ? "bg-blue-100 text-blue-700"
      : "bg-yellow-100 text-yellow-700";


  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">

      {/* HEADER */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

        <div>

          <div className="flex items-center gap-2">

            <Stethoscope
              size={17}
              className="text-blue-600"
            />

            <h3 className="font-semibold text-gray-900">
              {tr("Veterinary Case Response", language)}
            </h3>

          </div>


          <p className="mt-1 text-xs text-gray-500">
            {tr("Case ID", language)}: {caseItem.id}
          </p>

        </div>


        <span
          className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${statusStyle}`}
        >
          {displayValue(caseItem.status || "Assigned", language)}
        </span>

      </div>


      {/* CASE INFORMATION */}

      <div className="mt-4 grid gap-3 sm:grid-cols-3">

        <ObservationItem
          label="Priority"
          value={
            caseItem.priority
              ? `${displayValue(caseItem.priority, language)} ${language === "hindi" ? "प्राथमिकता" : "Priority"}`
              : "Not recorded"
          }
        />


        <ObservationItem
          label="Visit Date"
          value={
            caseItem.visitDate ||
            "Not scheduled"
          }
        />


        <ObservationItem
          label="Severity"
          value={
            caseItem.severity ||
            "Not recorded"
          }
        />

      </div>


      {/* SYMPTOMS */}

      {caseItem.symptoms?.length > 0 && (

        <div className="mt-4 rounded-lg border border-gray-100 bg-white p-4">

          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            {tr("Reported Symptoms", language)}
          </p>

          <p className="mt-1 text-sm leading-6 text-gray-700">
            {caseItem.symptoms.map((symptom) => displayValue(symptom, language)).join(", ")}
          </p>

        </div>

      )}


      {/* VISIT OBSERVATION */}

      {caseItem.visitNotes ? (

        <div className="mt-4 rounded-lg border border-green-100 bg-green-50 p-4">

          <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
            {tr("Field Visit", language)} {tr("Observation", language)}
          </p>

          <p className="mt-1 text-sm leading-6 text-green-900">
            {caseItem.visitNotes}
          </p>

        </div>

      ) : (

        <div className="mt-4 rounded-lg border border-yellow-100 bg-yellow-50 p-4">

          <p className="text-xs font-semibold uppercase tracking-wide text-yellow-700">
            {tr("Veterinary Response", language)}
          </p>

          <p className="mt-1 text-sm text-yellow-800">
            {tr("Field visit has been assigned but no observation has been recorded yet.", language)}
          </p>

        </div>

      )}


      {/* COMPLETION DATE */}

      {caseItem.completedAt && (

        <p className="mt-3 text-xs text-gray-400">

          {tr("Visit completed:", language)}{" "}

          {new Date(
            caseItem.completedAt
          ).toLocaleString()}

        </p>

      )}

    </div>
  );
}


/* ================================================= */
/* INFO ITEM */
/* ================================================= */

function InfoItem({
  label,
  value,
}) {

  const { language } = useLanguage();

  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">

      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {tr(label, language)}
      </p>

      <p className="mt-1 font-semibold text-gray-800">
        {typeof value === "string" ? tr(value, language) : (value || tr("Not recorded", language))}
      </p>

    </div>
  );
}


/* ================================================= */
/* SUMMARY CARD */
/* ================================================= */

function SummaryCard({
  icon,
  title,
  value,
  description,
  tone = "green",
}) {

  const { language } = useLanguage();

  const toneClasses = {

    green:
      "bg-green-100 text-green-700",

    yellow:
      "bg-yellow-100 text-yellow-700",

    red:
      "bg-red-100 text-red-700",

    blue:
      "bg-blue-100 text-blue-700",

    gray:
      "bg-gray-100 text-gray-600",

  };


  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
          toneClasses[tone] ||
          toneClasses.green
        }`}
      >
        {icon}
      </div>


      <p className="mt-5 text-sm font-medium text-gray-500">
        {tr(title, language)}
      </p>


      <p className="mt-1 text-xl font-bold text-gray-900">
        {typeof value === "string" ? tr(value, language) : value}
      </p>


      <p className="mt-1 text-xs leading-5 text-gray-500">
        {tr(description, language)}
      </p>

    </div>
  );
}


/* ================================================= */
/* HISTORY SECTION */
/* ================================================= */

function HistorySection({
  icon,
  iconClass,
  title,
  description,
  children,
}) {

  const { language } = useLanguage();

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">

      <div className="flex items-start gap-3">

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>


        <div>

          <h2 className="font-bold text-gray-900">
            {tr(title, language)}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {tr(description, language)}
          </p>

        </div>

      </div>


      <div className="mt-6 space-y-4">
        {children}
      </div>

    </section>
  );
}


/* ================================================= */
/* HISTORY ROW */
/* ================================================= */

function HistoryRow({
  icon,
  title,
  description,
  date,
  status,
}) {

  const { language } = useLanguage();

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4 sm:flex-row sm:items-center">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-green-700 shadow-sm">
        {icon}
      </div>


      <div className="flex-1">

        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

          <h3 className="font-semibold text-gray-900">
            {tr(title, language)}
          </h3>

          <span className="text-xs text-gray-400">
            {date}
          </span>

        </div>


        <p className="mt-1 text-sm leading-5 text-gray-500">
          {tr(description, language)}
        </p>

      </div>


      <span className="w-fit rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
        {tr(status, language)}
      </span>

    </div>
  );
}


/* ================================================= */
/* OBSERVATION ITEM */
/* ================================================= */

function ObservationItem({
  label,
  value,
}) {

  const { language } = useLanguage();

  return (
    <div className="rounded-lg border border-gray-100 bg-white p-3">

      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {tr(label, language)}
      </p>

      <p className="mt-1 text-sm font-semibold text-gray-700">
        {typeof value === "string" ? tr(value, language) : value}
      </p>

    </div>
  );
}


/* ================================================= */
/* STATUS BADGE */
/* ================================================= */

function StatusBadge({
  value,
  type,
}) {

  const { language } = useLanguage();

  let classes =
    "bg-blue-100 text-blue-700";


  if (type === "severity") {

    if (value === "Severe") {

      classes =
        "bg-red-100 text-red-700";

    } else if (
      value === "Moderate"
    ) {

      classes =
        "bg-yellow-100 text-yellow-700";

    } else {

      classes =
        "bg-green-100 text-green-700";

    }

  }


  if (type === "status") {

    if (
      value === "Priority Review"
    ) {

      classes =
        "bg-red-100 text-red-700";

    } else if (
      value === "Under Review"
    ) {

      classes =
        "bg-yellow-100 text-yellow-700";

    } else if (
      value === "Submitted" ||
      value === "Synced"
    ) {

      classes =
        "bg-blue-100 text-blue-700";

    } else if (
      value === "Resolved"
    ) {

      classes =
        "bg-green-100 text-green-700";

    }

  }


  return (
    <span
      className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${classes}`}
    >
      {value}
    </span>
  );
}


/* ================================================= */
/* ACTION LINK */
/* ================================================= */

function ActionLink({
  to,
  icon,
  title,
  description,
}) {

  const { language } = useLanguage();

  return (
    <Link
      to={to}
      className="group rounded-xl border border-gray-200 bg-gray-50 p-4 transition hover:border-green-300 hover:bg-green-50"
    >

      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-green-700 shadow-sm transition group-hover:bg-green-100">

          {icon}

        </div>


        <div>

          <p className="text-sm font-semibold text-gray-900">
            {tr(title, language)}
          </p>

          <p className="mt-0.5 text-xs text-gray-500">
            {tr(description, language)}
          </p>

        </div>

      </div>

    </Link>
  );
}


/* ================================================= */
/* EMPTY STATE */
/* ================================================= */

function EmptyState({
  text,
}) {

  const { language } = useLanguage();

  return (
    <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-7 text-center">

      <CheckCircle2
        size={28}
        className="mx-auto text-gray-300"
      />

      <p className="mt-2 text-sm text-gray-500">
        {tr(text, language)}
      </p>

    </div>
  );
}
export default AnimalProfile;
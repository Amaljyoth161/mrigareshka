import {
  AlertTriangle,
  ArrowRight,
  CalendarClock,
  ClipboardList,
  HeartPulse,
  PawPrint,
  ShieldCheck,
  ShoppingCart,
  Sprout,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import { getAnimals } from "../data/animals";
import { getVaccinationStatus } from "../data/vaccinationService";
import { useLanguage } from "../context/LanguageContext";


function FarmerDashboard() {

  const { language } = useLanguage();

  const [animals, setAnimals] = useState([]);
  const [reports, setReports] = useState([]);
  const [selectedAnimalId, setSelectedAnimalId] = useState("");


  /* =========================================================
     LOCAL TRANSLATIONS
  ========================================================= */

  const text = {

    farmerOverview: {
      english: "Farmer Overview",
      hindi: "किसान अवलोकन",
    },

    welcomeBack: {
      english: "Welcome back",
      hindi: "वापसी पर स्वागत है",
    },

    monitorLivestock: {
      english:
        "Monitor your livestock health, reports and preventive care.",
      hindi:
        "अपने पशुधन के स्वास्थ्य, रिपोर्ट और निवारक देखभाल की निगरानी करें।",
    },

    quickActions: {
      english: "Quick Actions",
      hindi: "त्वरित कार्य",
    },

    selectAnimalAndTools: {
      english:
        "Select an animal and access the tools you need.",
      hindi:
        "एक पशु चुनें और आवश्यक उपकरणों तक पहुँच प्राप्त करें।",
    },

    selectAnimal: {
      english: "Select Animal",
      hindi: "पशु चुनें",
    },

    chooseAnimal: {
      english:
        "Choose an animal to manage its health and services.",
      hindi:
        "उसके स्वास्थ्य और सेवाओं को प्रबंधित करने के लिए एक पशु चुनें।",
    },

    noAnimalsRegistered: {
      english: "No animals registered",
      hindi: "कोई पशु पंजीकृत नहीं है",
    },

    id: {
      english: "ID",
      hindi: "आईडी",
    },

    myAnimals: {
      english: "My Animals",
      hindi: "मेरे पशु",
    },

    viewYourLivestock: {
      english: "View and manage your livestock.",
      hindi: "अपने पशुधन को देखें और प्रबंधित करें।",
    },

    reportHealthIssue: {
      english: "Report Health Issue",
      hindi: "स्वास्थ्य समस्या की रिपोर्ट करें",
    },

    reportIssueFor: {
      english: "Report an issue for",
      hindi: "के लिए समस्या की रिपोर्ट करें",
    },

    selectAnimalFirst: {
      english: "Select an animal first.",
      hindi: "पहले एक पशु चुनें।",
    },

    healthKnowledge: {
      english: "Health Knowledge",
      hindi: "स्वास्थ्य ज्ञान",
    },

    preventionCare: {
      english: "Learn about prevention and livestock care.",
      hindi: "रोकथाम और पशुधन देखभाल के बारे में जानें।",
    },

    marketplace: {
      english: "Marketplace",
      hindi: "बाज़ार",
    },

    browseLivestockResources: {
      english: "Browse livestock products and resources.",
      hindi: "पशुधन उत्पाद और संसाधन देखें।",
    },

    registeredAnimals: {
      english: "Registered animals",
      hindi: "पंजीकृत पशु",
    },

    healthAlerts: {
      english: "Health Alerts",
      hindi: "स्वास्थ्य चेतावनियाँ",
    },

    requireAttention: {
      english: "Require attention",
      hindi: "ध्यान देने की आवश्यकता",
    },

    vaccinationsDue: {
      english: "Vaccinations Due",
      hindi: "टीकाकरण देय",
    },

    upcoming: {
      english: "Upcoming vaccinations",
      hindi: "आगामी टीकाकरण",
    },

    healthReports: {
      english: "Health Reports",
      hindi: "स्वास्थ्य रिपोर्ट",
    },

    submittedReports: {
      english: "Submitted reports",
      hindi: "जमा की गई रिपोर्ट",
    },

    recentHealthReports: {
      english: "Recent Health Reports",
      hindi: "हाल की स्वास्थ्य रिपोर्ट",
    },

    latestLivestockActivity: {
      english: "Latest livestock health activity",
      hindi: "पशुधन स्वास्थ्य की नवीनतम गतिविधि",
    },

    viewAnimals: {
      english: "View animals",
      hindi: "पशुओं को देखें",
    },

    noHealthReports: {
      english: "No health reports yet",
      hindi: "अभी तक कोई स्वास्थ्य रिपोर्ट नहीं है",
    },

    healthReportsWillAppear: {
      english:
        "Health reports submitted by you will appear here.",
      hindi:
        "आपके द्वारा जमा की गई स्वास्थ्य रिपोर्ट यहाँ दिखाई देंगी।",
    },

    unknownAnimal: {
      english: "Unknown Animal",
      hindi: "अज्ञात पशु",
    },

    livestock: {
      english: "Livestock",
      hindi: "पशुधन",
    },

    healthIssueReported: {
      english: "Health issue reported",
      hindi: "स्वास्थ्य समस्या की रिपोर्ट की गई",
    },

    priority: {
      english: "Priority",
      hindi: "प्राथमिकता",
    },

    priorityReview: {
      english: "Priority Review",
      hindi: "प्राथमिकता समीक्षा",
    },

    submitted: {
      english: "Submitted",
      hindi: "जमा किया गया",
    },

    recently: {
      english: "Recently",
      hindi: "हाल ही में",
    },

    farmerSupport: {
      english: "Farmer Support",
      hindi: "किसान सहायता",
    },

    additionalSupportTools: {
      english:
        "Additional tools to support livestock management.",
      hindi:
        "पशुधन प्रबंधन में सहायता के लिए अतिरिक्त उपकरण।",
    },

    feedNutrition: {
      english: "Feed & Nutrition",
      hindi: "चारा और पोषण",
    },

    viewNutritionFor: {
      english: "View nutrition guidance for",
      hindi: "के लिए पोषण संबंधी मार्गदर्शन देखें",
    },

    selectAnimalNutrition: {
      english: "Select an animal for nutrition guidance.",
      hindi: "पोषण संबंधी मार्गदर्शन के लिए एक पशु चुनें।",
    },

    insuranceSupport: {
      english: "Insurance & Support",
      hindi: "बीमा और सहायता",
    },

    insuranceResources: {
      english:
        "Explore livestock insurance and support resources.",
      hindi:
        "पशुधन बीमा और सहायता संसाधनों के बारे में जानें।",
    },

    financeSchemes: {
      english: "Finance & Schemes",
      hindi: "वित्त और योजनाएँ",
    },

    financialSchemeInfo: {
      english:
        "Find livestock finance options and government schemes.",
      hindi:
        "पशुधन वित्त विकल्प और सरकारी योजनाएँ खोजें।",
    },

    explore: {
      english: "Explore",
      hindi: "देखें",
    },

    earlyReportingHelps: {
      english: "Early reporting helps faster response",
      hindi: "जल्दी रिपोर्ट करने से तेज़ प्रतिक्रिया में मदद मिलती है",
    },

    earlyReportingMessage: {
      english:
        "Report unusual symptoms as early as possible so veterinary teams can review the case and respond appropriately.",
      hindi:
        "असामान्य लक्षणों की जल्द से जल्द रिपोर्ट करें ताकि पशु चिकित्सा टीम मामले की समीक्षा कर उचित प्रतिक्रिया दे सके।",
    },

    aiDisclaimer: {
      english:
        "AI-assisted information is for decision support only and does not replace professional veterinary diagnosis.",
      hindi:
        "एआई-सहायित जानकारी केवल निर्णय सहायता के लिए है और पेशेवर पशु चिकित्सा निदान का विकल्प नहीं है।",
    },

    attention: {
      english: "Attention",
      hindi: "ध्यान दें",
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
     ANIMAL / DYNAMIC DATA TRANSLATIONS
  ========================================================= */

  const animalNameTranslations = {
    Lakshmi: "लक्ष्मी",
    Ganga: "गंगा",
    Kali: "काली",
    Raja: "राजा",
    Meena: "मीना",
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


  const symptomTranslations = {
    Fever: "बुखार",

    "Reduced appetite":
      "भूख कम लगना",

    Cough:
      "खाँसी",

    "Difficulty breathing":
      "साँस लेने में कठिनाई",

    "Nasal discharge":
      "नाक से स्राव",

    Diarrhea:
      "दस्त",

    Vomiting:
      "उल्टी",

    Swelling:
      "सूजन",

    "Skin lesions":
      "त्वचा पर घाव",

    Lameness:
      "लंगड़ापन",

    "Excessive salivation":
      "अत्यधिक लार आना",

    "Reduced activity":
      "गतिविधि में कमी",
  };


  const displayAnimalName = (name) => {
    if (language === "hindi") {
      return animalNameTranslations[name] || name;
    }

    return name;
  };


  const displayBreed = (breed) => {
    if (language === "hindi") {
      return breedTranslations[breed] || breed;
    }

    return breed;
  };


  const displayLocation = (location) => {
    if (language === "hindi") {
      return locationTranslations[location] || location;
    }

    return location;
  };


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


  const displaySymptom = (symptom) => {

    if (language === "hindi") {
      return symptomTranslations[symptom] || symptom;
    }

    return symptom;
  };


  /* =========================================================
     LOAD DATA
  ========================================================= */

  useEffect(() => {

    const loadDashboardData = () => {

      const animalData = getAnimals();

      setAnimals(animalData);


      if (
        animalData.length > 0 &&
        !selectedAnimalId
      ) {
        setSelectedAnimalId(
          animalData[0].id
        );
      }


      const savedReports = JSON.parse(
        localStorage.getItem(
          "mrigare-shka-health-reports"
        ) || "[]"
      );

      setReports(savedReports);

    };


    loadDashboardData();

    window.addEventListener(
      "focus",
      loadDashboardData
    );


    return () => {
      window.removeEventListener(
        "focus",
        loadDashboardData
      );
    };

  }, [selectedAnimalId]);


  /* =========================================================
     SELECTED ANIMAL
  ========================================================= */

  const selectedAnimal =
    animals.find(
      (animal) =>
        animal.id === selectedAnimalId
    ) || null;


  /* =========================================================
     LINKS
  ========================================================= */

  const reportHealthLink = selectedAnimal
    ? `/farmer/animals/${selectedAnimal.id}/report`
    : "/farmer/animals";


  const nutritionLink = selectedAnimal
    ? `/farmer/animals/${selectedAnimal.id}/nutrition`
    : "/farmer/animals";


  /* =========================================================
     HEALTH ALERTS
  ========================================================= */

  const healthAlerts = reports.filter(
    (report) =>
      report.severity === "Severe" ||
      report.status === "Priority Review"
  ).length;


  /* =========================================================
     VACCINATIONS DUE
  ========================================================= */

  const vaccinationsDue =
    animals.filter((animal) => {

      const vaccination =
        getVaccinationStatus(animal);

      return (
        vaccination.status === "Due Soon" ||
        vaccination.status === "Overdue"
      );

    }).length;


  /* =========================================================
     RECENT REPORTS
  ========================================================= */

  const recentReports =
    [...reports]
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
      )
      .slice(0, 3);


  /* =========================================================
     DATE FORMAT
  ========================================================= */

  const formatDate = (report) => {

    const dateValue =
      report.submittedAt ||
      report.createdAt;


    if (!dateValue) {
      return t("recently");
    }


    const date = new Date(dateValue);


    return date.toLocaleDateString(
      language === "hindi"
        ? "hi-IN"
        : "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );

  };


  /* =========================================================
     REPORT STATUS TRANSLATION
  ========================================================= */

  const getTranslatedStatus = (
    status
  ) => {

    if (status === "Priority") {
      return t("priority");
    }

    if (
      status ===
      "Priority Review"
    ) {
      return t("priorityReview");
    }

    if (
      status === "Submitted"
    ) {
      return t("submitted");
    }

    return status;
  };


  /* =========================================================
     REPORT ISSUE TRANSLATION
  ========================================================= */

  const getReportIssue = (
    report
  ) => {

    if (
      report.symptoms?.length
    ) {

      return report.symptoms
        .map((symptom) =>
          displaySymptom(symptom)
        )
        .join(", ");

    }

    return t(
      "healthIssueReported"
    );

  };


  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <DashboardLayout role="Farmer">


      {/* PAGE HEADER */}

      <div className="mb-8">

        <p className="text-sm font-medium text-green-700">
          {t("farmerOverview")}
        </p>

        <h1 className="mt-1 text-3xl font-bold text-gray-900">
          {t("welcomeBack")} 👋
        </h1>

        <p className="mt-2 text-gray-600">
          {t("monitorLivestock")}
        </p>

      </div>


      {/* QUICK ACTIONS */}

      <section className="mb-8">

        <div className="mb-4">

          <h2 className="text-lg font-bold text-gray-900">
            {t("quickActions")}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {t("selectAnimalAndTools")}
          </p>

        </div>


        {/* ANIMAL SELECTOR */}

        <div className="mb-5 rounded-2xl border border-green-100 bg-green-50 p-5">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="text-sm font-semibold text-green-900">
                {t("selectAnimal")}
              </p>

              <p className="mt-1 text-xs text-green-700">
                {t("chooseAnimal")}
              </p>

            </div>


            <div className="min-w-[240px]">

              <select
                value={selectedAnimalId}
                onChange={(e) =>
                  setSelectedAnimalId(
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-green-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
              >

                {animals.length === 0 ? (

                  <option value="">
                    {t("noAnimalsRegistered")}
                  </option>

                ) : (

                  animals.map(
                    (animal) => (

                      <option
                        key={animal.id}
                        value={animal.id}
                      >
                        {displayAnimalName(
                          animal.name
                        )}{" "}
                        ·{" "}
                        {translateSpecies(
                          animal.species
                        )}
                      </option>

                    )
                  )

                )}

              </select>

            </div>

          </div>


          {selectedAnimal && (

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">

              <span className="rounded-full bg-white px-3 py-1.5 font-medium text-gray-700">
                {t("id")}:{" "}
                {selectedAnimal.id}
              </span>

              <span className="rounded-full bg-white px-3 py-1.5 font-medium text-gray-700">
                {displayBreed(
                  selectedAnimal.breed
                )}
              </span>

              <span className="rounded-full bg-white px-3 py-1.5 font-medium text-gray-700">
                {displayLocation(
                  selectedAnimal.location
                )}
              </span>

            </div>

          )}

        </div>


        {/* QUICK ACTION CARDS */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <QuickAction
            to="/farmer/animals"
            icon={<PawPrint size={21} />}
            title={t("myAnimals")}
            description={
              t("viewYourLivestock")
            }
          />


          <QuickAction
            to={reportHealthLink}
            icon={<HeartPulse size={21} />}
            title={t("reportHealthIssue")}
            description={
              selectedAnimal
                ? `${t(
                    "reportIssueFor"
                  )} ${displayAnimalName(
                    selectedAnimal.name
                  )}`
                : t(
                    "selectAnimalFirst"
                  )
            }
          />


          <QuickAction
            to="/farmer/knowledge"
            icon={<Sprout size={21} />}
            title={t("healthKnowledge")}
            description={
              t("preventionCare")
            }
          />


          <QuickAction
            to="/farmer/marketplace"
            icon={
              <ShoppingCart size={21} />
            }
            title={t("marketplace")}
            description={
              t(
                "browseLivestockResources"
              )
            }
          />

        </div>

      </section>


      {/* STAT CARDS */}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

        <DashboardCard
          icon={<PawPrint size={21} />}
          title={t("myAnimals")}
          value={animals.length}
          description={
            t("registeredAnimals")
          }
          attentionLabel={
            t("attention")
          }
        />


        <DashboardCard
          icon={
            <AlertTriangle
              size={21}
            />
          }
          title={t("healthAlerts")}
          value={healthAlerts}
          description={
            t("requireAttention")
          }
          attentionLabel={
            t("attention")
          }
          alert
        />


        <DashboardCard
          icon={
            <CalendarClock
              size={21}
            />
          }
          title={t("vaccinationsDue")}
          value={vaccinationsDue}
          description={
            t("upcoming")
          }
          attentionLabel={
            t("attention")
          }
        />


        <DashboardCard
          icon={
            <ClipboardList
              size={21}
            />
          }
          title={t("healthReports")}
          value={reports.length}
          description={
            t("submittedReports")
          }
          attentionLabel={
            t("attention")
          }
        />

      </div>


      {/* RECENT HEALTH REPORTS */}

      <section className="mt-8 rounded-2xl border border-gray-200 bg-white shadow-sm">

        <div className="flex flex-col gap-3 border-b border-gray-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h2 className="font-bold text-gray-900">
              {t("recentHealthReports")}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {t(
                "latestLivestockActivity"
              )}
            </p>

          </div>


          <Link
            to="/farmer/animals"
            className="text-sm font-semibold text-green-700 hover:text-green-800"
          >
            {t("viewAnimals")} →
          </Link>

        </div>


        <div className="divide-y divide-gray-100">

          {recentReports.length === 0 ? (

            <div className="px-6 py-10 text-center">

              <p className="font-medium text-gray-700">
                {t("noHealthReports")}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {t(
                  "healthReportsWillAppear"
                )}
              </p>

            </div>

          ) : (

            recentReports.map(
              (report) => (

                <ReportRow
                  key={report.id}

                  animal={
                    displayAnimalName(
                      report.animalName ||
                      t("unknownAnimal")
                    )
                  }

                  species={
                    report.species
                      ? translateSpecies(
                          report.species
                        )
                      : t("livestock")
                  }

                  issue={getReportIssue(
                    report
                  )}

                  status={
                    getTranslatedStatus(
                      report.status ===
                        "Priority Review" ||
                      report.severity ===
                        "Severe"
                        ? "Priority"
                        : report.status ||
                          "Submitted"
                    )
                  }

                  date={formatDate(
                    report
                  )}
                />

              )
            )

          )}

        </div>

      </section>


      {/* FARMER SUPPORT TOOLS */}

      <section className="mt-8">

        <div className="mb-4">

          <h2 className="text-lg font-bold text-gray-900">
            {t("farmerSupport")}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {t(
              "additionalSupportTools"
            )}
          </p>

        </div>


        <div className="grid gap-5 md:grid-cols-3">

          <SupportCard
            to={nutritionLink}
            icon={
              <Sprout size={22} />
            }
            title={t(
              "feedNutrition"
            )}
            description={
              selectedAnimal
                ? `${t(
                    "viewNutritionFor"
                  )} ${displayAnimalName(
                    selectedAnimal.name
                  )}.`
                : t(
                    "selectAnimalNutrition"
                  )
            }
            exploreLabel={t(
              "explore"
            )}
          />


          <SupportCard
            to="/farmer/insurance-support"
            icon={
              <ShieldCheck size={22} />
            }
            title={t(
              "insuranceSupport"
            )}
            description={t(
              "insuranceResources"
            )}
            exploreLabel={t(
              "explore"
            )}
          />


          <SupportCard
            to="/farmer/finance-schemes"
            icon={
              <ClipboardList
                size={22}
              />
            }
            title={t(
              "financeSchemes"
            )}
            description={t(
              "financialSchemeInfo"
            )}
            exploreLabel={t(
              "explore"
            )}
          />

        </div>

      </section>


      {/* PREVENTION MESSAGE */}

      <div className="mt-8 rounded-2xl border border-green-100 bg-green-50 p-6">

        <div className="flex gap-4">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
            <ShieldCheck
              size={21}
            />
          </div>


          <div>

            <h3 className="font-bold text-green-900">
              {t(
                "earlyReportingHelps"
              )}
            </h3>

            <p className="mt-1 text-sm leading-6 text-green-800">
              {t(
                "earlyReportingMessage"
              )}
            </p>

            <p className="mt-2 text-xs text-green-700">
              {t(
                "aiDisclaimer"
              )}
            </p>

          </div>

        </div>

      </div>


    </DashboardLayout>
  );
}


/* =========================================================
   QUICK ACTION CARD
========================================================= */

function QuickAction({
  to,
  icon,
  title,
  description,
}) {

  return (

    <Link
      to={to}
      className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-green-300 hover:shadow-md"
    >

      <div className="flex items-center justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">
          {icon}
        </div>

        <ArrowRight
          size={18}
          className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-green-700"
        />

      </div>


      <h3 className="mt-4 font-bold text-gray-900">
        {title}
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        {description}
      </p>

    </Link>
  );
}


/* =========================================================
   DASHBOARD CARD
========================================================= */

function DashboardCard({
  icon,
  title,
  value,
  description,
  alert = false,
  attentionLabel,
}) {

  return (

    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">
          {icon}
        </div>


        {alert && (

          <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700">
            {attentionLabel}
          </span>

        )}

      </div>


      <p className="mt-5 text-sm text-gray-500">
        {title}
      </p>

      <p className="mt-1 text-3xl font-bold text-gray-900">
        {value}
      </p>

      <p className="mt-1 text-xs text-gray-500">
        {description}
      </p>

    </div>
  );
}


/* =========================================================
   REPORT ROW
========================================================= */

function ReportRow({
  animal,
  species,
  issue,
  status,
  date,
}) {

  const priority =
    status === "Priority" ||
    status === "प्राथमिकता";


  return (

    <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">

      <div>

        <p className="font-semibold text-gray-900">
          {animal}
        </p>

        <p className="text-sm text-gray-500">
          {species} · {issue}
        </p>

      </div>


      <div className="flex items-center gap-4">

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            priority
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {status}
        </span>

        <span className="text-sm text-gray-400">
          {date}
        </span>

      </div>

    </div>
  );
}


/* =========================================================
   SUPPORT CARD
========================================================= */

function SupportCard({
  to,
  icon,
  title,
  description,
  exploreLabel,
}) {

  return (

    <Link
      to={to}
      className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-green-300 hover:shadow-md"
    >

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700">
        {icon}
      </div>


      <h3 className="mt-5 font-bold text-gray-900">
        {title}
      </h3>


      <p className="mt-2 text-sm leading-6 text-gray-500">
        {description}
      </p>


      <div className="mt-4 text-sm font-semibold text-green-700">
        {exploreLabel} →
      </div>

    </Link>
  );
}


export default FarmerDashboard;
import {
  ArrowLeft,
  BookOpen,
  HeartPulse,
  ShieldCheck,
  Syringe,
  Utensils,
  AlertTriangle,
} from "lucide-react";

import { Link } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import { useLanguage } from "../context/LanguageContext";


function KnowledgeHub() {

  const { language } = useLanguage();


  /* =========================================================
     TRANSLATIONS
  ========================================================= */

  const text = {

    backToDashboard: {
      english: "Back to Farmer Dashboard",
      hindi: "किसान डैशबोर्ड पर वापस जाएं",
    },

    farmerSupport: {
      english: "Farmer Support",
      hindi: "किसान सहायता",
    },

    farmerKnowledgeHub: {
      english: "Farmer Knowledge Hub",
      hindi: "किसान ज्ञान केंद्र",
    },

    hubDescription: {
      english:
        "Simple livestock health and disease-prevention information to help farmers make informed day-to-day decisions.",
      hindi:
        "किसानों को दैनिक निर्णय लेने में सहायता करने के लिए पशुधन स्वास्थ्य और रोग-रोकथाम की सरल जानकारी।",
    },


    /* =======================================================
       TOPIC 1
    ======================================================= */

    diseasePrevention: {
      english: "Disease Prevention",
      hindi: "रोग की रोकथाम",
    },

    diseasePreventionDescription: {
      english:
        "Learn basic practices to reduce the spread of livestock diseases.",
      hindi:
        "पशुधन रोगों के प्रसार को कम करने के लिए बुनियादी उपाय जानें।",
    },

    cleanHousing: {
      english: "Keep animal housing clean and dry.",
      hindi: "पशुओं के रहने की जगह को साफ और सूखा रखें।",
    },

    separateSickAnimals: {
      english:
        "Separate sick animals from healthy animals.",
      hindi:
        "बीमार पशुओं को स्वस्थ पशुओं से अलग रखें।",
    },

    avoidContaminatedEquipment: {
      english:
        "Avoid sharing contaminated equipment.",
      hindi:
        "दूषित उपकरणों को साझा करने से बचें।",
    },


    /* =======================================================
       TOPIC 2
    ======================================================= */

    vaccination: {
      english: "Vaccination",
      hindi: "टीकाकरण",
    },

    vaccinationDescription: {
      english:
        "Understand the importance of maintaining vaccination records.",
      hindi:
        "टीकाकरण रिकॉर्ड बनाए रखने के महत्व को समझें।",
    },

    keepVaccinationRecords: {
      english:
        "Keep vaccination records updated.",
      hindi:
        "टीकाकरण रिकॉर्ड को अद्यतन रखें।",
    },

    followVaccinationSchedule: {
      english:
        "Follow the vaccination schedule recommended by veterinarians.",
      hindi:
        "पशु चिकित्सकों द्वारा सुझाए गए टीकाकरण कार्यक्रम का पालन करें।",
    },

    contactVeterinaryProfessional: {
      english:
        "Contact a veterinary professional when vaccination is due.",
      hindi:
        "टीकाकरण की तिथि आने पर पशु चिकित्सा विशेषज्ञ से संपर्क करें।",
    },


    /* =======================================================
       TOPIC 3
    ======================================================= */

    earlyWarningSigns: {
      english: "Early Warning Signs",
      hindi: "प्रारंभिक चेतावनी संकेत",
    },

    earlyWarningDescription: {
      english:
        "Recognize common changes that may require veterinary attention.",
      hindi:
        "ऐसे सामान्य बदलावों को पहचानें जिन पर पशु चिकित्सा ध्यान देने की आवश्यकता हो सकती है।",
    },

    reducedAppetite: {
      english:
        "Reduced appetite or water intake.",
      hindi:
        "भूख या पानी का सेवन कम होना।",
    },

    unusualWeakness: {
      english:
        "Unusual weakness or inactivity.",
      hindi:
        "असामान्य कमजोरी या निष्क्रियता।",
    },

    abnormalTemperature: {
      english:
        "Abnormal temperature, breathing or behaviour.",
      hindi:
        "असामान्य तापमान, सांस लेने या व्यवहार में बदलाव।",
    },


    /* =======================================================
       TOPIC 4
    ======================================================= */

    feedingNutrition: {
      english: "Feeding & Nutrition",
      hindi: "आहार और पोषण",
    },

    feedingDescription: {
      english:
        "Learn basic principles of balanced livestock feeding.",
      hindi:
        "संतुलित पशुधन आहार के बुनियादी सिद्धांत जानें।",
    },

    speciesAppropriateFeed: {
      english:
        "Provide species-appropriate feed.",
      hindi:
        "पशु की प्रजाति के अनुसार उचित चारा दें।",
    },

    cleanDrinkingWater: {
      english:
        "Ensure access to clean drinking water.",
      hindi:
        "स्वच्छ पीने के पानी की उपलब्धता सुनिश्चित करें।",
    },

    avoidSuddenChanges: {
      english:
        "Avoid sudden changes in feeding routines.",
      hindi:
        "पशुओं के आहार की दिनचर्या में अचानक बदलाव से बचें।",
    },


    /* =======================================================
       TOPIC 5
    ======================================================= */

    animalHealthMonitoring: {
      english: "Animal Health Monitoring",
      hindi: "पशु स्वास्थ्य निगरानी",
    },

    healthMonitoringDescription: {
      english:
        "Regular observation can help identify health changes early.",
      hindi:
        "नियमित निरीक्षण से स्वास्थ्य में होने वाले बदलावों की जल्दी पहचान करने में मदद मिल सकती है।",
    },

    observeRegularly: {
      english:
        "Observe animals regularly.",
      hindi:
        "पशुओं का नियमित निरीक्षण करें।",
    },

    recordHealthChanges: {
      english:
        "Record important health changes.",
      hindi:
        "महत्वपूर्ण स्वास्थ्य बदलावों को दर्ज करें।",
    },

    reportSymptoms: {
      english:
        "Report concerning symptoms to a veterinarian.",
      hindi:
        "चिंताजनक लक्षणों की रिपोर्ट पशु चिकित्सक को करें।",
    },


    /* =======================================================
       HEALTH NOTICE
    ======================================================= */

    importantHealthNotice: {
      english: "Important health notice",
      hindi: "महत्वपूर्ण स्वास्थ्य सूचना",
    },

    healthNotice: {
      english:
        "This knowledge hub provides general educational information. It does not replace examination, diagnosis or treatment by a qualified veterinarian.",
      hindi:
        "यह ज्ञान केंद्र सामान्य शैक्षिक जानकारी प्रदान करता है। यह योग्य पशु चिकित्सक द्वारा की जाने वाली जांच, निदान या उपचार का विकल्प नहीं है।",
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
     TOPICS
  ========================================================= */

  const topics = [

    {
      title: t("diseasePrevention"),
      description: t("diseasePreventionDescription"),
      icon: ShieldCheck,
      color: "green",
      points: [
        t("cleanHousing"),
        t("separateSickAnimals"),
        t("avoidContaminatedEquipment"),
      ],
    },

    {
      title: t("vaccination"),
      description: t("vaccinationDescription"),
      icon: Syringe,
      color: "blue",
      points: [
        t("keepVaccinationRecords"),
        t("followVaccinationSchedule"),
        t("contactVeterinaryProfessional"),
      ],
    },

    {
      title: t("earlyWarningSigns"),
      description: t("earlyWarningDescription"),
      icon: AlertTriangle,
      color: "yellow",
      points: [
        t("reducedAppetite"),
        t("unusualWeakness"),
        t("abnormalTemperature"),
      ],
    },

    {
      title: t("feedingNutrition"),
      description: t("feedingDescription"),
      icon: Utensils,
      color: "orange",
      points: [
        t("speciesAppropriateFeed"),
        t("cleanDrinkingWater"),
        t("avoidSuddenChanges"),
      ],
    },

    {
      title: t("animalHealthMonitoring"),
      description: t("healthMonitoringDescription"),
      icon: HeartPulse,
      color: "red",
      points: [
        t("observeRegularly"),
        t("recordHealthChanges"),
        t("reportSymptoms"),
      ],
    },

  ];


  return (

    <DashboardLayout role="Farmer">

      {/* =====================================================
          BACK LINK
      ===================================================== */}

      <Link
        to="/farmer"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-green-700"
      >
        <ArrowLeft size={17} />
        {t("backToDashboard")}
      </Link>


      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mt-6">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700">
            <BookOpen size={25} />
          </div>

          <div>

            <p className="text-sm font-medium text-green-700">
              {t("farmerSupport")}
            </p>

            <h1 className="text-3xl font-bold text-gray-900">
              {t("farmerKnowledgeHub")}
            </h1>

          </div>

        </div>

        <p className="mt-3 max-w-2xl text-gray-600">
          {t("hubDescription")}
        </p>

      </div>


      {/* =====================================================
          TOPICS
      ===================================================== */}

      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        {topics.map((topic) => {

          const Icon = topic.icon;

          return (

            <div
              key={topic.title}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >

              <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
                  <Icon size={21} />
                </div>

                <div>

                  <h2 className="text-lg font-bold text-gray-900">
                    {topic.title}
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    {topic.description}
                  </p>

                </div>

              </div>


              <div className="mt-5 space-y-3">

                {topic.points.map((point) => (

                  <div
                    key={point}
                    className="rounded-lg bg-gray-50 p-3"
                  >

                    <p className="text-sm leading-6 text-gray-700">
                      • {point}
                    </p>

                  </div>

                ))}

              </div>

            </div>

          );

        })}

      </div>


      {/* =====================================================
          HEALTH NOTICE
      ===================================================== */}

      <div className="mt-6 flex gap-3 rounded-xl border border-yellow-100 bg-yellow-50 p-5">

        <AlertTriangle
          size={21}
          className="mt-0.5 shrink-0 text-yellow-700"
        />

        <div>

          <p className="text-sm font-semibold text-yellow-800">
            {t("importantHealthNotice")}
          </p>

          <p className="mt-1 text-sm leading-6 text-yellow-700">
            {t("healthNotice")}
          </p>

        </div>

      </div>

    </DashboardLayout>
  );
}


export default KnowledgeHub;
import {
  ArrowLeft,
  BadgeCheck,
  FileText,
  HeartPulse,
  HelpCircle,
  ShieldCheck,
  Phone,
} from "lucide-react";

import { Link } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import { useLanguage } from "../context/LanguageContext";


function InsuranceSupport() {

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

    insuranceSupportHub: {
      english: "Insurance & Support Hub",
      hindi: "बीमा और सहायता केंद्र",
    },

    pageDescription: {
      english:
        "Access basic guidance for livestock insurance, claims and veterinary support.",
      hindi:
        "पशुधन बीमा, दावों और पशु चिकित्सा सहायता के लिए बुनियादी मार्गदर्शन प्राप्त करें।",
    },

    /* =======================================================
       LIVESTOCK INSURANCE
    ======================================================= */

    livestockInsurance: {
      english: "Livestock Insurance",
      hindi: "पशुधन बीमा",
    },

    livestockInsuranceDescription: {
      english:
        "Understand basic livestock insurance coverage and keep important animal records ready.",
      hindi:
        "पशुधन बीमा कवरेज की मूल जानकारी समझें और महत्वपूर्ण पशु रिकॉर्ड तैयार रखें।",
    },

    animalIdentification: {
      english:
        "Keep animal identification details updated.",
      hindi:
        "पशु की पहचान संबंधी जानकारी को अद्यतन रखें।",
    },

    vaccinationHealthRecords: {
      english:
        "Maintain vaccination and health records.",
      hindi:
        "टीकाकरण और स्वास्थ्य रिकॉर्ड बनाए रखें।",
    },

    ownershipDocuments: {
      english:
        "Store relevant purchase and ownership documents.",
      hindi:
        "संबंधित खरीद और स्वामित्व दस्तावेज सुरक्षित रखें।",
    },

    /* =======================================================
       CLAIM SUPPORT
    ======================================================= */

    claimSupport: {
      english: "Claim Support",
      hindi: "दावा सहायता",
    },

    claimSupportDescription: {
      english:
        "Basic guidance on information that may be required when raising an insurance claim.",
      hindi:
        "बीमा दावा प्रस्तुत करते समय आवश्यक हो सकने वाली जानकारी के बारे में बुनियादी मार्गदर्शन।",
    },

    veterinaryExamination: {
      english:
        "Keep veterinary examination records.",
      hindi:
        "पशु चिकित्सा जांच के रिकॉर्ड रखें।",
    },

    incidentDateNature: {
      english:
        "Record the date and nature of the incident.",
      hindi:
        "घटना की तारीख और प्रकृति दर्ज करें।",
    },

    photographsDocuments: {
      english:
        "Keep photographs and supporting documents when appropriate.",
      hindi:
        "आवश्यक होने पर तस्वीरें और सहायक दस्तावेज सुरक्षित रखें।",
    },

    /* =======================================================
       EMERGENCY VETERINARY SUPPORT
    ======================================================= */

    emergencyVeterinarySupport: {
      english: "Emergency Veterinary Support",
      hindi: "आपातकालीन पशु चिकित्सा सहायता",
    },

    emergencyVeterinaryDescription: {
      english:
        "Quick access to the type of information farmers should keep ready during an animal health emergency.",
      hindi:
        "पशु स्वास्थ्य आपातकाल के दौरान किसानों को तैयार रखने वाली आवश्यक जानकारी तक त्वरित पहुंच।",
    },

    nearestVeterinaryContact: {
      english:
        "Keep the nearest veterinary contact available.",
      hindi:
        "निकटतम पशु चिकित्सा सेवा का संपर्क नंबर उपलब्ध रखें।",
    },

    animalIdentificationNumber: {
      english:
        "Clearly record the animal identification number.",
      hindi:
        "पशु की पहचान संख्या स्पष्ट रूप से दर्ज रखें।",
    },

    symptomsHealthChanges: {
      english:
        "Describe important symptoms and recent health changes.",
      hindi:
        "महत्वपूर्ण लक्षणों और हाल के स्वास्थ्य बदलावों का विवरण दें।",
    },

    /* =======================================================
       FARMER ASSISTANCE
    ======================================================= */

    farmerAssistance: {
      english: "Farmer Assistance",
      hindi: "किसान सहायता",
    },

    farmerAssistanceDescription: {
      english:
        "Use available support channels for livestock-related questions and services.",
      hindi:
        "पशुधन से संबंधित प्रश्नों और सेवाओं के लिए उपलब्ध सहायता चैनलों का उपयोग करें।",
    },

    localVeterinaryServices: {
      english:
        "Contact local veterinary services for health concerns.",
      hindi:
        "स्वास्थ्य संबंधी चिंताओं के लिए स्थानीय पशु चिकित्सा सेवाओं से संपर्क करें।",
    },

    keepRecordsAvailable: {
      english:
        "Keep animal records available when requesting assistance.",
      hindi:
        "सहायता मांगते समय पशु रिकॉर्ड उपलब्ध रखें।",
    },

    officialChannels: {
      english:
        "Use official channels for scheme and insurance information.",
      hindi:
        "योजना और बीमा जानकारी के लिए आधिकारिक चैनलों का उपयोग करें।",
    },

    /* =======================================================
       EMERGENCY CONTACT
    ======================================================= */

    emergencyContacts: {
      english: "Keep emergency contacts ready",
      hindi: "आपातकालीन संपर्क तैयार रखें",
    },

    emergencyContactsDescription: {
      english:
        "Farmers should keep contact details for their local veterinary service, field worker and other relevant support providers.",
      hindi:
        "किसानों को अपनी स्थानीय पशु चिकित्सा सेवा, फील्ड वर्कर और अन्य संबंधित सहायता प्रदाताओं के संपर्क विवरण उपलब्ध रखने चाहिए।",
    },

    /* =======================================================
       IMPORTANT NOTICE
    ======================================================= */

    importantNotice: {
      english: "Important notice",
      hindi: "महत्वपूर्ण सूचना",
    },

    importantNoticeDescription: {
      english:
        "Insurance eligibility, claim requirements and government scheme benefits can vary by programme. Verify current requirements through the relevant official authority or service provider.",
      hindi:
        "बीमा पात्रता, दावा आवश्यकताएं और सरकारी योजना के लाभ कार्यक्रम के अनुसार अलग-अलग हो सकते हैं। वर्तमान आवश्यकताओं की पुष्टि संबंधित आधिकारिक प्राधिकरण या सेवा प्रदाता से करें।",
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
     SERVICES
  ========================================================= */

  const services = [

    {
      title: t("livestockInsurance"),
      description: t("livestockInsuranceDescription"),
      icon: ShieldCheck,
      color: "green",
      points: [
        t("animalIdentification"),
        t("vaccinationHealthRecords"),
        t("ownershipDocuments"),
      ],
    },

    {
      title: t("claimSupport"),
      description: t("claimSupportDescription"),
      icon: FileText,
      color: "blue",
      points: [
        t("veterinaryExamination"),
        t("incidentDateNature"),
        t("photographsDocuments"),
      ],
    },

    {
      title: t("emergencyVeterinarySupport"),
      description: t("emergencyVeterinaryDescription"),
      icon: HeartPulse,
      color: "red",
      points: [
        t("nearestVeterinaryContact"),
        t("animalIdentificationNumber"),
        t("symptomsHealthChanges"),
      ],
    },

    {
      title: t("farmerAssistance"),
      description: t("farmerAssistanceDescription"),
      icon: HelpCircle,
      color: "yellow",
      points: [
        t("localVeterinaryServices"),
        t("keepRecordsAvailable"),
        t("officialChannels"),
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
            <BadgeCheck size={25} />
          </div>

          <div>

            <p className="text-sm font-medium text-green-700">
              {t("farmerSupport")}
            </p>

            <h1 className="text-3xl font-bold text-gray-900">
              {t("insuranceSupportHub")}
            </h1>

          </div>

        </div>

        <p className="mt-3 max-w-2xl text-gray-600">
          {t("pageDescription")}
        </p>

      </div>


      {/* =====================================================
          SUPPORT SERVICES
      ===================================================== */}

      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        {services.map((service) => {

          const Icon = service.icon;

          return (

            <div
              key={service.title}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >

              <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
                  <Icon size={21} />
                </div>

                <div>

                  <h2 className="text-lg font-bold text-gray-900">
                    {service.title}
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    {service.description}
                  </p>

                </div>

              </div>


              <div className="mt-5 space-y-3">

                {service.points.map((point) => (

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
          EMERGENCY CONTACTS
      ===================================================== */}

      <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-6">

        <div className="flex gap-4">

          <Phone
            size={22}
            className="mt-0.5 shrink-0 text-blue-700"
          />

          <div>

            <h2 className="font-bold text-blue-900">
              {t("emergencyContacts")}
            </h2>

            <p className="mt-2 text-sm leading-6 text-blue-800">
              {t("emergencyContactsDescription")}
            </p>

          </div>

        </div>

      </div>


      {/* =====================================================
          IMPORTANT NOTICE
      ===================================================== */}

      <div className="mt-6 rounded-xl border border-yellow-100 bg-yellow-50 p-5">

        <p className="text-sm font-semibold text-yellow-800">
          {t("importantNotice")}
        </p>

        <p className="mt-1 text-sm leading-6 text-yellow-700">
          {t("importantNoticeDescription")}
        </p>

      </div>

    </DashboardLayout>
  );
}


export default InsuranceSupport;
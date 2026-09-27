import {
  ArrowLeft,
  Banknote,
  FileCheck,
  HelpCircle,
  Landmark,
  ShieldCheck,
} from "lucide-react";

import { Link } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import { useLanguage } from "../context/LanguageContext";

function FinanceSchemeAssistant() {
  const { language } = useLanguage();

  const text = {
    english: {
      backToDashboard: "Back to Farmer Dashboard",
      farmerSupport: "Farmer Support",
      title: "Finance & Scheme Assistant",
      description:
        "Understand common livestock-support categories, required records and basic application guidance.",

      livestockSupportSchemes: "Livestock Support Schemes",
      livestockSupportDescription:
        "Explore the types of government and institutional support that may be available for livestock farmers.",
      livestockDevelopment: "Livestock development support",
      animalHealthVaccination: "Animal health and vaccination programmes",
      infrastructureDairy:
        "Infrastructure and dairy-related support",

      creditFinancialSupport: "Credit & Financial Support",
      creditFinancialDescription:
        "Understand the basic information farmers may need when exploring livestock-related financial assistance.",
      updatedAnimalRecords: "Maintain updated animal records.",
      ownershipDocuments:
        "Keep ownership and identity documents ready.",
      eligibilityLending:
        "Check eligibility and lending conditions with the relevant institution.",

      documentsChecklist: "Documents Checklist",
      documentsChecklistDescription:
        "Keep important records ready when applying for schemes or financial assistance.",
      animalIdentification: "Animal identification details",
      vaccinationHealth: "Vaccination and health records",
      ownershipFinancial:
        "Ownership and relevant financial documents",

      eligibilityGuidance: "Eligibility Guidance",
      eligibilityGuidanceDescription:
        "Use official programme information to verify whether a particular scheme applies to you.",
      eligibilityVaries: "Eligibility varies by programme.",
      requirementsDiffer:
        "Requirements may differ by applicant and location.",
      verifyCurrentRules:
        "Always verify current rules before applying.",

      howToUse: "How to use this assistant",
      howToUseDescription:
        "Use this section to understand the type of support available. Before applying, verify the latest eligibility rules, documents, deadlines and application process through the relevant official authority or financial institution.",

      importantNotice: "Important notice",
      importantNoticeDescription:
        "This prototype provides general guidance only. It does not confirm scheme eligibility, loan approval, subsidy availability or financial benefits.",
    },

    hindi: {
      backToDashboard: "किसान डैशबोर्ड पर वापस जाएँ",
      farmerSupport: "किसान सहायता",
      title: "वित्त एवं योजना सहायक",
      description:
        "पशुधन सहायता की सामान्य श्रेणियों, आवश्यक दस्तावेज़ों और आवेदन की मूल जानकारी को समझें।",

      livestockSupportSchemes: "पशुधन सहायता योजनाएँ",
      livestockSupportDescription:
        "पशुपालक किसानों के लिए उपलब्ध सरकारी और संस्थागत सहायता के प्रकारों के बारे में जानें।",
      livestockDevelopment: "पशुधन विकास सहायता",
      animalHealthVaccination: "पशु स्वास्थ्य और टीकाकरण कार्यक्रम",
      infrastructureDairy:
        "बुनियादी ढाँचे और डेयरी से संबंधित सहायता",

      creditFinancialSupport: "ऋण एवं वित्तीय सहायता",
      creditFinancialDescription:
        "पशुधन से संबंधित वित्तीय सहायता प्राप्त करने के लिए किसानों को आवश्यक मूल जानकारी समझें।",
      updatedAnimalRecords:
        "पशुओं के रिकॉर्ड को अद्यतन रखें।",
      ownershipDocuments:
        "स्वामित्व और पहचान संबंधी दस्तावेज़ तैयार रखें।",
      eligibilityLending:
        "संबंधित संस्था से पात्रता और ऋण संबंधी शर्तों की जाँच करें।",

      documentsChecklist: "दस्तावेज़ सूची",
      documentsChecklistDescription:
        "योजना या वित्तीय सहायता के लिए आवेदन करते समय आवश्यक दस्तावेज़ तैयार रखें।",
      animalIdentification: "पशु पहचान संबंधी विवरण",
      vaccinationHealth: "टीकाकरण और स्वास्थ्य रिकॉर्ड",
      ownershipFinancial:
        "स्वामित्व और संबंधित वित्तीय दस्तावेज़",

      eligibilityGuidance: "पात्रता मार्गदर्शन",
      eligibilityGuidanceDescription:
        "किसी विशेष योजना की पात्रता की पुष्टि करने के लिए आधिकारिक कार्यक्रम की जानकारी का उपयोग करें।",
      eligibilityVaries:
        "पात्रता योजना के अनुसार अलग-अलग होती है।",
      requirementsDiffer:
        "आवश्यकताएँ आवेदक और स्थान के अनुसार अलग हो सकती हैं।",
      verifyCurrentRules:
        "आवेदन करने से पहले वर्तमान नियमों की हमेशा जाँच करें।",

      howToUse: "इस सहायक का उपयोग कैसे करें",
      howToUseDescription:
        "उपलब्ध सहायता के प्रकार को समझने के लिए इस अनुभाग का उपयोग करें। आवेदन करने से पहले संबंधित सरकारी प्राधिकरण या वित्तीय संस्था के माध्यम से नवीनतम पात्रता नियम, आवश्यक दस्तावेज़, अंतिम तिथि और आवेदन प्रक्रिया की पुष्टि करें।",

      importantNotice: "महत्वपूर्ण सूचना",
      importantNoticeDescription:
        "यह प्रोटोटाइप केवल सामान्य मार्गदर्शन प्रदान करता है। यह योजना की पात्रता, ऋण स्वीकृति, सब्सिडी की उपलब्धता या वित्तीय लाभ की पुष्टि नहीं करता है।",
    },
  };

  const t = text[language];

  const options = [
    {
      title: t.livestockSupportSchemes,
      description: t.livestockSupportDescription,
      icon: Landmark,
      points: [
        t.livestockDevelopment,
        t.animalHealthVaccination,
        t.infrastructureDairy,
      ],
    },

    {
      title: t.creditFinancialSupport,
      description: t.creditFinancialDescription,
      icon: Banknote,
      points: [
        t.updatedAnimalRecords,
        t.ownershipDocuments,
        t.eligibilityLending,
      ],
    },

    {
      title: t.documentsChecklist,
      description: t.documentsChecklistDescription,
      icon: FileCheck,
      points: [
        t.animalIdentification,
        t.vaccinationHealth,
        t.ownershipFinancial,
      ],
    },

    {
      title: t.eligibilityGuidance,
      description: t.eligibilityGuidanceDescription,
      icon: ShieldCheck,
      points: [
        t.eligibilityVaries,
        t.requirementsDiffer,
        t.verifyCurrentRules,
      ],
    },
  ];

  return (
    <DashboardLayout role="Farmer">
      <Link
        to="/farmer"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-green-700"
      >
        <ArrowLeft size={17} />
        {t.backToDashboard}
      </Link>

      <div className="mt-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700">
            <Banknote size={25} />
          </div>

          <div>
            <p className="text-sm font-medium text-green-700">
              {t.farmerSupport}
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

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {options.map((option) => {
          const Icon = option.icon;

          return (
            <div
              key={option.title}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
                  <Icon size={21} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    {option.title}
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    {option.description}
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {option.points.map((point) => (
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

      <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-6">
        <div className="flex gap-4">
          <HelpCircle
            size={22}
            className="mt-0.5 shrink-0 text-blue-700"
          />

          <div>
            <h2 className="font-bold text-blue-900">
              {t.howToUse}
            </h2>

            <p className="mt-2 text-sm leading-6 text-blue-800">
              {t.howToUseDescription}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-yellow-100 bg-yellow-50 p-5">
        <p className="text-sm font-semibold text-yellow-800">
          {t.importantNotice}
        </p>

        <p className="mt-1 text-sm leading-6 text-yellow-700">
          {t.importantNoticeDescription}
        </p>
      </div>
    </DashboardLayout>
  );
}

export default FinanceSchemeAssistant;
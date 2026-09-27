import {
  ArrowLeft,
  ExternalLink,
  Phone,
  ShieldCheck,
  Landmark,
  FileText,
} from "lucide-react";

import { Link } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import { useLanguage } from "../context/LanguageContext";


function GovernmentSupport() {

  const { language } = useLanguage();


  /* =========================================================
     TRANSLATIONS
  ========================================================= */

  const text = {

    backToDashboard: {
      english: "Back to Dashboard",
      hindi: "डैशबोर्ड पर वापस जाएं",
    },

    farmerAssistance: {
      english: "Farmer Assistance",
      hindi: "किसान सहायता",
    },

    governmentSupport: {
      english: "Government Support",
      hindi: "सरकारी सहायता",
    },

    pageDescription: {
      english:
        "Access official livestock health services, schemes and support resources.",
      hindi:
        "आधिकारिक पशुधन स्वास्थ्य सेवाओं, योजनाओं और सहायता संसाधनों तक पहुंच प्राप्त करें।",
    },

    /* =======================================================
       HELPLINE
    ======================================================= */

    animalHealthHelpline: {
      english: "Maharashtra Animal Health Helpline",
      hindi: "महाराष्ट्र पशु स्वास्थ्य हेल्पलाइन",
    },

    helplineDescription: {
      english:
        "Chief Minister Animal Health Scheme toll-free number. Available 7:00 AM–6:00 PM, Monday–Saturday.",
      hindi:
        "मुख्यमंत्री पशु स्वास्थ्य योजना का टोल-फ्री नंबर। सोमवार से शनिवार, सुबह 7:00 बजे से शाम 6:00 बजे तक उपलब्ध।",
    },

    call1962: {
      english: "Call 1962",
      hindi: "1962 पर कॉल करें",
    },

    /* =======================================================
       OFFICIAL SUPPORT
    ======================================================= */

    officialSupportServices: {
      english: "Official Support & Services",
      hindi: "आधिकारिक सहायता और सेवाएं",
    },

    officialSupportDescription: {
      english:
        "Government and institutional resources for livestock owners.",
      hindi:
        "पशुधन मालिकों के लिए सरकारी और संस्थागत संसाधन।",
    },

    officialGovernment: {
      english: "Official Government",
      hindi: "आधिकारिक सरकार",
    },

    schemes: {
      english: "Schemes",
      hindi: "योजनाएं",
    },

    livestockServices: {
      english: "Livestock Services",
      hindi: "पशुधन सेवाएं",
    },

    governmentProgramme: {
      english: "Government Programme",
      hindi: "सरकारी कार्यक्रम",
    },

    maharashtra: {
      english: "Maharashtra",
      hindi: "महाराष्ट्र",
    },

    veterinaryEducation: {
      english: "Veterinary Education",
      hindi: "पशु चिकित्सा शिक्षा",
    },

    openOfficialWebsite: {
      english: "Open official website →",
      hindi: "आधिकारिक वेबसाइट खोलें →",
    },

    /* =======================================================
       SUPPORT LINK 1
    ======================================================= */

    maharashtraAnimalHusbandry: {
      english:
        "Maharashtra Animal Husbandry Department",
      hindi:
        "महाराष्ट्र पशुपालन विभाग",
    },

    maharashtraAnimalHusbandryDescription: {
      english:
        "Official state department for animal husbandry services, schemes, veterinary information and updates.",
      hindi:
        "पशुपालन सेवाओं, योजनाओं, पशु चिकित्सा जानकारी और अपडेट के लिए आधिकारिक राज्य विभाग।",
    },

    /* =======================================================
       SUPPORT LINK 2
    ======================================================= */

    animalHusbandrySchemes: {
      english:
        "Animal Husbandry Schemes & Programmes",
      hindi:
        "पशुपालन योजनाएं और कार्यक्रम",
    },

    animalHusbandrySchemesDescription: {
      english:
        "Find information about livestock health, disease control, National Livestock Mission and other programmes.",
      hindi:
        "पशुधन स्वास्थ्य, रोग नियंत्रण, राष्ट्रीय पशुधन मिशन और अन्य कार्यक्रमों की जानकारी प्राप्त करें।",
    },

    /* =======================================================
       SUPPORT LINK 3
    ======================================================= */

    bharatPashudhan: {
      english: "Bharat Pashudhan",
      hindi: "भारत पशुधन",
    },

    bharatPashudhanDescription: {
      english:
        "National digital livestock platform listed by the Maharashtra Animal Husbandry Department.",
      hindi:
        "महाराष्ट्र पशुपालन विभाग द्वारा सूचीबद्ध राष्ट्रीय डिजिटल पशुधन प्लेटफॉर्म।",
    },

    /* =======================================================
       SUPPORT LINK 4
    ======================================================= */

    nationalLivestockMission: {
      english: "National Livestock Mission",
      hindi: "राष्ट्रीय पशुधन मिशन",
    },

    nationalLivestockMissionDescription: {
      english:
        "Official livestock development programme information.",
      hindi:
        "आधिकारिक पशुधन विकास कार्यक्रम की जानकारी।",
    },

    /* =======================================================
       SUPPORT LINK 5
    ======================================================= */

    maharashtraLivestockBoard: {
      english:
        "Maharashtra Livestock Development Board",
      hindi:
        "महाराष्ट्र पशुधन विकास बोर्ड",
    },

    maharashtraLivestockBoardDescription: {
      english:
        "Official livestock development resources for Maharashtra.",
      hindi:
        "महाराष्ट्र के लिए आधिकारिक पशुधन विकास संसाधन।",
    },

    /* =======================================================
       SUPPORT LINK 6
    ======================================================= */

    mafsu: {
      english: "MAFSU",
      hindi: "माफसू",
    },

    mafsuDescription: {
      english:
        "Maharashtra Animal and Fishery Sciences University.",
      hindi:
        "महाराष्ट्र पशु एवं मत्स्य विज्ञान विश्वविद्यालय।",
    },

    /* =======================================================
       QUICK HELP
    ======================================================= */

    diseasePrevention: {
      english: "Disease Prevention",
      hindi: "रोग की रोकथाम",
    },

    diseasePreventionText: {
      english:
        "Use the Knowledge Hub for practical livestock health and prevention guidance.",
      hindi:
        "व्यावहारिक पशुधन स्वास्थ्य और रोकथाम संबंधी मार्गदर्शन के लिए ज्ञान केंद्र का उपयोग करें।",
    },

    financeSchemes: {
      english: "Finance & Schemes",
      hindi: "वित्त और योजनाएं",
    },

    financeSchemesText: {
      english:
        "Explore scheme and financial-support guidance inside MRIGARESHKA.",
      hindi:
        "MRIGARESHKA के अंदर योजना और वित्तीय सहायता संबंधी मार्गदर्शन देखें।",
    },

    insuranceSupport: {
      english: "Insurance & Support",
      hindi: "बीमा और सहायता",
    },

    insuranceSupportText: {
      english:
        "View livestock insurance and assistance information.",
      hindi:
        "पशुधन बीमा और सहायता संबंधी जानकारी देखें।",
    },

    /* =======================================================
       SOURCE NOTICE
    ======================================================= */

    officialSourceNotice: {
      english: "Official-source notice",
      hindi: "आधिकारिक स्रोत सूचना",
    },

    officialSourceText: {
      english:
        "Government links are provided to help farmers reach official information. Always verify scheme eligibility, documents, dates and service availability on the official government website.",
      hindi:
        "किसानों को आधिकारिक जानकारी तक पहुंचने में सहायता करने के लिए सरकारी लिंक दिए गए हैं। योजना की पात्रता, दस्तावेज, तिथियों और सेवा की उपलब्धता की हमेशा आधिकारिक सरकारी वेबसाइट पर पुष्टि करें।",
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
     SUPPORT LINKS
     
     URLs remain unchanged.
     Titles/descriptions/tags are translated.
  ========================================================= */

  const supportLinks = [

    {
      title: t("maharashtraAnimalHusbandry"),
      description: t(
        "maharashtraAnimalHusbandryDescription"
      ),
      url: "https://dahd.maharashtra.gov.in/en/",
      tag: t("officialGovernment"),
    },

    {
      title: t("animalHusbandrySchemes"),
      description: t(
        "animalHusbandrySchemesDescription"
      ),
      url: "https://dahd.maharashtra.gov.in/en/schemes-programmes/",
      tag: t("schemes"),
    },

    {
      title: t("bharatPashudhan"),
      description: t(
        "bharatPashudhanDescription"
      ),
      url: "https://bharatpashudhan.ndlm.co.in/",
      tag: t("livestockServices"),
    },

    {
      title: t("nationalLivestockMission"),
      description: t(
        "nationalLivestockMissionDescription"
      ),
      url: "https://nlm.udyamimitra.in/",
      tag: t("governmentProgramme"),
    },

    {
      title: t("maharashtraLivestockBoard"),
      description: t(
        "maharashtraLivestockBoardDescription"
      ),
      url: "https://mldb.live/",
      tag: t("maharashtra"),
    },

    {
      title: t("mafsu"),
      description: t("mafsuDescription"),
      url: "https://mafsu.ac.in/",
      tag: t("veterinaryEducation"),
    },

  ];


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
          {t("farmerAssistance")}
        </p>


        <h1 className="mt-1 text-3xl font-bold text-gray-900">
          {t("governmentSupport")}
        </h1>


        <p className="mt-2 text-gray-600">
          {t("pageDescription")}
        </p>

      </div>


      {/* =====================================================
          EMERGENCY / VETERINARY HELPLINE
      ===================================================== */}

      <section className="rounded-2xl border border-green-200 bg-green-50 p-6">

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div className="flex gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-700 text-white">

              <Phone size={23} />

            </div>


            <div>

              <p className="text-sm font-semibold text-green-800">
                {t("animalHealthHelpline")}
              </p>


              <h2 className="mt-1 text-3xl font-bold text-green-900">
                1962
              </h2>


              <p className="mt-1 text-sm leading-6 text-green-800">
                {t("helplineDescription")}
              </p>

            </div>

          </div>


          <a
            href="tel:1962"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white hover:bg-green-800"
          >
            <Phone size={17} />
            {t("call1962")}
          </a>

        </div>

      </section>


      {/* =====================================================
          OFFICIAL SUPPORT
      ===================================================== */}

      <section className="mt-8">

        <div className="mb-4">

          <h2 className="text-lg font-bold text-gray-900">
            {t("officialSupportServices")}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {t("officialSupportDescription")}
          </p>

        </div>


        <div className="grid gap-5 md:grid-cols-2">

          {supportLinks.map(
            (item) => (

              <SupportCard
                key={item.title}
                {...item}
                openWebsiteLabel={t("openOfficialWebsite")}
              />

            )
          )}

        </div>

      </section>


      {/* =====================================================
          QUICK HELP
      ===================================================== */}

      <section className="mt-8 grid gap-5 md:grid-cols-3">

        <QuickHelp
          icon={
            <ShieldCheck size={21} />
          }
          title={t("diseasePrevention")}
          text={t("diseasePreventionText")}
          to="/farmer/knowledge"
        />


        <QuickHelp
          icon={
            <FileText size={21} />
          }
          title={t("financeSchemes")}
          text={t("financeSchemesText")}
          to="/farmer/finance-schemes"
        />


        <QuickHelp
          icon={
            <Landmark size={21} />
          }
          title={t("insuranceSupport")}
          text={t("insuranceSupportText")}
          to="/farmer/insurance-support"
        />

      </section>


      {/* =====================================================
          SOURCE NOTE
      ===================================================== */}

      <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-5">

        <p className="text-sm font-semibold text-blue-900">
          {t("officialSourceNotice")}
        </p>

        <p className="mt-1 text-sm leading-6 text-blue-800">
          {t("officialSourceText")}
        </p>

      </div>

    </DashboardLayout>

  );
}


/* =========================================================
   SUPPORT CARD
========================================================= */

function SupportCard({
  title,
  description,
  url,
  tag,
  openWebsiteLabel,
}) {

  return (

    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-green-300 hover:shadow-md"
    >

      <div className="flex items-start justify-between gap-4">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700">

          <ExternalLink size={21} />

        </div>


        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
          {tag}
        </span>

      </div>


      <h3 className="mt-4 font-bold text-gray-900 group-hover:text-green-700">
        {title}
      </h3>


      <p className="mt-2 text-sm leading-6 text-gray-500">
        {description}
      </p>


      <p className="mt-4 text-sm font-semibold text-green-700">
        {openWebsiteLabel}
      </p>

    </a>

  );
}


/* =========================================================
   QUICK HELP
========================================================= */

function QuickHelp({
  icon,
  title,
  text,
  to,
}) {

  return (

    <Link
      to={to}
      className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-green-300 hover:shadow-md"
    >

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">
        {icon}
      </div>


      <h3 className="mt-4 font-bold text-gray-900">
        {title}
      </h3>


      <p className="mt-2 text-sm leading-6 text-gray-500">
        {text}
      </p>

    </Link>

  );
}


export default GovernmentSupport;
import {
  ArrowLeft,
  MapPin,
  Search,
  ShoppingBag,
  User,
  Wheat,
  Stethoscope,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import { useLanguage } from "../context/LanguageContext";


function Marketplace() {

  const { language } = useLanguage();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");


  /* =========================================================
     TRANSLATIONS
  ========================================================= */

  const text = {

    backToDashboard: {
      english: "Back to Farmer Dashboard",
      hindi: "किसान डैशबोर्ड पर वापस जाएं",
    },

    farmerServices: {
      english: "Farmer Services",
      hindi: "किसान सेवाएं",
    },

    livestockMarketplace: {
      english: "Livestock Marketplace",
      hindi: "पशुधन बाज़ार",
    },

    marketplaceDescription: {
      english:
        "Connect farmers with livestock, feed and veterinary-support listings in nearby communities.",
      hindi:
        "किसानों को आसपास के समुदायों में पशुधन, चारा और पशु चिकित्सा सहायता की सूची से जोड़ें।",
    },

    searchPlaceholder: {
      english:
        "Search livestock, feed or support...",
      hindi:
        "पशुधन, चारा या सहायता खोजें...",
    },

    all: {
      english: "All",
      hindi: "सभी",
    },

    livestock: {
      english: "Livestock",
      hindi: "पशुधन",
    },

    feedFodder: {
      english: "Feed & Fodder",
      hindi: "चारा और पशु आहार",
    },

    veterinarySupport: {
      english: "Veterinary Support",
      hindi: "पशु चिकित्सा सहायता",
    },

    healthyJerseyCow: {
      english: "Healthy Jersey Cow",
      hindi: "स्वस्थ जर्सी गाय",
    },

    healthyJerseyCowDescription: {
      english:
        "Healthy dairy cow with vaccination records available.",
      hindi:
        "टीकाकरण रिकॉर्ड के साथ स्वस्थ डेयरी गाय उपलब्ध है।",
    },

    greenFodderBundle: {
      english: "Green Fodder Bundle",
      hindi: "हरी चारे की गठरी",
    },

    greenFodderDescription: {
      english:
        "Fresh green fodder suitable for cattle and buffaloes.",
      hindi:
        "गाय और भैंस के लिए उपयुक्त ताजा हरा चारा।",
    },

    dairyCowFeed: {
      english: "Dairy Cow Feed",
      hindi: "डेयरी गाय का चारा",
    },

    dairyCowFeedDescription: {
      english:
        "Balanced concentrate feed for dairy livestock.",
      hindi:
        "डेयरी पशुधन के लिए संतुलित संकेंद्रित चारा।",
    },

    veterinaryHealthKit: {
      english: "Veterinary Health Kit",
      hindi: "पशु चिकित्सा स्वास्थ्य किट",
    },

    veterinaryHealthKitDescription: {
      english:
        "Basic livestock health-care supplies.",
      hindi:
        "पशुधन की बुनियादी स्वास्थ्य देखभाल सामग्री।",
    },

    hfCow: {
      english: "HF Cow",
      hindi: "एचएफ गाय",
    },

    hfCowDescription: {
      english:
        "Healthy crossbred cow available from a local farmer.",
      hindi:
        "स्थानीय किसान से स्वस्थ क्रॉसब्रेड गाय उपलब्ध है।",
    },

    dryFodderBales: {
      english: "Dry Fodder Bales",
      hindi: "सूखे चारे की गांठें",
    },

    dryFodderDescription: {
      english:
        "Clean and properly stored dry fodder.",
      hindi:
        "साफ और उचित तरीके से संग्रहित सूखा चारा।",
    },

    viewDetails: {
      english: "View Details",
      hindi: "विवरण देखें",
    },

    noListingsFound: {
      english: "No listings found",
      hindi: "कोई सूची नहीं मिली",
    },

    tryAnotherSearch: {
      english:
        "Try another search term or category.",
      hindi:
        "कोई अन्य खोज शब्द या श्रेणी आज़माएं।",
    },

    marketplaceDemoNotice: {
      english: "Marketplace demo notice",
      hindi: "बाज़ार डेमो सूचना",
    },

    marketplaceDemoText: {
      english:
        "These are sample listings for the prototype. Actual prices, seller information, availability and transactions would require verification before a real marketplace is launched.",
      hindi:
        "ये प्रोटोटाइप के लिए नमूना सूचियां हैं। वास्तविक बाज़ार शुरू करने से पहले वास्तविक कीमतों, विक्रेता की जानकारी, उपलब्धता और लेन-देन की पुष्टि आवश्यक होगी।",
    },

    demoMarketplaceAlert: {
      english:
        "Demo marketplace: contact details would appear here.",
      hindi:
        "डेमो बाज़ार: संपर्क विवरण यहां दिखाई देंगे।",
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
     LISTINGS
     
     Category values remain English internally so filtering
     continues to work.
  ========================================================= */

  const listings = [

    {
      id: 1,
      title: t("healthyJerseyCow"),
      category: "Livestock",
      description: t("healthyJerseyCowDescription"),
      location: "Village A",
      seller: "Ramesh Kumar",
      price: "₹68,000",
    },

    {
      id: 2,
      title: t("greenFodderBundle"),
      category: "Feed & Fodder",
      description: t("greenFodderDescription"),
      location: "Village B",
      seller: "Suresh Farm",
      price: "₹1,200",
    },

    {
      id: 3,
      title: t("dairyCowFeed"),
      category: "Feed & Fodder",
      description: t("dairyCowFeedDescription"),
      location: "Village A",
      seller: "Agri Feed Centre",
      price: "₹850",
    },

    {
      id: 4,
      title: t("veterinaryHealthKit"),
      category: "Veterinary Support",
      description: t("veterinaryHealthKitDescription"),
      location: "Village C",
      seller: "Rural Vet Supplies",
      price: "₹650",
    },

    {
      id: 5,
      title: t("hfCow"),
      category: "Livestock",
      description: t("hfCowDescription"),
      location: "Village C",
      seller: "Manoj P",
      price: "₹72,000",
    },

    {
      id: 6,
      title: t("dryFodderBales"),
      category: "Feed & Fodder",
      description: t("dryFodderDescription"),
      location: "Village B",
      seller: "Green Farm Supplies",
      price: "₹500",
    },

  ];


  /* =========================================================
     CATEGORIES
     
     Internal values stay English.
     Display values are translated.
  ========================================================= */

  const categories = [
    "All",
    "Livestock",
    "Feed & Fodder",
    "Veterinary Support",
  ];


  const translateCategory = (item) => {

    const categoryMap = {
      All: t("all"),
      Livestock: t("livestock"),
      "Feed & Fodder": t("feedFodder"),
      "Veterinary Support": t("veterinarySupport"),
    };

    return categoryMap[item] || item;
  };


  /* =========================================================
     FILTER
  ========================================================= */

  const filteredListings = useMemo(() => {

    return listings.filter((listing) => {

      const matchesCategory =
        category === "All" ||
        listing.category === category;

      const searchText =
        `${listing.title} ${listing.description} ${listing.location} ${listing.seller}`
          .toLowerCase();

      const matchesSearch =
        searchText.includes(search.toLowerCase());

      return matchesCategory && matchesSearch;

    });

  }, [search, category, language]);


  return (

    <DashboardLayout role="Farmer">

      {/* =====================================================
          BACK
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
            <ShoppingBag size={25} />
          </div>

          <div>

            <p className="text-sm font-medium text-green-700">
              {t("farmerServices")}
            </p>

            <h1 className="text-3xl font-bold text-gray-900">
              {t("livestockMarketplace")}
            </h1>

          </div>

        </div>

        <p className="mt-3 max-w-2xl text-gray-600">
          {t("marketplaceDescription")}
        </p>

      </div>


      {/* =====================================================
          SEARCH
      ===================================================== */}

      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

        <div className="relative">

          <Search
            size={19}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder={t("searchPlaceholder")}
            className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-green-500"
          />

        </div>


        {/* ===================================================
            CATEGORY FILTERS
        =================================================== */}

        <div className="mt-4 flex flex-wrap gap-2">

          {categories.map((item) => (

            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-lg px-4 py-2 text-sm font-medium ${
                category === item
                  ? "bg-green-700 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {translateCategory(item)}
            </button>

          ))}

        </div>

      </div>


      {/* =====================================================
          LISTINGS
      ===================================================== */}

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {filteredListings.map((listing) => (

          <div
            key={listing.id}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          >

            <div className="flex items-start justify-between">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700">

                {listing.category === "Livestock" && (
                  <ShoppingBag size={21} />
                )}

                {listing.category === "Feed & Fodder" && (
                  <Wheat size={21} />
                )}

                {listing.category === "Veterinary Support" && (
                  <Stethoscope size={21} />
                )}

              </div>


              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                {translateCategory(listing.category)}
              </span>

            </div>


            <h2 className="mt-5 text-lg font-bold text-gray-900">
              {listing.title}
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              {listing.description}
            </p>


            {/* LOCATION + SELLER */}

            <div className="mt-5 space-y-2">

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin size={16} />
                {listing.location}
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User size={16} />
                {listing.seller}
              </div>

            </div>


            {/* PRICE + DETAILS */}

            <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">

              <p className="text-lg font-bold text-green-700">
                {listing.price}
              </p>

              <button
                onClick={() =>
                  alert(t("demoMarketplaceAlert"))
                }
                className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800"
              >
                {t("viewDetails")}
              </button>

            </div>

          </div>

        ))}

      </div>


      {/* =====================================================
          EMPTY STATE
      ===================================================== */}

      {filteredListings.length === 0 && (

        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-10 text-center">

          <Search
            size={35}
            className="mx-auto text-gray-300"
          />

          <h2 className="mt-4 text-lg font-bold text-gray-900">
            {t("noListingsFound")}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {t("tryAnotherSearch")}
          </p>

        </div>

      )}


      {/* =====================================================
          NOTICE
      ===================================================== */}

      <div className="mt-6 rounded-xl border border-yellow-100 bg-yellow-50 p-5">

        <p className="text-sm font-semibold text-yellow-800">
          {t("marketplaceDemoNotice")}
        </p>

        <p className="mt-1 text-sm leading-6 text-yellow-700">
          {t("marketplaceDemoText")}
        </p>

      </div>

    </DashboardLayout>
  );
}


export default Marketplace;
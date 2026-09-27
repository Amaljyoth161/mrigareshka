import {
  Activity,
  Bell,
  BookOpen,
  ClipboardList,
  Home,
  LogOut,
  Map,
  PawPrint,
  ShieldCheck,
  Store,
  Syringe,
  Stethoscope,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

import { useLanguage } from "../context/LanguageContext";


const roleNavigation = {
  Farmer: [
    {
      name: "Dashboard",
      key: "dashboard",
      icon: Home,
      path: "/farmer",
    },
    {
      name: "My Animals",
      key: "myAnimals",
      icon: PawPrint,
      path: "/farmer/animals",
    },
    {
      name: "Health Reports",
      key: "healthReports",
      icon: ClipboardList,
      path: "/farmer/reports",
    },
    {
      name: "Vaccinations",
      key: "vaccinations",
      icon: Syringe,
      path: "/farmer/vaccinations",
    },
    {
      name: "Knowledge Hub",
      key: "knowledgeHub",
      icon: BookOpen,
      path: "/farmer/knowledge",
    },
    {
      name: "Support",
      key: "support",
      icon: ShieldCheck,
      path: "/farmer/support",
    },
    {
      name: "Marketplace",
      key: "marketplace",
      icon: Store,
      path: "/farmer/marketplace",
    },
  ],

  Veterinarian: [
    {
      name: "Dashboard",
      key: "dashboard",
      icon: Home,
      path: "/veterinarian",
    },
    {
      name: "Priority Cases",
      key: "priorityCases",
      icon: ClipboardList,
      path: "/veterinarian/cases",
    },
    {
      name: "Animal Records",
      key: "animalRecords",
      icon: PawPrint,
      path: "/veterinarian/animals",
    },
    {
      name: "Health Signals",
      key: "healthSignals",
      icon: Activity,
      path: "/veterinarian/signals",
    },
    {
      name: "Alerts",
      key: "alerts",
      icon: Bell,
      path: "/veterinarian/alerts",
    },
  ],

  "Field Worker": [
    {
      name: "Dashboard",
      key: "dashboard",
      icon: Home,
      path: "/field-worker",
    },
    {
      name: "Assigned Visits",
      key: "assignedVisits",
      icon: ClipboardList,
      path: "/field-worker/visits",
    },
    {
      name: "Villages",
      key: "villages",
      icon: Map,
      path: "/field-worker/villages",
    },
    {
      name: "Vaccination",
      key: "vaccination",
      icon: Syringe,
      path: "/field-worker/vaccination",
    },
    {
      name: "Reports",
      key: "reports",
      icon: Activity,
      path: "/field-worker/reports",
    },
  ],

  "Admin / Government": [
    {
      name: "Dashboard",
      key: "dashboard",
      icon: Home,
      path: "/admin",
    },
    {
      name: "Health Intelligence",
      key: "healthIntelligence",
      icon: Activity,
      path: "/admin/intelligence",
    },
    {
      name: "Village Monitoring",
      key: "villageMonitoring",
      icon: Map,
      path: "/admin/villages",
    },
    {
      name: "Vaccination",
      key: "vaccination",
      icon: Syringe,
      path: "/admin/vaccination",
    },
    {
      name: "Veterinary Resources",
      key: "veterinaryResources",
      icon: Stethoscope,
      path: "/admin/resources",
    },
    {
      name: "Reports",
      key: "reports",
      icon: ClipboardList,
      path: "/admin/reports",
    },
  ],
};


function DashboardLayout({
  children,
  role = "Farmer",
}) {

  const location = useLocation();

  const {
    language,
    changeLanguage,
    t,
  } = useLanguage();


  /* =====================================================
     ROLE BARRIER
     Accept known role aliases, but never silently fall back
     to Farmer for an Admin/Vet/Field Worker page.
  ===================================================== */

  const pathRole =
    location.pathname.startsWith("/admin")
      ? "Admin / Government"
      : location.pathname.startsWith("/veterinarian")
      ? "Veterinarian"
      : location.pathname.startsWith("/field-worker")
      ? "Field Worker"
      : "Farmer";

  const roleAliases = {
    Farmer: "Farmer",
    farmer: "Farmer",

    Veterinarian: "Veterinarian",
    veterinarian: "Veterinarian",
    Vet: "Veterinarian",
    vet: "Veterinarian",

    "Field Worker": "Field Worker",
    "field worker": "Field Worker",
    fieldWorker: "Field Worker",
    "field-worker": "Field Worker",

    "Admin / Government": "Admin / Government",
    Admin: "Admin / Government",
    admin: "Admin / Government",
    Administrator: "Admin / Government",
    administrator: "Admin / Government",
  };

  /*
    Route is the final safety barrier.
    If a page accidentally passes role="admin" or another alias,
    it is normalized correctly. If a page passes the wrong role
    while it is clearly under /admin, the URL wins.
  */
  const requestedRole = roleAliases[role] || null;

  const resolvedRole =
    requestedRole && requestedRole === pathRole
      ? requestedRole
      : pathRole;

  const navigation =
    roleNavigation[resolvedRole] ||
    roleNavigation.Farmer;


  /* =====================================================
     ROLE TRANSLATION
  ===================================================== */

  const translatedRole =
    resolvedRole === "Farmer"
      ? t("farmer")
      : resolvedRole === "Veterinarian"
      ? t("veterinarian")
      : resolvedRole === "Field Worker"
      ? t("fieldWorker")
      : resolvedRole === "Admin / Government"
      ? t("administrator")
      : resolvedRole;


  /* =====================================================
     NAVIGATION TRANSLATION
  ===================================================== */

  const navigationTranslations = {

    dashboard: t("dashboard"),

    myAnimals: t("myAnimals"),

    healthReports: t("healthReports"),

    vaccinations: t("vaccinations"),

    knowledgeHub: t("knowledgeHub"),

    support: t("support"),

    marketplace: t("marketplace"),

    priorityCases: t("priorityCases"),

    animalRecords: t("animalRecords"),

    healthSignals: t("healthSignals"),

    alerts: t("alerts"),

    assignedVisits: t("assignedVisits"),

    villages: t("villages"),

    vaccination: t("vaccination"),

    reports: t("reports"),

    healthIntelligence: t("healthIntelligence"),

    villageMonitoring: t("villageMonitoring"),

    veterinaryResources: t("veterinaryResources"),
  };


  return (

    <div className="flex min-h-screen bg-[#f6f8f5]">

      {/* ================================================= */}
      {/* SIDEBAR */}
      {/* ================================================= */}

      <aside className="hidden w-64 flex-col border-r border-gray-200 bg-white md:flex">

        {/* LOGO */}

        <div className="border-b border-gray-200 px-6 py-5">

          <Link
            to="/"
            className="flex items-center gap-3"
          >

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-700 text-white">

              <Activity size={21} />

            </div>


            <div>

              <h1 className="font-bold text-green-800">
                MRIGARESHKA
              </h1>

              <p className="text-xs text-gray-500">
                {t("healthIntelligence")}
              </p>

            </div>

          </Link>

        </div>


        {/* ================================================= */}
        {/* ROLE */}
        {/* ================================================= */}

        <div className="border-b border-gray-100 px-6 py-4">

          <p className="text-xs uppercase tracking-wide text-gray-400">
            {t("currentRole")}
          </p>

          <p className="mt-1 text-sm font-semibold text-gray-800">
            {translatedRole}
          </p>

        </div>


        {/* ================================================= */}
        {/* NAVIGATION */}
        {/* ================================================= */}

        <nav className="flex-1 space-y-1 p-4">

          {navigation.map((item) => {

            const Icon = item.icon;

            const active =
              location.pathname === item.path;


            return (

              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-green-100 text-green-800"
                    : "text-gray-600 hover:bg-gray-100 hover:text-green-700"
                }`}
              >

                <Icon size={18} />

                {navigationTranslations[item.key] ||
                  item.name}

              </Link>

            );

          })}

        </nav>


        {/* ================================================= */}
        {/* BACK TO HOME */}
        {/* ================================================= */}

        <div className="border-t border-gray-200 p-4">

          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100"
          >

            <LogOut size={18} />

            {t("backToHome")}

          </Link>

        </div>

      </aside>


      {/* ================================================= */}
      {/* MAIN */}
      {/* ================================================= */}

      <div className="flex min-w-0 flex-1 flex-col">


        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <header className="flex min-h-16 items-center justify-between border-b border-gray-200 bg-white px-6 py-3">

          <div>

            <p className="text-sm text-gray-500">
              MRIGARESHKA
            </p>

            <h2 className="font-semibold text-gray-900">
              {translatedRole} {t("dashboard")}
            </h2>

          </div>


          <div className="flex items-center gap-3">


            {/* ================================================= */}
            {/* LANGUAGE SWITCH - FARMER PORTAL ONLY */}
            {/* ================================================= */}

            {resolvedRole === "Farmer" && (
              <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 p-1">

                <button
                  type="button"
                  onClick={() =>
                    changeLanguage("english")
                  }
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                    language === "english"
                      ? "bg-green-700 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  English
                </button>

                <button
                  type="button"
                  onClick={() =>
                    changeLanguage("hindi")
                  }
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                    language === "hindi"
                      ? "bg-green-700 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  हिंदी
                </button>

              </div>
            )}


            {/* ================================================= */}
            {/* NOTIFICATIONS */}
            {/* ================================================= */}

            <button
              className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              aria-label={t("notifications")}
            >

              <Bell size={20} />

              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />

            </button>


            {/* ================================================= */}
            {/* USER */}
            {/* ================================================= */}

            <div className="hidden text-right sm:block">

              <p className="text-sm font-semibold text-gray-800">
                {t("demoUser")}
              </p>

              <p className="text-xs text-gray-500">
                {translatedRole}
              </p>

            </div>

          </div>

        </header>


        {/* ================================================= */}
        {/* CONTENT */}
        {/* ================================================= */}

        <main className="flex-1 p-6 md:p-8">

          {children}

        </main>

      </div>

    </div>

  );
}


export default DashboardLayout;
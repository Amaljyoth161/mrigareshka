import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

const translations = {
  english: {
    // General
    back: "Back",
    save: "Save",
    cancel: "Cancel",
    submit: "Submit",
    search: "Search",
    close: "Close",
    view: "View",
    edit: "Edit",
    delete: "Delete",
    loading: "Loading...",

    // Home
    home: "Home",
    getStarted: "Get Started",

    // Dashboard / Layout
    dashboard: "Dashboard",
    currentRole: "Current Role",
    backToHome: "Back to Home",
    notifications: "Notifications",
    demoUser: "Demo User",

    // Roles
    selectRole: "Select Your Role",
    farmer: "Farmer",
    veterinarian: "Veterinarian",
    fieldWorker: "Field Worker",
    administrator: "Administrator",

    // Farmer
    farmerDashboard: "Farmer Dashboard",
    myAnimals: "My Animals",
    addAnimal: "Add Animal",
    animalHealthPassport: "Animal Health Passport",
    reportHealthIssue: "Report Health Issue",
    healthReports: "Health Reports",
    vaccination: "Vaccination",
    vaccinations: "Vaccinations",
    governmentSupport: "Government Support",
    knowledgeHub: "Knowledge Hub",
    insuranceSupport: "Insurance & Support",
    financeSchemes: "Finance & Schemes",
    marketplace: "Livestock Marketplace",
    ivrReporting: "IVR Reporting",
    offlineReporting: "Offline Reporting",
    healthAdvisories: "Health Advisories",

    // Farmer Dashboard
    farmerOverview: "Farmer Overview",
    welcomeBack: "Welcome back",
    monitorLivestock:
      "Monitor your livestock health, reports and preventive care.",
    quickActions: "Quick Actions",
    selectAnimal: "Select Animal",
    chooseAnimal:
      "Choose an animal before reporting a health issue or viewing nutrition guidance.",
    reportIssueFor: "Report an issue for",
    healthKnowledge: "Health Knowledge",
    preventionCare: "Prevention and care",
    browseLivestockResources: "Browse livestock resources",
    viewYourLivestock: "View your livestock",
    registeredAnimals: "Registered animals",
    healthAlerts: "Health Alerts",
    requireAttention: "Require attention",
    upcoming: "Upcoming",
    submittedReports: "Submitted reports",
    recentHealthReports: "Recent Health Reports",
    latestLivestockActivity:
      "Latest livestock health activity.",
    viewAnimals: "View animals",
    attention: "Attention",

    // Add Animal
    animalAddedSuccessfully: "Animal Added Successfully",
    addedToLivestockRecords:
      "has been added to your livestock records.",
    returningToMyAnimals: "Returning to My Animals...",
    backToMyAnimals: "Back to My Animals",
    livestockManagement: "Livestock Management",
    addNewAnimal: "Add New Animal",
    registerLivestockAnimal:
      "Register a livestock animal and create its initial health record.",
    basicInformation: "Basic Information",
    enterAnimalDetails:
      "Enter the animal's identification and physical details.",
    animalName: "Animal Name",
    animalNamePlaceholder: "e.g. Lakshmi",
    species: "Species",
    cow: "Cow",
    buffalo: "Buffalo",
    goat: "Goat",
    sheep: "Sheep",
    other: "Other",
    breed: "Breed",
    breedPlaceholder: "e.g. Jersey",
    age: "Age",
    agePlaceholder: "Age in years",
    weight: "Weight",
    weightPlaceholder: "Weight in kg",
    sex: "Sex",
    female: "Female",
    male: "Male",
    color: "Color",
    colorPlaceholder: "e.g. Brown",
    locationPlaceholder: "e.g. Village A",
    initialHealthInformation:
      "Initial Health Information",
    recordHealthVaccinationStatus:
      "Record the current health and vaccination status.",
    currentHealthStatus: "Current Health Status",
    healthy: "Healthy",
    underObservation: "Under Observation",
    needsAttention: "Needs Attention",
    vaccinationStatus: "Vaccination Status",
    upToDate: "Up to date",
    dueSoon: "Due Soon",
    overdue: "Overdue",
    notRecorded: "Not recorded",
    lastCheckup: "Last Check-up",
    nextVaccinationDate: "Next Vaccination Date",
    healthRecordSetup: "Health record setup",
    healthRecordSetupMessage:
      "After registration, you can open the animal's Health Passport to report health issues, review vaccination records and access nutrition guidance.",
    saveAnimal: "Save Animal",

    // Veterinary
    veterinarianDashboard: "Veterinarian Dashboard",
    priorityCases: "Priority Cases",
    animalRecords: "Animal Records",
    healthSignals: "Health Signals",
    veterinaryAlerts: "Veterinary Alerts",
    alerts: "Alerts",
    villageHealthIntelligence:
      "Village Health Intelligence",
    vaccinationIntelligence:
      "Vaccination Intelligence",
    resourcePrioritization:
      "Veterinary Resource Prioritization",
    regionalIntelligence:
      "Regional Health Intelligence",
    laboratoryReferrals:
      "Laboratory Referrals",

    // Field Worker
    fieldWorkerDashboard:
      "Field Worker Dashboard",
    assignedVisits: "Assigned Visits",
    villages: "Villages",
    reports: "Reports",

    // Admin
    adminDashboard: "Admin Dashboard",

    // Intelligence / Common Navigation
    healthIntelligence: "Health Intelligence",
    villageMonitoring: "Village Monitoring",
    veterinaryResources:
      "Veterinary Resources",

    // Common health terms
    reportedSymptoms: "Reported Symptoms",
    severity: "Severity",
    location: "Location",
    status: "Status",
    priority: "Priority",
    recommendedAction:
      "Recommended Action",
    totalCases: "Total Cases",
    highPriority: "High Priority",
    moderatePriority: "Moderate Priority",
  },

  hindi: {
    // General
    back: "वापस",
    save: "सहेजें",
    cancel: "रद्द करें",
    submit: "जमा करें",
    search: "खोजें",
    close: "बंद करें",
    view: "देखें",
    edit: "संपादित करें",
    delete: "हटाएं",
    loading: "लोड हो रहा है...",

    // Home
    home: "होम",
    getStarted: "शुरू करें",

    // Dashboard / Layout
    dashboard: "डैशबोर्ड",
    currentRole: "वर्तमान भूमिका",
    backToHome: "होम पर वापस जाएं",
    notifications: "सूचनाएं",
    demoUser: "डेमो उपयोगकर्ता",

    // Roles
    selectRole: "अपनी भूमिका चुनें",
    farmer: "किसान",
    veterinarian: "पशु चिकित्सक",
    fieldWorker: "फील्ड वर्कर",
    administrator: "प्रशासक",

    // Farmer
    farmerDashboard: "किसान डैशबोर्ड",
    myAnimals: "मेरे पशु",
    addAnimal: "पशु जोड़ें",
    animalHealthPassport:
      "पशु स्वास्थ्य पासपोर्ट",
    reportHealthIssue:
      "स्वास्थ्य समस्या की रिपोर्ट करें",
    healthReports: "स्वास्थ्य रिपोर्ट",
    vaccination: "टीकाकरण",
    vaccinations: "टीकाकरण",
    governmentSupport: "सरकारी सहायता",
    knowledgeHub: "ज्ञान केंद्र",
    insuranceSupport: "बीमा और सहायता",
    financeSchemes: "वित्त और योजनाएं",
    marketplace: "पशुधन बाज़ार",
    ivrReporting: "आईवीआर रिपोर्टिंग",
    offlineReporting: "ऑफलाइन रिपोर्टिंग",
    healthAdvisories: "स्वास्थ्य सलाह",

    // Farmer Dashboard
    farmerOverview: "किसान अवलोकन",
    welcomeBack: "वापसी पर स्वागत है",
    monitorLivestock:
      "अपने पशुओं के स्वास्थ्य, रिपोर्ट और निवारक देखभाल की निगरानी करें।",
    quickActions: "त्वरित कार्य",
    selectAnimal: "पशु चुनें",
    chooseAnimal:
      "स्वास्थ्य समस्या की रिपोर्ट करने या पोषण संबंधी मार्गदर्शन देखने से पहले एक पशु चुनें।",
    reportIssueFor:
      "इसके लिए समस्या की रिपोर्ट करें",
    healthKnowledge: "स्वास्थ्य ज्ञान",
    preventionCare: "रोकथाम और देखभाल",
    browseLivestockResources:
      "पशुधन संसाधन देखें",
    viewYourLivestock:
      "अपने पशुओं को देखें",
    registeredAnimals: "पंजीकृत पशु",
    healthAlerts: "स्वास्थ्य अलर्ट",
    requireAttention:
      "ध्यान देने की आवश्यकता",
    upcoming: "आगामी",
    submittedReports:
      "जमा की गई रिपोर्ट",
    recentHealthReports:
      "हाल की स्वास्थ्य रिपोर्ट",
    latestLivestockActivity:
      "पशुधन स्वास्थ्य की नवीनतम गतिविधि।",
    viewAnimals: "पशु देखें",
    attention: "ध्यान दें",

    // Add Animal
    animalAddedSuccessfully:
      "पशु सफलतापूर्वक जोड़ा गया",
    addedToLivestockRecords:
      "को आपके पशुधन रिकॉर्ड में जोड़ दिया गया है।",
    returningToMyAnimals:
      "मेरे पशुओं पर वापस जा रहे हैं...",
    backToMyAnimals:
      "मेरे पशुओं पर वापस जाएं",
    livestockManagement:
      "पशुधन प्रबंधन",
    addNewAnimal: "नया पशु जोड़ें",
    registerLivestockAnimal:
      "एक पशुधन पशु पंजीकृत करें और उसका प्रारंभिक स्वास्थ्य रिकॉर्ड बनाएं।",
    basicInformation: "मूल जानकारी",
    enterAnimalDetails:
      "पशु की पहचान और शारीरिक विवरण दर्ज करें।",
    animalName: "पशु का नाम",
    animalNamePlaceholder:
      "जैसे लक्ष्मी",
    species: "प्रजाति",
    cow: "गाय",
    buffalo: "भैंस",
    goat: "बकरी",
    sheep: "भेड़",
    other: "अन्य",
    breed: "नस्ल",
    breedPlaceholder:
      "जैसे जर्सी",
    age: "आयु",
    agePlaceholder:
      "आयु वर्षों में",
    weight: "वजन",
    weightPlaceholder:
      "वजन किलोग्राम में",
    sex: "लिंग",
    female: "मादा",
    male: "नर",
    color: "रंग",
    colorPlaceholder:
      "जैसे भूरा",
    locationPlaceholder:
      "जैसे गांव A",
    initialHealthInformation:
      "प्रारंभिक स्वास्थ्य जानकारी",
    recordHealthVaccinationStatus:
      "वर्तमान स्वास्थ्य और टीकाकरण स्थिति दर्ज करें।",
    currentHealthStatus:
      "वर्तमान स्वास्थ्य स्थिति",
    healthy: "स्वस्थ",
    underObservation:
      "निगरानी में",
    needsAttention:
      "ध्यान देने की आवश्यकता",
    vaccinationStatus:
      "टीकाकरण स्थिति",
    upToDate: "अद्यतन",
    dueSoon: "जल्द देय",
    overdue: "अतिदेय",
    notRecorded:
      "दर्ज नहीं किया गया",
    lastCheckup: "अंतिम जांच",
    nextVaccinationDate:
      "अगली टीकाकरण तिथि",
    healthRecordSetup:
      "स्वास्थ्य रिकॉर्ड सेटअप",
    healthRecordSetupMessage:
      "पंजीकरण के बाद, आप पशु के स्वास्थ्य पासपोर्ट को खोलकर स्वास्थ्य समस्याओं की रिपोर्ट कर सकते हैं, टीकाकरण रिकॉर्ड देख सकते हैं और पोषण संबंधी मार्गदर्शन प्राप्त कर सकते हैं।",
    saveAnimal: "पशु सहेजें",

    // Veterinary
    veterinarianDashboard:
      "पशु चिकित्सक डैशबोर्ड",
    priorityCases:
      "प्राथमिकता वाले मामले",
    animalRecords:
      "पशु रिकॉर्ड",
    healthSignals:
      "स्वास्थ्य संकेत",
    veterinaryAlerts:
      "पशु चिकित्सा अलर्ट",
    alerts: "अलर्ट",
    villageHealthIntelligence:
      "ग्राम स्वास्थ्य जानकारी",
    vaccinationIntelligence:
      "टीकाकरण जानकारी",
    resourcePrioritization:
      "पशु चिकित्सा संसाधन प्राथमिकता",
    regionalIntelligence:
      "क्षेत्रीय स्वास्थ्य जानकारी",
    laboratoryReferrals:
      "प्रयोगशाला रेफरल",

    // Field Worker
    fieldWorkerDashboard:
      "फील्ड वर्कर डैशबोर्ड",
    assignedVisits:
      "सौंपे गए दौरे",
    villages: "गांव",
    reports: "रिपोर्ट",

    // Admin
    adminDashboard:
      "प्रशासनिक डैशबोर्ड",

    // Intelligence / Common Navigation
    healthIntelligence:
      "स्वास्थ्य जानकारी",
    villageMonitoring:
      "ग्राम निगरानी",
    veterinaryResources:
      "पशु चिकित्सा संसाधन",

    // Common health terms
    reportedSymptoms:
      "रिपोर्ट किए गए लक्षण",
    severity: "गंभीरता",
    location: "स्थान",
    status: "स्थिति",
    priority: "प्राथमिकता",
    recommendedAction:
      "अनुशंसित कार्रवाई",
    totalCases: "कुल मामले",
    highPriority:
      "उच्च प्राथमिकता",
    moderatePriority:
      "मध्यम प्राथमिकता",
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(
    localStorage.getItem(
      "mrigare-shka-language"
    ) || "english"
  );

  function changeLanguage(newLanguage) {
    setLanguage(newLanguage);

    localStorage.setItem(
      "mrigare-shka-language",
      newLanguage
    );
  }

  function t(key) {
    return (
      translations[language]?.[key] ||
      translations.english[key] ||
      key
    );
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}
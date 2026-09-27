// =====================================================
// FARMER ADVISORY SERVICE
// English + Hindi
// =====================================================

const advisoryLibrary = {
  fever: {
    english: {
      title: "Fever / High Temperature",
      message:
        "The animal has reported a high temperature. Keep the animal in a clean, well-ventilated area and provide access to clean drinking water.",
      action:
        "Monitor the animal closely and contact a veterinary professional for assessment.",
    },

    hindi: {
      title: "बुखार / अधिक तापमान",
      message:
        "पशु में अधिक तापमान की सूचना मिली है। पशु को साफ और हवादार स्थान पर रखें तथा साफ पीने का पानी उपलब्ध कराएं।",
      action:
        "पशु की सावधानीपूर्वक निगरानी करें और पशु चिकित्सक से जांच के लिए संपर्क करें।",
    },
  },

  appetite: {
    english: {
      title: "Reduced Appetite",
      message:
        "The animal has reduced appetite. Ensure fresh water and suitable feed are available and observe changes in eating behaviour.",
      action:
        "If reduced appetite continues or other symptoms appear, contact a veterinary professional.",
    },

    hindi: {
      title: "भूख में कमी",
      message:
        "पशु की भूख कम होने की सूचना मिली है। ताजा पानी और उचित चारा उपलब्ध कराएं तथा खाने के व्यवहार में बदलाव पर नजर रखें।",
      action:
        "यदि भूख में कमी बनी रहती है या अन्य लक्षण दिखाई देते हैं, तो पशु चिकित्सक से संपर्क करें।",
    },
  },

  activity: {
    english: {
      title: "Reduced Activity",
      message:
        "The animal is showing reduced activity. Keep the animal under observation and check its feeding, drinking and general behaviour.",
      action:
        "Contact a veterinary professional if the condition continues or becomes worse.",
    },

    hindi: {
      title: "गतिविधि में कमी",
      message:
        "पशु की गतिविधि कम होने की सूचना मिली है। पशु की निगरानी करें और उसके खाने, पानी पीने तथा सामान्य व्यवहार पर ध्यान दें।",
      action:
        "यदि स्थिति बनी रहती है या खराब होती है, तो पशु चिकित्सक से संपर्क करें।",
    },
  },

  severe: {
    english: {
      title: "Priority Veterinary Attention",
      message:
        "The reported condition has been marked as severe. Keep the animal under observation and take appropriate biosecurity precautions.",
      action:
        "Contact a veterinary professional as soon as possible for clinical assessment.",
    },

    hindi: {
      title: "प्राथमिकता वाली पशु चिकित्सा सहायता",
      message:
        "रिपोर्ट की गई स्थिति को गंभीर बताया गया है। पशु की निगरानी करें और उचित जैव-सुरक्षा सावधानियां अपनाएं।",
      action:
        "जितनी जल्दी हो सके पशु चिकित्सक से नैदानिक जांच के लिए संपर्क करें।",
    },
  },

  general: {
    english: {
      title: "Livestock Health Advisory",
      message:
        "A livestock health report has been submitted. Continue observing the animal and maintain clean housing, safe water and appropriate feeding.",
      action:
        "Contact a veterinary professional if symptoms persist, increase or become severe.",
    },

    hindi: {
      title: "पशु स्वास्थ्य सलाह",
      message:
        "पशु स्वास्थ्य संबंधी रिपोर्ट दर्ज की गई है। पशु की निगरानी जारी रखें और साफ आवास, सुरक्षित पानी तथा उचित चारा सुनिश्चित करें।",
      action:
        "यदि लक्षण बने रहते हैं, बढ़ते हैं या गंभीर हो जाते हैं, तो पशु चिकित्सक से संपर्क करें।",
    },
  },
};


// =====================================================
// DETERMINE ADVISORY TYPE
// =====================================================

export function getAdvisoryType(report) {
  if (!report) {
    return "general";
  }

  if (report.severity === "Severe") {
    return "severe";
  }

  const symptoms = (report.symptoms || []).map((item) =>
    String(item).toLowerCase()
  );

  if (
    symptoms.some(
      (item) =>
        item.includes("fever") ||
        item.includes("temperature") ||
        item.includes("high temperature")
    )
  ) {
    return "fever";
  }

  if (
    symptoms.some(
      (item) =>
        item.includes("appetite") ||
        item.includes("eating") ||
        item.includes("not eating")
    )
  ) {
    return "appetite";
  }

  if (
    symptoms.some(
      (item) =>
        item.includes("activity") ||
        item.includes("weak") ||
        item.includes("lethargy")
    )
  ) {
    return "activity";
  }

  return "general";
}


// =====================================================
// GET ADVISORY
// =====================================================

export function getAdvisory(report, language = "english") {
  const type = getAdvisoryType(report);

  const selectedLanguage =
    language === "hindi" ? "hindi" : "english";

  return advisoryLibrary[type][selectedLanguage];
}


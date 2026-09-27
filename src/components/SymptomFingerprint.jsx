import {
  Activity,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

import { calculateRisk } from "../data/symptomRules";
import { useLanguage } from "../context/LanguageContext";

function SymptomFingerprint({ symptoms = [] }) {
  const { language } = useLanguage();

  const result = calculateRisk(symptoms);

  const text = {
    english: {
      title: "Symptom Fingerprint",
      subtitle: "Structured summary of the reported symptoms.",
      reportedSymptoms: "Reported symptoms",
      noSymptoms: "No symptoms selected.",
      riskAssessment: "AI-assisted risk assessment",
      lowRisk: "Low Risk Signal",
      moderateRisk: "Moderate Risk Signal",
      highRisk: "High Risk Signal",
      symptomScore: "Symptom signal score",
      disclaimer:
        "This prototype provides an AI-assisted risk signal based on reported symptoms. It is not a veterinary diagnosis and should not be used as a substitute for professional examination.",
    },

    hindi: {
      title: "लक्षण फिंगरप्रिंट",
      subtitle: "रिपोर्ट किए गए लक्षणों का संरचित सारांश।",
      reportedSymptoms: "रिपोर्ट किए गए लक्षण",
      noSymptoms: "कोई लक्षण चयनित नहीं है।",
      riskAssessment: "एआई-सहायित जोखिम आकलन",
      lowRisk: "कम जोखिम संकेत",
      moderateRisk: "मध्यम जोखिम संकेत",
      highRisk: "उच्च जोखिम संकेत",
      symptomScore: "लक्षण संकेत स्कोर",
      disclaimer:
        "यह प्रोटोटाइप रिपोर्ट किए गए लक्षणों के आधार पर एआई-सहायित जोखिम संकेत प्रदान करता है। यह पशु चिकित्सा निदान नहीं है और इसे पेशेवर जाँच के विकल्प के रूप में उपयोग नहीं किया जाना चाहिए।",
    },
  };

  const t = text[language];

  const symptomTranslations = {
    Fever: "बुखार",
    "Reduced appetite": "भूख कम लगना",
    Cough: "खाँसी",
    "Difficulty breathing": "साँस लेने में कठिनाई",
    "Nasal discharge": "नाक से स्राव",
    Diarrhea: "दस्त",
    Vomiting: "उल्टी",
    Swelling: "सूजन",
    "Skin lesions": "त्वचा पर घाव",
    Lameness: "लंगड़ापन",
    "Excessive salivation": "अत्यधिक लार आना",
    "Reduced activity": "गतिविधि में कमी",
  };

  const displaySymptom = (symptom) => {
    if (language === "hindi") {
      return symptomTranslations[symptom] || symptom;
    }

    return symptom;
  };

  const riskStyles = {
    Low: {
      box: "border-green-200 bg-green-50",
      text: "text-green-700",
      icon: <CheckCircle2 size={20} />,
      label: t.lowRisk,
    },

    Moderate: {
      box: "border-yellow-200 bg-yellow-50",
      text: "text-yellow-700",
      icon: <Activity size={20} />,
      label: t.moderateRisk,
    },

    High: {
      box: "border-red-200 bg-red-50",
      text: "text-red-700",
      icon: <AlertTriangle size={20} />,
      label: t.highRisk,
    },
  };

  const style = riskStyles[result.level];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      {/* HEADER */}
      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">
          <Activity size={20} />
        </div>

        <div>
          <h2 className="font-bold text-gray-900">
            {t.title}
          </h2>

          <p className="text-sm text-gray-500">
            {t.subtitle}
          </p>
        </div>

      </div>


      {/* SYMPTOMS */}
      <div className="mt-6">

        <p className="text-sm font-semibold text-gray-700">
          {t.reportedSymptoms}
        </p>

        {symptoms.length === 0 ? (
          <p className="mt-3 text-sm text-gray-500">
            {t.noSymptoms}
          </p>
        ) : (
          <div className="mt-3 flex flex-wrap gap-2">

            {symptoms.map((symptom) => (
              <span
                key={symptom}
                className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700"
              >
                {displaySymptom(symptom)}
              </span>
            ))}

          </div>
        )}

      </div>


      {/* RISK */}
      <div className={`mt-6 rounded-xl border p-5 ${style.box}`}>

        <div className="flex items-center gap-3">

          <div className={style.text}>
            {style.icon}
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              {t.riskAssessment}
            </p>

            <p className={`mt-1 text-xl font-bold ${style.text}`}>
              {style.label}
            </p>

          </div>

        </div>

        <p className="mt-3 text-sm text-gray-600">
          {t.symptomScore}: {result.score}
        </p>

      </div>


      {/* DISCLAIMER */}
      <div className="mt-5 rounded-lg bg-gray-50 p-4">

        <p className="text-xs leading-5 text-gray-500">
          {t.disclaimer}
        </p>

      </div>

    </div>
  );
}

export default SymptomFingerprint;
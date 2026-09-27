export const symptomRules = [
  {
    name: "Fever",
    category: "General",
    weight: 3,
  },
  {
    name: "Reduced appetite",
    category: "General",
    weight: 2,
  },
  {
    name: "Cough",
    category: "Respiratory",
    weight: 2,
  },
  {
    name: "Difficulty breathing",
    category: "Respiratory",
    weight: 4,
  },
  {
    name: "Nasal discharge",
    category: "Respiratory",
    weight: 2,
  },
  {
    name: "Diarrhea",
    category: "Digestive",
    weight: 3,
  },
  {
    name: "Vomiting",
    category: "Digestive",
    weight: 3,
  },
  {
    name: "Swelling",
    category: "General",
    weight: 2,
  },
  {
    name: "Skin lesions",
    category: "Skin",
    weight: 3,
  },
  {
    name: "Lameness",
    category: "Mobility",
    weight: 2,
  },
  {
    name: "Excessive salivation",
    category: "Oral",
    weight: 3,
  },
  {
    name: "Reduced activity",
    category: "General",
    weight: 2,
  },
];

export function calculateRisk(selectedSymptoms) {
  const matchedSymptoms = symptomRules.filter((symptom) =>
    selectedSymptoms.includes(symptom.name)
  );

  const score = matchedSymptoms.reduce(
    (total, symptom) => total + symptom.weight,
    0
  );

  let level = "Low";

  if (score >= 9) {
    level = "High";
  } else if (score >= 5) {
    level = "Moderate";
  }

  return {
    score,
    level,
    matchedSymptoms,
  };
}
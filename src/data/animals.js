export const defaultAnimals = [
 {
  id: "AN001",
  name: "Lakshmi",
  species: "Cow",
  breed: "Jersey",
  age: 4,
  weight: 420,
  sex: "Female",
  location: "Village A",
  vaccinationStatus: "Up to date",
  nextVaccinationDate: "2026-10-15",
    lastCheckup: "2026-09-20",

    healthHistory: [
      {
        date: "2026-09-20",
        type: "Health Check-up",
        description: "Routine health examination completed.",
        status: "Normal",
      },
      {
        date: "2026-08-12",
        type: "Health Observation",
        description: "Appetite and activity levels were normal.",
        status: "Normal",
      },
    ],

    vaccinationHistory: [
      {
        date: "2026-08-15",
        vaccine: "FMD",
        dose: "Standard",
        status: "Completed",
      },
      {
        date: "2026-06-10",
        vaccine: "HS",
        dose: "Standard",
        status: "Completed",
      },
    ],

    treatmentHistory: [
      {
        date: "2026-05-18",
        treatment: "Routine deworming",
        notes: "Treatment recorded during routine veterinary visit.",
      },
    ],
  },

  {
    id: "AN002",
    name: "Ganga",
    species: "Cow",
    breed: "Holstein Friesian",
    sex: "Female",
    age: 6,
    weight: 470,
    color: "Black & White",
    status: "Under Review",
    location: "Village A",
    vaccinationStatus: "Due Soon",
    lastCheckup: "2026-09-22",

    healthHistory: [
      {
        date: "2026-09-22",
        type: "Health Observation",
        description: "Reduced appetite reported by farmer.",
        status: "Under Review",
      },
      {
        date: "2026-08-20",
        type: "Health Check-up",
        description: "Routine examination completed.",
        status: "Normal",
      },
    ],

    vaccinationHistory: [
      {
        date: "2026-05-12",
        vaccine: "FMD",
        dose: "Standard",
        status: "Completed",
      },
    ],

    treatmentHistory: [],
  },

  {
    id: "AN003",
    name: "Kali",
    species: "Buffalo",
    breed: "Murrah",
    sex: "Female",
    age: 5,
    weight: 520,
    color: "Black",
    status: "Healthy",
    location: "Village B",
    vaccinationStatus: "Up to date",
    lastCheckup: "2026-09-18",

    healthHistory: [
      {
        date: "2026-09-18",
        type: "Health Check-up",
        description: "Routine examination completed.",
        status: "Normal",
      },
    ],

    vaccinationHistory: [
      {
        date: "2026-07-20",
        vaccine: "HS",
        dose: "Standard",
        status: "Completed",
      },
    ],

    treatmentHistory: [],
  },

  {
    id: "AN004",
    name: "Raja",
    species: "Cow",
    breed: "Gir",
    sex: "Male",
    age: 3,
    weight: 390,
    color: "Red",
    status: "Healthy",
    location: "Village C",
    vaccinationStatus: "Up to date",
    lastCheckup: "2026-09-15",

    healthHistory: [
      {
        date: "2026-09-15",
        type: "Health Check-up",
        description: "Routine examination completed.",
        status: "Normal",
      },
    ],

    vaccinationHistory: [
      {
        date: "2026-07-05",
        vaccine: "FMD",
        dose: "Standard",
        status: "Completed",
      },
    ],

    treatmentHistory: [],
  },

  {
    id: "AN005",
    name: "Meena",
    species: "Goat",
    breed: "Malabari",
    sex: "Female",
    age: 2,
    weight: 38,
    color: "White",
    status: "Under Review",
    location: "Village C",
    vaccinationStatus: "Due",
    lastCheckup: "2026-09-21",

    healthHistory: [
      {
        date: "2026-09-21",
        type: "Health Observation",
        description: "Mild swelling reported by farmer.",
        status: "Under Review",
      },
    ],

    vaccinationHistory: [],

    treatmentHistory: [],
  },
];

const STORAGE_KEY = "mrigare-shka-animals";

export function getAnimals() {
  const savedAnimals = localStorage.getItem(STORAGE_KEY);

  if (savedAnimals) {
    return JSON.parse(savedAnimals);
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(defaultAnimals)
  );

  return defaultAnimals;
}

export function saveAnimals(animalList) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(animalList)
  );
}
export function getNutritionGuidance(animal) {

  if (!animal) {
    return null;
  }

  const species =
    animal.species?.toLowerCase() || "";

  const weight =
    Number(animal.weight) || 0;

  let guidance = {
    feedTypes: [],
    water: "",
    notes: [],
  };


  // CATTLE

  if (
    species.includes("cow") ||
    species.includes("cattle")
  ) {

    guidance.feedTypes = [
      "Green fodder",
      "Dry fodder",
      "Balanced concentrate feed",
      "Mineral mixture",
    ];

    guidance.water =
      "Provide continuous access to clean drinking water.";

    guidance.notes.push(
      "Maintain a balanced combination of roughage and concentrate feed."
    );

    guidance.notes.push(
      "Adjust feed quantity according to body condition, production stage and veterinary guidance."
    );

  }


  // BUFFALO

  else if (
    species.includes("buffalo")
  ) {

    guidance.feedTypes = [
      "Green fodder",
      "Dry fodder",
      "Balanced concentrate feed",
      "Mineral mixture",
    ];

    guidance.water =
      "Provide frequent access to clean drinking water.";

    guidance.notes.push(
      "Maintain adequate roughage and balanced concentrate feed."
    );

  }


  // GOAT / SHEEP

  else if (
    species.includes("goat") ||
    species.includes("sheep")
  ) {

    guidance.feedTypes = [
      "Green fodder",
      "Dry fodder",
      "Browse or forage",
      "Mineral supplement",
    ];

    guidance.water =
      "Provide clean drinking water throughout the day.";

    guidance.notes.push(
      "Avoid sudden changes in feed."
    );

  }


  // GENERAL

  else {

    guidance.feedTypes = [
      "Species-appropriate forage",
      "Balanced feed",
      "Mineral supplement",
    ];

    guidance.water =
      "Provide clean drinking water.";

    guidance.notes.push(
      "Use species-appropriate feeding practices."
    );

  }


  // WEIGHT INFORMATION

  if (weight > 0) {

    guidance.notes.push(
      `Recorded body weight: ${weight} kg. Feed quantity should be determined according to the animal's condition, age and production requirements.`
    );

  }


  return guidance;
}
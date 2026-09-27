// =========================================================
// MRIGARESHKA - WEATHER RISK SERVICE
// =========================================================
// This MVP uses a simple rule-based weather risk layer.
// The structure is designed so a live weather API can be
// connected later without changing the dashboard logic.
// =========================================================


export function calculateWeatherRisk(weather) {

  if (!weather) {
    return {
      level: "Unknown",
      score: 0,
      reasons: [],
    };
  }


  let score = 0;
  const reasons = [];


  // High temperature
  if (weather.temperature >= 35) {

    score += 2;

    reasons.push(
      "High temperature may increase heat-stress risk."
    );

  } else if (weather.temperature >= 30) {

    score += 1;

    reasons.push(
      "Warm conditions may increase animal heat stress."
    );

  }


  // High humidity
  if (weather.humidity >= 80) {

    score += 2;

    reasons.push(
      "High humidity may increase environmental disease risk."
    );

  } else if (weather.humidity >= 65) {

    score += 1;

    reasons.push(
      "Elevated humidity may support disease transmission."
    );

  }


  // Heavy rainfall
  if (weather.rainfall >= 50) {

    score += 2;

    reasons.push(
      "Heavy rainfall may increase environmental health risks."
    );

  } else if (weather.rainfall >= 20) {

    score += 1;

    reasons.push(
      "Recent rainfall may affect livestock housing conditions."
    );

  }


  // Risk level

  let level = "Low";

  if (score >= 5) {
    level = "High";
  } else if (score >= 3) {
    level = "Moderate";
  }


  return {
    level,
    score,
    reasons,
  };

}


// =========================================================
// DEMO WEATHER DATA
// =========================================================
// This is intentionally local demo data.
// Replace this later with live weather API data.
// =========================================================

export const demoWeather = {

  "Village A": {
    temperature: 34,
    humidity: 76,
    rainfall: 25,
  },

  "Village B": {
    temperature: 29,
    humidity: 62,
    rainfall: 10,
  },

  "Village C": {
    temperature: 36,
    humidity: 84,
    rainfall: 55,
  },

};


// =========================================================
// GET WEATHER FOR VILLAGE
// =========================================================

export function getVillageWeather(village) {

  return (
    demoWeather[village] || {
      temperature: null,
      humidity: null,
      rainfall: null,
    }
  );

}
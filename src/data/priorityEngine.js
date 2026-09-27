export function calculatePriority(report) {
  let score = 0;

  // SEVERITY
  if (report.severity === "Severe") {
    score += 5;
  } else if (report.severity === "Moderate") {
    score += 3;
  } else {
    score += 1;
  }

  // NUMBER OF SYMPTOMS
  const symptomCount =
    report.symptoms?.length || 0;

  if (symptomCount >= 4) {
    score += 3;
  } else if (symptomCount >= 2) {
    score += 2;
  } else if (symptomCount === 1) {
    score += 1;
  }

  // APPETITE
  if (report.appetite === "No appetite") {
    score += 2;
  } else if (report.appetite === "Reduced") {
    score += 1;
  }

  // ACTIVITY
  if (report.activity === "Very low") {
    score += 2;
  } else if (report.activity === "Reduced") {
    score += 1;
  }

  // TEMPERATURE
  if (report.temperature) {
    const temperature =
      Number(report.temperature);

    if (temperature >= 40) {
      score += 3;
    } else if (temperature >= 39.5) {
      score += 2;
    }
  }


  let priority = "Low";

  if (score >= 8) {
    priority = "High";
  } else if (score >= 4) {
    priority = "Medium";
  }


  return {
    score,
    priority,
  };
}
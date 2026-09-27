export function getVillageReports() {

  const reports = JSON.parse(
    localStorage.getItem(
      "mrigare-shka-health-reports"
    ) || "[]"
  );


  const villageMap = {};


  // GROUP REPORTS BY VILLAGE

  reports.forEach((report) => {

    const village =
      report.location ||
      "Unknown Location";


    if (!villageMap[village]) {

      villageMap[village] = {
        village,
        reports: [],
        animals: new Set(),
        symptoms: {},
      };

    }


    villageMap[village].reports.push(
      report
    );


    if (report.animalName) {

      villageMap[village].animals.add(
        report.animalName
      );

    }


    // COUNT SYMPTOMS

    (report.symptoms || []).forEach(
      (symptom) => {

        villageMap[village].symptoms[
          symptom
        ] =
          (villageMap[village].symptoms[
            symptom
          ] || 0) + 1;

      }
    );

  });


  // CONVERT VILLAGE DATA INTO UI DATA

  return Object.values(
    villageMap
  ).map((villageData) => {

    const symptomEntries =
      Object.entries(
        villageData.symptoms
      );


    symptomEntries.sort(
      (a, b) => b[1] - a[1]
    );


    const topSymptoms =
      symptomEntries.slice(0, 5);


    const reportCount =
      villageData.reports.length;


    const affectedAnimals =
      villageData.animals.size;


    const severeReports =
      villageData.reports.filter(
        (report) =>
          report.severity === "Severe"
      ).length;


    // SIMPLE PROTOTYPE SIGNAL LOGIC

    let signalLevel = "Low";


    if (
      reportCount >= 5 ||
      severeReports >= 2
    ) {

      signalLevel = "High";

    } else if (
      reportCount >= 2
    ) {

      signalLevel = "Moderate";

    }


    return {

      village: villageData.village,

      reportCount,

      affectedAnimals,

      severeReports,

      topSymptoms,

      signalLevel,

    };

  });

}
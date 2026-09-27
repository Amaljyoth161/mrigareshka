// =========================================================
// MRIGARESHKA - REGIONAL INTELLIGENCE
// =========================================================
// Converts village-level health reports into
// block-level and district-level intelligence.
//
// Current MVP:
// - Uses local report data
// - Uses a small administrative mapping
// - Can later be replaced by GIS / government datasets
// =========================================================


// =========================================================
// DEMO ADMINISTRATIVE MAPPING
// =========================================================
// Village → Block → District
//
// Keep this mapping centralized so it can later be
// replaced with official administrative/GIS data.
// =========================================================

export const administrativeMapping = {

  "Village A": {
    block: "Block A",
    district: "Demo District",
  },

  "Village B": {
    block: "Block A",
    district: "Demo District",
  },

  "Village C": {
    block: "Block B",
    district: "Demo District",
  },

};


// =========================================================
// GET ADMINISTRATIVE LOCATION
// =========================================================

export function getAdministrativeLocation(
  village
) {

  return (
    administrativeMapping[village] || {
      block: "Unknown Block",
      district: "Unknown District",
    }
  );

}


// =========================================================
// GET ALL HEALTH REPORTS
// =========================================================

function getHealthReports() {

  return JSON.parse(
    localStorage.getItem(
      "mrigare-shka-health-reports"
    ) || "[]"
  );

}


// =========================================================
// BUILD REGIONAL INTELLIGENCE
// =========================================================

export function getRegionalIntelligence() {

  const reports =
    getHealthReports();


  const blockMap = {};
  const districtMap = {};


  reports.forEach((report) => {

    const village =
      report.location ||
      "Unknown Location";


    const location =
      getAdministrativeLocation(
        village
      );


    const block =
      location.block;


    const district =
      location.district;


    // ===================================================
    // BLOCK
    // ===================================================

    if (!blockMap[block]) {

      blockMap[block] = {
        block,
        district,
        villages: new Set(),
        animals: new Set(),
        reports: [],
        symptoms: {},
      };

    }


    blockMap[block].villages.add(
      village
    );

    blockMap[block].reports.push(
      report
    );


    if (report.animalName) {

      blockMap[block].animals.add(
        report.animalName
      );

    }


    (report.symptoms || []).forEach(
      (symptom) => {

        blockMap[block].symptoms[symptom] =
          (blockMap[block].symptoms[symptom] || 0) + 1;

      }
    );


    // ===================================================
    // DISTRICT
    // ===================================================

    if (!districtMap[district]) {

      districtMap[district] = {
        district,
        blocks: new Set(),
        villages: new Set(),
        animals: new Set(),
        reports: [],
        symptoms: {},
      };

    }


    districtMap[district].blocks.add(
      block
    );

    districtMap[district].villages.add(
      village
    );

    districtMap[district].reports.push(
      report
    );


    if (report.animalName) {

      districtMap[district].animals.add(
        report.animalName
      );

    }


    (report.symptoms || []).forEach(
      (symptom) => {

        districtMap[district].symptoms[symptom] =
          (districtMap[district].symptoms[symptom] || 0) + 1;

      }
    );

  });


  // =====================================================
  // CONVERT BLOCK DATA
  // =====================================================

  const blocks =
    Object.values(blockMap).map(
      (blockData) => {

        const reportCount =
          blockData.reports.length;


        const affectedAnimals =
          blockData.animals.size;


        const severeReports =
          blockData.reports.filter(
            (report) =>
              report.severity === "Severe"
          ).length;


        const topSymptoms =
          Object.entries(
            blockData.symptoms
          )
            .sort(
              (a, b) =>
                b[1] - a[1]
            )
            .slice(0, 5);


        let signalLevel =
          "Low";


        if (
          reportCount >= 5 ||
          severeReports >= 2
        ) {

          signalLevel = "High";

        } else if (
          reportCount >= 2 ||
          severeReports >= 1
        ) {

          signalLevel = "Moderate";

        }


        return {

          block: blockData.block,

          district: blockData.district,

          villageCount:
            blockData.villages.size,

          reportCount,

          affectedAnimals,

          severeReports,

          topSymptoms,

          signalLevel,

        };

      }
    );


  // =====================================================
  // CONVERT DISTRICT DATA
  // =====================================================

  const districts =
    Object.values(districtMap).map(
      (districtData) => {

        const reportCount =
          districtData.reports.length;


        const affectedAnimals =
          districtData.animals.size;


        const severeReports =
          districtData.reports.filter(
            (report) =>
              report.severity === "Severe"
          ).length;


        const topSymptoms =
          Object.entries(
            districtData.symptoms
          )
            .sort(
              (a, b) =>
                b[1] - a[1]
            )
            .slice(0, 5);


        let signalLevel =
          "Low";


        if (
          reportCount >= 8 ||
          severeReports >= 3
        ) {

          signalLevel = "High";

        } else if (
          reportCount >= 3 ||
          severeReports >= 1
        ) {

          signalLevel = "Moderate";

        }


        return {

          district:
            districtData.district,

          blockCount:
            districtData.blocks.size,

          villageCount:
            districtData.villages.size,

          reportCount,

          affectedAnimals,

          severeReports,

          topSymptoms,

          signalLevel,

        };

      }
    );


  return {
    blocks,
    districts,
  };

}
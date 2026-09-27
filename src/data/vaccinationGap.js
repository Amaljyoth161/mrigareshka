import { getAnimals } from "./animals";

export function getVaccinationGap() {

  const animals = getAnimals();

  const villageMap = {};

  animals.forEach((animal) => {

    const village =
      animal.location || "Unknown Location";

    if (!villageMap[village]) {

      villageMap[village] = {
        village,
        totalAnimals: 0,
        vaccinated: 0,
        overdue: 0,
      };

    }

    villageMap[village].totalAnimals += 1;

    if (animal.vaccinationStatus === "Overdue") {

      villageMap[village].overdue += 1;

    } else if (
      animal.vaccinationStatus === "Up to date"
    ) {

      villageMap[village].vaccinated += 1;

    }

  });


  return Object.values(villageMap).map((village) => {

    const coverage =
      village.totalAnimals > 0
        ? Math.round(
            (village.vaccinated /
              village.totalAnimals) *
              100
          )
        : 0;

    const gap = 100 - coverage;

    let riskLevel = "Low";

    if (gap >= 40) {

      riskLevel = "High";

    } else if (gap >= 20) {

      riskLevel = "Moderate";

    }

    return {
      ...village,
      coverage,
      gap,
      riskLevel,
    };

  });

}
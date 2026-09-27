import { getVillageReports } from "./villageIntelligence";


export function getVeterinaryPriorities() {

  const villages = getVillageReports();


  return villages.map((village) => {

    let priority = "Low";
    let action = "Routine monitoring";
    let reason = "Limited health signals reported.";


    /*
      HIGH PRIORITY
      - Multiple reports
      - Severe reports
      - Strong local health signal
    */

    if (
      village.severeReports >= 2 ||
      village.reportCount >= 5
    ) {

      priority = "High";

      action =
        "Veterinary review and field response recommended.";

      reason =
        `${village.reportCount} health reports with ${village.severeReports} severe report(s).`;
    }


    /*
      MODERATE PRIORITY
      - More than one report
      - Some indication of a local health signal
    */

    else if (
      village.reportCount >= 2 ||
      village.severeReports >= 1
    ) {

      priority = "Moderate";

      action =
        "Veterinary team should review the reported cases.";

      reason =
        `${village.reportCount} health report(s) indicate a developing local signal.`;
    }


    return {
      ...village,
      priority,
      action,
      reason,
    };

  });
}
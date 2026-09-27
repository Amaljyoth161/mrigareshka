// =========================================================
// MRIGARESHKA - LABORATORY REFERRAL SERVICE
// =========================================================
// Handles sample collection and laboratory referral data.
//
// MVP:
// - Stores referrals in localStorage
// - Supports sample collection
// - Supports laboratory referral
// - Supports result recording
// - Supports case escalation
//
// Later this can be connected to a real laboratory API.
// =========================================================


const STORAGE_KEY =
  "mrigare-shka-lab-referrals";


// =========================================================
// GET REFERRALS
// =========================================================

export function getLabReferrals() {

  return JSON.parse(
    localStorage.getItem(
      STORAGE_KEY
    ) || "[]"
  );

}


// =========================================================
// SAVE REFERRALS
// =========================================================

function saveLabReferrals(
  referrals
) {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(referrals)
  );

}


// =========================================================
// CREATE LAB REFERRAL
// =========================================================

export function createLabReferral({
  caseId,
  animalId,
  animalName,
  species,
  location,
  sampleType,
  suspectedCondition,
  collectedBy,
}) {

  const referrals =
    getLabReferrals();


  const referral = {

    id:
      `LAB-${Date.now()}`,

    caseId:
      caseId || null,

    animalId:
      animalId || null,

    animalName:
      animalName || "Unknown Animal",

    species:
      species || "Unknown",

    location:
      location || "Unknown Location",

    sampleType:
      sampleType || "Not specified",

    suspectedCondition:
      suspectedCondition ||
      "Health condition under investigation",

    collectedBy:
      collectedBy ||
      "Veterinary Field Team",

    collectedAt:
      new Date().toISOString(),

    referredAt:
      new Date().toISOString(),

    laboratory:
      "District Veterinary Laboratory",

    status:
      "Sample Collected",

    result:
      null,

    resultDate:
      null,

    escalationStatus:
      "Under Review",

  };


  referrals.push(
    referral
  );


  saveLabReferrals(
    referrals
  );


  return referral;

}


// =========================================================
// UPDATE LAB REFERRAL
// =========================================================

export function updateLabReferral(
  referralId,
  updates
) {

  const referrals =
    getLabReferrals();


  const updated =
    referrals.map(
      (referral) => {

        if (
          referral.id !==
          referralId
        ) {
          return referral;
        }


        return {
          ...referral,
          ...updates,
        };

      }
    );


  saveLabReferrals(
    updated
  );


  return updated.find(
    (referral) =>
      referral.id ===
      referralId
  );

}


// =========================================================
// RECORD LAB RESULT
// =========================================================

export function recordLabResult(
  referralId,
  result
) {

  return updateLabReferral(
    referralId,
    {

      status:
        "Result Available",

      result,

      resultDate:
        new Date().toISOString(),

    }
  );

}


// =========================================================
// ESCALATE CASE
// =========================================================

export function escalateLabCase(
  referralId,
  escalationStatus
) {

  return updateLabReferral(
    referralId,
    {

      escalationStatus:
        escalationStatus ||
        "Escalated",

      escalatedAt:
        new Date().toISOString(),

    }
  );

}
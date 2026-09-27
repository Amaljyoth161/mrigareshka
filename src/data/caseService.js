export function getCases() {
  return JSON.parse(
    localStorage.getItem(
      "mrigare-shka-cases"
    ) || "[]"
  );
}


export function saveCases(cases) {
  localStorage.setItem(
    "mrigare-shka-cases",
    JSON.stringify(cases)
  );
}


export function createCasesFromReports(reports) {

  const existingCases = getCases();

  const existingReportIds =
    new Set(
      existingCases.map(
        (item) => item.reportId
      )
    );


  const newCases = reports
    .filter(
      (report) =>
        !existingReportIds.has(
          report.id
        )
    )
    .map((report) => ({
      id: `CASE-${Date.now()}-${report.id}`,

      reportId: report.id,

      animalId: report.animalId,

      animalName: report.animalName,

      location: report.location,

      symptoms: report.symptoms || [],

      severity: report.severity,

      priority:
        report.priority || "Low",

      priorityScore:
        report.priorityScore || 0,

      status: "Awaiting Review",

      assignedTo: "",

      visitDate: "",

      createdAt:
        report.createdAt,
    }));


  const updatedCases = [
    ...newCases,
    ...existingCases,
  ];


  saveCases(updatedCases);

  return updatedCases;
}


export function updateCase(
  caseId,
  updates
) {

  const cases = getCases();

  const updatedCases = cases.map(
    (item) => {

      if (item.id !== caseId) {
        return item;
      }

      return {
        ...item,
        ...updates,
      };

    }
  );


  saveCases(updatedCases);

  return updatedCases;
}
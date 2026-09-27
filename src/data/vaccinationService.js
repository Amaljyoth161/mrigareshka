export function getVaccinationStatus(animal) {

  if (!animal) {
    return {
      status: "Unknown",
      label: "No vaccination data",
      daysUntilDue: null,
    };
  }


  if (
    animal.vaccinationStatus ===
    "Overdue"
  ) {

    return {
      status: "Overdue",
      label: "Vaccination overdue",
      daysUntilDue: null,
    };

  }


  if (
    animal.nextVaccinationDate
  ) {

    const today =
      new Date();

    const dueDate =
      new Date(
        animal.nextVaccinationDate
      );


    const difference =
      dueDate.getTime() -
      today.getTime();


    const daysUntilDue =
      Math.ceil(
        difference /
        (1000 * 60 * 60 * 24)
      );


    if (daysUntilDue < 0) {

      return {
        status: "Overdue",
        label: "Vaccination overdue",
        daysUntilDue,
      };

    }


    if (daysUntilDue <= 30) {

      return {
        status: "Due Soon",
        label: "Vaccination due soon",
        daysUntilDue,
      };

    }


    return {
      status: "Up to date",
      label: "Vaccination up to date",
      daysUntilDue,
    };

  }


  if (
    animal.vaccinationStatus ===
    "Up to date"
  ) {

    return {
      status: "Up to date",
      label: "Vaccination up to date",
      daysUntilDue: null,
    };

  }


  return {
    status: "Unknown",
    label: "Vaccination status not recorded",
    daysUntilDue: null,
  };
}
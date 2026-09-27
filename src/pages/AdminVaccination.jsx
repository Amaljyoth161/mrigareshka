import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  CalendarDays,
  CheckCircle,
  MapPin,
  RefreshCw,
  Syringe,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import { getAnimals } from "../data/animals";
import { getVaccinationStatus } from "../data/vaccinationService";

function DashboardCard({
  icon: Icon,
  title,
  value,
  description,
  iconClass = "bg-slate-100 text-slate-700",
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {description}
          </p>
        </div>

        <div className={`rounded-xl p-3 ${iconClass}`}>
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  let classes =
    "border-slate-200 bg-slate-50 text-slate-600";

  if (status === "Up to date") {
    classes =
      "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (status === "Due Soon") {
    classes =
      "border-amber-200 bg-amber-50 text-amber-700";
  }

  if (status === "Due" || status === "Overdue") {
    classes =
      "border-red-200 bg-red-50 text-red-700";
  }

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${classes}`}
    >
      {status || "Not scheduled"}
    </span>
  );
}

function EmptyState({ message }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
      <Syringe
        className="mx-auto mb-3 text-slate-400"
        size={30}
      />

      <p className="text-sm text-slate-500">
        {message}
      </p>
    </div>
  );
}

function getAnimalVaccination(animal) {
  try {
    const result = getVaccinationStatus(animal);

    if (typeof result === "string") {
      return {
        status: result,
        nextVaccinationDate:
          animal.nextVaccinationDate || null,
      };
    }

    return {
      status:
        result?.status ||
        animal.vaccinationStatus ||
        "Not scheduled",

      nextVaccinationDate:
        result?.nextVaccinationDate ||
        animal.nextVaccinationDate ||
        null,
    };
  } catch {
    return {
      status:
        animal.vaccinationStatus ||
        "Not scheduled",

      nextVaccinationDate:
        animal.nextVaccinationDate || null,
    };
  }
}

function formatDate(date) {
  if (!date) return "Not scheduled";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function AdminVaccination() {
  const navigate = useNavigate();

  const [animals, setAnimals] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(
    new Date()
  );

  const loadData = () => {
    try {
      setAnimals(getAnimals() || []);
    } catch {
      setAnimals([]);
    }

    setLastUpdated(new Date());
  };

  useEffect(() => {
    loadData();

    const handleStorage = () => loadData();
    const handleFocus = () => loadData();

    window.addEventListener(
      "storage",
      handleStorage
    );

    window.addEventListener(
      "focus",
      handleFocus
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorage
      );

      window.removeEventListener(
        "focus",
        handleFocus
      );
    };
  }, []);

  const vaccinationData = useMemo(() => {
    return animals.map((animal) => {
      const vaccination =
        getAnimalVaccination(animal);

      return {
        ...animal,
        vaccinationStatus: vaccination.status,
        nextVaccinationDate:
          vaccination.nextVaccinationDate,
      };
    });
  }, [animals]);

  const summary = useMemo(() => {
    const total = vaccinationData.length;

    const upToDate = vaccinationData.filter(
      (animal) =>
        animal.vaccinationStatus ===
        "Up to date"
    ).length;

    const dueSoon = vaccinationData.filter(
      (animal) =>
        animal.vaccinationStatus ===
        "Due Soon"
    ).length;

    const due = vaccinationData.filter(
      (animal) =>
        animal.vaccinationStatus === "Due" ||
        animal.vaccinationStatus ===
          "Overdue"
    ).length;

    const notScheduled = vaccinationData.filter(
      (animal) =>
        !animal.vaccinationStatus ||
        animal.vaccinationStatus ===
          "Not scheduled"
    ).length;

    const coverage =
      total > 0
        ? Math.round(
            (upToDate / total) * 100
          )
        : 0;

    return {
      total,
      upToDate,
      dueSoon,
      due,
      notScheduled,
      coverage,
    };
  }, [vaccinationData]);

  const villageSummary = useMemo(() => {
    const villageMap = {};

    vaccinationData.forEach((animal) => {
      const village =
        animal.location || "Unknown Village";

      if (!villageMap[village]) {
        villageMap[village] = {
          village,
          total: 0,
          upToDate: 0,
          dueSoon: 0,
          due: 0,
          notScheduled: 0,
        };
      }

      villageMap[village].total += 1;

      if (
        animal.vaccinationStatus ===
        "Up to date"
      ) {
        villageMap[village].upToDate += 1;
      } else if (
        animal.vaccinationStatus ===
        "Due Soon"
      ) {
        villageMap[village].dueSoon += 1;
      } else if (
        animal.vaccinationStatus === "Due" ||
        animal.vaccinationStatus ===
          "Overdue"
      ) {
        villageMap[village].due += 1;
      } else {
        villageMap[village].notScheduled += 1;
      }
    });

    return Object.values(villageMap).sort(
      (a, b) => {
        const aGap =
          a.due + a.dueSoon + a.notScheduled;

        const bGap =
          b.due + b.dueSoon + b.notScheduled;

        return bGap - aGap;
      }
    );
  }, [vaccinationData]);

  const attentionAnimals = useMemo(() => {
    return vaccinationData
      .filter(
        (animal) =>
          animal.vaccinationStatus ===
            "Due" ||
          animal.vaccinationStatus ===
            "Overdue" ||
          animal.vaccinationStatus ===
            "Due Soon"
      )
      .sort((a, b) => {
        const priority = {
          Overdue: 3,
          Due: 2,
          "Due Soon": 1,
        };

        return (
          (priority[b.vaccinationStatus] ||
            0) -
          (priority[a.vaccinationStatus] ||
            0)
        );
      });
  }, [vaccinationData]);

  const upcoming = useMemo(() => {
    return vaccinationData
      .filter(
        (animal) =>
          animal.nextVaccinationDate
      )
      .sort((a, b) => {
        const aDate = new Date(
          a.nextVaccinationDate
        ).getTime();

        const bDate = new Date(
          b.nextVaccinationDate
        ).getTime();

        return aDate - bDate;
      })
      .slice(0, 8);
  }, [vaccinationData]);

  return (
    <DashboardLayout role="admin">
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>
              <button
                onClick={() =>
                  navigate("/admin")
                }
                className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
              >
                <ArrowLeft size={16} />
                Back to Admin Dashboard
              </button>

              <div className="flex items-start gap-3">
                <div className="rounded-2xl bg-purple-100 p-3 text-purple-700">
                  <Syringe size={26} />
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                    Vaccination Monitoring
                  </h1>

                  <p className="mt-1 max-w-2xl text-sm text-slate-600">
                    Monitor livestock vaccination
                    coverage, upcoming doses, and
                    vaccination gaps across villages.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={loadData}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <RefreshCw size={16} />
              Refresh Data
            </button>
          </div>


          {/* Summary Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <DashboardCard
              icon={Users}
              title="Registered Animals"
              value={summary.total}
              description="Animals in the monitoring system"
              iconClass="bg-blue-50 text-blue-700"
            />

            <DashboardCard
              icon={CheckCircle}
              title="Vaccination Coverage"
              value={`${summary.coverage}%`}
              description="Animals currently up to date"
              iconClass="bg-emerald-50 text-emerald-700"
            />

            <DashboardCard
              icon={CalendarDays}
              title="Due Soon"
              value={summary.dueSoon}
              description="Vaccination approaching"
              iconClass="bg-amber-50 text-amber-700"
            />

            <DashboardCard
              icon={AlertTriangle}
              title="Needs Attention"
              value={summary.due}
              description="Due or overdue vaccination"
              iconClass="bg-red-50 text-red-700"
            />

          </div>


          {/* Coverage Overview */}
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-200 px-5 py-4">
              <div className="flex items-center gap-3">
                <Activity
                  className="text-purple-600"
                  size={20}
                />

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Vaccination Coverage Overview
                  </h2>

                  <p className="text-sm text-slate-500">
                    Current vaccination status across
                    registered livestock.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5">

              <div className="mb-5 h-4 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all"
                  style={{
                    width: `${summary.coverage}%`,
                  }}
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                  <p className="text-xs font-medium text-emerald-700">
                    Up to Date
                  </p>

                  <p className="mt-1 text-2xl font-bold text-emerald-800">
                    {summary.upToDate}
                  </p>
                </div>

                <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
                  <p className="text-xs font-medium text-amber-700">
                    Due Soon
                  </p>

                  <p className="mt-1 text-2xl font-bold text-amber-800">
                    {summary.dueSoon}
                  </p>
                </div>

                <div className="rounded-xl border border-red-100 bg-red-50 p-4">
                  <p className="text-xs font-medium text-red-700">
                    Due / Overdue
                  </p>

                  <p className="mt-1 text-2xl font-bold text-red-800">
                    {summary.due}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-medium text-slate-600">
                    Not Scheduled
                  </p>

                  <p className="mt-1 text-2xl font-bold text-slate-800">
                    {summary.notScheduled}
                  </p>
                </div>

              </div>
            </div>
          </section>


          {/* Village Vaccination */}
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-200 px-5 py-4">
              <div className="flex items-center gap-3">
                <MapPin
                  className="text-indigo-600"
                  size={20}
                />

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Village-wise Vaccination
                  </h2>

                  <p className="text-sm text-slate-500">
                    Identify vaccination gaps at village
                    level.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5">

              {villageSummary.length === 0 ? (
                <EmptyState message="No vaccination data is available yet." />
              ) : (
                <div className="grid gap-4 lg:grid-cols-2">

                  {villageSummary.map(
                    (village) => {
                      const coverage =
                        village.total > 0
                          ? Math.round(
                              (village.upToDate /
                                village.total) *
                                100
                            )
                          : 0;

                      return (
                        <div
                          key={village.village}
                          className="rounded-xl border border-slate-200 bg-slate-50 p-5"
                        >

                          <div className="flex items-start justify-between gap-4">

                            <div className="flex items-start gap-3">
                              <div className="rounded-xl bg-white p-2.5 text-indigo-600 shadow-sm">
                                <MapPin
                                  size={19}
                                />
                              </div>

                              <div>
                                <h3 className="font-semibold text-slate-900">
                                  {village.village}
                                </h3>

                                <p className="mt-1 text-xs text-slate-500">
                                  {village.total} registered
                                  animal
                                  {village.total ===
                                  1
                                    ? ""
                                    : "s"}
                                </p>
                              </div>
                            </div>

                            <span className="text-sm font-bold text-slate-900">
                              {coverage}%
                            </span>
                          </div>


                          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
                            <div
                              className="h-full rounded-full bg-emerald-500"
                              style={{
                                width: `${coverage}%`,
                              }}
                            />
                          </div>


                          <div className="mt-4 grid grid-cols-3 gap-2">

                            <div className="rounded-lg bg-emerald-50 p-3">
                              <p className="text-xs text-emerald-700">
                                Up to Date
                              </p>

                              <p className="mt-1 font-bold text-emerald-800">
                                {village.upToDate}
                              </p>
                            </div>

                            <div className="rounded-lg bg-amber-50 p-3">
                              <p className="text-xs text-amber-700">
                                Due Soon
                              </p>

                              <p className="mt-1 font-bold text-amber-800">
                                {village.dueSoon}
                              </p>
                            </div>

                            <div className="rounded-lg bg-red-50 p-3">
                              <p className="text-xs text-red-700">
                                Due
                              </p>

                              <p className="mt-1 font-bold text-red-800">
                                {village.due}
                              </p>
                            </div>

                          </div>
                        </div>
                      );
                    }
                  )}

                </div>
              )}

            </div>
          </section>


          {/* Animals needing attention */}
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-200 px-5 py-4">
              <div className="flex items-center gap-3">
                <AlertTriangle
                  className="text-red-600"
                  size={20}
                />

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Vaccination Attention List
                  </h2>

                  <p className="text-sm text-slate-500">
                    Animals with upcoming or overdue
                    vaccination requirements.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5">

              {attentionAnimals.length === 0 ? (
                <EmptyState message="No animals currently require vaccination attention." />
              ) : (
                <div className="overflow-x-auto">

                  <table className="w-full min-w-[800px] text-left">

                    <thead>
                      <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">

                        <th className="px-3 py-3 font-semibold">
                          Animal
                        </th>

                        <th className="px-3 py-3 font-semibold">
                          Species
                        </th>

                        <th className="px-3 py-3 font-semibold">
                          Village
                        </th>

                        <th className="px-3 py-3 font-semibold">
                          Status
                        </th>

                        <th className="px-3 py-3 font-semibold">
                          Next Vaccination
                        </th>

                      </tr>
                    </thead>

                    <tbody>

                      {attentionAnimals.map(
                        (animal) => (
                          <tr
                            key={animal.id}
                            className="border-b border-slate-100 last:border-0"
                          >

                            <td className="px-3 py-4">
                              <div>
                                <p className="text-sm font-semibold text-slate-900">
                                  {animal.name ||
                                    "Unknown Animal"}
                                </p>

                                <p className="text-xs text-slate-500">
                                  {animal.id ||
                                    "No ID"}
                                </p>
                              </div>
                            </td>

                            <td className="px-3 py-4 text-sm text-slate-700">
                              {animal.species ||
                                "Not specified"}
                            </td>

                            <td className="px-3 py-4 text-sm text-slate-700">
                              {animal.location ||
                                "Unknown Village"}
                            </td>

                            <td className="px-3 py-4">
                              <StatusBadge
                                status={
                                  animal.vaccinationStatus
                                }
                              />
                            </td>

                            <td className="px-3 py-4 text-sm text-slate-700">
                              {formatDate(
                                animal.nextVaccinationDate
                              )}
                            </td>

                          </tr>
                        )
                      )}

                    </tbody>
                  </table>

                </div>
              )}

            </div>
          </section>


          {/* Upcoming vaccination */}
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-200 px-5 py-4">
              <div className="flex items-center gap-3">

                <CalendarDays
                  className="text-blue-600"
                  size={20}
                />

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Upcoming Vaccination Schedule
                  </h2>

                  <p className="text-sm text-slate-500">
                    Next recorded vaccination dates.
                  </p>
                </div>

              </div>
            </div>

            <div className="p-5">

              {upcoming.length === 0 ? (
                <EmptyState message="No upcoming vaccination dates are recorded." />
              ) : (
                <div className="grid gap-3 md:grid-cols-2">

                  {upcoming.map((animal) => (
                    <div
                      key={animal.id}
                      className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4"
                    >

                      <div className="flex items-center gap-3">

                        <div className="rounded-xl bg-white p-2.5 text-blue-600 shadow-sm">
                          <Syringe size={18} />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {animal.name ||
                              "Unknown Animal"}
                          </p>

                          <p className="text-xs text-slate-500">
                            {animal.location ||
                              "Unknown Village"}
                          </p>
                        </div>

                      </div>

                      <div className="text-right">

                        <p className="text-sm font-semibold text-slate-900">
                          {formatDate(
                            animal.nextVaccinationDate
                          )}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {animal.species ||
                            "Livestock"}
                        </p>

                      </div>

                    </div>
                  ))}

                </div>
              )}

            </div>
          </section>


          {/* Government monitoring note */}
          <div className="mt-6 rounded-2xl border border-purple-200 bg-purple-50 p-5">

            <div className="flex items-start gap-3">

              <Syringe
                size={20}
                className="mt-0.5 shrink-0 text-purple-700"
              />

              <div>

                <h3 className="font-semibold text-purple-900">
                  Government Vaccination Monitoring
                </h3>

                <p className="mt-1 text-sm leading-6 text-purple-800">
                  This dashboard provides a consolidated
                  view of livestock vaccination coverage
                  and gaps to support preventive animal
                  health planning and resource coordination.
                </p>

                <p className="mt-2 text-xs text-purple-700">
                  Last refreshed:{" "}
                  {lastUpdated.toLocaleTimeString()}
                </p>

              </div>

            </div>

          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
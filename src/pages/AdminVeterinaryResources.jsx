import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Beaker,
  CheckCircle,
  ClipboardList,
  MapPin,
  RefreshCw,
  Syringe,
  Users,
  Wrench,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import { getAnimals } from "../data/animals";
import { getVillageReports } from "../data/villageIntelligence";
import { getVeterinaryPriorities } from "../data/vetPrioritization";
import { getVaccinationStatus } from "../data/vaccinationService";

const HEALTH_REPORTS_KEY = "mrigare-shka-health-reports";

function loadHealthReports() {
  try {
    const stored = localStorage.getItem(HEALTH_REPORTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

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
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

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

function PriorityBadge({ priority }) {
  let classes =
    "border-slate-200 bg-slate-50 text-slate-600";

  if (
    priority === "High" ||
    priority === "Critical" ||
    priority === "Urgent"
  ) {
    classes =
      "border-red-200 bg-red-50 text-red-700";
  } else if (
    priority === "Medium" ||
    priority === "Moderate"
  ) {
    classes =
      "border-amber-200 bg-amber-50 text-amber-700";
  } else {
    classes =
      "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${classes}`}
    >
      {priority || "Normal"}
    </span>
  );
}

function EmptyState({ message }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
      <Wrench
        className="mx-auto mb-3 text-slate-400"
        size={30}
      />

      <p className="text-sm text-slate-500">
        {message}
      </p>
    </div>
  );
}

function getPriorityValue(item) {
  return (
    item?.priority ||
    item?.priorityLevel ||
    item?.riskLevel ||
    item?.severity ||
    "Normal"
  );
}

function getVillageValue(item) {
  return (
    item?.location ||
    item?.village ||
    item?.villageName ||
    item?.name ||
    "Unknown Village"
  );
}

function getAnimalValue(item) {
  return (
    item?.animalName ||
    item?.animal ||
    item?.name ||
    "Unknown Animal"
  );
}

function getNeedValue(item) {
  return (
    item?.resource ||
    item?.resourceType ||
    item?.need ||
    item?.recommendation ||
    item?.action ||
    "Veterinary Support"
  );
}

export default function AdminVeterinaryResources() {
  const navigate = useNavigate();

  const [animals, setAnimals] = useState([]);
  const [reports, setReports] = useState([]);
  const [villageSignals, setVillageSignals] =
    useState([]);
  const [priorities, setPriorities] = useState([]);
  const [lastUpdated, setLastUpdated] =
    useState(new Date());

  const loadData = () => {
    try {
      setAnimals(getAnimals() || []);
    } catch {
      setAnimals([]);
    }

    setReports(loadHealthReports());

    try {
      setVillageSignals(
        getVillageReports() || []
      );
    } catch {
      setVillageSignals([]);
    }

    try {
      setPriorities(
        getVeterinaryPriorities() || []
      );
    } catch {
      setPriorities([]);
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
      let status = animal.vaccinationStatus || "Not scheduled";

      try {
        const result = getVaccinationStatus(animal);

        if (typeof result === "string") {
          status = result;
        } else if (result?.status) {
          status = result.status;
        }
      } catch {
        status = animal.vaccinationStatus || "Not scheduled";
      }

      return {
        ...animal,
        vaccinationStatus: status,
      };
    });
  }, [animals]);

  const resourceSummary = useMemo(() => {
    const highPriorityCases =
      priorities.filter((item) => {
        const priority =
          getPriorityValue(item);

        return (
          priority === "High" ||
          priority === "Critical" ||
          priority === "Urgent"
        );
      }).length;

    const severeReports = reports.filter(
      (report) =>
        report.severity === "Severe"
    ).length;

    const vaccinationDue =
      vaccinationData.filter(
        (animal) =>
          animal.vaccinationStatus ===
            "Due" ||
          animal.vaccinationStatus ===
            "Overdue" ||
          animal.vaccinationStatus ===
            "Due Soon"
      ).length;

    const villagesWithSignals =
      new Set(
        villageSignals.map((signal) =>
          getVillageValue(signal)
        )
      ).size;

    return {
      highPriorityCases,
      severeReports,
      vaccinationDue,
      villagesWithSignals,
    };
  }, [
    priorities,
    reports,
    vaccinationData,
    villageSignals,
  ]);

  const resourceNeeds = useMemo(() => {
    const needs = [];

    if (resourceSummary.highPriorityCases > 0) {
      needs.push({
        resource: "Veterinary Response",
        count:
          resourceSummary.highPriorityCases,
        description:
          "Priority cases requiring veterinary attention",
        icon: Users,
        priority: "High",
      });
    }

    if (resourceSummary.vaccinationDue > 0) {
      needs.push({
        resource: "Vaccination Support",
        count:
          resourceSummary.vaccinationDue,
        description:
          "Animals with upcoming or due vaccination",
        icon: Syringe,
        priority: "Medium",
      });
    }

    if (resourceSummary.severeReports > 0) {
      needs.push({
        resource: "Emergency Case Review",
        count:
          resourceSummary.severeReports,
        description:
          "Severe health reports requiring review",
        icon: AlertTriangle,
        priority: "High",
      });
    }

    if (
      resourceSummary.villagesWithSignals > 0
    ) {
      needs.push({
        resource: "Village Surveillance",
        count:
          resourceSummary.villagesWithSignals,
        description:
          "Villages with active health signals",
        icon: MapPin,
        priority: "Medium",
      });
    }

    return needs;
  }, [resourceSummary]);

  const villageResourceView = useMemo(() => {
    const villageMap = {};

    animals.forEach((animal) => {
      const village =
        animal.location ||
        "Unknown Village";

      if (!villageMap[village]) {
        villageMap[village] = {
          village,
          animals: 0,
          healthReports: 0,
          severeReports: 0,
          vaccinationDue: 0,
          activeSignals: 0,
          priorityCases: 0,
        };
      }

      villageMap[village].animals += 1;

      const vaccinationStatus =
        getVaccinationStatus(animal);

      const status =
        typeof vaccinationStatus ===
        "string"
          ? vaccinationStatus
          : vaccinationStatus?.status ||
            animal.vaccinationStatus;

      if (
        status === "Due" ||
        status === "Overdue" ||
        status === "Due Soon"
      ) {
        villageMap[village].vaccinationDue += 1;
      }
    });

    reports.forEach((report) => {
      const village =
        report.location ||
        report.village ||
        "Unknown Village";

      if (!villageMap[village]) {
        villageMap[village] = {
          village,
          animals: 0,
          healthReports: 0,
          severeReports: 0,
          vaccinationDue: 0,
          activeSignals: 0,
          priorityCases: 0,
        };
      }

      villageMap[village].healthReports += 1;

      if (report.severity === "Severe") {
        villageMap[village].severeReports += 1;
      }

      if (
        report.severity === "Severe" ||
        report.status === "Priority Review"
      ) {
        villageMap[village].priorityCases += 1;
      }
    });

    villageSignals.forEach((signal) => {
      const village =
        getVillageValue(signal);

      if (!villageMap[village]) {
        villageMap[village] = {
          village,
          animals: 0,
          healthReports: 0,
          severeReports: 0,
          vaccinationDue: 0,
          activeSignals: 0,
          priorityCases: 0,
        };
      }

      villageMap[village].activeSignals += 1;
    });

    return Object.values(
      villageMap
    ).sort((a, b) => {
      const aNeed =
        a.priorityCases +
        a.vaccinationDue +
        a.activeSignals;

      const bNeed =
        b.priorityCases +
        b.vaccinationDue +
        b.activeSignals;

      return bNeed - aNeed;
    });
  }, [
    animals,
    reports,
    villageSignals,
  ]);

  const priorityCases = useMemo(() => {
    return [...priorities]
      .sort((a, b) => {
        const priorityRank = {
          Critical: 4,
          Urgent: 4,
          High: 3,
          Moderate: 2,
          Medium: 2,
          Low: 1,
          Normal: 0,
        };

        return (
          (priorityRank[
            getPriorityValue(b)
          ] || 0) -
          (priorityRank[
            getPriorityValue(a)
          ] || 0)
        );
      })
      .slice(0, 8);
  }, [priorities]);

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
                <div className="rounded-2xl bg-blue-100 p-3 text-blue-700">
                  <Wrench size={26} />
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                    Veterinary Resources
                  </h1>

                  <p className="mt-1 max-w-2xl text-sm text-slate-600">
                    Monitor veterinary resource needs,
                    priority cases, vaccination support,
                    and village-level response requirements.
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
              title="Priority Cases"
              value={
                resourceSummary.highPriorityCases
              }
              description="Cases requiring closer response"
              iconClass="bg-red-50 text-red-700"
            />

            <DashboardCard
              icon={Syringe}
              title="Vaccination Support"
              value={
                resourceSummary.vaccinationDue
              }
              description="Animals due or approaching vaccination"
              iconClass="bg-amber-50 text-amber-700"
            />

            <DashboardCard
              icon={Beaker}
              title="Severe Reports"
              value={
                resourceSummary.severeReports
              }
              description="Severe health reports"
              iconClass="bg-purple-50 text-purple-700"
            />

            <DashboardCard
              icon={MapPin}
              title="Signal Villages"
              value={
                resourceSummary.villagesWithSignals
              }
              description="Villages with active health signals"
              iconClass="bg-blue-50 text-blue-700"
            />

          </div>


          {/* Resource Requirements */}
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-200 px-5 py-4">
              <div className="flex items-center gap-3">

                <ClipboardList
                  className="text-blue-600"
                  size={20}
                />

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Resource Requirements
                  </h2>

                  <p className="text-sm text-slate-500">
                    Current support areas identified from
                    connected livestock health data.
                  </p>
                </div>

              </div>
            </div>

            <div className="p-5">

              {resourceNeeds.length === 0 ? (
                <EmptyState message="No immediate veterinary resource requirements are detected." />
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">

                  {resourceNeeds.map(
                    (item, index) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={`${item.resource}-${index}`}
                          className="rounded-xl border border-slate-200 bg-slate-50 p-5"
                        >

                          <div className="flex items-start justify-between gap-4">

                            <div className="flex items-start gap-3">

                              <div className="rounded-xl bg-white p-2.5 text-blue-600 shadow-sm">
                                <Icon size={19} />
                              </div>

                              <div>
                                <h3 className="font-semibold text-slate-900">
                                  {item.resource}
                                </h3>

                                <p className="mt-1 text-xs leading-5 text-slate-500">
                                  {item.description}
                                </p>
                              </div>

                            </div>

                            <PriorityBadge
                              priority={item.priority}
                            />

                          </div>

                          <div className="mt-5 flex items-end justify-between">

                            <div>
                              <p className="text-xs text-slate-500">
                                Required attention
                              </p>

                              <p className="mt-1 text-2xl font-bold text-slate-900">
                                {item.count}
                              </p>
                            </div>

                            <span className="text-xs text-slate-500">
                              Current system data
                            </span>

                          </div>

                        </div>
                      );
                    }
                  )}

                </div>
              )}

            </div>
          </section>


          {/* Village Resource Requirements */}
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-200 px-5 py-4">
              <div className="flex items-center gap-3">

                <MapPin
                  className="text-indigo-600"
                  size={20}
                />

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Village Resource Requirements
                  </h2>

                  <p className="text-sm text-slate-500">
                    Areas where veterinary response may
                    require additional coordination.
                  </p>
                </div>

              </div>
            </div>

            <div className="p-5">

              {villageResourceView.length ===
              0 ? (
                <EmptyState message="No village resource information is available." />
              ) : (
                <div className="overflow-x-auto">

                  <table className="w-full min-w-[850px] text-left">

                    <thead>
                      <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">

                        <th className="px-3 py-3 font-semibold">
                          Village
                        </th>

                        <th className="px-3 py-3 font-semibold">
                          Animals
                        </th>

                        <th className="px-3 py-3 font-semibold">
                          Health Reports
                        </th>

                        <th className="px-3 py-3 font-semibold">
                          Active Signals
                        </th>

                        <th className="px-3 py-3 font-semibold">
                          Vaccination Gap
                        </th>

                        <th className="px-3 py-3 font-semibold">
                          Priority Cases
                        </th>

                      </tr>
                    </thead>

                    <tbody>

                      {villageResourceView.map(
                        (village) => (
                          <tr
                            key={village.village}
                            className="border-b border-slate-100 last:border-0"
                          >

                            <td className="px-3 py-4">

                              <div className="flex items-center gap-2">

                                <MapPin
                                  size={16}
                                  className="text-slate-400"
                                />

                                <span className="font-medium text-slate-900">
                                  {village.village}
                                </span>

                              </div>

                            </td>

                            <td className="px-3 py-4 text-sm text-slate-700">
                              {village.animals}
                            </td>

                            <td className="px-3 py-4 text-sm text-slate-700">
                              {village.healthReports}
                            </td>

                            <td className="px-3 py-4">

                              <span
                                className={
                                  village.activeSignals >
                                  0
                                    ? "font-semibold text-amber-700"
                                    : "text-slate-600"
                                }
                              >
                                {village.activeSignals}
                              </span>

                            </td>

                            <td className="px-3 py-4">

                              <span
                                className={
                                  village.vaccinationDue >
                                  0
                                    ? "font-semibold text-red-700"
                                    : "text-emerald-700"
                                }
                              >
                                {village.vaccinationDue}
                              </span>

                            </td>

                            <td className="px-3 py-4">

                              <PriorityBadge
                                priority={
                                  village.priorityCases >
                                  0
                                    ? "High"
                                    : "Normal"
                                }
                              />

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


          {/* Priority Veterinary Cases */}
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-200 px-5 py-4">

              <div className="flex items-center gap-3">

                <AlertTriangle
                  className="text-red-600"
                  size={20}
                />

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Veterinary Priority Cases
                  </h2>

                  <p className="text-sm text-slate-500">
                    Cases contributing to current resource
                    prioritization.
                  </p>
                </div>

              </div>

            </div>

            <div className="p-5">

              {priorityCases.length === 0 ? (
                <EmptyState message="No veterinary priority cases are available." />
              ) : (
                <div className="overflow-x-auto">

                  <table className="w-full min-w-[800px] text-left">

                    <thead>
                      <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">

                        <th className="px-3 py-3 font-semibold">
                          Animal / Case
                        </th>

                        <th className="px-3 py-3 font-semibold">
                          Village
                        </th>

                        <th className="px-3 py-3 font-semibold">
                          Priority
                        </th>

                        <th className="px-3 py-3 font-semibold">
                          Resource Need
                        </th>

                      </tr>
                    </thead>

                    <tbody>

                      {priorityCases.map(
                        (item, index) => (
                          <tr
                            key={
                              item.id ||
                              `${getAnimalValue(
                                item
                              )}-${index}`
                            }
                            className="border-b border-slate-100 last:border-0"
                          >

                            <td className="px-3 py-4">

                              <p className="text-sm font-semibold text-slate-900">
                                {getAnimalValue(
                                  item
                                )}
                              </p>

                              <p className="mt-1 text-xs text-slate-500">
                                {item?.species ||
                                  item?.caseType ||
                                  "Veterinary case"}
                              </p>

                            </td>

                            <td className="px-3 py-4 text-sm text-slate-700">
                              {getVillageValue(
                                item
                              )}
                            </td>

                            <td className="px-3 py-4">

                              <PriorityBadge
                                priority={getPriorityValue(
                                  item
                                )}
                              />

                            </td>

                            <td className="px-3 py-4 text-sm text-slate-700">
                              {getNeedValue(item)}
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


          {/* Resource coordination note */}
          <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-5">

            <div className="flex items-start gap-3">

              <CheckCircle
                size={20}
                className="mt-0.5 shrink-0 text-blue-700"
              />

              <div>

                <h3 className="font-semibold text-blue-900">
                  Veterinary Resource Coordination
                </h3>

                <p className="mt-1 text-sm leading-6 text-blue-800">
                  This administrative view connects health
                  signals, priority cases, vaccination gaps,
                  and village activity to support veterinary
                  resource planning and coordination.
                </p>

                <p className="mt-2 text-xs text-blue-700">
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
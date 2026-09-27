import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  MapPin,
  RefreshCw,
  ShieldAlert,
  Users,
  CheckCircle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import { getVillageReports } from "../data/villageIntelligence";
import { getAnimals } from "../data/animals";
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

function getSeverityRank(severity) {
  if (severity === "Severe") return 3;
  if (severity === "Moderate") return 2;
  if (severity === "Mild") return 1;
  return 0;
}

function getRiskLabel(signal) {
  const severity = signal?.severity || signal?.riskLevel || signal?.risk;

  if (severity === "Severe" || severity === "High") return "High";
  if (severity === "Moderate" || severity === "Medium") return "Moderate";
  return "Low";
}

function getRiskClass(risk) {
  if (risk === "High") {
    return "bg-red-50 text-red-700 border-red-200";
  }

  if (risk === "Moderate") {
    return "bg-amber-50 text-amber-700 border-amber-200";
  }

  return "bg-green-50 text-green-700 border-green-200";
}

function getReportVillage(report) {
  return (
    report?.location ||
    report?.village ||
    report?.villageName ||
    "Unknown Village"
  );
}

function getSignalVillage(signal) {
  return (
    signal?.location ||
    signal?.village ||
    signal?.villageName ||
    signal?.name ||
    "Unknown Village"
  );
}

function getSignalCount(signal) {
  return (
    signal?.reportCount ??
    signal?.reports ??
    signal?.signalCount ??
    signal?.count ??
    0
  );
}

function getAffectedAnimals(signal) {
  return (
    signal?.affectedAnimals ??
    signal?.animalCount ??
    signal?.animalsAffected ??
    0
  );
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
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
          <p className="mt-1 text-xs text-slate-500">{description}</p>
        </div>

        <div className={`rounded-xl p-3 ${iconClass}`}>
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}

function RiskBadge({ risk }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${getRiskClass(
        risk
      )}`}
    >
      {risk}
    </span>
  );
}

function EmptyState({ message }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
      <MapPin className="mx-auto mb-3 text-slate-400" size={30} />
      <p className="text-sm text-slate-500">{message}</p>
    </div>
  );
}

export default function AdminVillageMonitoring() {
  const navigate = useNavigate();

  const [animals, setAnimals] = useState([]);
  const [reports, setReports] = useState([]);
  const [villageSignals, setVillageSignals] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const loadData = () => {
    try {
      setAnimals(getAnimals() || []);
    } catch {
      setAnimals([]);
    }

    setReports(loadHealthReports());

    try {
      setVillageSignals(getVillageReports() || []);
    } catch {
      setVillageSignals([]);
    }

    setLastUpdated(new Date());
  };

  useEffect(() => {
    loadData();

    const handleStorage = () => loadData();
    const handleFocus = () => loadData();

    window.addEventListener("storage", handleStorage);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const villages = useMemo(() => {
    const villageMap = {};

    animals.forEach((animal) => {
      const village = animal.location || "Unknown Village";

      if (!villageMap[village]) {
        villageMap[village] = {
          village,
          animals: 0,
          reports: 0,
          severeReports: 0,
          moderateReports: 0,
          mildReports: 0,
          activeSignals: 0,
          affectedAnimals: 0,
          vaccinationDue: 0,
        };
      }

      villageMap[village].animals += 1;

      try {
        const vaccination = getVaccinationStatus(animal);

        const status =
          typeof vaccination === "string"
            ? vaccination
            : vaccination?.status;

        if (
          status === "Due" ||
          status === "Due Soon" ||
          status === "Overdue"
        ) {
          villageMap[village].vaccinationDue += 1;
        }
      } catch {
        if (
          animal.vaccinationStatus === "Due" ||
          animal.vaccinationStatus === "Due Soon" ||
          animal.vaccinationStatus === "Overdue"
        ) {
          villageMap[village].vaccinationDue += 1;
        }
      }
    });

    reports.forEach((report) => {
      const village = getReportVillage(report);

      if (!villageMap[village]) {
        villageMap[village] = {
          village,
          animals: 0,
          reports: 0,
          severeReports: 0,
          moderateReports: 0,
          mildReports: 0,
          activeSignals: 0,
          affectedAnimals: 0,
          vaccinationDue: 0,
        };
      }

      villageMap[village].reports += 1;

      if (report.severity === "Severe") {
        villageMap[village].severeReports += 1;
      } else if (report.severity === "Moderate") {
        villageMap[village].moderateReports += 1;
      } else if (report.severity === "Mild") {
        villageMap[village].mildReports += 1;
      }
    });

    villageSignals.forEach((signal) => {
      const village = getSignalVillage(signal);

      if (!villageMap[village]) {
        villageMap[village] = {
          village,
          animals: 0,
          reports: 0,
          severeReports: 0,
          moderateReports: 0,
          mildReports: 0,
          activeSignals: 0,
          affectedAnimals: 0,
          vaccinationDue: 0,
        };
      }

      villageMap[village].activeSignals += 1;
      villageMap[village].affectedAnimals += Number(
        getAffectedAnimals(signal) || 0
      );
    });

    return Object.values(villageMap).sort((a, b) => {
      if (b.severeReports !== a.severeReports) {
        return b.severeReports - a.severeReports;
      }

      if (b.activeSignals !== a.activeSignals) {
        return b.activeSignals - a.activeSignals;
      }

      return b.reports - a.reports;
    });
  }, [animals, reports, villageSignals]);

  const villageRisk = useMemo(() => {
    return villages.map((village) => {
      let risk = "Low";

      if (
        village.severeReports > 0 ||
        village.activeSignals >= 2 ||
        village.reports >= 4
      ) {
        risk = "High";
      } else if (
        village.moderateReports > 0 ||
        village.activeSignals === 1 ||
        village.reports > 0
      ) {
        risk = "Moderate";
      }

      return {
        ...village,
        risk,
      };
    });
  }, [villages]);

  const totalReports = reports.length;

  const activeSignals = villageSignals.length;

  const highRiskVillages = villageRisk.filter(
    (village) => village.risk === "High"
  ).length;

  const affectedAnimals = villageRisk.reduce(
    (total, village) => total + village.affectedAnimals,
    0
  );

  const recentReports = useMemo(() => {
    return [...reports]
      .sort((a, b) => {
        const dateA = new Date(a.submittedAt || a.createdAt || 0).getTime();
        const dateB = new Date(b.submittedAt || b.createdAt || 0).getTime();
        return dateB - dateA;
      })
      .slice(0, 8);
  }, [reports]);

  const signalRows = useMemo(() => {
    return [...villageSignals]
      .sort((a, b) => {
        const riskDifference =
          getSeverityRank(b?.severity) - getSeverityRank(a?.severity);

        if (riskDifference !== 0) return riskDifference;

        return getSignalCount(b) - getSignalCount(a);
      })
      .slice(0, 8);
  }, [villageSignals]);

  return (
    <DashboardLayout role="Admin / Government">
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <button
                onClick={() => navigate("/admin")}
                className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
              >
                <ArrowLeft size={16} />
                Back to Admin Dashboard
              </button>

              <div className="flex items-start gap-3">
                <div className="rounded-2xl bg-indigo-100 p-3 text-indigo-700">
                  <MapPin size={26} />
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                    Village Monitoring
                  </h1>

                  <p className="mt-1 max-w-2xl text-sm text-slate-600">
                    Monitor village-level livestock health signals, reported
                    cases, affected animals, and vaccination gaps.
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

          {/* Summary cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <DashboardCard
              icon={MapPin}
              title="Villages Monitored"
              value={villageRisk.length}
              description="Villages represented in system data"
              iconClass="bg-indigo-50 text-indigo-700"
            />

            <DashboardCard
              icon={Activity}
              title="Health Signals"
              value={activeSignals}
              description="Village-level signals detected"
              iconClass="bg-blue-50 text-blue-700"
            />

            <DashboardCard
              icon={ShieldAlert}
              title="High-Risk Villages"
              value={highRiskVillages}
              description="Require closer monitoring"
              iconClass="bg-red-50 text-red-700"
            />

            <DashboardCard
              icon={Users}
              title="Affected Animals"
              value={affectedAnimals}
              description="Animals linked to village signals"
              iconClass="bg-amber-50 text-amber-700"
            />
          </div>

          {/* Village overview */}
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-4">
              <div className="flex items-center gap-3">
                <MapPin className="text-indigo-600" size={20} />
                <div>
                  <h2 className="font-semibold text-slate-900">
                    Village Health Overview
                  </h2>
                  <p className="text-sm text-slate-500">
                    Consolidated health activity by village.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5">
              {villageRisk.length === 0 ? (
                <EmptyState message="No village monitoring data is available yet." />
              ) : (
                <div className="grid gap-4 lg:grid-cols-2">
                  {villageRisk.map((village) => (
                    <div
                      key={village.village}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className="rounded-xl bg-white p-2.5 text-indigo-600 shadow-sm">
                            <MapPin size={19} />
                          </div>

                          <div>
                            <h3 className="font-semibold text-slate-900">
                              {village.village}
                            </h3>
                            <p className="mt-1 text-xs text-slate-500">
                              {village.animals} registered animal
                              {village.animals === 1 ? "" : "s"}
                            </p>
                          </div>
                        </div>

                        <RiskBadge risk={village.risk} />
                      </div>

                      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                        <div className="rounded-lg bg-white p-3">
                          <p className="text-xs text-slate-500">Reports</p>
                          <p className="mt-1 text-lg font-bold text-slate-900">
                            {village.reports}
                          </p>
                        </div>

                        <div className="rounded-lg bg-white p-3">
                          <p className="text-xs text-slate-500">
                            Active Signals
                          </p>
                          <p className="mt-1 text-lg font-bold text-slate-900">
                            {village.activeSignals}
                          </p>
                        </div>

                        <div className="rounded-lg bg-white p-3">
                          <p className="text-xs text-slate-500">
                            Severe Reports
                          </p>
                          <p className="mt-1 text-lg font-bold text-red-700">
                            {village.severeReports}
                          </p>
                        </div>

                        <div className="rounded-lg bg-white p-3">
                          <p className="text-xs text-slate-500">
                            Vaccination Due
                          </p>
                          <p className="mt-1 text-lg font-bold text-amber-700">
                            {village.vaccinationDue}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Village signals */}
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="text-amber-600" size={20} />

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Active Village Health Signals
                  </h2>

                  <p className="text-sm text-slate-500">
                    Signals generated from connected livestock health data.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5">
              {signalRows.length === 0 ? (
                <EmptyState message="No active village health signals are available." />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px] text-left">
                    <thead>
                      <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                        <th className="px-3 py-3 font-semibold">Village</th>
                        <th className="px-3 py-3 font-semibold">Risk</th>
                        <th className="px-3 py-3 font-semibold">
                          Health Reports
                        </th>
                        <th className="px-3 py-3 font-semibold">
                          Affected Animals
                        </th>
                        <th className="px-3 py-3 font-semibold">
                          Signal Type
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {signalRows.map((signal, index) => {
                        const risk = getRiskLabel(signal);

                        return (
                          <tr
                            key={`${getSignalVillage(signal)}-${index}`}
                            className="border-b border-slate-100 last:border-0"
                          >
                            <td className="px-3 py-4">
                              <div className="flex items-center gap-2">
                                <MapPin
                                  size={16}
                                  className="text-slate-400"
                                />
                                <span className="font-medium text-slate-900">
                                  {getSignalVillage(signal)}
                                </span>
                              </div>
                            </td>

                            <td className="px-3 py-4">
                              <RiskBadge risk={risk} />
                            </td>

                            <td className="px-3 py-4 text-sm text-slate-700">
                              {getSignalCount(signal)}
                            </td>

                            <td className="px-3 py-4 text-sm text-slate-700">
                              {getAffectedAnimals(signal)}
                            </td>

                            <td className="px-3 py-4 text-sm text-slate-600">
                              {signal?.signalType ||
                                signal?.type ||
                                signal?.disease ||
                                "Health Signal"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>

          {/* Recent reports */}
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-4">
              <div className="flex items-center gap-3">
                <Activity className="text-blue-600" size={20} />

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Recent Village Health Reports
                  </h2>

                  <p className="text-sm text-slate-500">
                    Latest reports contributing to village monitoring.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5">
              {recentReports.length === 0 ? (
                <EmptyState message="No health reports have been submitted yet." />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[850px] text-left">
                    <thead>
                      <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                        <th className="px-3 py-3 font-semibold">Report ID</th>
                        <th className="px-3 py-3 font-semibold">Village</th>
                        <th className="px-3 py-3 font-semibold">Animal</th>
                        <th className="px-3 py-3 font-semibold">Severity</th>
                        <th className="px-3 py-3 font-semibold">Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {recentReports.map((report, index) => {
                        const severity = report.severity || "Not specified";

                        return (
                          <tr
                            key={report.id || `report-${index}`}
                            className="border-b border-slate-100 last:border-0"
                          >
                            <td className="px-3 py-4 text-sm font-medium text-slate-900">
                              {report.id || "—"}
                            </td>

                            <td className="px-3 py-4 text-sm text-slate-700">
                              {getReportVillage(report)}
                            </td>

                            <td className="px-3 py-4">
                              <div>
                                <p className="text-sm font-medium text-slate-900">
                                  {report.animalName || "Unknown Animal"}
                                </p>
                                <p className="text-xs text-slate-500">
                                  {report.species || "Species not specified"}
                                </p>
                              </div>
                            </td>

                            <td className="px-3 py-4">
                              <span
                                className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${
                                  severity === "Severe"
                                    ? "border-red-200 bg-red-50 text-red-700"
                                    : severity === "Moderate"
                                    ? "border-amber-200 bg-amber-50 text-amber-700"
                                    : "border-slate-200 bg-slate-50 text-slate-600"
                                }`}
                              >
                                {severity}
                              </span>
                            </td>

                            <td className="px-3 py-4">
                              <span className="inline-flex items-center gap-1.5 text-sm text-slate-700">
                                <CheckCircle
                                  size={15}
                                  className="text-emerald-600"
                                />
                                {report.status || "Submitted"}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>

          {/* Monitoring note */}
          <div className="mt-6 rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
            <div className="flex items-start gap-3">
              <ShieldAlert
                size={20}
                className="mt-0.5 shrink-0 text-indigo-700"
              />

              <div>
                <h3 className="font-semibold text-indigo-900">
                  Government Monitoring View
                </h3>

                <p className="mt-1 text-sm leading-6 text-indigo-800">
                  This page consolidates farmer health reports, village
                  signals, registered animals, and vaccination gaps to support
                  administrative monitoring and coordination.
                </p>

                <p className="mt-2 text-xs text-indigo-700">
                  Last refreshed: {lastUpdated.toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
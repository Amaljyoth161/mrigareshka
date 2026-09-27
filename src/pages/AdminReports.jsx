import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle,
  ClipboardList,
  FileText,
  RefreshCw,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

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

function StatusBadge({ status }) {
  const styles = {
    Submitted: "border-blue-200 bg-blue-50 text-blue-700",
    "Priority Review": "border-red-200 bg-red-50 text-red-700",
    "Under Review": "border-amber-200 bg-amber-50 text-amber-700",
    Resolved: "border-emerald-200 bg-emerald-50 text-emerald-700",
    Completed: "border-emerald-200 bg-emerald-50 text-emerald-700",
    "Pending Sync": "border-slate-200 bg-slate-50 text-slate-700",
    Synced: "border-indigo-200 bg-indigo-50 text-indigo-700",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${
        styles[status] || "border-slate-200 bg-slate-50 text-slate-600"
      }`}
    >
      {status || "Not specified"}
    </span>
  );
}

function SeverityBadge({ severity }) {
  const styles = {
    Severe: "border-red-200 bg-red-50 text-red-700",
    Moderate: "border-amber-200 bg-amber-50 text-amber-700",
    Mild: "border-emerald-200 bg-emerald-50 text-emerald-700",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${
        styles[severity] || "border-slate-200 bg-slate-50 text-slate-600"
      }`}
    >
      {severity || "Not specified"}
    </span>
  );
}

function EmptyState({ message }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
      <FileText className="mx-auto mb-3 text-slate-400" size={30} />
      <p className="text-sm text-slate-500">{message}</p>
    </div>
  );
}

function formatDate(value) {
  if (!value) return "Not recorded";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not recorded";
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getReportDate(report) {
  return report.submittedAt || report.createdAt || report.date || null;
}

function getReportVillage(report) {
  return (
    report.location ||
    report.village ||
    report.villageName ||
    "Unknown Village"
  );
}

function getReportAnimal(report) {
  return (
    report.animalName ||
    report.animal ||
    report.animalId ||
    "Unknown Animal"
  );
}

function getReportSource(report) {
  return report.source || "Not specified";
}

export default function AdminReports() {
  const navigate = useNavigate();

  const [reports, setReports] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const loadData = () => {
    setReports(loadHealthReports());
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

  const summary = useMemo(() => {
    const priorityReports = reports.filter(
      (report) =>
        report.status === "Priority Review" ||
        report.severity === "Severe"
    ).length;

    const underReview = reports.filter(
      (report) =>
        report.status === "Under Review" ||
        report.status === "Priority Review"
    ).length;

    const resolved = reports.filter(
      (report) =>
        report.status === "Resolved" ||
        report.status === "Completed"
    ).length;

    return {
      total: reports.length,
      priorityReports,
      underReview,
      resolved,
    };
  }, [reports]);

  const villageSummary = useMemo(() => {
    const map = {};

    reports.forEach((report) => {
      const village = getReportVillage(report);

      if (!map[village]) {
        map[village] = {
          village,
          reports: 0,
          severe: 0,
          priority: 0,
          underReview: 0,
          resolved: 0,
        };
      }

      map[village].reports += 1;

      if (report.severity === "Severe") {
        map[village].severe += 1;
      }

      if (report.status === "Priority Review") {
        map[village].priority += 1;
      }

      if (
        report.status === "Under Review" ||
        report.status === "Priority Review"
      ) {
        map[village].underReview += 1;
      }

      if (
        report.status === "Resolved" ||
        report.status === "Completed"
      ) {
        map[village].resolved += 1;
      }
    });

    return Object.values(map).sort((a, b) => {
      if (b.priority !== a.priority) return b.priority - a.priority;
      if (b.severe !== a.severe) return b.severe - a.severe;
      return b.reports - a.reports;
    });
  }, [reports]);

  const animalSummary = useMemo(() => {
    const map = {};

    reports.forEach((report) => {
      const animal = getReportAnimal(report);
      const key = report.animalId || animal;

      if (!map[key]) {
        map[key] = {
          animal,
          animalId: report.animalId || "Not recorded",
          species: report.species || "Not specified",
          village: getReportVillage(report),
          reports: 0,
          severe: 0,
          priority: 0,
        };
      }

      map[key].reports += 1;

      if (report.severity === "Severe") {
        map[key].severe += 1;
      }

      if (report.status === "Priority Review") {
        map[key].priority += 1;
      }
    });

    return Object.values(map).sort((a, b) => {
      if (b.priority !== a.priority) return b.priority - a.priority;
      if (b.severe !== a.severe) return b.severe - a.severe;
      return b.reports - a.reports;
    });
  }, [reports]);

  const sourceSummary = useMemo(() => {
    const map = {};

    reports.forEach((report) => {
      const source = getReportSource(report);
      map[source] = (map[source] || 0) + 1;
    });

    return Object.entries(map)
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count);
  }, [reports]);

  const severitySummary = useMemo(() => {
    const map = {};

    reports.forEach((report) => {
      const severity = report.severity || "Not specified";
      map[severity] = (map[severity] || 0) + 1;
    });

    return Object.entries(map)
      .map(([severity, count]) => ({ severity, count }))
      .sort((a, b) => b.count - a.count);
  }, [reports]);

  const recentReports = useMemo(() => {
    return [...reports]
      .sort(
        (a, b) =>
          new Date(getReportDate(b) || 0) -
          new Date(getReportDate(a) || 0)
      )
      .slice(0, 10);
  }, [reports]);

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
                <div className="rounded-2xl bg-blue-100 p-3 text-blue-700">
                  <ClipboardList size={26} />
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                    Health Reports
                  </h1>
                  <p className="mt-1 max-w-2xl text-sm text-slate-600">
                    Monitor livestock health reports, review priority cases,
                    and understand report activity across villages and animals.
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
              icon={FileText}
              title="Total Reports"
              value={summary.total}
              description="All connected health reports"
              iconClass="bg-blue-50 text-blue-700"
            />

            <DashboardCard
              icon={AlertTriangle}
              title="Priority Reports"
              value={summary.priorityReports}
              description="Severe or priority review cases"
              iconClass="bg-red-50 text-red-700"
            />

            <DashboardCard
              icon={Users}
              title="Under Review"
              value={summary.underReview}
              description="Reports requiring assessment"
              iconClass="bg-amber-50 text-amber-700"
            />

            <DashboardCard
              icon={CheckCircle}
              title="Resolved / Completed"
              value={summary.resolved}
              description="Reports marked resolved or completed"
              iconClass="bg-emerald-50 text-emerald-700"
            />
          </div>

          {/* Report Overview */}
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-4">
              <h2 className="font-semibold text-slate-900">
                Report Overview
              </h2>
              <p className="text-sm text-slate-500">
                Current health-report distribution by severity and source.
              </p>
            </div>

            <div className="grid gap-6 p-5 lg:grid-cols-2">
              <div>
                <h3 className="mb-3 text-sm font-semibold text-slate-800">
                  Severity Breakdown
                </h3>

                {severitySummary.length === 0 ? (
                  <EmptyState message="No severity data is available." />
                ) : (
                  <div className="space-y-3">
                    {severitySummary.map((item) => {
                      const percentage =
                        summary.total > 0
                          ? Math.round((item.count / summary.total) * 100)
                          : 0;

                      return (
                        <div key={item.severity}>
                          <div className="flex items-center justify-between text-sm">
                            <SeverityBadge severity={item.severity} />
                            <span className="font-semibold text-slate-700">
                              {item.count}
                            </span>
                          </div>

                          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-slate-700"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div>
                <h3 className="mb-3 text-sm font-semibold text-slate-800">
                  Report Source
                </h3>

                {sourceSummary.length === 0 ? (
                  <EmptyState message="No report-source data is available." />
                ) : (
                  <div className="space-y-3">
                    {sourceSummary.map((item) => {
                      const percentage =
                        summary.total > 0
                          ? Math.round((item.count / summary.total) * 100)
                          : 0;

                      return (
                        <div
                          key={item.source}
                          className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-sm font-semibold text-slate-800">
                              {item.source}
                            </span>
                            <span className="text-sm font-bold text-slate-900">
                              {item.count}
                            </span>
                          </div>

                          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white">
                            <div
                              className="h-full rounded-full bg-blue-600"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>

                          <p className="mt-1 text-xs text-slate-500">
                            {percentage}% of all reports
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Village-wise Reports */}
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-4">
              <h2 className="font-semibold text-slate-900">
                Village-wise Reports
              </h2>
              <p className="text-sm text-slate-500">
                Report activity and priority cases grouped by village.
              </p>
            </div>

            <div className="p-5">
              {villageSummary.length === 0 ? (
                <EmptyState message="No village report data is available." />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[850px] text-left">
                    <thead>
                      <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                        <th className="px-3 py-3 font-semibold">Village</th>
                        <th className="px-3 py-3 font-semibold">Reports</th>
                        <th className="px-3 py-3 font-semibold">Severe</th>
                        <th className="px-3 py-3 font-semibold">Priority</th>
                        <th className="px-3 py-3 font-semibold">
                          Under Review
                        </th>
                        <th className="px-3 py-3 font-semibold">Resolved</th>
                      </tr>
                    </thead>

                    <tbody>
                      {villageSummary.map((village) => (
                        <tr
                          key={village.village}
                          className="border-b border-slate-100 last:border-0"
                        >
                          <td className="px-3 py-4 font-medium text-slate-900">
                            {village.village}
                          </td>
                          <td className="px-3 py-4 text-sm text-slate-700">
                            {village.reports}
                          </td>
                          <td className="px-3 py-4 text-sm font-semibold text-red-700">
                            {village.severe}
                          </td>
                          <td className="px-3 py-4 text-sm font-semibold text-amber-700">
                            {village.priority}
                          </td>
                          <td className="px-3 py-4 text-sm text-slate-700">
                            {village.underReview}
                          </td>
                          <td className="px-3 py-4 text-sm text-emerald-700">
                            {village.resolved}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>

          {/* Animal-wise Reports */}
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-4">
              <h2 className="font-semibold text-slate-900">
                Animal-wise Report Records
              </h2>
              <p className="text-sm text-slate-500">
                Health reports grouped by individual animal.
              </p>
            </div>

            <div className="p-5">
              {animalSummary.length === 0 ? (
                <EmptyState message="No animal report records are available." />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[900px] text-left">
                    <thead>
                      <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                        <th className="px-3 py-3 font-semibold">
                          Animal / ID
                        </th>
                        <th className="px-3 py-3 font-semibold">Species</th>
                        <th className="px-3 py-3 font-semibold">Village</th>
                        <th className="px-3 py-3 font-semibold">Reports</th>
                        <th className="px-3 py-3 font-semibold">Severe</th>
                        <th className="px-3 py-3 font-semibold">Priority</th>
                      </tr>
                    </thead>

                    <tbody>
                      {animalSummary.map((animal) => (
                        <tr
                          key={animal.animalId}
                          className="border-b border-slate-100 last:border-0"
                        >
                          <td className="px-3 py-4">
                            <p className="text-sm font-semibold text-slate-900">
                              {animal.animal}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              {animal.animalId}
                            </p>
                          </td>

                          <td className="px-3 py-4 text-sm text-slate-700">
                            {animal.species}
                          </td>

                          <td className="px-3 py-4 text-sm text-slate-700">
                            {animal.village}
                          </td>

                          <td className="px-3 py-4 text-sm font-semibold text-slate-900">
                            {animal.reports}
                          </td>

                          <td className="px-3 py-4 text-sm font-semibold text-red-700">
                            {animal.severe}
                          </td>

                          <td className="px-3 py-4">
                            <span
                              className={
                                animal.priority > 0
                                  ? "font-semibold text-red-700"
                                  : "text-slate-600"
                              }
                            >
                              {animal.priority}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>

          {/* Recent Reports */}
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-4">
              <h2 className="font-semibold text-slate-900">
                Recent Health Reports
              </h2>
              <p className="text-sm text-slate-500">
                Latest reports available to the administrative monitoring
                portal.
              </p>
            </div>

            <div className="p-5">
              {recentReports.length === 0 ? (
                <EmptyState message="No health reports have been submitted yet." />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1100px] text-left">
                    <thead>
                      <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                        <th className="px-3 py-3 font-semibold">Report ID</th>
                        <th className="px-3 py-3 font-semibold">
                          Animal / ID
                        </th>
                        <th className="px-3 py-3 font-semibold">Village</th>
                        <th className="px-3 py-3 font-semibold">Severity</th>
                        <th className="px-3 py-3 font-semibold">Status</th>
                        <th className="px-3 py-3 font-semibold">Source</th>
                        <th className="px-3 py-3 font-semibold">Date</th>
                      </tr>
                    </thead>

                    <tbody>
                      {recentReports.map((report, index) => (
                        <tr
                          key={report.id || `${getReportAnimal(report)}-${index}`}
                          className="border-b border-slate-100 last:border-0"
                        >
                          <td className="px-3 py-4 text-sm font-semibold text-slate-900">
                            {report.id || "Not recorded"}
                          </td>

                          <td className="px-3 py-4">
                            <p className="text-sm font-semibold text-slate-900">
                              {getReportAnimal(report)}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              {report.animalId || "ID not recorded"}
                            </p>
                          </td>

                          <td className="px-3 py-4 text-sm text-slate-700">
                            {getReportVillage(report)}
                          </td>

                          <td className="px-3 py-4">
                            <SeverityBadge severity={report.severity} />
                          </td>

                          <td className="px-3 py-4">
                            <StatusBadge status={report.status} />
                          </td>

                          <td className="px-3 py-4 text-sm text-slate-700">
                            {getReportSource(report)}
                          </td>

                          <td className="px-3 py-4 text-sm text-slate-700">
                            {formatDate(getReportDate(report))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>

          {/* Monitoring Note */}
          <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-5">
            <div className="flex items-start gap-3">
              <CheckCircle
                size={20}
                className="mt-0.5 shrink-0 text-blue-700"
              />

              <div>
                <h3 className="font-semibold text-blue-900">
                  Government Monitoring View
                </h3>

                <p className="mt-1 text-sm leading-6 text-blue-800">
                  This administrative report view consolidates connected
                  livestock health reports for monitoring, review, and
                  response coordination. It is intended as a decision-support
                  view and does not replace veterinary diagnosis.
                </p>

                <p className="mt-2 text-xs text-blue-700">
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

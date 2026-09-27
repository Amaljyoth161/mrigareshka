import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle,
  ClipboardList,
  FileText,
  MapPin,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import { getCases } from "../data/caseService";

const REPORTS_KEY = "mrigare-shka-health-reports";

function readReports() {
  try {
    return JSON.parse(localStorage.getItem(REPORTS_KEY) || "[]");
  } catch {
    return [];
  }
}

function statusStyle(status) {
  if (status === "Visit Completed" || status === "Resolved" || status === "Completed") return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (status === "Priority Review" || status === "Severe") return "bg-red-50 text-red-700 border-red-200";
  if (status === "Under Review" || status === "Visit In Progress") return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-slate-50 text-slate-700 border-slate-200";
}

export default function FieldWorkerReports() {
  const [reports, setReports] = useState([]);
  const [cases, setCases] = useState([]);

  function load() {
    setReports(readReports());
    setCases(getCases().filter((item) => item.assignedTo));
  }

  useEffect(() => {
    load();
    window.addEventListener("storage", load);
    window.addEventListener("focus", load);
    return () => {
      window.removeEventListener("storage", load);
      window.removeEventListener("focus", load);
    };
  }, []);

  const completedVisits = useMemo(
    () => cases.filter((item) => item.status === "Visit Completed"),
    [cases]
  );

  const fieldObservations = completedVisits.filter((item) => item.visitNotes);

  const villageCount = new Set(
    [...reports.map((r) => r.location), ...cases.map((c) => c.location)].filter(Boolean)
  ).size;

  return (
    <DashboardLayout role="Field Worker">
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link to="/field-worker" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900">
            <ArrowLeft size={16} /> Back to Field Worker Dashboard
          </Link>

          <div className="mt-5">
            <p className="text-sm font-semibold text-green-700">Field Operations</p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">Reports</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Review connected livestock health reports and the observations submitted after field visits.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-4">
            <Summary title="Health Reports" value={reports.length} icon={FileText} />
            <Summary title="Assigned Cases" value={cases.length} icon={ClipboardList} />
            <Summary title="Completed Visits" value={completedVisits.length} icon={CheckCircle} />
            <Summary title="Villages" value={villageCount} icon={MapPin} />
          </div>

          <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-4">
              <h2 className="font-semibold text-slate-900">Field Visit Outcomes</h2>
              <p className="mt-1 text-sm text-slate-500">
                Observations entered in Assigned Visits are reflected here automatically.
              </p>
            </div>

            {fieldObservations.length === 0 ? (
              <div className="p-10 text-center">
                <ClipboardList className="mx-auto text-slate-300" size={38} />
                <h3 className="mt-4 font-semibold text-slate-900">No completed field observations</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Complete an assigned visit to create a field outcome record.
                </p>
                <Link to="/field-worker/visits" className="mt-4 inline-flex rounded-xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white">
                  Open Assigned Visits
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {fieldObservations.map((item) => (
                  <div key={item.id} className="p-5">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-slate-900">{item.animalName || item.animalId || "Unknown Animal"}</h3>
                          <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyle(item.status)}`}>
                            {item.status}
                          </span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-600">
                          <span className="inline-flex items-center gap-1.5"><MapPin size={14} />{item.location || "Village not recorded"}</span>
                          <span>{item.species || "Species not recorded"}</span>
                          <span>{item.completedAt ? new Date(item.completedAt).toLocaleDateString("en-IN") : "Date not recorded"}</span>
                        </div>
                        <div className="mt-3 rounded-xl bg-emerald-50 p-4 text-sm leading-6 text-emerald-900">
                          <strong>Observation:</strong> {item.visitNotes}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-4">
              <h2 className="font-semibold text-slate-900">Connected Health Reports</h2>
              <p className="mt-1 text-sm text-slate-500">
                Farmer, IVR and offline-synced reports are visible through the shared health-report store.
              </p>
            </div>

            {reports.length === 0 ? (
              <div className="p-10 text-center text-sm text-slate-500">No health reports have been submitted yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[950px] text-left">
                  <thead>
                    <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                      <th className="px-4 py-3">Report</th>
                      <th className="px-4 py-3">Animal</th>
                      <th className="px-4 py-3">Village</th>
                      <th className="px-4 py-3">Severity</th>
                      <th className="px-4 py-3">Source</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...reports].reverse().slice(0, 15).map((report, index) => (
                      <tr key={report.id || index} className="border-b border-slate-100 last:border-0">
                        <td className="px-4 py-4 text-sm font-semibold text-slate-900">{report.id || "Not recorded"}</td>
                        <td className="px-4 py-4 text-sm text-slate-700">{report.animalName || report.animalId || "Unknown Animal"}</td>
                        <td className="px-4 py-4 text-sm text-slate-700">{report.location || report.village || "Unknown Village"}</td>
                        <td className="px-4 py-4">
                          <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyle(report.severity)}`}>
                            {report.severity || "Not specified"}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-slate-700">{report.source || "Not specified"}</td>
                        <td className="px-4 py-4">
                          <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyle(report.status)}`}>
                            {report.status || "Not specified"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 shrink-0 text-blue-700" size={20} />
              <div>
                <h3 className="font-semibold text-blue-900">Field response record</h3>
                <p className="mt-1 text-sm leading-6 text-blue-800">
                  This page is a monitoring and coordination view. Field observations should support veterinary assessment and do not replace veterinary diagnosis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Summary({ title, value, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div><p className="text-sm text-slate-500">{title}</p><p className="mt-2 text-3xl font-bold text-slate-900">{value}</p></div>
        <Icon size={22} className="text-slate-500" />
      </div>
    </div>
  );
}

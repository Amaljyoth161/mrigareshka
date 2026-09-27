import {
  Activity,
  ArrowLeft,
  ClipboardList,
  MapPin,
  PawPrint,
  Syringe,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import { getAnimals } from "../data/animals";
import { getVaccinationStatus } from "../data/vaccinationService";

const REPORTS_KEY = "mrigare-shka-health-reports";
const CASES_KEY = "mrigare-shka-cases";

function read(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
}

export default function FieldWorkerVillages() {
  const [animals, setAnimals] = useState([]);
  const [reports, setReports] = useState([]);
  const [cases, setCases] = useState([]);

  function load() {
    setAnimals(getAnimals());
    setReports(read(REPORTS_KEY));
    setCases(read(CASES_KEY));
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

  const villageData = useMemo(() => {
    const names = new Set([
      ...animals.map((a) => a.location).filter(Boolean),
      ...reports.map((r) => r.location || r.village || r.villageName).filter(Boolean),
      ...cases.map((c) => c.location).filter(Boolean),
    ]);

    return [...names].map((village) => {
      const villageAnimals = animals.filter((a) => a.location === village);
      const villageReports = reports.filter(
        (r) => (r.location || r.village || r.villageName) === village
      );
      const villageCases = cases.filter((c) => c.location === village);
      const vaccination = villageAnimals.map(getVaccinationStatus);

      return {
        village,
        animals: villageAnimals.length,
        reports: villageReports.length,
        severe: villageReports.filter((r) => r.severity === "Severe").length,
        assigned: villageCases.filter((c) => c.assignedTo).length,
        completed: villageCases.filter((c) => c.status === "Visit Completed").length,
        due: vaccination.filter((v) => v.status === "Due Soon" || v.status === "Overdue").length,
      };
    }).sort((a, b) => b.severe - a.severe || b.reports - a.reports);
  }, [animals, reports, cases]);

  const highRiskVillages = villageData.filter((v) => v.severe > 0).length;

  return (
    <DashboardLayout role="Field Worker">
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link to="/field-worker" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900">
            <ArrowLeft size={16} /> Back to Field Worker Dashboard
          </Link>

          <div className="mt-5">
            <p className="text-sm font-semibold text-green-700">Field Operations</p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">Village Monitoring</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              A field-level view connecting village health reports, livestock, assigned visits and vaccination needs.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <Summary title="Villages" value={villageData.length} />
            <Summary title="High-Signal Villages" value={highRiskVillages} />
            <Summary title="Animals Covered" value={animals.length} />
          </div>

          <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-4">
              <h2 className="font-semibold text-slate-900">Village Health Overview</h2>
              <p className="mt-1 text-sm text-slate-500">
                Use a village row to jump directly into its assigned field visits.
              </p>
            </div>

            {villageData.length === 0 ? (
              <div className="p-10 text-center text-sm text-slate-500">
                No village data is available yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] text-left">
                  <thead>
                    <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                      <th className="px-4 py-3">Village</th>
                      <th className="px-4 py-3">Animals</th>
                      <th className="px-4 py-3">Reports</th>
                      <th className="px-4 py-3">Severe</th>
                      <th className="px-4 py-3">Assigned Visits</th>
                      <th className="px-4 py-3">Completed</th>
                      <th className="px-4 py-3">Vaccination Attention</th>
                      <th className="px-4 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {villageData.map((item) => (
                      <tr key={item.village} className="border-b border-slate-100 last:border-0">
                        <td className="px-4 py-4 font-semibold text-slate-900">
                          <span className="inline-flex items-center gap-2"><MapPin size={15} />{item.village}</span>
                        </td>
                        <td className="px-4 py-4 text-sm text-slate-700">{item.animals}</td>
                        <td className="px-4 py-4 text-sm text-slate-700">{item.reports}</td>
                        <td className="px-4 py-4 text-sm font-semibold text-red-700">{item.severe}</td>
                        <td className="px-4 py-4 text-sm text-slate-700">{item.assigned}</td>
                        <td className="px-4 py-4 text-sm text-emerald-700">{item.completed}</td>
                        <td className="px-4 py-4 text-sm font-semibold text-amber-700">{item.due}</td>
                        <td className="px-4 py-4">
                          <Link
                            to={`/field-worker/visits?village=${encodeURIComponent(item.village)}`}
                            className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white"
                          >
                            View Visits
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <InfoCard icon={Activity} title="Health Reports" value={reports.length} />
            <InfoCard icon={ClipboardList} title="Assigned Cases" value={cases.filter((c) => c.assignedTo).length} />
            <InfoCard icon={Syringe} title="Vaccination Attention" value={animals.map(getVaccinationStatus).filter((v) => v.status === "Due Soon" || v.status === "Overdue").length} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Summary({ title, value }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">{title}</p><p className="mt-2 text-3xl font-bold text-slate-900">{value}</p></div>;
}

function InfoCard({ icon: Icon, title, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
        </div>
        <Icon className="text-slate-500" size={22} />
      </div>
    </div>
  );
}

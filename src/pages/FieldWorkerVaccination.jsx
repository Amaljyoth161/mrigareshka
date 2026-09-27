import {
  ArrowLeft,
  CalendarDays,
  CheckCircle,
  MapPin,
  Syringe,
  AlertTriangle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import { getAnimals } from "../data/animals";
import { getVaccinationStatus } from "../data/vaccinationService";

function badge(status) {
  if (status === "Up to date") return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (status === "Due Soon") return "bg-amber-50 text-amber-700 border-amber-200";
  if (status === "Overdue") return "bg-red-50 text-red-700 border-red-200";
  return "bg-slate-50 text-slate-600 border-slate-200";
}

export default function FieldWorkerVaccination() {
  const [animals, setAnimals] = useState([]);

  function load() {
    setAnimals(getAnimals());
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

  const records = useMemo(
    () => animals.map((animal) => ({
      animal,
      vaccination: getVaccinationStatus(animal),
    })),
    [animals]
  );

  const attention = records.filter(
    (item) => item.vaccination.status === "Due Soon" || item.vaccination.status === "Overdue"
  );

  const upToDate = records.filter((item) => item.vaccination.status === "Up to date");

  return (
    <DashboardLayout role="Field Worker">
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link to="/field-worker" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900">
            <ArrowLeft size={16} /> Back to Field Worker Dashboard
          </Link>

          <div className="mt-5">
            <p className="text-sm font-semibold text-green-700">Field Operations</p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">Vaccination</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Review vaccination status by animal and identify field-level preventive care needs.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <Summary title="Registered Animals" value={records.length} icon={Syringe} />
            <Summary title="Up to Date" value={upToDate.length} icon={CheckCircle} />
            <Summary title="Needs Attention" value={attention.length} icon={AlertTriangle} />
          </div>

          <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-4">
              <h2 className="font-semibold text-slate-900">Animal Vaccination Status</h2>
              <p className="mt-1 text-sm text-slate-500">
                Status is calculated from the same vaccination service used by the other portals.
              </p>
            </div>

            {records.length === 0 ? (
              <div className="p-10 text-center text-sm text-slate-500">No animals are registered yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[850px] text-left">
                  <thead>
                    <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                      <th className="px-4 py-3">Animal</th>
                      <th className="px-4 py-3">Species</th>
                      <th className="px-4 py-3">Village</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Next Vaccination</th>
                      <th className="px-4 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map(({ animal, vaccination }) => (
                      <tr key={animal.id} className="border-b border-slate-100 last:border-0">
                        <td className="px-4 py-4 font-semibold text-slate-900">{animal.name}</td>
                        <td className="px-4 py-4 text-sm text-slate-700">{animal.species}</td>
                        <td className="px-4 py-4"><span className="inline-flex items-center gap-1.5 text-sm text-slate-700"><MapPin size={14} />{animal.location}</span></td>
                        <td className="px-4 py-4">
                          <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${badge(vaccination.status)}`}>
                            {vaccination.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-slate-700">
                          <span className="inline-flex items-center gap-1.5"><CalendarDays size={14} />{animal.nextVaccinationDate || "Not scheduled"}</span>
                        </td>
                        <td className="px-4 py-4">
                          <Link to={`/farmer/animals/${animal.id}`} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                            View Passport
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
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

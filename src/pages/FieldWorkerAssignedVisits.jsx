import {
  ArrowLeft,
  CalendarDays,
  CheckCircle,
  ClipboardList,
  MapPin,
  Play,
  Stethoscope,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import { getCases, updateCase } from "../data/caseService";

function statusClass(status) {
  if (status === "Visit Completed") return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (status === "Visit In Progress") return "bg-blue-50 text-blue-700 border-blue-200";
  if (status === "Visit Scheduled") return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-slate-50 text-slate-700 border-slate-200";
}

export default function FieldWorkerAssignedVisits() {
  const [cases, setCases] = useState([]);
  const [notesByCase, setNotesByCase] = useState({});
  const [openCase, setOpenCase] = useState(null);
  const [searchParams] = useSearchParams();
  const villageFilter = searchParams.get("village") || "";

  function loadCases() {
    setCases(getCases().filter((item) => item.assignedTo));
  }

  useEffect(() => {
    loadCases();
    const refresh = () => loadCases();
    window.addEventListener("storage", refresh);
    window.addEventListener("focus", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("focus", refresh);
    };
  }, []);

  const visibleCases = useMemo(() => {
    return cases.filter((item) =>
      villageFilter ? item.location === villageFilter : true
    );
  }, [cases, villageFilter]);

  function startVisit(caseId) {
    setCases(
      updateCase(caseId, {
        status: "Visit In Progress",
        visitStartedAt: new Date().toISOString(),
      })
    );
  }

  function completeVisit(caseId) {
    const notes = (notesByCase[caseId] || "").trim();
    if (!notes) {
      window.alert("Please enter a field observation before completing the visit.");
      return;
    }

    const updated = updateCase(caseId, {
      status: "Visit Completed",
      visitNotes: notes,
      completedAt: new Date().toISOString(),
    });

    setCases(updated);
    setNotesByCase((prev) => ({ ...prev, [caseId]: "" }));
    setOpenCase(null);
  }

  const pending = visibleCases.filter((item) => item.status !== "Visit Completed");
  const completed = visibleCases.filter((item) => item.status === "Visit Completed");

  return (
    <DashboardLayout role="Field Worker">
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link to="/field-worker" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900">
            <ArrowLeft size={16} /> Back to Field Worker Dashboard
          </Link>

          <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold text-green-700">Field Operations</p>
              <h1 className="mt-1 text-3xl font-bold text-slate-900">Assigned Visits</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                Review veterinary cases assigned to field staff, start visits, and submit field observations.
              </p>
            </div>
            {villageFilter && (
              <Link
                to="/field-worker/visits"
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm"
              >
                Clear village filter
              </Link>
            )}
          </div>

          {villageFilter && (
            <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
              Showing assigned visits for <strong>{villageFilter}</strong>.
            </div>
          )}

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <Summary title="Assigned Visits" value={visibleCases.length} />
            <Summary title="Pending" value={pending.length} />
            <Summary title="Completed" value={completed.length} />
          </div>

          <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-4">
              <h2 className="font-semibold text-slate-900">Visit Queue</h2>
              <p className="mt-1 text-sm text-slate-500">
                This queue is connected to the veterinarian case assignment workflow.
              </p>
            </div>

            {visibleCases.length === 0 ? (
              <div className="p-10 text-center">
                <ClipboardList className="mx-auto text-slate-300" size={38} />
                <h3 className="mt-4 font-semibold text-slate-900">No assigned visits</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Cases assigned by a veterinarian will appear here automatically.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {visibleCases.map((item) => (
                  <div key={item.id} className="p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-slate-900">
                            {item.animalName || item.animalId || "Unknown Animal"}
                          </h3>
                          <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClass(item.status)}`}>
                            {item.status || "Assigned"}
                          </span>
                          {item.priority && (
                            <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700">
                              {item.priority} Priority
                            </span>
                          )}
                        </div>

                        <div className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2 lg:grid-cols-4">
                          <span className="inline-flex items-center gap-2"><MapPin size={15} />{item.location || "Village not recorded"}</span>
                          <span className="inline-flex items-center gap-2"><Stethoscope size={15} />{item.species || "Species not recorded"}</span>
                          <span className="inline-flex items-center gap-2"><CalendarDays size={15} />{item.visitDate || "Visit date not set"}</span>
                          <span className="text-xs text-slate-400">Case: {item.id}</span>
                        </div>

                        {item.symptoms?.length > 0 && (
                          <p className="mt-3 text-sm text-slate-600">
                            <strong>Symptoms:</strong> {item.symptoms.join(", ")}
                          </p>
                        )}

                        {item.status === "Visit Completed" && item.visitNotes && (
                          <div className="mt-3 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800">
                            <strong>Field observation:</strong> {item.visitNotes}
                          </div>
                        )}
                      </div>

                      <div className="flex shrink-0 flex-wrap gap-2">
                        {item.status !== "Visit Completed" && item.status !== "Visit In Progress" && (
                          <button
                            onClick={() => startVisit(item.id)}
                            className="inline-flex items-center gap-2 rounded-xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-800"
                          >
                            <Play size={15} /> Start Visit
                          </button>
                        )}

                        {item.status === "Visit In Progress" && (
                          <button
                            onClick={() => setOpenCase(item.id)}
                            className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
                          >
                            <CheckCircle size={15} /> Complete Visit
                          </button>
                        )}
                      </div>
                    </div>

                    {openCase === item.id && (
                      <div className="mt-4 rounded-2xl border border-blue-200 bg-blue-50 p-4">
                        <label className="text-sm font-semibold text-slate-800">
                          Field Visit Observation
                        </label>
                        <textarea
                          value={notesByCase[item.id] || ""}
                          onChange={(e) =>
                            setNotesByCase((prev) => ({
                              ...prev,
                              [item.id]: e.target.value,
                            }))
                          }
                          rows={4}
                          placeholder="Record what you observed during the visit..."
                          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500"
                        />
                        <div className="mt-3 flex gap-2">
                          <button
                            onClick={() => completeVisit(item.id)}
                            className="rounded-xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-800"
                          >
                            Submit Observation
                          </button>
                          <button
                            onClick={() => setOpenCase(null)}
                            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <QuickLink to="/field-worker/villages" title="Village Monitoring" text="See health reports, animals and vaccination status by village." />
            <QuickLink to="/field-worker/vaccination" title="Vaccination" text="Review animals that are up to date, due soon or overdue." />
            <QuickLink to="/field-worker/reports" title="Field Reports" text="Review completed visits and connected health reports." />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Summary({ title, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

function QuickLink({ to, title, text }) {
  return (
    <Link to={to} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm leading-6 text-slate-500">{text}</p>
    </Link>
  );
}

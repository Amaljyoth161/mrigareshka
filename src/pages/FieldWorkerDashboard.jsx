import {
  MapPin,
  ClipboardList,
  CheckCircle,
  AlertTriangle,
  Stethoscope,
  Play,
  ClipboardCheck,
} from "lucide-react";

import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  getCases,
  updateCase,
} from "../data/caseService";


function FieldWorkerDashboard() {

  const [cases, setCases] = useState([]);

  const [fieldTasks, setFieldTasks] = useState([]);

  const [showForm, setShowForm] = useState(null);

  const [notes, setNotes] = useState("");


  /* ================= LOAD DATA ================= */

  useEffect(() => {
    loadCases();
  }, []);


  function loadCases() {

    const savedCases = getCases();

    setCases(savedCases);


    const savedTasks = JSON.parse(
      localStorage.getItem(
        "mrigare-shka-field-tasks"
      ) || "[]"
    );

    setFieldTasks(savedTasks);
  }


  /* ================= CASE VISIT ================= */

  function startVisit(caseId) {

    const updatedCases =
      updateCase(
        caseId,
        {
          status: "Visit In Progress",
        }
      );

    setCases(updatedCases);
  }


  function openCompleteForm(caseId) {

    setShowForm(caseId);

    setNotes("");
  }


  function completeVisit(caseId) {

    if (!notes.trim()) {

      window.alert(
        "Please enter a visit observation before completing the visit."
      );

      return;
    }


    const updatedCases =
      updateCase(
        caseId,
        {
          status: "Visit Completed",

          visitNotes: notes,

          completedAt:
            new Date().toISOString(),
        }
      );


    setCases(updatedCases);

    setShowForm(null);

    setNotes("");
  }


  /* ================= FIELD TASK ================= */

  function startFieldTask(taskId) {

    const updatedTasks =
      fieldTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: "Visit In Progress",
              startedAt: new Date().toISOString(),
            }
          : task
      );


    localStorage.setItem(
      "mrigare-shka-field-tasks",
      JSON.stringify(updatedTasks)
    );


    setFieldTasks(updatedTasks);
  }


  function openFieldTaskForm(taskId) {

    setShowForm(taskId);

    setNotes("");
  }


  function completeFieldTask(taskId) {

    if (!notes.trim()) {

      window.alert(
        "Please enter a field observation before completing the task."
      );

      return;
    }


    const updatedTasks =
      fieldTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: "Visit Completed",
              visitNotes: notes,
              completedAt: new Date().toISOString(),
            }
          : task
      );


    localStorage.setItem(
      "mrigare-shka-field-tasks",
      JSON.stringify(updatedTasks)
    );


    setFieldTasks(updatedTasks);

    setShowForm(null);

    setNotes("");
  }


  /* ================= COUNTS ================= */

  const assignedCases =
    cases.filter(
      (item) =>
        item.assignedTo
    );


  const pendingCases =
    assignedCases.filter(
      (item) =>
        item.status !==
        "Visit Completed"
    );


  const completedCases =
    assignedCases.filter(
      (item) =>
        item.status ===
        "Visit Completed"
    );


  const assignedFieldTasks =
    fieldTasks.filter(
      (task) =>
        task.assignedTo ===
        "Field Worker"
    );


  const pendingFieldTasks =
    assignedFieldTasks.filter(
      (task) =>
        task.status !==
        "Visit Completed"
    );


  const completedFieldTasks =
    assignedFieldTasks.filter(
      (task) =>
        task.status ===
        "Visit Completed"
    );


  const totalAssigned =
    assignedCases.length +
    assignedFieldTasks.length;


  const totalPending =
    pendingCases.length +
    pendingFieldTasks.length;


  const totalCompleted =
    completedCases.length +
    completedFieldTasks.length;


  /* ================= UI ================= */

  return (
    <DashboardLayout role="Field Worker">

      {/* HEADER */}

      <div>

        <p className="text-sm font-medium text-green-700">
          Field Operations
        </p>

        <h1 className="mt-1 text-3xl font-bold text-gray-900">
          Field Worker Dashboard
        </h1>

        <p className="mt-2 text-gray-600">
          View assigned livestock cases, respond to
          village health signals and record field visit outcomes.
        </p>

      </div>


      {/* INFORMATION */}

      <div className="mt-6 flex gap-3 rounded-xl border border-blue-100 bg-blue-50 p-5">

        <Stethoscope
          size={21}
          className="mt-0.5 shrink-0 text-blue-700"
        />

        <div>

          <p className="font-semibold text-blue-900">
            Field response workflow
          </p>

          <p className="mt-1 text-sm leading-6 text-blue-800">
            Review assignments from veterinary staff,
            visit the livestock location, record observations
            and submit the field response.
          </p>

        </div>

      </div>


      {/* SUMMARY */}

      <div className="mt-6 grid gap-5 md:grid-cols-3">

        <SummaryCard
          icon={
            <AlertTriangle size={21} />
          }
          title="Assigned Tasks"
          value={totalAssigned}
          description="Tasks assigned to you"
        />


        <SummaryCard
          icon={
            <ClipboardList size={21} />
          }
          title="Pending Visits"
          value={totalPending}
          description="Visits requiring action"
        />


        <SummaryCard
          icon={
            <CheckCircle size={21} />
          }
          title="Completed Visits"
          value={totalCompleted}
          description="Visits completed"
        />

      </div>


      {/* NEW VETERINARY TASKS */}

      {assignedFieldTasks.length > 0 && (

        <section className="mt-8">

          <div className="mb-4">

            <h2 className="text-xl font-bold text-gray-900">
              Veterinary Field Assignments
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Village response tasks assigned by veterinary staff.
            </p>

          </div>


          <div className="space-y-4">

            {assignedFieldTasks.map(
              (task) => (

                <FieldTask
                  key={task.id}
                  task={task}
                  onStart={startFieldTask}
                  onComplete={
                    openFieldTaskForm
                  }
                  showForm={
                    showForm === task.id
                  }
                  notes={notes}
                  setNotes={setNotes}
                  completeTask={
                    completeFieldTask
                  }
                />

              )
            )}

          </div>

        </section>

      )}


      {/* EXISTING CASES */}

      <section className="mt-8 rounded-2xl border border-gray-200 bg-white">

        <div className="border-b border-gray-200 p-6">

          <h2 className="text-lg font-bold text-gray-900">
            Assigned Livestock Cases
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Individual cases assigned through the veterinary case workflow.
          </p>

        </div>


        {assignedCases.length === 0 ? (

          <div className="p-10 text-center">

            <ClipboardList
              size={38}
              className="mx-auto text-gray-300"
            />

            <h3 className="mt-4 font-semibold text-gray-900">
              No individual cases
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Individual cases assigned by a veterinarian
              will appear here.
            </p>

          </div>

        ) : (

          <div className="divide-y divide-gray-100">

            {assignedCases.map(
              (caseItem) => (

                <FieldCase
                  key={caseItem.id}
                  caseItem={caseItem}
                  onStart={startVisit}
                  onComplete={
                    openCompleteForm
                  }
                  showForm={
                    showForm === caseItem.id
                  }
                  notes={notes}
                  setNotes={setNotes}
                  completeVisit={
                    completeVisit
                  }
                />

              )
            )}

          </div>

        )}

      </section>


      {/* SAFETY NOTE */}

      <div className="mt-6 rounded-xl border border-green-100 bg-green-50 p-5">

        <p className="text-sm font-semibold text-green-800">
          Field observation record
        </p>

        <p className="mt-1 text-sm leading-6 text-green-700">
          Field observations are recorded for veterinary
          review. They do not replace examination, laboratory
          testing or professional veterinary diagnosis.
        </p>

      </div>

    </DashboardLayout>
  );
}


/* ================================================= */
/* SUMMARY CARD */
/* ================================================= */

function SummaryCard({
  icon,
  title,
  value,
  description,
}) {

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">
        {icon}
      </div>

      <p className="mt-5 text-sm text-gray-500">
        {title}
      </p>

      <p className="mt-1 text-2xl font-bold text-gray-900">
        {value}
      </p>

      <p className="mt-1 text-xs text-gray-500">
        {description}
      </p>

    </div>
  );
}


/* ================================================= */
/* NEW FIELD TASK */
/* ================================================= */

function FieldTask({
  task,
  onStart,
  onComplete,
  showForm,
  notes,
  setNotes,
  completeTask,
}) {

  const priorityColor =
    task.priority === "High"
      ? "bg-red-100 text-red-700"
      : task.priority === "Moderate"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";


  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      {/* HEADER */}

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

        <div>

          <div className="flex flex-wrap items-center gap-3">

            <MapPin
              size={19}
              className="text-gray-500"
            />

            <h3 className="text-lg font-bold text-gray-900">
              {task.village}
            </h3>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityColor}`}
            >
              {task.priority} Priority
            </span>

            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
              {task.status}
            </span>

          </div>


          <p className="mt-2 text-sm text-gray-500">
            Task ID: {task.id}
          </p>

        </div>

      </div>


      {/* TASK DETAILS */}

      <div className="mt-5 grid gap-3 md:grid-cols-3">

        <Info
          label="Health Reports"
          value={task.reportCount}
        />

        <Info
          label="Affected Animals"
          value={task.affectedAnimals}
        />

        <Info
          label="Severe Reports"
          value={task.severeReports}
        />

      </div>


      {/* SYMPTOMS */}

      {task.symptoms?.length > 0 && (

        <div className="mt-5">

          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Reported Symptoms
          </p>

          <div className="mt-2 flex flex-wrap gap-2">

            {task.symptoms.map(
              ([symptom, count]) => (

                <span
                  key={symptom}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                >
                  {symptom} · {count}
                </span>

              )
            )}

          </div>

        </div>

      )}


      {/* SUGGESTED ACTION */}

      <div className="mt-5 rounded-xl bg-gray-50 p-4">

        <p className="text-xs font-semibold text-gray-500">
          Veterinary Instructions
        </p>

        <p className="mt-1 text-sm font-semibold text-gray-800">
          {task.action}
        </p>

      </div>


      {/* COMPLETED NOTES */}

      {task.visitNotes && (

        <div className="mt-5 rounded-xl border border-green-100 bg-green-50 p-4">

          <p className="text-xs font-semibold text-green-800">
            Field Visit Observation
          </p>

          <p className="mt-1 text-sm text-green-900">
            {task.visitNotes}
          </p>

        </div>

      )}


      {/* ACTIONS */}

      {task.status !== "Visit Completed" && (

        <div className="mt-5 flex flex-wrap gap-3">

          {task.status !==
            "Visit In Progress" && (

            <button
              type="button"
              onClick={() =>
                onStart(task.id)
              }
              className="inline-flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800"
            >
              <Play size={16} />
              Start Visit
            </button>

          )}


          {(task.status ===
            "Visit In Progress" ||
            task.status ===
            "Assigned") && (

            <button
              type="button"
              onClick={() =>
                onComplete(task.id)
              }
              className="inline-flex items-center gap-2 rounded-lg border border-green-700 px-4 py-2 text-sm font-semibold text-green-700 hover:bg-green-50"
            >
              <ClipboardCheck size={16} />
              Complete Visit
            </button>

          )}

        </div>

      )}


      {/* VISIT FORM */}

      {showForm && (

        <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-5">

          <h4 className="font-semibold text-gray-900">
            Record Field Visit
          </h4>

          <p className="mt-1 text-sm text-gray-500">
            Record the observation made during the village visit.
          </p>


          <textarea
            value={notes}
            onChange={(event) =>
              setNotes(event.target.value)
            }
            rows={4}
            placeholder="Example: Visited the village and reviewed the reported animals. Observed reduced appetite and mild weakness. Farmer was advised to follow veterinary guidance."
            className="mt-4 w-full resize-none rounded-lg border border-gray-300 bg-white p-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
          />


          <div className="mt-3 flex gap-3">

            <button
              type="button"
              onClick={() =>
                completeTask(task.id)
              }
              className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800"
            >
              Submit Visit
            </button>


            <button
              type="button"
              onClick={() =>
                setNotes("")
              }
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700"
            >
              Clear
            </button>

          </div>

        </div>

      )}

    </div>
  );
}


/* ================================================= */
/* EXISTING FIELD CASE */
/* ================================================= */

function FieldCase({
  caseItem,
  onStart,
  onComplete,
  showForm,
  notes,
  setNotes,
  completeVisit,
}) {

  const priorityColor =
    caseItem.priority === "High"
      ? "bg-red-100 text-red-700"
      : caseItem.priority === "Medium"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";


  return (
    <div className="p-6">

      {/* HEADER */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <div className="flex flex-wrap items-center gap-3">

            <h3 className="text-lg font-bold text-gray-900">
              {caseItem.animalName}
            </h3>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityColor}`}
            >
              {caseItem.priority} Priority
            </span>

            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
              {caseItem.status}
            </span>

          </div>


          <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">

            <span className="flex items-center gap-1">
              <MapPin size={15} />
              {caseItem.location}
            </span>

            <span>
              Case: {caseItem.id}
            </span>

          </div>

        </div>

      </div>


      {/* CASE DETAILS */}

      <div className="mt-5 grid gap-3 md:grid-cols-3">

        <div className="rounded-lg bg-gray-50 p-4">

          <p className="text-xs text-gray-500">
            Symptoms
          </p>

          <p className="mt-1 text-sm font-semibold text-gray-800">
            {caseItem.symptoms?.join(", ") ||
              "Not recorded"}
          </p>

        </div>


        <div className="rounded-lg bg-gray-50 p-4">

          <p className="text-xs text-gray-500">
            Visit Date
          </p>

          <p className="mt-1 text-sm font-semibold text-gray-800">
            {caseItem.visitDate ||
              "Not scheduled"}
          </p>

        </div>


        <div className="rounded-lg bg-gray-50 p-4">

          <p className="text-xs text-gray-500">
            Severity
          </p>

          <p className="mt-1 text-sm font-semibold text-gray-800">
            {caseItem.severity}
          </p>

        </div>

      </div>


      {/* PREVIOUS NOTES */}

      {caseItem.visitNotes && (

        <div className="mt-5 rounded-xl border border-green-100 bg-green-50 p-4">

          <p className="text-xs font-semibold text-green-800">
            Visit Observation
          </p>

          <p className="mt-1 text-sm text-green-900">
            {caseItem.visitNotes}
          </p>

        </div>

      )}


      {/* ACTIONS */}

      {caseItem.status !==
        "Visit Completed" && (

        <div className="mt-5 flex flex-wrap gap-3">

          {caseItem.status !==
            "Visit In Progress" && (

            <button
              type="button"
              onClick={() =>
                onStart(caseItem.id)
              }
              className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800"
            >
              Start Visit
            </button>

          )}


          {(caseItem.status ===
            "Visit In Progress" ||
            caseItem.status ===
            "Visit Scheduled" ||
            caseItem.status ===
            "Assigned") && (

            <button
              type="button"
              onClick={() =>
                onComplete(caseItem.id)
              }
              className="rounded-lg border border-green-700 px-4 py-2 text-sm font-semibold text-green-700 hover:bg-green-50"
            >
              Complete Visit
            </button>

          )}

        </div>

      )}


      {/* VISIT FORM */}

      {showForm && (

        <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-5">

          <h4 className="font-semibold text-gray-900">
            Record Field Visit
          </h4>

          <p className="mt-1 text-sm text-gray-500">
            Record the observation made during the visit.
          </p>


          <textarea
            value={notes}
            onChange={(event) =>
              setNotes(event.target.value)
            }
            rows={4}
            placeholder="Example: Animal observed with reduced appetite and mild nasal discharge. Temperature recorded and farmer advised to maintain isolation until veterinary review."
            className="mt-4 w-full rounded-lg border border-gray-300 bg-white p-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
          />


          <div className="mt-3 flex gap-3">

            <button
              type="button"
              onClick={() =>
                completeVisit(
                  caseItem.id
                )
              }
              className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800"
            >
              Submit Visit
            </button>


            <button
              type="button"
              onClick={() =>
                setNotes("")
              }
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700"
            >
              Clear
            </button>

          </div>

        </div>

      )}

    </div>
  );
}


/* ================================================= */
/* INFO */
/* ================================================= */

function Info({
  label,
  value,
}) {

  return (
    <div className="rounded-lg bg-gray-50 p-4">

      <p className="text-xs text-gray-500">
        {label}
      </p>

      <p className="mt-1 text-lg font-bold text-gray-800">
        {value}
      </p>

    </div>
  );
}


export default FieldWorkerDashboard;
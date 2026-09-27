import {
  ArrowLeft,
  FlaskConical,
  Plus,
  Search,
  CheckCircle2,
  Clock3,
  AlertTriangle,
} from "lucide-react";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  getLabReferrals,
  createLabReferral,
  recordLabResult,
  escalateLabCase,
} from "../data/labService";


function LaboratoryReferrals() {

  const [referrals, setReferrals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    caseId: "",
    animalId: "",
    animalName: "",
    species: "",
    location: "",
    sampleType: "Blood",
    suspectedCondition: "",
    collectedBy: "Veterinary Field Team",
  });


  useEffect(() => {
    loadReferrals();
  }, []);


  function loadReferrals() {
    setReferrals(getLabReferrals());
  }


  function handleChange(event) {

    const {
      name,
      value,
    } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

  }


  function handleCreateReferral(event) {

    event.preventDefault();


    if (
      !form.animalName ||
      !form.location ||
      !form.sampleType ||
      !form.suspectedCondition
    ) {

      alert(
        "Please fill in the required fields."
      );

      return;
    }


    createLabReferral(form);

    setForm({
      caseId: "",
      animalId: "",
      animalName: "",
      species: "",
      location: "",
      sampleType: "Blood",
      suspectedCondition: "",
      collectedBy: "Veterinary Field Team",
    });

    setShowForm(false);

    loadReferrals();

  }


  function handleResult(
    referralId
  ) {

    const result =
      window.prompt(
        "Enter laboratory result:"
      );


    if (!result) {
      return;
    }


    recordLabResult(
      referralId,
      result
    );


    loadReferrals();

  }


  function handleEscalate(
    referralId
  ) {

    escalateLabCase(
      referralId,
      "Escalated for Veterinary Action"
    );


    loadReferrals();

  }


  const filteredReferrals =
    referrals.filter(
      (referral) => {

        const search =
          searchTerm
            .toLowerCase()
            .trim();


        if (!search) {
          return true;
        }


        return (

          referral.animalName
            ?.toLowerCase()
            .includes(search) ||

          referral.species
            ?.toLowerCase()
            .includes(search) ||

          referral.location
            ?.toLowerCase()
            .includes(search) ||

          referral.sampleType
            ?.toLowerCase()
            .includes(search) ||

          referral.id
            ?.toLowerCase()
            .includes(search)

        );

      }
    );


  const pending =
    referrals.filter(
      (referral) =>
        referral.status ===
        "Sample Collected"
    ).length;


  const resultsAvailable =
    referrals.filter(
      (referral) =>
        referral.status ===
        "Result Available"
    ).length;


  const escalated =
    referrals.filter(
      (referral) =>
        referral.escalationStatus ===
        "Escalated for Veterinary Action"
    ).length;


  return (

    <DashboardLayout role="Veterinarian">

      {/* HEADER */}

      <div className="mb-8">

        <Link
          to="/veterinarian"
          className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-800"
        >
          <ArrowLeft size={16} />
          Back to Veterinarian Dashboard
        </Link>


        <p className="mt-6 text-sm font-medium text-green-700">
          Diagnostic Workflow
        </p>


        <h1 className="mt-1 text-3xl font-bold text-gray-900">
          Laboratory Referrals
        </h1>


        <p className="mt-2 max-w-3xl text-gray-600">
          Manage sample collection, laboratory referral,
          result recording and veterinary case escalation.
        </p>

      </div>


      {/* INFORMATION BANNER */}

      <div className="flex gap-3 rounded-xl border border-blue-100 bg-blue-50 p-5">

        <FlaskConical
          size={21}
          className="mt-0.5 shrink-0 text-blue-700"
        />


        <div>

          <p className="font-semibold text-blue-900">
            Diagnostic support workflow
          </p>


          <p className="mt-1 text-sm leading-6 text-blue-800">
            This prototype records the diagnostic workflow
            from sample collection through laboratory referral
            and result-based case escalation.
          </p>

        </div>

      </div>


      {/* SUMMARY */}

      <div className="mt-6 grid gap-5 md:grid-cols-4">

        <SummaryCard
          icon={<FlaskConical size={21} />}
          title="Total Referrals"
          value={referrals.length}
          description="Recorded laboratory referrals"
        />


        <SummaryCard
          icon={<Clock3 size={21} />}
          title="Pending Results"
          value={pending}
          description="Samples awaiting results"
        />


        <SummaryCard
          icon={<CheckCircle2 size={21} />}
          title="Results Available"
          value={resultsAvailable}
          description="Laboratory results recorded"
        />


        <SummaryCard
          icon={<AlertTriangle size={21} />}
          title="Escalated"
          value={escalated}
          description="Cases requiring action"
        />

      </div>


      {/* ACTION BAR */}

      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div className="relative flex-1">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />


            <input
              type="text"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(
                  event.target.value
                )
              }
              placeholder="Search animal, village, sample type or referral ID..."
              className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />

          </div>


          <button
            type="button"
            onClick={() =>
              setShowForm(
                !showForm
              )
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-sm font-semibold text-white hover:bg-green-800"
          >

            <Plus size={18} />

            New Sample Referral

          </button>

        </div>

      </div>


      {/* NEW REFERRAL FORM */}

      {showForm && (

        <form
          onSubmit={
            handleCreateReferral
          }
          className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-6"
        >

          <div className="mb-5">

            <h2 className="text-lg font-bold text-gray-900">
              Create Laboratory Referral
            </h2>


            <p className="mt-1 text-sm text-gray-600">
              Record the sample collected from the animal
              and refer it for laboratory investigation.
            </p>

          </div>


          <div className="grid gap-5 md:grid-cols-2">

            <FormField
              label="Animal Name *"
              name="animalName"
              value={form.animalName}
              onChange={handleChange}
              placeholder="e.g. Ganga"
            />


            <FormField
              label="Animal ID"
              name="animalId"
              value={form.animalId}
              onChange={handleChange}
              placeholder="e.g. AN002"
            />


            <FormField
              label="Species"
              name="species"
              value={form.species}
              onChange={handleChange}
              placeholder="e.g. Cow"
            />


            <FormField
              label="Village / Location *"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. Village A"
            />


            <div>

              <label className="text-sm font-semibold text-gray-700">
                Sample Type *
              </label>


              <select
                name="sampleType"
                value={form.sampleType}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
              >

                <option value="Blood">
                  Blood
                </option>

                <option value="Serum">
                  Serum
                </option>

                <option value="Swab">
                  Swab
                </option>

                <option value="Fecal Sample">
                  Fecal Sample
                </option>

                <option value="Urine">
                  Urine
                </option>

                <option value="Tissue">
                  Tissue
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

            </div>


            <FormField
              label="Case ID"
              name="caseId"
              value={form.caseId}
              onChange={handleChange}
              placeholder="e.g. CASE-123"
            />


            <div className="md:col-span-2">

              <FormField
                label="Suspected Condition *"
                name="suspectedCondition"
                value={form.suspectedCondition}
                onChange={handleChange}
                placeholder="e.g. Suspected infectious disease"
              />

            </div>

          </div>


          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={() =>
                setShowForm(false)
              }
              className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>


            <button
              type="submit"
              className="rounded-xl bg-green-700 px-5 py-3 text-sm font-semibold text-white hover:bg-green-800"
            >
              Create Referral
            </button>

          </div>

        </form>

      )}


      {/* REFERRALS */}

      <section className="mt-8 rounded-2xl border border-gray-200 bg-white">

        <div className="border-b border-gray-200 p-6">

          <h2 className="text-lg font-bold text-gray-900">
            Laboratory Referral Records
          </h2>


          <p className="mt-1 text-sm text-gray-500">
            {filteredReferrals.length} referral
            {filteredReferrals.length !== 1
              ? "s"
              : ""} displayed.
          </p>

        </div>


        {filteredReferrals.length === 0 ? (

          <div className="p-10 text-center">

            <FlaskConical
              size={42}
              className="mx-auto text-gray-300"
            />


            <h3 className="mt-4 font-semibold text-gray-900">
              No laboratory referrals
            </h3>


            <p className="mt-1 text-sm text-gray-500">
              Create a sample referral when a veterinary
              case requires laboratory investigation.
            </p>

          </div>

        ) : (

          <div className="divide-y divide-gray-100">

            {filteredReferrals.map(
              (referral) => (

                <ReferralCard
                  key={referral.id}
                  referral={referral}
                  onResult={
                    handleResult
                  }
                  onEscalate={
                    handleEscalate
                  }
                />

              )
            )}

          </div>

        )}

      </section>


      {/* DISCLAIMER */}

      <div className="mt-6 rounded-xl border border-yellow-100 bg-yellow-50 p-5">

        <p className="text-sm font-semibold text-yellow-900">
          Diagnostic workflow note
        </p>


        <p className="mt-1 text-sm leading-6 text-yellow-800">
          Laboratory referrals shown here represent a prototype
          workflow. Actual sample transport, laboratory processing,
          diagnostic interpretation and official reporting would
          require integration with authorized veterinary laboratories.
        </p>

      </div>

    </DashboardLayout>

  );
}


/* =========================================================
   SUMMARY CARD
========================================================= */

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


/* =========================================================
   FORM FIELD
========================================================= */

function FormField({
  label,
  name,
  value,
  onChange,
  placeholder,
}) {

  return (

    <div>

      <label className="text-sm font-semibold text-gray-700">
        {label}
      </label>


      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
      />

    </div>

  );
}


/* =========================================================
   REFERRAL CARD
========================================================= */

function ReferralCard({
  referral,
  onResult,
  onEscalate,
}) {

  const statusStyle =
    referral.status ===
    "Result Available"
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700";


  const escalationStyle =
    referral.escalationStatus ===
    "Escalated for Veterinary Action"
      ? "bg-red-100 text-red-700"
      : "bg-gray-100 text-gray-700";


  return (

    <div className="p-6">

      <div className="flex flex-col gap-5">

        {/* HEADER */}

        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

          <div>

            <div className="flex flex-wrap items-center gap-3">

              <h3 className="text-lg font-bold text-gray-900">
                {referral.animalName}
              </h3>


              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle}`}
              >
                {referral.status}
              </span>


              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${escalationStyle}`}
              >
                {referral.escalationStatus}
              </span>

            </div>


            <p className="mt-2 text-sm text-gray-500">
              {referral.species} · {referral.id}
            </p>

          </div>

        </div>


        {/* DETAILS */}

        <div className="grid gap-3 md:grid-cols-4">

          <InfoBox
            label="Location"
            value={referral.location}
          />


          <InfoBox
            label="Sample"
            value={referral.sampleType}
          />


          <InfoBox
            label="Laboratory"
            value={referral.laboratory}
          />


          <InfoBox
            label="Case ID"
            value={
              referral.caseId ||
              "Not linked"
            }
          />

        </div>


        {/* CONDITION */}

        <div className="rounded-xl bg-gray-50 p-4">

          <p className="text-xs font-semibold text-gray-500">
            Suspected Condition
          </p>


          <p className="mt-1 text-sm font-semibold text-gray-800">
            {referral.suspectedCondition}
          </p>

        </div>


        {/* RESULT */}

        {referral.result && (

          <div className="rounded-xl border border-green-100 bg-green-50 p-4">

            <p className="text-xs font-semibold text-green-700">
              Laboratory Result
            </p>


            <p className="mt-1 text-sm font-semibold text-gray-900">
              {referral.result}
            </p>


            {referral.resultDate && (

              <p className="mt-1 text-xs text-gray-500">
                Recorded:{" "}
                {new Date(
                  referral.resultDate
                ).toLocaleDateString()}
              </p>

            )}

          </div>

        )}


        {/* ACTIONS */}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">

          {referral.status !==
            "Result Available" && (

            <button
              type="button"
              onClick={() =>
                onResult(
                  referral.id
                )
              }
              className="rounded-lg border border-green-700 px-4 py-2 text-sm font-semibold text-green-700 hover:bg-green-50"
            >
              Record Lab Result
            </button>

          )}


          {referral.escalationStatus !==
            "Escalated for Veterinary Action" && (

            <button
              type="button"
              onClick={() =>
                onEscalate(
                  referral.id
                )
              }
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Escalate Case
            </button>

          )}

        </div>

      </div>

    </div>

  );
}


/* =========================================================
   INFO BOX
========================================================= */

function InfoBox({
  label,
  value,
}) {

  return (

    <div className="rounded-lg bg-gray-50 p-4">

      <p className="text-xs text-gray-500">
        {label}
      </p>


      <p className="mt-1 text-sm font-semibold text-gray-800">
        {value}
      </p>

    </div>

  );
}


export default LaboratoryReferrals;
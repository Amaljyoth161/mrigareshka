import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  PawPrint,
  Save,
} from "lucide-react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import { getAnimals, saveAnimals } from "../data/animals";

function AddAnimal() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    species: "Cow",
    breed: "",
    age: "",
    weight: "",
    sex: "Female",
    color: "",
    location: "",
    lastCheckup: "",
    vaccinationStatus: "Up to date",
    nextVaccinationDate: "",
    status: "Healthy",
  });

  const [saved, setSaved] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const existingAnimals = getAnimals();

    const newAnimal = {
      id: `AN${String(existingAnimals.length + 1).padStart(3, "0")}`,

      name: formData.name,
      species: formData.species,
      breed: formData.breed,

      age: Number(formData.age),
      weight: Number(formData.weight),

      sex: formData.sex,
      color: formData.color,
      location: formData.location,

      status: formData.status,

      vaccinationStatus: formData.vaccinationStatus,

      nextVaccinationDate:
        formData.nextVaccinationDate || null,

      lastCheckup:
        formData.lastCheckup || "Not recorded",

      healthHistory: [],
      vaccinationHistory: [],
      treatmentHistory: [],
    };

    const updatedAnimals = [
      ...existingAnimals,
      newAnimal,
    ];

    saveAnimals(updatedAnimals);

    setSaved(true);

    setTimeout(() => {
      navigate("/farmer/animals");
    }, 1200);
  }

  if (saved) {
    return (
      <DashboardLayout role="Farmer">
        <div className="flex min-h-[65vh] items-center justify-center">
          <div className="w-full max-w-md rounded-2xl border border-green-200 bg-white p-8 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700">
              <CheckCircle2 size={32} />
            </div>

            <h1 className="mt-5 text-2xl font-bold text-gray-900">
              Animal Added Successfully
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              {formData.name} has been added to your livestock records.
            </p>

            <p className="mt-4 text-xs text-gray-400">
              Returning to My Animals...
            </p>

          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="Farmer">

      <div className="mx-auto max-w-4xl">

        {/* BACK */}

        <Link
          to="/farmer/animals"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-green-700"
        >
          <ArrowLeft size={17} />
          Back to My Animals
        </Link>

        {/* HEADER */}

        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
              <PawPrint size={25} />
            </div>

            <div>

              <p className="text-sm font-medium text-green-700">
                Livestock Management
              </p>

              <h1 className="mt-1 text-2xl font-bold text-gray-900 md:text-3xl">
                Add New Animal
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                Register a livestock animal and create its initial health
                record.
              </p>

            </div>

          </div>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-6"
        >

          {/* BASIC INFORMATION */}

          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">

            <SectionTitle
              title="Basic Information"
              description="Enter the animal's identification and physical details."
            />

            <div className="mt-6 grid gap-5 md:grid-cols-2">

              <InputField
                label="Animal Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Lakshmi"
                required
              />

              <SelectField
                label="Species"
                name="species"
                value={formData.species}
                onChange={handleChange}
                options={[
                  "Cow",
                  "Buffalo",
                  "Goat",
                  "Sheep",
                  "Other",
                ]}
              />

              <InputField
                label="Breed"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                placeholder="e.g. Jersey"
                required
              />

              <InputField
                label="Age"
                name="age"
                type="number"
                min="0"
                value={formData.age}
                onChange={handleChange}
                placeholder="Age in years"
                required
              />

              <InputField
                label="Weight"
                name="weight"
                type="number"
                min="0"
                value={formData.weight}
                onChange={handleChange}
                placeholder="Weight in kg"
                required
              />

              <SelectField
                label="Sex"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                options={[
                  "Female",
                  "Male",
                ]}
              />

              <InputField
                label="Color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="e.g. Brown"
              />

              <InputField
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Village A"
                required
              />

            </div>

          </section>

          {/* HEALTH INFORMATION */}

          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">

            <SectionTitle
              title="Initial Health Information"
              description="Record the current health and vaccination status."
            />

            <div className="mt-6 grid gap-5 md:grid-cols-2">

              <SelectField
                label="Current Health Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                options={[
                  "Healthy",
                  "Under Review",
                  "Needs Attention",
                ]}
              />

              <SelectField
                label="Vaccination Status"
                name="vaccinationStatus"
                value={formData.vaccinationStatus}
                onChange={handleChange}
                options={[
                  "Up to date",
                  "Due Soon",
                  "Due",
                  "Overdue",
                  "Not recorded",
                ]}
              />

              <InputField
                label="Last Check-up"
                name="lastCheckup"
                type="date"
                value={formData.lastCheckup}
                onChange={handleChange}
              />

              <InputField
                label="Next Vaccination Date"
                name="nextVaccinationDate"
                type="date"
                value={formData.nextVaccinationDate}
                onChange={handleChange}
              />

            </div>

          </section>

          {/* INFORMATION NOTE */}

          <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">

            <div className="flex items-start gap-3">

              <CalendarDays
                size={20}
                className="mt-0.5 shrink-0 text-blue-700"
              />

              <div>

                <p className="text-sm font-semibold text-blue-800">
                  Health record setup
                </p>

                <p className="mt-1 text-sm leading-6 text-blue-700">
                  After registration, you can open the animal's Health
                  Passport to report health issues, review vaccination
                  records and access nutrition guidance.
                </p>

              </div>

            </div>

          </div>

          {/* ACTIONS */}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <Link
              to="/farmer/animals"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
            >
              <Save size={18} />
              Save Animal
            </button>

          </div>

        </form>

      </div>

    </DashboardLayout>
  );
}

/* SECTION TITLE */

function SectionTitle({
  title,
  description,
}) {
  return (
    <div>

      <h2 className="text-lg font-bold text-gray-900">
        {title}
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        {description}
      </p>

    </div>
  );
}

/* INPUT */

function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  min,
}) {
  return (
    <div>

      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        {label}

        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
      />

    </div>
  );
}

/* SELECT */

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <div>

      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>

    </div>
  );
}

export default AddAnimal;
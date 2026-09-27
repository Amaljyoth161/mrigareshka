import { BrowserRouter, Routes, Route } from "react-router-dom";

// ================= HOME =================
import Home from "./pages/Home";
import RoleSelection from "./pages/RoleSelection";

// ================= FARMER =================
import FarmerDashboard from "./pages/FarmerDashboard";
import MyAnimals from "./pages/MyAnimals";
import AddAnimal from "./pages/AddAnimal";
import AnimalProfile from "./pages/AnimalProfile";
import ReportHealthIssue from "./pages/ReportHealthIssue";
import NutritionAssistant from "./pages/NutritionAssistant";
import HealthReports from "./pages/HealthReports";
import FarmerVaccination from "./pages/FarmerVaccination";
import GovernmentSupport from "./pages/GovernmentSupport";
import KnowledgeHub from "./pages/KnowledgeHub";
import InsuranceSupport from "./pages/InsuranceSupport";
import FinanceSchemeAssistant from "./pages/FinanceSchemeAssistant";
import Marketplace from "./pages/Marketplace";
import IVRReporting from "./pages/IVRReporting";
import OfflineSyncReporting from "./pages/OfflineSyncReporting";
import FarmerAdvisories from "./pages/FarmerAdvisories";

// ================= VETERINARIAN =================
import VeterinarianDashboard from "./pages/VeterinarianDashboard";
import VillageHealthIntelligence from "./pages/VillageHealthIntelligence";
import VaccinationIntelligence from "./pages/VaccinationIntelligence";
import VeterinaryPriority from "./pages/VeterinaryPriority";

import VeterinaryCases from "./pages/VeterinaryCases";
import VeterinaryAnimals from "./pages/VeterinaryAnimals";
import VeterinarySignals from "./pages/VeterinarySignals";
import VeterinaryAlerts from "./pages/VeterinaryAlerts";

import RegionalHealthIntelligence from "./pages/RegionalHealthIntelligence";
import LaboratoryReferrals from "./pages/LaboratoryReferrals";

// ================= FIELD WORKER =================
import FieldWorkerDashboard from "./pages/FieldWorkerDashboard";
import FieldWorkerAssignedVisits from "./pages/FieldWorkerAssignedVisits";
import FieldWorkerVillages from "./pages/FieldWorkerVillages";
import FieldWorkerVaccination from "./pages/FieldWorkerVaccination";
import FieldWorkerReports from "./pages/FieldWorkerReports";

// ================= ADMIN =================
import AdminDashboard from "./pages/AdminDashboard";
import AdminHealthIntelligence from "./pages/AdminHealthIntelligence";
import AdminVillageMonitoring from "./pages/AdminVillageMonitoring";
import AdminVaccination from "./pages/AdminVaccination";
import AdminVeterinaryResources from "./pages/AdminVeterinaryResources";
import AdminReports from "./pages/AdminReports";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* ROLE SELECTION */}
        <Route path="/roles" element={<RoleSelection />} />

        {/* FARMER */}
        <Route path="/farmer" element={<FarmerDashboard />} />
        <Route path="/farmer/animals" element={<MyAnimals />} />
        <Route path="/farmer/animals/add" element={<AddAnimal />} />
        <Route path="/farmer/animals/:animalId" element={<AnimalProfile />} />
        <Route path="/farmer/animals/:animalId/nutrition" element={<NutritionAssistant />} />
        <Route path="/farmer/animals/:animalId/report" element={<ReportHealthIssue />} />
        <Route path="/farmer/health-reports" element={<HealthReports />} />
        <Route path="/farmer/reports" element={<HealthReports />} />
        <Route path="/farmer/vaccination" element={<FarmerVaccination />} />
        <Route path="/farmer/vaccinations" element={<FarmerVaccination />} />
        <Route path="/farmer/government-support" element={<GovernmentSupport />} />
        <Route path="/farmer/support" element={<GovernmentSupport />} />
        <Route path="/farmer/knowledge" element={<KnowledgeHub />} />
        <Route path="/farmer/insurance-support" element={<InsuranceSupport />} />
        <Route path="/farmer/finance-schemes" element={<FinanceSchemeAssistant />} />
        <Route path="/farmer/marketplace" element={<Marketplace />} />
        <Route path="/farmer/ivr-report" element={<IVRReporting />} />
        <Route path="/farmer/offline-report" element={<OfflineSyncReporting />} />
        <Route path="/farmer/advisories" element={<FarmerAdvisories />} />

        {/* VETERINARIAN */}
        <Route path="/veterinarian" element={<VeterinarianDashboard />} />
        <Route path="/veterinarian/village-intelligence" element={<VillageHealthIntelligence />} />
        <Route path="/veterinarian/vaccination-intelligence" element={<VaccinationIntelligence />} />
        <Route path="/veterinarian/priority" element={<VeterinaryPriority />} />
        <Route path="/veterinarian/cases" element={<VeterinaryCases />} />
        <Route path="/veterinarian/animals" element={<VeterinaryAnimals />} />
        <Route path="/veterinarian/signals" element={<VeterinarySignals />} />
        <Route path="/veterinarian/alerts" element={<VeterinaryAlerts />} />
        <Route path="/veterinarian/regional-intelligence" element={<RegionalHealthIntelligence />} />
        <Route path="/veterinarian/laboratory" element={<LaboratoryReferrals />} />

        {/* FIELD WORKER */}
        <Route path="/field-worker" element={<FieldWorkerDashboard />} />
        <Route path="/field-worker/visits" element={<FieldWorkerAssignedVisits />} />
        <Route path="/field-worker/villages" element={<FieldWorkerVillages />} />
        <Route path="/field-worker/vaccination" element={<FieldWorkerVaccination />} />
        <Route path="/field-worker/reports" element={<FieldWorkerReports />} />

        {/* ADMIN / GOVERNMENT */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/intelligence" element={<AdminHealthIntelligence />} />
        <Route path="/admin/villages" element={<AdminVillageMonitoring />} />
        <Route path="/admin/vaccination" element={<AdminVaccination />} />
        <Route path="/admin/resources" element={<AdminVeterinaryResources />} />
        <Route path="/admin/reports" element={<AdminReports />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

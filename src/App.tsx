import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import { ScrollToTop } from "./components/common/ScrollToTop";

// === AITT Design Prototype (mock data only — for client review) ===
import { RoleProvider } from "./prototype/RoleContext";
import PrototypeLayout from "./prototype/PrototypeLayout";
import PublicVerify from "./prototype/pages/PublicVerify";
import PublicRegistry from "./prototype/pages/PublicRegistry";
import { SignIn, SignUp } from "./prototype/pages/Auth";
import { MyDocuments, SubmitDocument, Templates } from "./prototype/pages/Company";
import { ReviewQueue, ReviewHistory } from "./prototype/pages/Expert";
import {
  AdminDashboard,
  AdminDocuments,
  AdminCompanies,
  AdminExperts,
  AdminGovernance,
} from "./prototype/pages/Admin";
import CertificateDetail from "./prototype/pages/CertificateDetail";

export default function App() {
  return (
    <RoleProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Full-screen auth (no dashboard shell) */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Dashboard shell */}
          <Route element={<PrototypeLayout />}>
            <Route index element={<Navigate to="/verify" replace />} />

            {/* Public */}
            <Route path="/verify" element={<PublicVerify />} />
            <Route path="/registry" element={<PublicRegistry />} />

            {/* Company */}
            <Route path="/company" element={<MyDocuments />} />
            <Route path="/company/submit" element={<SubmitDocument />} />
            <Route path="/company/templates" element={<Templates />} />

            {/* Legal Expert */}
            <Route path="/expert" element={<ReviewQueue />} />
            <Route path="/expert/history" element={<ReviewHistory />} />

            {/* Admin */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/documents" element={<AdminDocuments />} />
            <Route path="/admin/companies" element={<AdminCompanies />} />
            <Route path="/admin/experts" element={<AdminExperts />} />
            <Route path="/admin/governance" element={<AdminGovernance />} />

            {/* Shared */}
            <Route path="/certificate/:id" element={<CertificateDetail />} />
          </Route>

          <Route path="*" element={<Navigate to="/verify" replace />} />
        </Routes>
      </Router>
    </RoleProvider>
  );
}

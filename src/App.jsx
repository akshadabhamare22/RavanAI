import React, { useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import Layout from "./components/Layout";

// ============================================================
// AUTH PAGES
// ============================================================

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// ============================================================
// ADMIN DASHBOARD
// ============================================================

import AdminDashboard from "./pages/admin/dashboard/Dashboard";
import UserDashboard from "./pages/admin/dashboard/Dashboard";

// ============================================================
// SUPERADMIN DASHBOARD
// ============================================================

import SuperadminDashboard from "./pages/superadmin/Dashboard";

// SUPERADMIN MODULES

import Organization from "./pages/superadmin/organizations/Organization";
import Users from "./pages/superadmin/users/Users";
import Credits from "./pages/superadmin/credits/Credits";
import Transactions from "./pages/superadmin/transactions/Transactions";
import Analytics from "./pages/superadmin/analytics/Analytics";
import AuditLogs from "./pages/superadmin/audit-logs/AuditLogs";

// ============================================================
// USER DASHBOARD
// ============================================================

// import UserDashboard from "./pages/dashboard/Dashboard";

// ============================================================
// ADMIN AGENTS
// ============================================================

import Agents from "./pages/admin/agents/Agents";
import CreateAgent from "./pages/admin/agents/CreateAgent";

import { WithFireLoader } from "./components/FireLoader";

// ============================================================
// KNOWLEDGE BASE
// ============================================================

import KnowledgeBase from "./pages/admin/knowledgebase/knowledge base/KnowledgeBase";
import Source from "./pages/admin/knowledgebase/source/Source";
import KnowledgeBaseDetails from "./pages/admin/knowledgebase/knowledge base/KnowledgeBaseDetails";

// ============================================================
// CAMPAIGNS
// ============================================================

import InboundCalls from "./pages/admin/inbound/InboundCalls";
import Outbound from "./pages/admin/outbound/Outboundcalls";
import AddCampaign from "./pages/admin/outbound/AddCampaign";

// ============================================================
// MANAGEMENT
// ============================================================

// CALLS - SINGLE MODULE IMPORT
import Calls from "./pages/admin/calls/Calls";
import Contacts from "./pages/admin/contacts/Contacts";
import Integrations from "./pages/admin/integrations/Integrations";

// ============================================================
// OPERATIONS
// ============================================================

import PhoneNumbers from "./pages/admin/phone-numbers/PhoneNumbers";
import Billing from "./pages/admin/billing/Billing";

// ============================================================
// SETTINGS
// ============================================================

import Settings from "./pages/settings/Settings";

// ============================================================
// SPLASH SCREEN
// ============================================================

import SplashScreen from "./pages/SplashScreen";

// ============================================================
// ROLE PERMISSIONS
// ============================================================

import {
  ROLES,
  normalizeRole,
  getRoleHome,
} from "./utils/permissionModules";

import "./App.css";

// ============================================================
// AUTHENTICATION HELPER
// ============================================================

const getAuthData = () => {
  try {
    const storedAuth = localStorage.getItem("ravanai_auth");

    if (!storedAuth) return null;

    const parsedAuth = JSON.parse(storedAuth);

    if (parsedAuth?.isAuthenticated !== true) {
      return null;
    }

    const user =
      parsedAuth.user ||
      parsedAuth.data?.user ||
      {};

    const rawRole =
      parsedAuth.role ||
      user.role ||
      user.role_name ||
      parsedAuth.data?.role;

    const role = normalizeRole(
      typeof rawRole === "object"
        ? rawRole?.name ||
          rawRole?.role ||
          rawRole?.value
        : rawRole
    );

    return {
      ...parsedAuth,
      user,
      role,
      isAuthenticated: true,
    };
  } catch (error) {
    console.error(
      "Authentication data parsing failed:",
      error
    );

    return null;
  }
};

// ============================================================
// CLEAR AUTHENTICATION
// ============================================================

const clearAuthentication = () => {
  localStorage.removeItem("ravanai_auth");
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("ravanai_user");
};

// ============================================================
// PROTECTED ROUTE
// ============================================================

const ProtectedRoute = ({
  allowedRoles,
  children,
}) => {
  const location = useLocation();
  const authData = getAuthData();

  // NOT AUTHENTICATED

  if (!authData) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // INVALID ROLE

  if (!authData.role) {
    clearAuthentication();

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // INACTIVE ACCOUNT

  if (authData.user?.is_active === false) {
    clearAuthentication();

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // ROLE-BASED ACCESS

  if (
    allowedRoles &&
    !allowedRoles.includes(authData.role)
  ) {
    return (
      <Navigate
        to={getRoleHome(authData.role)}
        replace
      />
    );
  }

  return children || <Outlet />;
};

// ============================================================
// ROLE CONSTANTS
// ============================================================

const ADMIN_ROLES = [
  ROLES.SUPERADMIN,
  ROLES.ADMIN,
];

// ============================================================
// APPLICATION
// ============================================================

function App() {
  const [showSplash, setShowSplash] = useState(true);

  // ==========================================================
  // SPLASH SCREEN
  // ==========================================================

  if (showSplash) {
    return (
      <SplashScreen
        onComplete={() => setShowSplash(false)}
      />
    );
  }

  // ==========================================================
  // ROUTER
  // ==========================================================

  return (
    <BrowserRouter>
      <Routes>

        {/* ==================================================
            PUBLIC ROUTES
        ================================================== */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ==================================================
            CREATE AGENT
        ================================================== */}

        <Route
          path="/agents/create"
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
              <WithFireLoader text="Preparing new agent...">
                <CreateAgent />
              </WithFireLoader>
            </ProtectedRoute>
          }
        />

        {/* ==================================================
            PROTECTED APPLICATION
            SIDEBAR + HEADER
        ================================================== */}

        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >

          {/* ==================================================
              DEFAULT DASHBOARD REDIRECT
          ================================================== */}

          <Route
            path="/"
            element={<RoleDashboardRedirect />}
          />

          {/* ==================================================
              SUPERADMIN DASHBOARD
          ================================================== */}

          <Route
            path="/superadmin/dashboard"
            element={
              <ProtectedRoute
                allowedRoles={[ROLES.SUPERADMIN]}
              >
                <SuperadminDashboard />
              </ProtectedRoute>
            }
          />

          {/* ==================================================
              SUPERADMIN ORGANIZATIONS
          ================================================== */}

          <Route
            path="/superadmin/organizations"
            element={
              <ProtectedRoute
                allowedRoles={[ROLES.SUPERADMIN]}
              >
                <Organization />
              </ProtectedRoute>
            }
          />

          {/* SUPERADMIN USERS */}

          <Route
            path="/superadmin/users"
            element={
              <ProtectedRoute
                allowedRoles={[ROLES.SUPERADMIN]}
              >
                <Users />
              </ProtectedRoute>
            }
          />

          {/* SUPERADMIN CREDITS */}

          <Route
            path="/superadmin/credits"
            element={
              <ProtectedRoute
                allowedRoles={[ROLES.SUPERADMIN]}
              >
                <Credits />
              </ProtectedRoute>
            }
          />

          {/* SUPERADMIN TRANSACTIONS */}

          <Route
            path="/superadmin/transactions"
            element={
              <ProtectedRoute
                allowedRoles={[ROLES.SUPERADMIN]}
              >
                <Transactions />
              </ProtectedRoute>
            }
          />

          {/* SUPERADMIN ANALYTICS */}

          <Route
            path="/superadmin/analytics"
            element={
              <ProtectedRoute
                allowedRoles={[ROLES.SUPERADMIN]}
              >
                <Analytics />
              </ProtectedRoute>
            }
          />

          {/* SUPERADMIN AUDIT LOGS */}

          <Route
            path="/superadmin/audit-logs"
            element={
              <ProtectedRoute
                allowedRoles={[ROLES.SUPERADMIN]}
              >
                <AuditLogs />
              </ProtectedRoute>
            }
          />

          {/* ==================================================
              ADMIN DASHBOARD
          ================================================== */}

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute
                allowedRoles={[ROLES.ADMIN]}
              >
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* ==================================================
              USER DASHBOARD
          ================================================== */}

          <Route
            path="/user/dashboard"
            element={
              <ProtectedRoute
                allowedRoles={[ROLES.USER]}
              >
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          {/* ==================================================
              BACKWARD COMPATIBILITY
          ================================================== */}

          <Route
            path="/dashboard"
            element={<RoleDashboardRedirect />}
          />

          {/* ==================================================
              AGENTS
          ================================================== */}

          <Route
            path="/agents"
            element={
              <ProtectedRoute allowedRoles={ADMIN_ROLES}>
                <Agents />
              </ProtectedRoute>
            }
          />

          {/* ==================================================
              KNOWLEDGE BASE
          ================================================== */}

          <Route
            path="/knowledge-base"
            element={
              <ProtectedRoute allowedRoles={ADMIN_ROLES}>
                <KnowledgeBase />
              </ProtectedRoute>
            }
          />

          <Route
            path="/knowledge-base/:knowledgeBaseId"
            element={
              <ProtectedRoute allowedRoles={ADMIN_ROLES}>
                <KnowledgeBaseDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/knowledge-base/:knowledgeBaseId/sources"
            element={
              <ProtectedRoute allowedRoles={ADMIN_ROLES}>
                <Source />
              </ProtectedRoute>
            }
          />

          {/* ==================================================
              INBOUND / OUTBOUND
          ================================================== */}

          <Route
            path="/inbound"
            element={
              <ProtectedRoute allowedRoles={ADMIN_ROLES}>
                <InboundCalls />
              </ProtectedRoute>
            }
          />

          <Route
            path="/outbound"
            element={
              <ProtectedRoute allowedRoles={ADMIN_ROLES}>
                <Outbound />
              </ProtectedRoute>
            }
          />

          <Route
            path="/outbound/new"
            element={
              <ProtectedRoute allowedRoles={ADMIN_ROLES}>
                <AddCampaign />
              </ProtectedRoute>
            }
          />

          {/* ==================================================
              CALLS
              HISTORY + DETAILS + TRANSCRIPT
              SINGLE IMPORT: Calls.jsx
          ================================================== */}

          <Route
            path="/calls/*"
            element={
              <ProtectedRoute allowedRoles={ADMIN_ROLES}>
                <Calls />
              </ProtectedRoute>
            }
          />

          {/* OLD URL REDIRECT */}

          <Route
            path="/call-sessions"
            element={
              <ProtectedRoute allowedRoles={ADMIN_ROLES}>
                <Navigate
                  to="/calls"
                  replace
                />
              </ProtectedRoute>
            }
          />

          {/* ==================================================
              CONTACTS
          ================================================== */}

          <Route
            path="/contacts"
            element={
              <ProtectedRoute allowedRoles={ADMIN_ROLES}>
                <Contacts />
              </ProtectedRoute>
            }
          />

          {/* ==================================================
              INTEGRATIONS
          ================================================== */}

          <Route
            path="/integrations"
            element={
              <ProtectedRoute allowedRoles={ADMIN_ROLES}>
                <Integrations />
              </ProtectedRoute>
            }
          />

          {/* ==================================================
              PHONE NUMBERS
          ================================================== */}

          <Route
            path="/phone-numbers"
            element={
              <ProtectedRoute allowedRoles={ADMIN_ROLES}>
                <PhoneNumbers />
              </ProtectedRoute>
            }
          />

          <Route
            path="/phone-number"
            element={
              <Navigate
                to="/phone-numbers"
                replace
              />
            }
          />

          {/* ==================================================
              BILLING
          ================================================== */}

          <Route
            path="/billing"
            element={
              <ProtectedRoute allowedRoles={ADMIN_ROLES}>
                <Billing />
              </ProtectedRoute>
            }
          />

          {/* ==================================================
              SETTINGS
          ================================================== */}

          <Route
            path="/settings"
            element={
              <ProtectedRoute allowedRoles={ADMIN_ROLES}>
                <Settings />
              </ProtectedRoute>
            }
          />

        </Route>

        {/* ==================================================
            FALLBACK
        ================================================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

// ============================================================
// ROLE-BASED DASHBOARD REDIRECT
// ============================================================

function RoleDashboardRedirect() {
  const authData = getAuthData();

  if (!authData) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (!authData.role) {
    clearAuthentication();

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (authData.user?.is_active === false) {
    clearAuthentication();

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return (
    <Navigate
      to={getRoleHome(authData.role)}
      replace
    />
  );
}

export default App;

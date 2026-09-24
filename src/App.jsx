
// import React from "react";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";

// import Layout from "./components/Layout";

// // Public Pages
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";

// // Main Pages
// import Dashboard from "./pages/dashboard/Dashboard";
// import Agents from "./pages/agents/Agents";
// import CreateAgent from "./pages/agents/CreateAgent";

// // Knowledge Base Pages
// import KnowledgeBase from "./pages/knowledgebase/KnowledgeBase";
// import KnowledgeBaseDetails from "./pages/knowledgebase/KnowledgeBaseDetails";

// import "./App.css";

// /* ============================================================
//    PROTECTED ROUTE
// ============================================================ */

// const ProtectedRoute = ({ children }) => {
//   const authData = localStorage.getItem("ravanai_auth");

//   let isAuthenticated = false;

//   try {
//     const parsedAuth = authData ? JSON.parse(authData) : null;

//     isAuthenticated = parsedAuth?.isAuthenticated === true;
//   } catch (error) {
//     console.error("Authentication data parsing failed:", error);
//     isAuthenticated = false;
//   }

//   return isAuthenticated ? (
//     children
//   ) : (
//     <Navigate to="/login" replace />
//   );
// };

// /* ============================================================
//    APP ROUTES
// ============================================================ */

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* ====================================================
//             PUBLIC ROUTES
//         ==================================================== */}

//         <Route path="/login" element={<Login />} />

//         <Route path="/register" element={<Register />} />

//         {/* ====================================================
//             FULL-SCREEN PROTECTED ROUTES
//             Without Sidebar and Header
//         ==================================================== */}

//         <Route
//           path="/agents/create"
//           element={
//             <ProtectedRoute>
//               <CreateAgent />
//             </ProtectedRoute>
//           }
//         />

//         {/* ====================================================
//             PROTECTED ROUTES
//             With Sidebar and Header
//         ==================================================== */}

//         <Route
//           element={
//             <ProtectedRoute>
//               <Layout />
//             </ProtectedRoute>
//           }
//         >
//           {/* Default Route */}
//           <Route
//             path="/"
//             element={<Navigate to="/dashboard" replace />}
//           />

//           {/* Dashboard */}
//           <Route
//             path="/dashboard"
//             element={<Dashboard />}
//           />

//           {/* Agents */}
//           <Route
//             path="/agents"
//             element={<Agents />}
//           />

//           {/* Knowledge Base List */}
//           <Route
//             path="/knowledge-base"
//             element={<KnowledgeBase />}
//           />

//           {/* Knowledge Base Details and Sources */}
//           <Route
//             path="/knowledge-base/:id"
//             element={<KnowledgeBaseDetails />}
//           />
//         </Route>

//         {/* ====================================================
//             FALLBACK ROUTE
//         ==================================================== */}

//         <Route
//           path="*"
//           element={<Navigate to="/login" replace />}
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "./components/Layout";

// Public Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Main Pages
import Dashboard from "./pages/dashboard/Dashboard";
import Agents from "./pages/agents/Agents";
import CreateAgent from "./pages/agents/CreateAgent";

// Knowledge Base Pages
import KnowledgeBase from "./pages/knowledgebase/KnowledgeBase";
import KnowledgeBaseDetails from "./pages/knowledgebase/KnowledgeBaseDetails";

// Inbound Calls
import InboundCalls from "./pages/inbound/InboundCalls";
import Outbound from "./pages/outbound/Outboundcalls";
import AddCampaign from "./pages/outbound/AddCampaign";
import CallsHistory from "./pages/calls/CallsHistory";
import Contacts from "./pages/contacts/Contacts";
import Integrations from "./pages/integrations/Integrations";
import PhoneNumbers from "./pages/phone-numbers/PhoneNumbers";
import Billing from "./pages/billing/Billing";
import "./App.css";

/* ============================================================
   PROTECTED ROUTE
============================================================ */

const ProtectedRoute = ({ children }) => {
  const authData = localStorage.getItem("ravanai_auth");

  let isAuthenticated = false;

  try {
    const parsedAuth = authData ? JSON.parse(authData) : null;
    isAuthenticated = parsedAuth?.isAuthenticated === true;
  } catch (error) {
    console.error("Authentication data parsing failed:", error);
    isAuthenticated = false;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

/* ============================================================
   APP ROUTES
============================================================ */

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ====================================================
            PUBLIC ROUTES
        ==================================================== */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ====================================================
            FULL-SCREEN PROTECTED (No Sidebar/Header)
        ==================================================== */}
        <Route
          path="/agents/create"
          element={
            <ProtectedRoute>
              <CreateAgent />
            </ProtectedRoute>
          }
        />

        {/* ====================================================
            PROTECTED ROUTES (With Sidebar/Header)
        ==================================================== */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* Default */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Agents */}
          <Route path="/agents" element={<Agents />} />

          {/* Knowledge Base */}
          <Route path="/knowledge-base" element={<KnowledgeBase />} />
          <Route
            path="/knowledge-base/:id"
            element={<KnowledgeBaseDetails />}
          />

          {/* Inbound Calls */}
          <Route path="/inbound" element={<InboundCalls />} />
          <Route path="/outbound" element={<Outbound />} />
          <Route path="/outbound/new" element={<AddCampaign />} />

          {/* Management */}
          <Route path="/calls" element={<CallsHistory />} />
          <Route path="/call-sessions" element={<CallsHistory />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/phone-numbers" element={<PhoneNumbers />} />
          <Route path="/phone-number" element={<PhoneNumbers />} />
          <Route path="/billing" element={<Billing />} />
        </Route>

        {/* ====================================================
            FALLBACK
        ==================================================== */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
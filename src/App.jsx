
// // // import React from "react";
// // // import {
// // //   BrowserRouter,
// // //   Routes,
// // //   Route,
// // //   Navigate,
// // // } from "react-router-dom";

// // // import Layout from "./components/Layout";

// // // // Public Pages
// // // import Login from "./pages/auth/Login";
// // // import Register from "./pages/auth/Register";

// // // // Main Pages
// // // import Dashboard from "./pages/dashboard/Dashboard";
// // // import Agents from "./pages/agents/Agents";
// // // import CreateAgent from "./pages/agents/CreateAgent";

// // // // Knowledge Base Pages
// // // import KnowledgeBase from "./pages/knowledgebase/KnowledgeBase";
// // // import KnowledgeBaseDetails from "./pages/knowledgebase/KnowledgeBaseDetails";

// // // import "./App.css";

// // // /* ============================================================
// // //    PROTECTED ROUTE
// // // ============================================================ */

// // // const ProtectedRoute = ({ children }) => {
// // //   const authData = localStorage.getItem("ravanai_auth");

// // //   let isAuthenticated = false;

// // //   try {
// // //     const parsedAuth = authData ? JSON.parse(authData) : null;

// // //     isAuthenticated = parsedAuth?.isAuthenticated === true;
// // //   } catch (error) {
// // //     console.error("Authentication data parsing failed:", error);
// // //     isAuthenticated = false;
// // //   }

// // //   return isAuthenticated ? (
// // //     children
// // //   ) : (
// // //     <Navigate to="/login" replace />
// // //   );
// // // };

// // // /* ============================================================
// // //    APP ROUTES
// // // ============================================================ */

// // // function App() {
// // //   return (
// // //     <BrowserRouter>
// // //       <Routes>
// // //         {/* ====================================================
// // //             PUBLIC ROUTES
// // //         ==================================================== */}

// // //         <Route path="/login" element={<Login />} />

// // //         <Route path="/register" element={<Register />} />

// // //         {/* ====================================================
// // //             FULL-SCREEN PROTECTED ROUTES
// // //             Without Sidebar and Header
// // //         ==================================================== */}

// // //         <Route
// // //           path="/agents/create"
// // //           element={
// // //             <ProtectedRoute>
// // //               <CreateAgent />
// // //             </ProtectedRoute>
// // //           }
// // //         />

// // //         {/* ====================================================
// // //             PROTECTED ROUTES
// // //             With Sidebar and Header
// // //         ==================================================== */}

// // //         <Route
// // //           element={
// // //             <ProtectedRoute>
// // //               <Layout />
// // //             </ProtectedRoute>
// // //           }
// // //         >
// // //           {/* Default Route */}
// // //           <Route
// // //             path="/"
// // //             element={<Navigate to="/dashboard" replace />}
// // //           />

// // //           {/* Dashboard */}
// // //           <Route
// // //             path="/dashboard"
// // //             element={<Dashboard />}
// // //           />

// // //           {/* Agents */}
// // //           <Route
// // //             path="/agents"
// // //             element={<Agents />}
// // //           />

// // //           {/* Knowledge Base List */}
// // //           <Route
// // //             path="/knowledge-base"
// // //             element={<KnowledgeBase />}
// // //           />

// // //           {/* Knowledge Base Details and Sources */}
// // //           <Route
// // //             path="/knowledge-base/:id"
// // //             element={<KnowledgeBaseDetails />}
// // //           />
// // //         </Route>

// // //         {/* ====================================================
// // //             FALLBACK ROUTE
// // //         ==================================================== */}

// // //         <Route
// // //           path="*"
// // //           element={<Navigate to="/login" replace />}
// // //         />
// // //       </Routes>
// // //     </BrowserRouter>
// // //   );
// // // }

// // // export default App;


// // import React from "react";
// // import {
// //   BrowserRouter,
// //   Routes,
// //   Route,
// //   Navigate,
// // } from "react-router-dom";

// // import Layout from "./components/Layout";

// // // Public Pages
// // import Login from "./pages/auth/Login";
// // import Register from "./pages/auth/Register";

// // // Main Pages
// // import Dashboard from "./pages/dashboard/Dashboard";
// // import Agents from "./pages/agents/Agents";
// // import CreateAgent from "./pages/agents/CreateAgent";

// // // Knowledge Base Pages
// // import KnowledgeBase from "./pages/knowledgebase/KnowledgeBase";
// // import KnowledgeBaseDetails from "./pages/knowledgebase/KnowledgeBaseDetails";

// // // Inbound Calls
// // import InboundCalls from "./pages/inbound/InboundCalls";
// // import Outbound from "./pages/outbound/Outboundcalls";
// // import AddCampaign from "./pages/outbound/AddCampaign";
// // import CallsHistory from "./pages/calls/CallsHistory";
// // import Contacts from "./pages/contacts/Contacts";
// // import Integrations from "./pages/integrations/Integrations";
// // import PhoneNumbers from "./pages/phone-numbers/PhoneNumbers";
// // import Billing from "./pages/billing/Billing";
// //  import Profile from "./pages/settings/Profile";
// // import "./App.css";

// // /* ============================================================
// //    PROTECTED ROUTE
// // ============================================================ */

// // const ProtectedRoute = ({ children }) => {
// //   const authData = localStorage.getItem("ravanai_auth");

// //   let isAuthenticated = false;

// //   try {
// //     const parsedAuth = authData ? JSON.parse(authData) : null;
// //     isAuthenticated = parsedAuth?.isAuthenticated === true;
// //   } catch (error) {
// //     console.error("Authentication data parsing failed:", error);
// //     isAuthenticated = false;
// //   }

// //   return isAuthenticated ? children : <Navigate to="/login" replace />;
// // };

// // /* ============================================================
// //    APP ROUTES
// // ============================================================ */

// // function App() {
// //   return (
// //     <BrowserRouter>
// //       <Routes>
// //         {/* ====================================================
// //             PUBLIC ROUTES
// //         ==================================================== */}
// //         <Route path="/login" element={<Login />} />
// //         <Route path="/register" element={<Register />} />

// //         {/* ====================================================
// //             FULL-SCREEN PROTECTED (No Sidebar/Header)
// //         ==================================================== */}
// //         <Route
// //           path="/agents/create"
// //           element={
// //             <ProtectedRoute>
// //               <CreateAgent />
// //             </ProtectedRoute>
// //           }
// //         />

// //         {/* ====================================================
// //             PROTECTED ROUTES (With Sidebar/Header)
// //         ==================================================== */}
// //         <Route
// //           element={
// //             <ProtectedRoute>
// //               <Layout />
// //             </ProtectedRoute>
// //           }
// //         >
// //           {/* Default */}
// //           <Route path="/" element={<Navigate to="/dashboard" replace />} />

// //           {/* Dashboard */}
// //           <Route path="/dashboard" element={<Dashboard />} />

// //           {/* Agents */}
// //           <Route path="/agents" element={<Agents />} />

// //           {/* Knowledge Base */}
// //           <Route path="/knowledge-base" element={<KnowledgeBase />} />
// //           <Route
// //             path="/knowledge-base/:id"
// //             element={<KnowledgeBaseDetails />}
// //           />

// //           {/* Inbound Calls */}
// //           <Route path="/inbound" element={<InboundCalls />} />
// //           <Route path="/outbound" element={<Outbound />} />
// //           <Route path="/outbound/new" element={<AddCampaign />} />

// //           {/* Management */}
// //           <Route path="/calls" element={<CallsHistory />} />
// //           <Route path="/call-sessions" element={<CallsHistory />} />
// //           <Route path="/contacts" element={<Contacts />} />
// //           <Route path="/integrations" element={<Integrations />} />
// //           <Route path="/phone-numbers" element={<PhoneNumbers />} />
// //           <Route path="/phone-number" element={<PhoneNumbers />} />
// //           <Route path="/billing" element={<Billing />} />
// //           <Route path="/settings" element={<Profile />} />

// //         </Route>

// //         {/* ====================================================
// //             FALLBACK
// //         ==================================================== */}
// //         <Route path="*" element={<Navigate to="/login" replace />} />
// //       </Routes>
// //     </BrowserRouter>
// //   );
// // }

// // export default App;


// import React, { useState } from "react";
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

// // Knowledge Base
// import KnowledgeBase from "./pages/knowledgebase/KnowledgeBase";
// import KnowledgeBaseDetails from "./pages/knowledgebase/KnowledgeBaseDetails";

// // Inbound / Outbound
// import InboundCalls from "./pages/inbound/InboundCalls";
// import Outbound from "./pages/outbound/Outboundcalls";
// import AddCampaign from "./pages/outbound/AddCampaign";

// // Management
// import CallsHistory from "./pages/calls/CallsHistory";
// import Contacts from "./pages/contacts/Contacts";
// import Integrations from "./pages/integrations/Integrations";
// import PhoneNumbers from "./pages/phone-numbers/PhoneNumbers";
// import Billing from "./pages/billing/Billing";
// import Settings from "./pages/settings/Settings";
// import RecentActivity from "./pages/settings/RecentActivity";
// import Profile from "./pages/settings/Profile";


// // Splash Screen
// import SplashScreen from "./pages/SplashScreen";

// import "./App.css";

// // ============================================================
// // PROTECTED ROUTE
// // ============================================================

// const ProtectedRoute = ({ children }) => {
//   const authData = localStorage.getItem("ravanai_auth");

//   let isAuthenticated = false;

//   try {
//     const parsedAuth = authData
//       ? JSON.parse(authData)
//       : null;

//     isAuthenticated =
//       parsedAuth?.isAuthenticated === true;
//   } catch (error) {
//     console.error(
//       "Authentication data parsing failed:",
//       error
//     );

//     isAuthenticated = false;
//   }

//   return isAuthenticated ? (
//     children
//   ) : (
//     <Navigate to="/login" replace />
//   );
// };

// // ============================================================
// // APP
// // ============================================================

// function App() {

//   // Splash should appear BEFORE login
//   const [showSplash, setShowSplash] = useState(true);

//   // ==========================================================
//   // FIRST SCREEN = SPLASH SCREEN
//   // ==========================================================

//   if (showSplash) {
//     return (
//       <SplashScreen
//         onComplete={() => {
//           setShowSplash(false);
//         }}
//       />
//     );
//   }

//   // ==========================================================
//   // AFTER SPLASH = ROUTER
//   // ==========================================================

//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* ==================================================
//             PUBLIC ROUTES
//         ================================================== */}

//         <Route
//           path="/login"
//           element={<Login />}
//         />

//         <Route
//           path="/register"
//           element={<Register />}
//         />

//         {/* ==================================================
//             CREATE AGENT
//         ================================================== */}

//         <Route
//           path="/agents/create"
//           element={
//             <ProtectedRoute>
//               <CreateAgent />
//             </ProtectedRoute>
//           }
//         />

//         {/* ==================================================
//             PROTECTED APPLICATION
//         ================================================== */}

//         <Route
//           element={
//             <ProtectedRoute>
//               <Layout />
//             </ProtectedRoute>
//           }
//         >

//           {/* Default */}
//           <Route
//             path="/"
//             element={
//               <Navigate
//                 to="/dashboard"
//                 replace
//               />
//             }
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

//           {/* Knowledge Base */}
//           <Route
//             path="/knowledge-base"
//             element={<KnowledgeBase />}
//           />

//           <Route
//             path="/knowledge-base/:id"
//             element={<KnowledgeBaseDetails />}
//           />

//           {/* Inbound */}
//           <Route
//             path="/inbound"
//             element={<InboundCalls />}
//           />

//           {/* Outbound */}
//           <Route
//             path="/outbound"
//             element={<Outbound />}
//           />

//           <Route
//             path="/outbound/new"
//             element={<AddCampaign />}
//           />

//           {/* Calls */}
//           <Route
//             path="/calls"
//             element={<CallsHistory />}
//           />

//           <Route
//             path="/call-sessions"
//             element={<CallsHistory />}
//           />

//           {/* Contacts */}
//           <Route
//             path="/contacts"
//             element={<Contacts />}
//           />

//           {/* Integrations */}
//           <Route
//             path="/integrations"
//             element={<Integrations />}
//           />

//           {/* Phone Numbers */}
//           <Route
//             path="/phone-numbers"
//             element={<PhoneNumbers />}
//           />

//           <Route
//             path="/phone-number"
//             element={<PhoneNumbers />}
//           />

//           {/* Billing */}
//           <Route
//             path="/billing"
//             element={<Billing />}
//           />

//           {/* Settings */}
//           <Route
//             path="/settings"
//             element={<Profile />}
//           />

//         </Route>

//         {/* ==================================================
//             FALLBACK
//         ================================================== */}

//         <Route
//           path="*"
//           element={
//             <Navigate
//               to="/login"
//               replace
//             />
//           }
//         />

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


// import React, { useState } from "react";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";

// import Layout from "./components/Layout";

// // ============================================================
// // AUTH PAGES
// // ============================================================

// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";

// // ============================================================
// // MAIN PAGES
// // ============================================================

// import Dashboard from "./pages/dashboard/Dashboard";
// import Agents from "./pages/agents/Agents";
// import CreateAgent from "./pages/agents/CreateAgent";

// // ============================================================
// // KNOWLEDGE BASE
// // ============================================================

// import KnowledgeBase from "./pages/knowledgebase/KnowledgeBase";
// import KnowledgeBaseDetails from "./pages/knowledgebase/KnowledgeBaseDetails";

// // ============================================================
// // CAMPAIGNS
// // ============================================================

// import InboundCalls from "./pages/inbound/InboundCalls";
// import Outbound from "./pages/outbound/Outboundcalls";
// import AddCampaign from "./pages/outbound/AddCampaign";

// // ============================================================
// // MANAGEMENT
// // ============================================================

// import CallsHistory from "./pages/calls/CallsHistory";
// import Contacts from "./pages/contacts/Contacts";
// import Integrations from "./pages/integrations/Integrations";

// // ============================================================
// // OPERATIONS
// // ============================================================

// import PhoneNumbers from "./pages/phone-numbers/PhoneNumbers";
// import Billing from "./pages/billing/Billing";

// // ============================================================
// // SETTINGS
// // ============================================================

// import Settings from "./pages/settings/Settings";

// // ============================================================
// // SPLASH SCREEN
// // ============================================================

// import SplashScreen from "./pages/SplashScreen";

// // ============================================================
// // CSS
// // ============================================================

// import "./App.css";

// // ============================================================
// // PROTECTED ROUTE
// // ============================================================

// const ProtectedRoute = ({ children }) => {
//   const authData = localStorage.getItem("ravanai_auth");

//   let isAuthenticated = false;

//   try {
//     const parsedAuth = authData
//       ? JSON.parse(authData)
//       : null;

//     isAuthenticated =
//       parsedAuth?.isAuthenticated === true;
//   } catch (error) {
//     console.error(
//       "Authentication data parsing failed:",
//       error
//     );

//     isAuthenticated = false;
//   }

//   return isAuthenticated ? (
//     children
//   ) : (
//     <Navigate
//       to="/login"
//       replace
//     />
//   );
// };

// // ============================================================
// // APP
// // ============================================================

// function App() {
//   // ==========================================================
//   // SPLASH SCREEN
//   // ==========================================================

//   const [showSplash, setShowSplash] =
//     useState(true);

//   // ==========================================================
//   // SHOW SPLASH BEFORE LOGIN
//   // ==========================================================

//   if (showSplash) {
//     return (
//       <SplashScreen
//         onComplete={() => {
//           setShowSplash(false);
//         }}
//       />
//     );
//   }

//   // ==========================================================
//   // ROUTER
//   // ==========================================================

//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* ==================================================
//             PUBLIC ROUTES
//         ================================================== */}

//         <Route
//           path="/login"
//           element={<Login />}
//         />

//         <Route
//           path="/register"
//           element={<Register />}
//         />

//         {/* ==================================================
//             CREATE AGENT
//             FULL SCREEN
//         ================================================== */}

//         <Route
//           path="/agents/create"
//           element={
//             <ProtectedRoute>
//               <CreateAgent />
//             </ProtectedRoute>
//           }
//         />

//         {/* ==================================================
//             PROTECTED APPLICATION
//             SIDEBAR + HEADER
//         ================================================== */}

//         <Route
//           element={
//             <ProtectedRoute>
//               <Layout />
//             </ProtectedRoute>
//           }
//         >

//           {/* ==================================================
//               DEFAULT
//           ================================================== */}

//           <Route
//             path="/"
//             element={
//               <Navigate
//                 to="/dashboard"
//                 replace
//               />
//             }
//           />

//           {/* ==================================================
//               PLATFORM
//           ================================================== */}

//           <Route
//             path="/dashboard"
//             element={<Dashboard />}
//           />

//           <Route
//             path="/agents"
//             element={<Agents />}
//           />

//           <Route
//             path="/knowledge-base"
//             element={<KnowledgeBase />}
//           />

//           <Route
//             path="/knowledge-base/:id"
//             element={<KnowledgeBaseDetails />}
//           />

//           {/* ==================================================
//               CAMPAIGNS
//           ================================================== */}

//           <Route
//             path="/inbound"
//             element={<InboundCalls />}
//           />

//           <Route
//             path="/outbound"
//             element={<Outbound />}
//           />

//           <Route
//             path="/outbound/new"
//             element={<AddCampaign />}
//           />

//           {/* ==================================================
//               MANAGEMENT
//           ================================================== */}

//           <Route
//             path="/calls"
//             element={<CallsHistory />}
//           />

//           <Route
//             path="/call-sessions"
//             element={<CallsHistory />}
//           />

//           <Route
//             path="/contacts"
//             element={<Contacts />}
//           />

//           <Route
//             path="/integrations"
//             element={<Integrations />}
//           />

//           {/* ==================================================
//               OPERATIONS
//           ================================================== */}

//           <Route
//             path="/phone-numbers"
//             element={<PhoneNumbers />}
//           />

//           {/* Backward compatibility */}
//           <Route
//             path="/phone-number"
//             element={<PhoneNumbers />}
//           />

//           <Route
//             path="/billing"
//             element={<Billing />}
//           />

//           {/* ==================================================
//               SETTINGS

//               IMPORTANT:
//               Settings.jsx internally manages:
//               Organization
//               Recent Activity
//               Profile
//               Security
//               API Keys
//               Users
//           ================================================== */}

//           <Route
//             path="/settings"
//             element={<Settings />}
//           />

//         </Route>

//         {/* ==================================================
//             FALLBACK
//         ================================================== */}

//         <Route
//           path="*"
//           element={
//             <Navigate
//               to="/login"
//               replace
//             />
//           }
//         />

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "./components/Layout";

// ============================================================
// AUTH PAGES
// ============================================================

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// ============================================================
// MAIN PAGES
// ============================================================

import Dashboard from "./pages/dashboard/Dashboard";
import Agents from "./pages/agents/Agents";
import CreateAgent from "./pages/agents/CreateAgent";

// ============================================================
// KNOWLEDGE BASE
// ============================================================

import KnowledgeBase from "./pages/knowledgebase/knowledge base/KnowledgeBase";
import Source from "./pages/knowledgebase/source/Source";
import KnowledgeBaseDetails from "./pages/knowledgebase/knowledge base/KnowledgeBaseDetails";
// ============================================================
// CAMPAIGNS
// ============================================================

import InboundCalls from "./pages/inbound/InboundCalls";
import Outbound from "./pages/outbound/Outboundcalls";
import AddCampaign from "./pages/outbound/AddCampaign";

// ============================================================
// MANAGEMENT
// ============================================================

import CallsHistory from "./pages/calls/CallsHistory";
import Contacts from "./pages/contacts/Contacts";
import Integrations from "./pages/integrations/Integrations";

// ============================================================
// OPERATIONS
// ============================================================

import PhoneNumbers from "./pages/phone-numbers/PhoneNumbers";
import Billing from "./pages/billing/Billing";

// ============================================================
// SETTINGS
// ============================================================

import Settings from "./pages/settings/Settings";

// ============================================================
// SPLASH SCREEN
// ============================================================

import SplashScreen from "./pages/SplashScreen";

// ============================================================
// CSS
// ============================================================

import "./App.css";

// ============================================================
// PROTECTED ROUTE
// ============================================================

const ProtectedRoute = ({ children }) => {
  const authData = localStorage.getItem("ravanai_auth");

  let isAuthenticated = false;

  try {
    const parsedAuth = authData
      ? JSON.parse(authData)
      : null;

    isAuthenticated =
      parsedAuth?.isAuthenticated === true;
  } catch (error) {
    console.error(
      "Authentication data parsing failed:",
      error
    );

    isAuthenticated = false;
  }

  return isAuthenticated ? (
    children
  ) : (
    <Navigate
      to="/login"
      replace
    />
  );
};

// ============================================================
// APP
// ============================================================

function App() {
  // ==========================================================
  // SPLASH SCREEN
  // ==========================================================

  const [showSplash, setShowSplash] =
    useState(true);

  // ==========================================================
  // SHOW SPLASH BEFORE LOGIN
  // ==========================================================

  if (showSplash) {
    return (
      <SplashScreen
        onComplete={() => {
          setShowSplash(false);
        }}
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
            FULL SCREEN
        ================================================== */}

        <Route
          path="/agents/create"
          element={
            <ProtectedRoute>
              <CreateAgent />
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
              DEFAULT
          ================================================== */}

          <Route
            path="/"
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />

          {/* ==================================================
              PLATFORM
          ================================================== */}

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/agents"
            element={<Agents />}
          />

          {/* ==================================================
              KNOWLEDGE BASE
          ================================================== */}

          <Route
            path="/knowledge-base"
            element={<KnowledgeBase />}
          />

          <Route
            path="/knowledge-base/:knowledgeBaseId"
            element={<KnowledgeBaseDetails />}
          />

          <Route
            path="/knowledge-base/:knowledgeBaseId/sources"
            element={<Source />}
          />



          {/* ==================================================
              CAMPAIGNS
          ================================================== */}

          <Route
            path="/inbound"
            element={<InboundCalls />}
          />

          <Route
            path="/outbound"
            element={<Outbound />}
          />

          <Route
            path="/outbound/new"
            element={<AddCampaign />}
          />

          {/* ==================================================
              MANAGEMENT
          ================================================== */}

          <Route
            path="/calls"
            element={<CallsHistory />}
          />

          <Route
            path="/call-sessions"
            element={<CallsHistory />}
          />

          <Route
            path="/contacts"
            element={<Contacts />}
          />

          <Route
            path="/integrations"
            element={<Integrations />}
          />

          {/* ==================================================
              OPERATIONS
          ================================================== */}

          <Route
            path="/phone-numbers"
            element={<PhoneNumbers />}
          />

          {/* Backward compatibility */}
          <Route
            path="/phone-number"
            element={<PhoneNumbers />}
          />

          <Route
            path="/billing"
            element={<Billing />}
          />

          {/* ==================================================
              SETTINGS
          ================================================== */}

          <Route
            path="/settings"
            element={<Settings />}
          />

        </Route>

        {/* ==================================================
            FALLBACK
        ================================================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
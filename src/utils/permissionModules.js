// ============================================================
// RAVAN AI - ROLE-BASED ACCESS CONTROL (FRONTEND)
// File: src/utils/permissionModules.js
//
// Supported roles:
// 1. SUPERADMIN - Platform-level access
// 2. ADMIN      - Organization-level access
// 3. USER       - Restricted user access
//
// IMPORTANT:
// This file controls frontend navigation and route access.
// Backend API permissions remain the final authority.
// ============================================================


// ============================================================
// 1. APPLICATION ROLES
// ============================================================

export const ROLES = {
    SUPERADMIN: "superadmin",
    ADMIN: "admin",
    USER: "user",
};


// ============================================================
// 2. DEFAULT DASHBOARD ROUTES
//
// After successful login, each role is redirected to its
// respective dashboard.
// ============================================================

export const ROLE_HOME = {
    [ROLES.SUPERADMIN]: "/superadmin/dashboard",
    [ROLES.ADMIN]: "/admin/dashboard",
    [ROLES.USER]: "/user/dashboard",
};


// ============================================================
// 3. ROLE-BASED MODULE PERMISSIONS
//
// SUPERADMIN:
// Manages the complete Ravan AI platform and organizations.
//
// ADMIN:
// Manages their own organization's users, agents, calls,
// campaigns, billing, integrations and other modules.
//
// USER:
// Has access only to the user dashboard and profile.
//
// IMPORTANT:
// Module names must match the module values used in Sidebar
// and the module checks used in App.jsx.
// ============================================================

export const ROLE_MODULES = {

    // --------------------------------------------------------
    // SUPERADMIN MODULES
    // --------------------------------------------------------

    [ROLES.SUPERADMIN]: [
        "dashboard",

        // Organization management
        "organizations",

        // Platform management
        "users",
        "credits",
        "transactions",

        // Platform reporting
        "analytics",
        "audit-logs",

        // Account
        "profile",
    ],


    // --------------------------------------------------------
    // ADMIN MODULES
    // --------------------------------------------------------

    [ROLES.ADMIN]: [
        "dashboard",

        // Organization profile
        "organization",

        // User management
        "users",

        // AI and communication
        "agents",
        "knowledge-base",
        "functions",

        // Campaign management
        "campaigns",
        "inbound-routes",

        // Contact and call management
        "contacts",
        "calls",

        // Communication channels
        "phone-numbers",

        // Reports and analytics
        "analytics",

        // Billing and integrations
        "billing",
        "api-keys",
        "webhooks",
        "integrations",

        // Account
        "profile",
    ],


    // --------------------------------------------------------
    // USER MODULES
    // --------------------------------------------------------

    [ROLES.USER]: [
        "dashboard",
        "profile",
    ],
};


// ============================================================
// 4. NORMALIZE ROLE
//
// Converts role values to lowercase and removes extra spaces.
//
// Example:
// " SUPERADMIN " -> "superadmin"
// "Admin"        -> "admin"
// ============================================================

export const normalizeRole = (role) => {

    if (!role || typeof role !== "string") {
        return null;
    }

    const normalizedRole = role.trim().toLowerCase();

    return Object.values(ROLES).includes(normalizedRole) ?
        normalizedRole :
        null;
};


// ============================================================
// 5. CHECK VALID ROLE
//
// Returns true if the supplied role is supported.
// ============================================================

export const isValidRole = (role) => {
    return normalizeRole(role) !== null;
};


// ============================================================
// 6. CHECK MODULE ACCESS
//
// Determines whether a role is allowed to access a module.
//
// Example:
// canAccessModule("superadmin", "organizations") -> true
// canAccessModule("admin", "organizations")      -> false
// canAccessModule("user", "agents")               -> false
// ============================================================

export const canAccessModule = (role, moduleName) => {

    const normalizedRole = normalizeRole(role);

    if (!normalizedRole ||
        !moduleName ||
        typeof moduleName !== "string"
    ) {
        return false;
    }

    return ROLE_MODULES[normalizedRole].includes(
        moduleName.trim().toLowerCase()
    );
};


// ============================================================
// 7. GET ROLE HOME
//
// Returns the correct dashboard URL for the logged-in role.
//
// Invalid roles are redirected to login.
// ============================================================

export const getRoleHome = (role) => {

    const normalizedRole = normalizeRole(role);

    if (!normalizedRole) {
        return "/login";
    }

    return ROLE_HOME[normalizedRole];
};


// ============================================================
// 8. CHECK USER ROLE
//
// Checks whether the logged-in user has one of the allowed
// roles.
//
// Example:
// hasRole("superadmin", ["superadmin", "admin"]) -> true
// hasRole("user", ["superadmin", "admin"])        -> false
// ============================================================

export const hasRole = (userRole, allowedRoles = []) => {

    const normalizedUserRole = normalizeRole(userRole);

    if (!normalizedUserRole ||
        !Array.isArray(allowedRoles)
    ) {
        return false;
    }

    return allowedRoles.some(
        (role) => normalizeRole(role) === normalizedUserRole
    );
};


// ============================================================
// 9. GET ALL MODULES FOR A ROLE
//
// Useful when generating role-specific navigation or
// validating module permissions.
// ============================================================

export const getRoleModules = (role) => {

    const normalizedRole = normalizeRole(role);

    if (!normalizedRole) {
        return [];
    }

    return [...ROLE_MODULES[normalizedRole]];
};


// ============================================================
// 10. CHECK MULTIPLE MODULE PERMISSIONS
//
// Returns true if the user has access to at least one
// supplied module.
// ============================================================

export const canAccessAnyModule = (role, moduleNames = []) => {

    if (!Array.isArray(moduleNames)) {
        return false;
    }

    return moduleNames.some(
        (moduleName) => canAccessModule(role, moduleName)
    );
};


// ============================================================
// 11. CHECK ALL MODULE PERMISSIONS
//
// Returns true only if the user has access to every supplied
// module.
// ============================================================

export const canAccessAllModules = (role, moduleNames = []) => {

    if (!Array.isArray(moduleNames)) {
        return false;
    }

    return moduleNames.every(
        (moduleName) => canAccessModule(role, moduleName)
    );
};


// ============================================================
// END OF ROLE-BASED ACCESS CONTROL
// ============================================================
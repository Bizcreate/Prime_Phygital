// Define permission types
export type Permission =
  | "view:products"
  | "create:products"
  | "edit:products"
  | "delete:products"
  | "view:customers"
  | "create:customers"
  | "edit:customers"
  | "delete:customers"
  | "view:analytics"
  | "manage:settings"
  | "manage:verification"
  | "manage:users"
  | "admin:all"

// Define user roles
export type Role = "admin" | "manager" | "editor" | "viewer" | "customer"

// Define role permissions
export const rolePermissions: Record<Role, Permission[]> = {
  admin: ["admin:all"],
  manager: [
    "view:products",
    "create:products",
    "edit:products",
    "delete:products",
    "view:customers",
    "create:customers",
    "edit:customers",
    "view:analytics",
    "manage:settings",
    "manage:verification",
  ],
  editor: ["view:products", "create:products", "edit:products", "view:customers", "view:analytics"],
  viewer: ["view:products", "view:customers", "view:analytics"],
  customer: ["view:products"],
}

// Check if a role has a specific permission
export function hasPermission(role: Role, permission: Permission): boolean {
  if (role === "admin") return true
  return rolePermissions[role].includes(permission) || rolePermissions[role].includes("admin:all")
}

// Get all permissions for a role
export function getPermissionsForRole(role: Role): Permission[] {
  return rolePermissions[role]
}

// Get all available permissions
export function getAllPermissions(): Permission[] {
  return [
    "view:products",
    "create:products",
    "edit:products",
    "delete:products",
    "view:customers",
    "create:customers",
    "edit:customers",
    "delete:customers",
    "view:analytics",
    "manage:settings",
    "manage:verification",
    "manage:users",
    "admin:all",
  ]
}

// Get all available roles
export function getAllRoles(): Role[] {
  return ["admin", "manager", "editor", "viewer", "customer"]
}

// Get a human-readable name for a permission
export function getPermissionName(permission: Permission): string {
  const names: Record<Permission, string> = {
    "view:products": "View Products",
    "create:products": "Create Products",
    "edit:products": "Edit Products",
    "delete:products": "Delete Products",
    "view:customers": "View Customers",
    "create:customers": "Create Customers",
    "edit:customers": "Edit Customers",
    "delete:customers": "Delete Customers",
    "view:analytics": "View Analytics",
    "manage:settings": "Manage Settings",
    "manage:verification": "Manage Verification Methods",
    "manage:users": "Manage Users",
    "admin:all": "Full Administrative Access",
  }
  return names[permission]
}

// Get a human-readable description for a permission
export function getPermissionDescription(permission: Permission): string {
  const descriptions: Record<Permission, string> = {
    "view:products": "Can view product listings and details",
    "create:products": "Can create new products",
    "edit:products": "Can edit existing products",
    "delete:products": "Can delete products",
    "view:customers": "Can view customer listings and details",
    "create:customers": "Can create new customer accounts",
    "edit:customers": "Can edit customer information",
    "delete:customers": "Can delete customer accounts",
    "view:analytics": "Can view analytics and reports",
    "manage:settings": "Can manage platform settings",
    "manage:verification": "Can manage verification methods",
    "manage:users": "Can manage user accounts and permissions",
    "admin:all": "Has full access to all platform features",
  }
  return descriptions[permission]
}

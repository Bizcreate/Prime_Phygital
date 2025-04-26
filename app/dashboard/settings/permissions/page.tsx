"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { useUser } from "@/contexts/user-context"
import {
  getAllRoles,
  getAllPermissions,
  getPermissionName,
  getPermissionDescription,
  rolePermissions,
  type Role,
  type Permission,
} from "@/lib/permissions"
import { Search, UserPlus, Save, Shield, Users, User, Settings } from "lucide-react"

export default function PermissionsPage() {
  const { toast } = useToast()
  const { user, hasPermission, updateUserRole } = useUser()
  const [activeTab, setActiveTab] = useState("users")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRole, setSelectedRole] = useState<Role>("viewer")
  const [customPermissions, setCustomPermissions] = useState<Record<Permission, boolean>>(
    {} as Record<Permission, boolean>,
  )
  const [isCreatingRole, setIsCreatingRole] = useState(false)
  const [newRoleName, setNewRoleName] = useState("")

  // Mock users data
  const users = [
    { id: "1", name: "John Doe", email: "john@example.com", role: "admin", lastActive: "2 hours ago" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "manager", lastActive: "1 day ago" },
    { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "editor", lastActive: "3 days ago" },
    { id: "4", name: "Alice Brown", email: "alice@example.com", role: "viewer", lastActive: "1 week ago" },
    { id: "5", name: "Charlie Davis", email: "charlie@example.com", role: "customer", lastActive: "2 weeks ago" },
  ]

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleRoleChange = (userId: string, newRole: Role) => {
    updateUserRole(userId, newRole)
    toast({
      title: "Role Updated",
      description: `User role has been updated to ${newRole}.`,
    })
  }

  const handlePermissionToggle = (permission: Permission) => {
    setCustomPermissions((prev) => ({
      ...prev,
      [permission]: !prev[permission],
    }))
  }

  const handleCreateRole = () => {
    if (!newRoleName.trim()) {
      toast({
        title: "Error",
        description: "Role name cannot be empty.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Role Created",
      description: `New role "${newRoleName}" has been created.`,
    })

    setNewRoleName("")
    setIsCreatingRole(false)
  }

  const handleSavePermissions = () => {
    toast({
      title: "Permissions Saved",
      description: "Role permissions have been updated successfully.",
    })
  }

  // Check if the current user has permission to manage users
  if (user && !hasPermission("manage:users")) {
    return (
      <div className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You do not have permission to access this page.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Please contact your administrator if you believe you should have access to this feature.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">User Permissions</h1>
          <p className="text-white/70">Manage user roles and permissions</p>
        </div>
        <Button className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90">
          <UserPlus className="h-4 w-4 mr-2" />
          Add New User
        </Button>
      </div>

      <Tabs defaultValue="users" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-white/5 mb-6">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Roles
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Permissions
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <Card className="glass-panel border-white/10">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage user accounts and their roles</CardDescription>
                </div>

                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/50" />
                  <Input
                    type="search"
                    placeholder="Search users..."
                    className="pl-9 bg-white/5 border-white/10 w-full md:w-[300px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Select
                          defaultValue={user.role}
                          onValueChange={(value) => handleRoleChange(user.id, value as Role)}
                        >
                          <SelectTrigger className="w-[130px] bg-white/5 border-white/10">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="glass-panel border-white/10">
                            {getAllRoles().map((role) => (
                              <SelectItem key={role} value={role}>
                                {role.charAt(0).toUpperCase() + role.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>{user.lastActive}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-white/10"
                          onClick={() => {
                            toast({
                              title: "Edit User",
                              description: `Editing user ${user.name}`,
                            })
                          }}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <Card className="glass-panel border-white/10">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Role Management</CardTitle>
                  <CardDescription>Manage user roles and their permissions</CardDescription>
                </div>

                <Button
                  variant="outline"
                  className="border-white/10"
                  onClick={() => setIsCreatingRole(!isCreatingRole)}
                >
                  {isCreatingRole ? "Cancel" : "Create New Role"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {isCreatingRole && (
                <div className="p-4 border border-white/10 rounded-md bg-white/5 mb-6">
                  <h3 className="text-lg font-medium mb-4">Create New Role</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="role-name">Role Name</Label>
                      <Input
                        id="role-name"
                        placeholder="Enter role name"
                        className="bg-white/5 border-white/10"
                        value={newRoleName}
                        onChange={(e) => setNewRoleName(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleCreateRole}>Create Role</Button>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                {getAllRoles().map((role) => (
                  <div key={role} className="p-4 border border-white/10 rounded-md">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-lg font-medium">{role.charAt(0).toUpperCase() + role.slice(1)}</h3>
                        <p className="text-sm text-white/70">
                          {role === "admin"
                            ? "Full access to all platform features"
                            : role === "manager"
                              ? "Can manage most platform features"
                              : role === "editor"
                                ? "Can create and edit content"
                                : role === "viewer"
                                  ? "Read-only access to content"
                                  : "Limited access to specific features"}
                        </p>
                      </div>
                      <Badge
                        className={
                          role === "admin"
                            ? "bg-red-500/20 text-red-500 border-red-500/30"
                            : role === "manager"
                              ? "bg-amber-500/20 text-amber-500 border-amber-500/30"
                              : role === "editor"
                                ? "bg-blue-500/20 text-blue-500 border-blue-500/30"
                                : role === "viewer"
                                  ? "bg-green-500/20 text-green-500 border-green-500/30"
                                  : "bg-gray-500/20 text-gray-500 border-gray-500/30"
                        }
                      >
                        {rolePermissions[role].length} Permissions
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {rolePermissions[role].map((permission) => (
                        <div key={permission} className="text-sm p-1 rounded bg-white/5">
                          {getPermissionName(permission)}
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white/10"
                        onClick={() => {
                          setSelectedRole(role)
                          setActiveTab("permissions")
                        }}
                      >
                        Edit Permissions
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-6">
          <Card className="glass-panel border-white/10">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Permission Management</CardTitle>
                  <CardDescription>Configure permissions for each role</CardDescription>
                </div>

                <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as Role)}>
                  <SelectTrigger className="w-[180px] bg-white/5 border-white/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-panel border-white/10">
                    {getAllRoles().map((role) => (
                      <SelectItem key={role} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {getAllPermissions().map((permission) => {
                  const isEnabled =
                    customPermissions[permission] !== undefined
                      ? customPermissions[permission]
                      : rolePermissions[selectedRole].includes(permission)

                  return (
                    <div
                      key={permission}
                      className="flex items-center justify-between p-3 rounded-md border border-white/10"
                    >
                      <div className="space-y-1">
                        <h3 className="font-medium">{getPermissionName(permission)}</h3>
                        <p className="text-sm text-white/70">{getPermissionDescription(permission)}</p>
                      </div>
                      <Switch
                        id={`permission-${permission}`}
                        checked={isEnabled}
                        onCheckedChange={() => handlePermissionToggle(permission)}
                        disabled={selectedRole === "admin" && permission === "admin:all"}
                      />
                    </div>
                  )
                })}
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSavePermissions} className="bg-gradient-to-r from-neon-purple to-neon-blue">
                  <Save className="h-4 w-4 mr-2" />
                  Save Permissions
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="glass-panel border-white/10">
            <CardHeader>
              <CardTitle>Permission Settings</CardTitle>
              <CardDescription>Configure global permission settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-md border border-white/10">
                  <div className="space-y-1">
                    <h3 className="font-medium">Strict Permission Enforcement</h3>
                    <p className="text-sm text-white/70">
                      When enabled, users without explicit permissions will be denied access
                    </p>
                  </div>
                  <Switch
                    id="strict-permissions"
                    defaultChecked={true}
                    onCheckedChange={() => {
                      toast({
                        title: "Setting Updated",
                        description: "Strict permission enforcement setting has been updated.",
                      })
                    }}
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-md border border-white/10">
                  <div className="space-y-1">
                    <h3 className="font-medium">Permission Inheritance</h3>
                    <p className="text-sm text-white/70">
                      When enabled, permissions will be inherited from parent roles
                    </p>
                  </div>
                  <Switch
                    id="permission-inheritance"
                    defaultChecked={true}
                    onCheckedChange={() => {
                      toast({
                        title: "Setting Updated",
                        description: "Permission inheritance setting has been updated.",
                      })
                    }}
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-md border border-white/10">
                  <div className="space-y-1">
                    <h3 className="font-medium">Permission Audit Logging</h3>
                    <p className="text-sm text-white/70">
                      When enabled, all permission changes will be logged for audit purposes
                    </p>
                  </div>
                  <Switch
                    id="permission-audit"
                    defaultChecked={true}
                    onCheckedChange={() => {
                      toast({
                        title: "Setting Updated",
                        description: "Permission audit logging setting has been updated.",
                      })
                    }}
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-md border border-white/10">
                  <div className="space-y-1">
                    <h3 className="font-medium">Auto-Revoke Inactive User Permissions</h3>
                    <p className="text-sm text-white/70">
                      When enabled, permissions will be automatically revoked for inactive users
                    </p>
                  </div>
                  <Switch
                    id="auto-revoke"
                    defaultChecked={false}
                    onCheckedChange={() => {
                      toast({
                        title: "Setting Updated",
                        description: "Auto-revoke setting has been updated.",
                      })
                    }}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    toast({
                      title: "Settings Saved",
                      description: "Permission settings have been updated successfully.",
                    })
                  }}
                  className="bg-gradient-to-r from-neon-purple to-neon-blue"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

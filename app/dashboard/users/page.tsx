'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useState } from 'react'

import { DataTable } from '@/components/data-table/data-table'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { createUserColumns } from '@/features/users/components/user-columns'
import { UserForm } from '@/features/users/components/user-form'
import { useToast } from '@/hooks/use-toast'
import {
  userService,
  User,
  CreateUserRequest,
  UpdateUserRequest,
} from '@/services/user-service'

// Mock data for development
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2024-01-14T09:30:00Z',
    updatedAt: '2024-01-14T09:30:00Z',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'moderator',
    status: 'inactive',
    createdAt: '2024-01-13T14:20:00Z',
    updatedAt: '2024-01-13T14:20:00Z',
  },
]

export default function UsersPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  const queryClient = useQueryClient()
  const { toast } = useToast()

  // Fetch users with mock data
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      // Mock API call - replace with actual userService.getUsers()
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return mockUsers
    },
  })

  // Create user mutation
  const createUserMutation = useMutation({
    mutationFn: async (userData: CreateUserRequest) => {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        role: userData.role,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      return newUser
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      setIsCreateDialogOpen(false)
      toast('User created successfully!', { type: 'success' })
    },
    onError: () => {
      toast('Failed to create user', { type: 'error' })
    },
  })

  // Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: async ({
      id,
      userData,
    }: {
      id: string
      userData: UpdateUserRequest
    }) => {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return { ...editingUser, ...userData } as User
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      setIsEditDialogOpen(false)
      setEditingUser(null)
      toast('User updated successfully!', { type: 'success' })
    },
    onError: () => {
      toast('Failed to update user', { type: 'error' })
    },
  })

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: async (id: string) => {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast('User deleted successfully!', { type: 'success' })
    },
    onError: () => {
      toast('Failed to delete user', { type: 'error' })
    },
  })

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setIsEditDialogOpen(true)
  }

  const handleDelete = async (user: User) => {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      deleteUserMutation.mutate(user.id)
    }
  }

  const columns = createUserColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
  })

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading users...</div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Users</h2>
            <p className="text-muted-foreground">
              Manage your application users
            </p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        <DataTable
          columns={columns}
          data={users}
          searchKey="name"
          searchPlaceholder="Search users..."
        />

        {/* Create User Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
            </DialogHeader>
            <UserForm
              onSubmit={(data) =>
                createUserMutation.mutate(data as CreateUserRequest)
              }
              isLoading={createUserMutation.isPending}
            />
          </DialogContent>
        </Dialog>

        {/* Edit User Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
            </DialogHeader>
            {editingUser && (
              <UserForm
                initialData={editingUser}
                onSubmit={(data) =>
                  updateUserMutation.mutate({
                    id: editingUser.id,
                    userData: data as UpdateUserRequest,
                  })
                }
                isLoading={updateUserMutation.isPending}
                isEdit
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}

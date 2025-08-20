'use client'

import { z } from 'zod'

import BaseFormComponent from '@/components/form/form-management/BaseFormComponent'
import { FieldDefinition } from '@/components/form/form-management/types'

const userCreateSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: z.string().nonempty('Role is required'),
  status: z.boolean().default(false),
  avatar: z.any().optional(),
})

type UserCreateFormValues = z.infer<typeof userCreateSchema>

const userCreateFields: FieldDefinition[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'input',
    placeholder: 'Enter user name',
    required: true,
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter user email',
    required: true,
  },
  {
    name: 'role',
    label: 'Role',
    type: 'select',
    placeholder: 'Select a role',
    options: [
      { label: 'Admin', value: 'admin' },
      { label: 'Editor', value: 'editor' },
      { label: 'Viewer', value: 'viewer' },
    ],
    required: true,
  },
  {
    name: 'status',
    label: 'Status',
    type: 'switch',
    description: 'Enable this to activate the user account immediately.',
  },
  {
    name: 'avatar',
    label: 'Avatar',
    type: 'file-upload',
    description: 'Upload a profile picture for the user.',
  },
]

const UserCreateForm = () => {
  const handleSubmit = (data: UserCreateFormValues) => {
    console.log('User create data:', data)
    // Handle user creation logic here
  }

  return (
    <BaseFormComponent
      schema={userCreateSchema}
      fields={userCreateFields}
      onSubmit={handleSubmit}
      actionButtons={{
        submit: true,
        text: 'Create User',
        loadingText: 'Creating...',
        className: 'mt-6',
      }}
      formProps={{
        gridClassName: 'grid-cols-2 gap-x-6 gap-y-8',
      }}
      cardProps={{
        title: <h2 className="text-2xl font-bold">Create New User</h2>,
      }}
    />
  )
}

export default UserCreateForm

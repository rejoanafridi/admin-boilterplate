'use client'

import { z } from 'zod'

import BaseFormComponent from '@/components/form/form-management/BaseFormComponent'
import { FieldDefinition } from '@/components/form/form-management/types'
import { CreateUserRequest, UpdateUserRequest } from '@/services/user-service'

const roleOptions = [
  { value: 'admin', label: 'Administrator' },
  { value: 'user', label: 'User' },
  { value: 'moderator', label: 'Moderator' },
]

const baseUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: z.string().min(1, 'Please select a role'),
})

const createUserSchema = baseUserSchema.extend({
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const updateUserSchema = baseUserSchema.extend({
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .optional()
    .or(z.literal('')),
})

type UserFormData = z.infer<typeof baseUserSchema>

interface UserFormProps {
  initialData?: Partial<UserFormData>
  onSubmit: (data: CreateUserRequest | UpdateUserRequest) => void
  isLoading?: boolean
  isEdit?: boolean
}

export function UserForm({
  initialData,
  onSubmit,
  isLoading,
  isEdit,
}: UserFormProps) {
  const schema = isEdit ? updateUserSchema : createUserSchema

  const fields: FieldDefinition[] = [
    {
      name: 'name',
      label: 'Full Name',
      type: 'input',
      placeholder: 'Enter full name',
      required: true,
      className: 'col-span-12 md:col-span-6',
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'Enter email address',
      required: true,
      className: 'col-span-12 md:col-span-6',
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Enter password',
      required: !isEdit,
      condition: () => !isEdit,
      className: 'col-span-12 md:col-span-6',
    },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      placeholder: 'Select a role',
      options: roleOptions,
      required: true,
      className: 'col-span-12 md:col-span-6',
    },
  ]

  const handleFormSubmit = (data: UserFormData) => {
    // Remove password from submitData only if it exists, to avoid TS error
    const submitData = { ...data } as Partial<CreateUserRequest> &
      Partial<UpdateUserRequest>
    if (isEdit && 'password' in submitData && !submitData.password) {
      delete submitData.password
    }
    onSubmit(submitData as CreateUserRequest | UpdateUserRequest)
  }

  return (
    <BaseFormComponent
      schema={schema}
      fields={fields}
      onSubmit={handleFormSubmit}
      isLoading={isLoading}
      defaultValues={initialData}
      cardProps={{
        title: isEdit ? 'Edit User' : 'Create New User',
      }}
      actionButtons={{
        submit: true,
        text: isEdit ? 'Update User' : 'Create User',
        loadingText: 'Saving...',
      }}
      formProps={{
        gridClassName: 'grid-cols-12 gap-x-6 gap-y-4',
      }}
    />
  )
}

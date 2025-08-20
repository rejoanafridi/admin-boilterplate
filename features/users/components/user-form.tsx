'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InputField } from '@/components/form/input-field';
import { SelectField } from '@/components/form/select-field';
import { CreateUserRequest, UpdateUserRequest } from '@/services/user-service';

const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters').optional(),
  role: z.string().min(1, 'Please select a role'),
});

type UserFormData = z.infer<typeof userSchema>;

interface UserFormProps {
  initialData?: Partial<UserFormData>;
  onSubmit: (data: CreateUserRequest | UpdateUserRequest) => void;
  isLoading?: boolean;
  isEdit?: boolean;
}

const roleOptions = [
  { value: 'admin', label: 'Administrator' },
  { value: 'user', label: 'User' },
  { value: 'moderator', label: 'Moderator' },
];

export function UserForm({ initialData, onSubmit, isLoading, isEdit }: UserFormProps) {
  const { control, handleSubmit, formState: { errors } } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: initialData?.name || '',
      email: initialData?.email || '',
      password: '',
      role: initialData?.role || '',
    },
  });

  const handleFormSubmit = (data: UserFormData) => {
    const submitData = isEdit 
      ? { name: data.name, email: data.email, role: data.role }
      : data;
    onSubmit(submitData as CreateUserRequest | UpdateUserRequest);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? 'Edit User' : 'Create New User'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <InputField
            control={control}
            name="name"
            label="Full Name"
            placeholder="Enter full name"
            required
          />

          <InputField
            control={control}
            name="email"
            label="Email Address"
            placeholder="Enter email address"
            type="email"
            required
          />

          {!isEdit && (
            <InputField
              control={control}
              name="password"
              label="Password"
              placeholder="Enter password"
              type="password"
              required
            />
          )}

          <SelectField
            control={control}
            name="role"
            label="Role"
            placeholder="Select a role"
            options={roleOptions}
            required
          />

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : isEdit ? 'Update User' : 'Create User'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
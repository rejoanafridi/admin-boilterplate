'use client'

import { z } from 'zod'
import { FieldDefinition } from '@/components/form/form-management/types'
import BaseFormComponent from '@/components/form/form-management/BaseFormComponent'
import { Button } from '@/components/ui/button'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormValues = z.infer<typeof loginSchema>

const loginFields: FieldDefinition[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    required: true,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    required: true,
  },
]

const LoginForm = () => {
  const handleSubmit = (data: LoginFormValues) => {
    console.log('Login data:', data)
    // Handle login logic here
  }

  return (
    <BaseFormComponent
      schema={loginSchema}
      fields={loginFields}
      onSubmit={handleSubmit}
      actionButtons={{
        submit: true,
        text: 'Login',
        loadingText: 'Logging in...',
        className: 'mt-4',
      }}
      formProps={{
        gridClassName: 'gap-y-6',
      }}
      cardProps={{
        title: <h2 className="text-2xl font-bold">Login</h2>,
        extra: (
          <p className="text-sm text-gray-500">
            Don't have an account?{' '}
            <Button variant="link" className="p-0">
              Sign up
            </Button>
          </p>
        ),
      }}
    />
  )
}

export default LoginForm

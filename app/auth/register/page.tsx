'use client'

import { useState } from 'react'
import { z } from 'zod'
import { useAuth } from '@/contexts/auth-context'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'
import BaseFormComponent from '@/components/form/form-management/BaseFormComponent'
import { FieldDefinition } from '@/components/form/form-management/types'
import { Card } from '@/components/ui/card'

const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type RegisterFormData = z.infer<typeof registerSchema>

const registerFields: FieldDefinition[] = [
  {
    name: 'name',
    label: 'Full Name',
    type: 'input',
    placeholder: 'Enter your full name',
    required: true,
  },
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
    placeholder: 'Create a password',
    required: true,
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    placeholder: 'Confirm your password',
    required: true,
  },
]

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const { toast } = useToast()

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)

    try {
      // Mock registration - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful registration
      const mockUser = {
        id: '1',
        name: data.name,
        email: data.email,
        role: 'user',
      }
      const mockToken = 'mock-jwt-token'

      login(mockUser, mockToken)
      toast('Registration successful!', { type: 'success' })
    } catch (error) {
      toast('Registration failed. Please try again.', { type: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <BaseFormComponent
          schema={registerSchema}
          fields={registerFields}
          onSubmit={onSubmit}
          isLoading={isLoading}
          cardProps={{
            title: (
              <div className="text-center">
                <h2 className="text-2xl font-bold">Create account</h2>
                <p className="text-muted-foreground">
                  Sign up for a new admin account
                </p>
              </div>
            ),
          }}
          actionButtons={{
            submit: true,
            text: 'Create account',
            loadingText: 'Creating account...',
            className: 'w-full',
          }}
          formProps={{
            gridClassName: 'grid-cols-1 gap-4',
          }}
          className="w-full max-w-md"
        />

        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">
            Already have an account?{' '}
          </span>
          <Link
            href="/auth/login"
            className="font-medium text-primary hover:underline"
          >
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { z } from 'zod'
import { useAuth } from '@/contexts/auth-context'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'
import BaseFormComponent from '@/components/form/form-management/BaseFormComponent'
import { FieldDefinition } from '@/components/form/form-management/types'
import { Card } from '@/components/ui/card'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

type LoginFormData = z.infer<typeof loginSchema>

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

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const { toast } = useToast()

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)

    try {
      // Mock login - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful login
      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: data.email,
        role: 'admin',
      }
      const mockToken = 'mock-jwt-token'

      login(mockUser, mockToken)
      toast('Login successful!', { type: 'success' })
    } catch (error) {
      toast('Login failed. Please check your credentials.', { type: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background ">
      <Card className="w-full max-w-md">
        <BaseFormComponent
          schema={loginSchema}
          fields={loginFields}
          onSubmit={onSubmit}
          isLoading={isLoading}
          cardProps={{
            title: (
              <div className="text-center p-4">
                <h2 className="text-2xl font-bold">Welcome back</h2>
                <p className="text-muted-foreground">
                  Sign in to your admin account
                </p>
              </div>
            ),
          }}
          actionButtons={{
            submit: true,
            text: 'Sign in',
            loadingText: 'Signing in...',
            className: 'w-full',
          }}
          formProps={{
            gridClassName: 'grid-cols-1 gap-4',
          }}
          className="w-full max-w-md"
        />

        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">Don't have an account? </span>
          <Link
            href="/auth/register"
            className="font-medium text-primary hover:underline"
          >
            Sign up
          </Link>
        </div>
      </Card>
    </div>
  )
}

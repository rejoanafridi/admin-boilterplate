'use client'

import { useState, useEffect } from 'react'
import { z } from 'zod'

import { BaseFormComponent } from '@/components/form/form-management'
import { FieldDefinition } from '@/components/form/form-management/types'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'

// Comprehensive form schema showcasing all field types
const comprehensiveSchema = z.object({
  // Text Input Fields
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Must contain at least one number'),

  // Number Fields
  age: z.number().min(18, 'Must be 18 or older').max(120, 'Invalid age'),
  salary: z.number().min(0, 'Salary must be positive').optional(),

  // Text Area
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  comments: z.string().optional(),

  // Selection Fields
  country: z.string().min(1, 'Please select a country'),
  skills: z.array(z.string()).min(1, 'Select at least one skill'),
  experience: z.enum(['junior', 'mid', 'senior', 'lead'], {
    errorMap: () => ({ message: 'Please select experience level' }),
  }),

  // Boolean Fields
  newsletter: z.boolean(),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
  notifications: z.boolean(),

  // Date Fields
  birthDate: z.date({ required_error: 'Birth date is required' }),
  availability: z
    .object({
      start: z.date(),
      end: z.date(),
    })
    .optional(),

  // File Upload
  resume: z.instanceof(File).optional(),
  portfolio: z.array(z.instanceof(File)).optional(),
})

type FormData = z.infer<typeof comprehensiveSchema>

export default function FormsExamplePage() {
  const [isMounted, setIsMounted] = useState(false)
  const [formData, setFormData] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </DashboardLayout>
    )
  }

  // Basic form fields
  const basicFields: FieldDefinition[] = [
    {
      name: 'firstName',
      type: 'input',
      label: 'First Name',
      placeholder: 'Enter your first name',
      required: true,
      className: 'col-span-12 md:col-span-6',
    },
    {
      name: 'lastName',
      type: 'input',
      label: 'Last Name',
      placeholder: 'Enter your last name',
      required: true,
      className: 'col-span-12 md:col-span-6',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
      placeholder: 'john@example.com',
      required: true,
      className: 'col-span-12 md:col-span-6',
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      placeholder: 'Enter a secure password',
      required: true,
      description: 'Must contain uppercase, lowercase, and number',
      className: 'col-span-12 md:col-span-6',
    },
  ]

  // Number and text area fields
  const numbersAndTextFields: FieldDefinition[] = [
    {
      name: 'age',
      type: 'number',
      label: 'Age',
      placeholder: 'Enter your age',
      min: 18,
      max: 120,
      required: true,
      className: 'col-span-12 md:col-span-6',
    },
    {
      name: 'salary',
      type: 'number',
      label: 'Expected Salary (USD)',
      placeholder: '50000',
      min: 0,
      description: 'Annual salary expectation',
      className: 'col-span-12 md:col-span-6',
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Biography',
      placeholder: 'Tell us about yourself...',
      rows: 4,
      description: 'Maximum 500 characters',
      className: 'col-span-12',
    },
    {
      name: 'comments',
      type: 'textarea',
      label: 'Additional Comments',
      placeholder: 'Any additional information...',
      rows: 3,
      className: 'col-span-12',
    },
  ]

  // Selection fields
  const selectionFields: FieldDefinition[] = [
    {
      name: 'country',
      type: 'select',
      label: 'Country',
      placeholder: 'Select your country',
      required: true,
      options: [
        { label: 'United States', value: 'us' },
        { label: 'Canada', value: 'ca' },
        { label: 'United Kingdom', value: 'uk' },
        { label: 'Germany', value: 'de' },
        { label: 'France', value: 'fr' },
        { label: 'Australia', value: 'au' },
        { label: 'Japan', value: 'jp' },
      ],
      className: 'col-span-12 md:col-span-6',
    },
    {
      name: 'skills',
      type: 'multi-select',
      label: 'Technical Skills',
      placeholder: 'Select your skills',
      required: true,
      options: [
        { label: 'JavaScript', value: 'javascript' },
        { label: 'TypeScript', value: 'typescript' },
        { label: 'React', value: 'react' },
        { label: 'Vue.js', value: 'vue' },
        { label: 'Angular', value: 'angular' },
        { label: 'Node.js', value: 'nodejs' },
        { label: 'Python', value: 'python' },
        { label: 'Java', value: 'java' },
        { label: 'C#', value: 'csharp' },
        { label: 'Go', value: 'go' },
        { label: 'Rust', value: 'rust' },
        { label: 'PHP', value: 'php' },
      ],
      className: 'col-span-12 md:col-span-6',
    },
    {
      name: 'experience',
      type: 'radio-group',
      label: 'Experience Level',
      required: true,
      options: [
        { label: 'Junior (0-2 years)', value: 'junior' },
        { label: 'Mid-level (3-5 years)', value: 'mid' },
        { label: 'Senior (6-10 years)', value: 'senior' },
        { label: 'Lead (10+ years)', value: 'lead' },
      ],
      className: 'col-span-12',
    },
  ]

  // Boolean fields
  const booleanFields: FieldDefinition[] = [
    {
      name: 'newsletter',
      type: 'switch',
      label: 'Subscribe to Newsletter',
      description: 'Get updates about new features and opportunities',
      className: 'col-span-12 md:col-span-6',
    },
    {
      name: 'notifications',
      type: 'switch',
      label: 'Enable Notifications',
      description: 'Receive email notifications for important updates',
      className: 'col-span-12 md:col-span-6',
    },
    {
      name: 'terms',
      type: 'checkbox',
      label: 'I accept the Terms and Conditions',
      required: true,
      description: 'You must accept our terms to continue',
      className: 'col-span-12',
    },
  ]

  // Date and file fields
  const dateAndFileFields: FieldDefinition[] = [
    {
      name: 'birthDate',
      type: 'date',
      label: 'Date of Birth',
      required: true,
      className: 'col-span-12 md:col-span-6',
    },
    {
      name: 'availability',
      type: 'date-range',
      label: 'Availability Period',
      description: 'When are you available to start?',
      className: 'col-span-12 md:col-span-6',
    },
    {
      name: 'resume',
      type: 'file-upload',
      label: 'Resume/CV',
      accept: '.pdf,.doc,.docx',
      description: 'Upload your resume (PDF, DOC, DOCX - Max 10MB)',
      className: 'col-span-12 md:col-span-6',
    },
    {
      name: 'portfolio',
      type: 'file-upload',
      label: 'Portfolio Files',
      accept: 'image/*,.pdf',
      multiple: true,
      description: 'Upload portfolio files (Images, PDFs - Max 5MB each)',
      className: 'col-span-12 md:col-span-6',
    },
  ]

  // All fields combined for the comprehensive form
  const allFields: FieldDefinition[] = [
    ...basicFields,
    ...numbersAndTextFields,
    ...selectionFields,
    ...booleanFields,
    ...dateAndFileFields,
  ]

  const handleSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log('Form submitted with data:', data)
      setFormData(data)

      toast('Form submitted successfully!', { type: 'success' })
    } catch (error) {
      toast('Error submitting form', { type: 'error' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Form Examples</h1>
          <p className="text-muted-foreground">
            Comprehensive examples of all available form field types using
            BaseFormComponent
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="basic">Basic Fields</TabsTrigger>
            <TabsTrigger value="numbers">Numbers & Text</TabsTrigger>
            <TabsTrigger value="selection">Selection</TabsTrigger>
            <TabsTrigger value="boolean">Boolean</TabsTrigger>
            <TabsTrigger value="comprehensive">All Fields</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Basic Fields
                    <Badge variant="secondary">4 types</Badge>
                  </CardTitle>
                  <CardDescription>
                    Text inputs, email, and password fields
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Text Input</li>
                    <li>• Email Input</li>
                    <li>• Password Input</li>
                    <li>• Number Input</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Selection Fields
                    <Badge variant="secondary">3 types</Badge>
                  </CardTitle>
                  <CardDescription>
                    Dropdowns, multi-select, and radio buttons
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Single Select</li>
                    <li>• Multi Select</li>
                    <li>• Radio Groups</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Boolean Fields
                    <Badge variant="secondary">2 types</Badge>
                  </CardTitle>
                  <CardDescription>
                    Checkboxes and toggle switches
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Checkbox</li>
                    <li>• Toggle Switch</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Date Fields
                    <Badge variant="secondary">2 types</Badge>
                  </CardTitle>
                  <CardDescription>
                    Date picker and date range selection
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Date Picker</li>
                    <li>• Date Range</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    File Upload
                    <Badge variant="secondary">1 type</Badge>
                  </CardTitle>
                  <CardDescription>
                    Single and multiple file uploads
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Single File</li>
                    <li>• Multiple Files</li>
                    <li>• File Type Restrictions</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Text Areas
                    <Badge variant="secondary">1 type</Badge>
                  </CardTitle>
                  <CardDescription>
                    Multi-line text input fields
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Multi-line Text</li>
                    <li>• Configurable Rows</li>
                    <li>• Character Limits</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Basic Input Fields</CardTitle>
                <CardDescription>
                  Text, email, password, and number input examples
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BaseFormComponent
                  schema={comprehensiveSchema.pick({
                    firstName: true,
                    lastName: true,
                    email: true,
                    password: true,
                  })}
                  fields={basicFields}
                  onSubmit={(data) => handleSubmit(data as FormData)}
                  isLoading={isSubmitting}
                  actionButtons={{
                    submit: true,
                    text: 'Submit Basic Form',
                    loadingText: 'Submitting...',
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="numbers">
            <Card>
              <CardHeader>
                <CardTitle>Numbers & Text Areas</CardTitle>
                <CardDescription>
                  Number inputs with validation and multi-line text areas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BaseFormComponent
                  schema={comprehensiveSchema.pick({
                    age: true,
                    salary: true,
                    bio: true,
                    comments: true,
                  })}
                  fields={numbersAndTextFields}
                  onSubmit={(data) => handleSubmit(data as FormData)}
                  isLoading={isSubmitting}
                  actionButtons={{
                    submit: true,
                    text: 'Submit Numbers Form',
                    loadingText: 'Submitting...',
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="selection">
            <Card>
              <CardHeader>
                <CardTitle>Selection Fields</CardTitle>
                <CardDescription>
                  Dropdown selects, multi-select, and radio button groups
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BaseFormComponent
                  schema={comprehensiveSchema.pick({
                    country: true,
                    skills: true,
                    experience: true,
                  })}
                  fields={selectionFields}
                  onSubmit={(data) => handleSubmit(data as FormData)}
                  isLoading={isSubmitting}
                  actionButtons={{
                    submit: true,
                    text: 'Submit Selection Form',
                    loadingText: 'Submitting...',
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="boolean">
            <Card>
              <CardHeader>
                <CardTitle>Boolean Fields</CardTitle>
                <CardDescription>
                  Checkboxes and toggle switches for boolean values
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BaseFormComponent
                  schema={comprehensiveSchema.pick({
                    newsletter: true,
                    notifications: true,
                    terms: true,
                  })}
                  fields={booleanFields}
                  onSubmit={(data) => handleSubmit(data as FormData)}
                  isLoading={isSubmitting}
                  actionButtons={{
                    submit: true,
                    text: 'Submit Boolean Form',
                    loadingText: 'Submitting...',
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comprehensive">
            <Card>
              <CardHeader>
                <CardTitle>Comprehensive Form Example</CardTitle>
                <CardDescription>
                  All field types combined in a single form with advanced
                  features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BaseFormComponent
                  schema={comprehensiveSchema}
                  fields={allFields}
                  onSubmit={handleSubmit}
                  isLoading={isSubmitting}
                  actionButtons={{
                    submit: true,
                    reset: true,
                    text: 'Submit Complete Form',
                    loadingText: 'Processing...',
                  }}
                  toastConfig={{
                    showSuccessToast: true,
                    successMessage: 'Form submitted successfully!',
                    showErrorToast: true,
                    errorMessage: 'Failed to submit form',
                  }}
                  handleSubmitInternally={true}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Display submitted data */}
        {Object.keys(formData).length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Submitted Form Data</CardTitle>
              <CardDescription>
                Last submitted form data (check console for complete data)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto">
                {JSON.stringify(formData, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}

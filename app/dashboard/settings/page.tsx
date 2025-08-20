'use client'

import { useTheme } from 'next-themes'
import { z } from 'zod'

import BaseFormComponent from '@/components/form/form-management/BaseFormComponent'
import { FieldDefinition } from '@/components/form/form-management/types'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const settingsSchema = z.object({
  siteName: z.string().min(1, 'Site name is required'),
  supportEmail: z.string().email('Invalid email address'),
  timezone: z.string().min(1, 'Please select a timezone'),
  language: z.string().min(1, 'Please select a language'),
  emailNotifications: z.boolean(),
  smsNotifications: z.boolean(),
  maintenanceMode: z.boolean(),
})

type SettingsFormData = z.infer<typeof settingsSchema>

const timezoneOptions = [
  { value: 'UTC', label: 'UTC' },
  { value: 'America/New_York', label: 'Eastern Time' },
  { value: 'America/Chicago', label: 'Central Time' },
  { value: 'America/Denver', label: 'Mountain Time' },
  { value: 'America/Los_Angeles', label: 'Pacific Time' },
]

const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
]

const settingsFields: FieldDefinition[] = [
  {
    name: 'siteName',
    label: 'Site Name',
    type: 'input',
    placeholder: 'Enter site name',
    required: true,
    className: 'col-span-12 md:col-span-6',
  },
  {
    name: 'supportEmail',
    label: 'Support Email',
    type: 'email',
    placeholder: 'Enter support email',
    required: true,
    className: 'col-span-12 md:col-span-6',
  },
  {
    name: 'timezone',
    label: 'Timezone',
    type: 'select',
    placeholder: 'Select timezone',
    options: timezoneOptions,
    required: true,
    className: 'col-span-12 md:col-span-6',
  },
  {
    name: 'language',
    label: 'Language',
    type: 'select',
    placeholder: 'Select language',
    options: languageOptions,
    required: true,
    className: 'col-span-12 md:col-span-6',
  },
  {
    name: 'emailNotifications',
    label: 'Email Notifications',
    type: 'switch',
    description: 'Receive notifications via email',
    className: 'col-span-12',
  },
  {
    name: 'smsNotifications',
    label: 'SMS Notifications',
    type: 'switch',
    description: 'Receive notifications via SMS',
    className: 'col-span-12',
  },
  {
    name: 'maintenanceMode',
    label: 'Maintenance Mode',
    type: 'switch',
    description: 'Enable maintenance mode for system updates',
    className: 'col-span-12',
  },
]

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()

  const defaultValues: SettingsFormData = {
    siteName: 'Admin Panel',
    supportEmail: 'support@example.com',
    timezone: 'UTC',
    language: 'en',
    emailNotifications: true,
    smsNotifications: false,
    maintenanceMode: false,
  }

  const onSubmit = async (data: SettingsFormData) => {
    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log('Settings saved:', data)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your application settings and preferences
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Theme</label>
                <div className="flex gap-2">
                  <Button
                    variant={theme === 'light' ? 'default' : 'outline'}
                    onClick={() => setTheme('light')}
                    size="sm"
                  >
                    Light
                  </Button>
                  <Button
                    variant={theme === 'dark' ? 'default' : 'outline'}
                    onClick={() => setTheme('dark')}
                    size="sm"
                  >
                    Dark
                  </Button>
                  <Button
                    variant={theme === 'system' ? 'default' : 'outline'}
                    onClick={() => setTheme('system')}
                    size="sm"
                  >
                    System
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <BaseFormComponent
            schema={settingsSchema}
            fields={settingsFields}
            onSubmit={onSubmit}
            defaultValues={defaultValues}
            handleSubmitInternally={true}
            toastConfig={{
              showSuccessToast: true,
              successMessage: 'Settings saved successfully!',
              showErrorToast: true,
              errorMessage: 'Failed to save settings',
            }}
            cardProps={{
              title: 'General Settings',
            }}
            actionButtons={{
              submit: true,
              text: 'Save Settings',
              loadingText: 'Saving...',
            }}
            formProps={{
              gridClassName: 'grid-cols-12 gap-x-6 gap-y-4',
            }}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}

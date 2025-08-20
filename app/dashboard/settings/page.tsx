'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InputField } from '@/components/form/input-field';
import { SelectField } from '@/components/form/select-field';
import { CheckboxField } from '@/components/form/checkbox-field';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from 'next-themes';
import { useState } from 'react';

const settingsSchema = z.object({
  siteName: z.string().min(1, 'Site name is required'),
  supportEmail: z.string().email('Invalid email address'),
  timezone: z.string().min(1, 'Please select a timezone'),
  language: z.string().min(1, 'Please select a language'),
  emailNotifications: z.boolean(),
  smsNotifications: z.boolean(),
  maintenanceMode: z.boolean(),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

const timezoneOptions = [
  { value: 'UTC', label: 'UTC' },
  { value: 'America/New_York', label: 'Eastern Time' },
  { value: 'America/Chicago', label: 'Central Time' },
  { value: 'America/Denver', label: 'Mountain Time' },
  { value: 'America/Los_Angeles', label: 'Pacific Time' },
];

const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
];

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  const { control, handleSubmit } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      siteName: 'Admin Panel',
      supportEmail: 'support@example.com',
      timezone: 'UTC',
      language: 'en',
      emailNotifications: true,
      smsNotifications: false,
      maintenanceMode: false,
    },
  });

  const onSubmit = async (data: SettingsFormData) => {
    setIsLoading(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast('Settings saved successfully!', { type: 'success' });
    } catch (error) {
      toast('Failed to save settings', { type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

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
          {/* Appearance Settings */}
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

          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <InputField
                  control={control}
                  name="siteName"
                  label="Site Name"
                  placeholder="Enter site name"
                  required
                />

                <InputField
                  control={control}
                  name="supportEmail"
                  label="Support Email"
                  placeholder="Enter support email"
                  type="email"
                  required
                />

                <SelectField
                  control={control}
                  name="timezone"
                  label="Timezone"
                  placeholder="Select timezone"
                  options={timezoneOptions}
                  required
                />

                <SelectField
                  control={control}
                  name="language"
                  label="Language"
                  placeholder="Select language"
                  options={languageOptions}
                  required
                />

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notifications</h3>
                  
                  <CheckboxField
                    control={control}
                    name="emailNotifications"
                    label="Email Notifications"
                    description="Receive notifications via email"
                  />

                  <CheckboxField
                    control={control}
                    name="smsNotifications"
                    label="SMS Notifications"
                    description="Receive notifications via SMS"
                  />
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">System</h3>
                  
                  <CheckboxField
                    control={control}
                    name="maintenanceMode"
                    label="Maintenance Mode"
                    description="Enable maintenance mode for system updates"
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save Settings'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
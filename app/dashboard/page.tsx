'use client'

import { Users, Settings, Activity, TrendingUp } from 'lucide-react'

import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const stats = [
  {
    title: 'Total Users',
    value: '2,450',
    change: '+12% from last month',
    icon: Users,
  },
  {
    title: 'Active Sessions',
    value: '1,234',
    change: '+5% from last hour',
    icon: Activity,
  },
  {
    title: 'Revenue',
    value: '$45,231',
    change: '+20% from last month',
    icon: TrendingUp,
  },
  {
    title: 'System Health',
    value: '99.9%',
    change: 'All systems operational',
    icon: Settings,
  },
]

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Here&apos;s what&apos;s happening with your admin panel today.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New user registered</p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">System backup completed</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Database optimization</p>
                  <p className="text-xs text-muted-foreground">3 hours ago</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <button className="w-full text-left p-3 rounded-lg hover:bg-accent transition-colors">
                <p className="font-medium">Add New User</p>
                <p className="text-sm text-muted-foreground">
                  Create a new user account
                </p>
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-accent transition-colors">
                <p className="font-medium">System Settings</p>
                <p className="text-sm text-muted-foreground">
                  Configure system parameters
                </p>
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-accent transition-colors">
                <p className="font-medium">View Reports</p>
                <p className="text-sm text-muted-foreground">
                  Generate analytics reports
                </p>
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

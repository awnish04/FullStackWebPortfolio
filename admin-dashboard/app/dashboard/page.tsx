"use client";
import { ChartBarInteractive } from "@/components/ui/AreaChart/chart-bar-interactive";
import { ChartAreaInteractive } from "@/components/ui/AreaChart/salesdetailschart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Box, ChartLine, History } from "lucide-react";
export default function DashboardPage() {
  // const pageTitle = useActivePage();
  return (
    <div className="space-y-4">
      {/* <h2 className="text-3xl font-bold tracking-tight">{pageTitle}</h2> */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-10 w-10 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Projects
            </CardTitle>
            <Box className="h-10 w-10 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Skills</CardTitle>
            <ChartLine className="h-10 w-10 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Projects
            </CardTitle>
            <History className="h-10 w-10 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
          </CardContent>
        </Card>
      </div>
      {/* <SalesDetailsChart /> */}
      <ChartAreaInteractive />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2"></div>
      <ChartBarInteractive />
    </div>
  );
}

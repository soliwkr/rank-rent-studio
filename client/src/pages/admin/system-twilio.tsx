import { AdminLayout } from "@/components/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Phone, MessageSquare, DollarSign } from "lucide-react";

const phoneNumbers = [
  { number: "+1 (212) 555-0142", agency: "Blue Digital Agency", type: "Voice + SMS", status: "Active" },
  { number: "+1 (415) 555-0198", agency: "Northstar Media", type: "Voice", status: "Active" },
  { number: "+1 (646) 555-0234", agency: "Cascade Creative", type: "SMS Only", status: "Active" },
  { number: "+1 (310) 555-0167", agency: "Vertex Solutions", type: "Voice + SMS", status: "Suspended" },
  { number: "+1 (503) 555-0189", agency: "Lunar Labs", type: "Voice + SMS", status: "Active" },
];

const usageStats = [
  { label: "Calls This Month", value: "1,234", icon: Phone },
  { label: "SMS This Month", value: "3,456", icon: MessageSquare },
  { label: "Estimated Cost", value: "$89.50", icon: DollarSign },
];

export default function AdminSystemTwilio() {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold" data-testid="text-page-title">Platform Twilio</h1>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Twilio Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Account SID</label>
              <Input placeholder="Account SID" data-testid="input-account-sid" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Auth Token</label>
              <Input type="password" placeholder="Auth Token" data-testid="input-auth-token" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <Input placeholder="+1 (555) 000-0000" data-testid="input-phone-number" />
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button data-testid="button-save-twilio">Save</Button>
            <Button variant="outline" data-testid="button-test-twilio">Test Connection</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Phone Numbers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Number</TableHead>
                <TableHead>Assigned Agency</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {phoneNumbers.map((phone, i) => (
                <TableRow key={i} data-testid={`row-phone-${i}`}>
                  <TableCell className="font-medium">{phone.number}</TableCell>
                  <TableCell>{phone.agency}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{phone.type}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{phone.status}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" data-testid={`button-manage-phone-${i}`}>Manage</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {usageStats.map((stat) => (
          <Card key={stat.label} data-testid={`stat-card-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}>
            <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid={`stat-value-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}>{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
}
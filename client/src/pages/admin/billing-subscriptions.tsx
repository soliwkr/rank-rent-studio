import { AdminLayout } from "@/components/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, DollarSign, TrendingUp, TrendingDown, Users } from "lucide-react";

const stats = [
  { label: "MRR", value: "$14,750", icon: DollarSign, description: "Monthly Recurring Revenue" },
  { label: "ARR", value: "$177,000", icon: TrendingUp, description: "Annual Recurring Revenue" },
  { label: "Churn Rate", value: "2.3%", icon: TrendingDown, description: "Monthly churn" },
  { label: "ARPU", value: "$313.83", icon: Users, description: "Avg revenue per user" },
];

const subscriptions = [
  { id: 1, agency: "Blue Digital Agency", plan: "Enterprise", amount: "$499/mo", cycle: "Monthly", status: "Active", nextBilling: "Mar 1, 2026" },
  { id: 2, agency: "Peak SEO Group", plan: "Pro", amount: "$199/mo", cycle: "Monthly", status: "Active", nextBilling: "Mar 5, 2026" },
  { id: 3, agency: "Horizon Marketing Co", plan: "White Label", amount: "$3,588/yr", cycle: "Annual", status: "Active", nextBilling: "Jan 15, 2027" },
  { id: 4, agency: "Spark Content Studio", plan: "Solo", amount: "$49/mo", cycle: "Monthly", status: "Past Due", nextBilling: "Feb 15, 2026" },
  { id: 5, agency: "Evergreen Digital", plan: "Pro", amount: "$199/mo", cycle: "Monthly", status: "Cancelled", nextBilling: "-" },
];

const statusVariant = (status: string) => {
  if (status === "Active") return "default" as const;
  if (status === "Past Due") return "destructive" as const;
  return "secondary" as const;
};

export default function AdminBillingSubscriptions() {
  return (
    <AdminLayout>
    <div className="space-y-6">
      <h1 className="text-2xl font-bold" data-testid="text-page-title">Subscriptions</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid={`text-stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}>{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agency</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Billing Cycle</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Next Billing</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((sub) => (
                <TableRow key={sub.id} data-testid={`row-subscription-${sub.id}`}>
                  <TableCell className="font-medium">{sub.agency}</TableCell>
                  <TableCell>
                    <Badge variant="outline" data-testid={`badge-plan-${sub.id}`}>{sub.plan}</Badge>
                  </TableCell>
                  <TableCell>{sub.amount}</TableCell>
                  <TableCell className="text-muted-foreground">{sub.cycle}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(sub.status)} data-testid={`badge-status-${sub.id}`}>{sub.status}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{sub.nextBilling}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" data-testid={`button-actions-sub-${sub.id}`}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem data-testid={`action-view-sub-${sub.id}`}>View</DropdownMenuItem>
                        <DropdownMenuItem data-testid={`action-change-plan-${sub.id}`}>Change Plan</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" data-testid={`action-cancel-sub-${sub.id}`}>Cancel</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
    </AdminLayout>
  );
}

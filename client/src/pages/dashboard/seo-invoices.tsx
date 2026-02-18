import { useWorkspace } from "@/lib/workspace-context";
import { Card, CardContent } from "@/components/ui/card";
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
import { Plus, MoreHorizontal, Eye, Pencil, Send, CheckCircle, Download, Trash2, FileText, Clock, DollarSign, AlertTriangle } from "lucide-react";

const statCards = [
  { label: "Draft", count: 3, amount: "$4,500", icon: FileText, color: "text-muted-foreground" },
  { label: "Sent", count: 5, amount: "$12,300", icon: Send, color: "text-blue-600" },
  { label: "Paid", count: 28, amount: "$67,800", icon: DollarSign, color: "text-green-600" },
  { label: "Overdue", count: 2, amount: "$3,200", icon: AlertTriangle, color: "text-red-600" },
];

const sampleInvoices = [
  { id: "INV-2026-042", client: "BrightPath Marketing", amount: 2500, tax: 250, total: 2750, status: "Paid", dueDate: "2026-01-15" },
  { id: "INV-2026-043", client: "TechVista Solutions", amount: 4800, tax: 480, total: 5280, status: "Sent", dueDate: "2026-02-20" },
  { id: "INV-2026-044", client: "GreenLeaf Organics", amount: 1500, tax: 150, total: 1650, status: "Draft", dueDate: "2026-02-28" },
  { id: "INV-2026-045", client: "Nova Design Studio", amount: 3200, tax: 320, total: 3520, status: "Overdue", dueDate: "2026-01-30" },
  { id: "INV-2026-046", client: "Summit Legal Group", amount: 6000, tax: 600, total: 6600, status: "Paid", dueDate: "2026-02-10" },
];

const statusVariant = (status: string) => {
  switch (status) {
    case "Draft":
      return "secondary" as const;
    case "Sent":
      return "outline" as const;
    case "Paid":
      return "default" as const;
    case "Overdue":
      return "destructive" as const;
    default:
      return "secondary" as const;
  }
};

export default function SeoInvoices() {
  const { selectedWorkspace } = useWorkspace();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-bold" data-testid="text-page-title">Invoices</h1>
        <Button data-testid="button-create-invoice">
          <Plus className="w-4 h-4 mr-2" />
          Create Invoice
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold" data-testid={`text-stat-count-${stat.label.toLowerCase()}`}>{stat.count}</p>
                    <p className="text-sm text-muted-foreground" data-testid={`text-stat-amount-${stat.label.toLowerCase()}`}>{stat.amount}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Client</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Tax</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleInvoices.map((inv) => (
                <TableRow key={inv.id} data-testid={`row-invoice-${inv.id}`}>
                  <TableCell className="font-medium" data-testid={`text-invoice-id-${inv.id}`}>
                    {inv.id}
                  </TableCell>
                  <TableCell data-testid={`text-invoice-client-${inv.id}`}>{inv.client}</TableCell>
                  <TableCell className="text-right" data-testid={`text-invoice-amount-${inv.id}`}>
                    ${inv.amount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground" data-testid={`text-invoice-tax-${inv.id}`}>
                    ${inv.tax.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-semibold" data-testid={`text-invoice-total-${inv.id}`}>
                    ${inv.total.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(inv.status)} data-testid={`badge-invoice-status-${inv.id}`}>
                      {inv.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground" data-testid={`text-invoice-due-${inv.id}`}>
                    {inv.dueDate}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" data-testid={`button-invoice-actions-${inv.id}`}>
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem data-testid={`action-view-${inv.id}`}>
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem data-testid={`action-edit-${inv.id}`}>
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem data-testid={`action-send-${inv.id}`}>
                          <Send className="w-4 h-4 mr-2" />
                          Send
                        </DropdownMenuItem>
                        <DropdownMenuItem data-testid={`action-mark-paid-${inv.id}`}>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Mark Paid
                        </DropdownMenuItem>
                        <DropdownMenuItem data-testid={`action-download-${inv.id}`}>
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" data-testid={`action-delete-${inv.id}`}>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
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
  );
}

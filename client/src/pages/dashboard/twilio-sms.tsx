import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2 } from "lucide-react";

const keywords = [
  { id: 1, keyword: "CANCEL", response: "Your subscription has been cancelled. If this was a mistake, reply START to reactivate." },
  { id: 2, keyword: "CONFIRM", response: "Thank you, {name}! Your appointment on {date} at {time} has been confirmed." },
  { id: 3, keyword: "STATUS", response: "Hi {name}, your current account status is active. Next billing date: {date}." },
  { id: 4, keyword: "HOURS", response: "Our business hours are Monday-Friday 9AM-6PM, Saturday 10AM-4PM. Closed Sundays." },
  { id: 5, keyword: "HELP", response: "Available commands: CANCEL, CONFIRM, STATUS, HOURS, HELP. Reply with any keyword for assistance." },
];

export default function TwilioSms() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold" data-testid="text-page-title">SMS Settings</h1>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="space-y-0.5">
              <Label htmlFor="auto-reply">Auto-Reply</Label>
              <p className="text-xs text-muted-foreground">Automatically respond to incoming SMS with keyword matches</p>
            </div>
            <Switch id="auto-reply" defaultChecked data-testid="switch-auto-reply" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-2">
          <CardTitle>Keyword Responses</CardTitle>
          <Button size="sm" data-testid="button-add-keyword">
            <Plus className="w-4 h-4 mr-1" />
            Add Keyword
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Keyword</TableHead>
                <TableHead>Response Template</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keywords.map((kw) => (
                <TableRow key={kw.id} data-testid={`row-keyword-${kw.id}`}>
                  <TableCell>
                    <Badge variant="secondary" data-testid={`badge-keyword-${kw.id}`}>{kw.keyword}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-[400px]" data-testid={`text-response-${kw.id}`}>
                    {kw.response}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 flex-wrap">
                      <Button variant="ghost" size="icon" data-testid={`button-edit-keyword-${kw.id}`}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" data-testid={`button-delete-keyword-${kw.id}`}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Template Variables</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 flex-wrap">
            <Badge variant="secondary">{"{name}"}</Badge>
            <Badge variant="secondary">{"{date}"}</Badge>
            <Badge variant="secondary">{"{time}"}</Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Use these variables in your response templates. They will be replaced with actual values when the message is sent.</p>
        </CardContent>
      </Card>

      <div className="flex items-center gap-3 flex-wrap">
        <Button data-testid="button-save-sms">Save</Button>
      </div>
    </div>
  );
}

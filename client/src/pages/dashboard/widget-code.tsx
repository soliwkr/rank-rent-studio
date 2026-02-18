import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Copy, ExternalLink } from "lucide-react";

const embedCode = `<script
  src="https://widget.indexflow.cloud/v2/chat.js"
  data-workspace-id="ws_abc123"
  data-position="bottom-right"
  data-color="#3B82F6"
  data-welcome="Hi! How can we help?"
  async>
</script>`;

export default function WidgetCode() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold" data-testid="text-page-title">Embed Code</h1>

      <Card>
        <CardHeader>
          <CardTitle>Widget Customization</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Select defaultValue="bottom-right">
              <SelectTrigger data-testid="select-position">
                <SelectValue placeholder="Select position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bottom-right">Bottom Right</SelectItem>
                <SelectItem value="bottom-left">Bottom Left</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="primary-color">Primary Color</Label>
            <Input id="primary-color" defaultValue="#3B82F6" data-testid="input-primary-color" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="welcome-message">Welcome Message</Label>
            <Input id="welcome-message" defaultValue="Hi! How can we help?" data-testid="input-welcome-message" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pill-text">Pill Text</Label>
            <Input id="pill-text" defaultValue="Chat with us" data-testid="input-pill-text" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-2">
          <CardTitle>Code Snippet</CardTitle>
          <Button variant="outline" size="sm" data-testid="button-copy-code">
            <Copy className="w-4 h-4 mr-1" />
            Copy Code
          </Button>
        </CardHeader>
        <CardContent>
          <Textarea
            readOnly
            value={embedCode}
            className="font-mono text-sm min-h-[160px]"
            data-testid="textarea-embed-code"
          />
        </CardContent>
      </Card>

      <Button variant="outline" data-testid="button-open-demo">
        <ExternalLink className="w-4 h-4 mr-2" />
        Open Widget Demo
      </Button>
    </div>
  );
}

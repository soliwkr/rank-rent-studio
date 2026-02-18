import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Copy, ExternalLink, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function WidgetCode() {
  const { toast } = useToast();
  const [position, setPosition] = useState("bottom-right");
  const [primaryColor, setPrimaryColor] = useState("#3B82F6");
  const [welcomeMessage, setWelcomeMessage] = useState("Hi! How can we help?");
  const [pillText, setPillText] = useState("Chat with us");

  const embedCode = `<script
  src="https://widget.indexflow.cloud/v2/chat.js"
  data-workspace-id="ws_abc123"
  data-position="${position}"
  data-color="${primaryColor}"
  data-welcome="${welcomeMessage}"
  async>
</script>`;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      toast({ title: "Copied!", description: "Embed code copied to clipboard." });
    } catch {
      toast({ title: "Copy failed", description: "Could not copy to clipboard. Please copy manually.", variant: "destructive" });
    }
  };

  const handleOpenDemo = () => {
    toast({ title: "Widget Demo", description: "Opening widget demo in a new window..." });
    window.open("/widget-demo", "_blank");
  };

  const handleSave = () => {
    toast({ title: "Settings Saved", description: "Widget customization settings have been saved." });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold" data-testid="text-page-title">Embed Code</h1>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-2">
          <CardTitle>Widget Customization</CardTitle>
          <Button size="sm" onClick={handleSave} data-testid="button-save-customization">
            <Save className="w-4 h-4 mr-1" />
            Save
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Select value={position} onValueChange={setPosition}>
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
            <Input id="primary-color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} data-testid="input-primary-color" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="welcome-message">Welcome Message</Label>
            <Input id="welcome-message" value={welcomeMessage} onChange={(e) => setWelcomeMessage(e.target.value)} data-testid="input-welcome-message" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pill-text">Pill Text</Label>
            <Input id="pill-text" value={pillText} onChange={(e) => setPillText(e.target.value)} data-testid="input-pill-text" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-2">
          <CardTitle>Code Snippet</CardTitle>
          <Button variant="outline" size="sm" data-testid="button-copy-code" onClick={handleCopyCode}>
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

      <Button variant="outline" data-testid="button-open-demo" onClick={handleOpenDemo}>
        <ExternalLink className="w-4 h-4 mr-2" />
        Open Widget Demo
      </Button>
    </div>
  );
}

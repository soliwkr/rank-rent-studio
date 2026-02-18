import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Info, Upload } from "lucide-react";

export default function SettingsWhiteLabel() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold" data-testid="text-page-title">White Label</h1>

      <Card>
        <CardContent className="p-4 flex items-center gap-3">
          <Info className="w-5 h-5 text-muted-foreground shrink-0" />
          <p className="text-sm text-muted-foreground" data-testid="text-upgrade-note">
            Upgrade to White Label plan to access branding customization
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Branding Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Brand Name</Label>
            <Input defaultValue="My Agency" data-testid="input-brand-name" />
          </div>

          <div className="space-y-2">
            <Label>Logo</Label>
            <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer" data-testid="upload-logo">
              <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
              <p className="text-xs text-muted-foreground">PNG, JPG up to 2MB</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Favicon</Label>
            <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer" data-testid="upload-favicon">
              <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Click to upload favicon</p>
              <p className="text-xs text-muted-foreground">ICO, PNG 32x32 or 16x16</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Primary Color</Label>
            <Input defaultValue="#3B82F6" data-testid="input-primary-color" />
          </div>

          <div className="space-y-2">
            <Label>Custom Domain</Label>
            <Input defaultValue="app.myagency.com" data-testid="input-custom-domain" />
            <div className="p-3 rounded-md bg-muted/50 text-xs text-muted-foreground space-y-1" data-testid="text-dns-instructions">
              <p className="font-medium">DNS Configuration:</p>
              <p>Add a CNAME record pointing to: cname.indexflow.cloud</p>
              <p>TTL: 3600 (or Auto)</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Support Email</Label>
            <Input type="email" defaultValue="support@myagency.com" data-testid="input-support-email" />
          </div>

          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="space-y-0.5">
              <Label htmlFor="custom-login">Custom Login Page</Label>
              <p className="text-xs text-muted-foreground">Use your branding on the login page</p>
            </div>
            <Switch id="custom-login" data-testid="switch-custom-login" />
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Button data-testid="button-save-white-label">Save</Button>
            <Button variant="outline" data-testid="button-preview">Preview</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

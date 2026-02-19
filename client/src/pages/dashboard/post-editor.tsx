import { useState } from "react";
import { useLocation, useRoute } from "wouter";
import { useWorkspace } from "@/lib/workspace-context";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft, Save, Eye, FileText, Image, Tag, X,
  Calendar, Clock, Maximize2, Sparkles, Globe,
} from "lucide-react";

const samplePosts: Record<string, any> = {
  "1": { id: 1, title: "How to Improve Your Local SEO Rankings in 2026", slug: "improve-local-seo-rankings-2026", category: "SEO", schema: "Article", status: "Published", description: "A comprehensive guide to boosting local SEO rankings with actionable strategies for 2026.", tags: ["SEO", "Local SEO", "Rankings"], content: "# How to Improve Your Local SEO Rankings in 2026\n\nLocal SEO continues to evolve rapidly...\n\n## 1. Optimize Your Google Business Profile\n\nMake sure your GBP is complete and accurate.\n\n## 2. Build Local Citations\n\nConsistency across directories matters.\n\n## 3. Earn Local Backlinks\n\nPartner with local businesses and organizations." },
  "2": { id: 2, title: "Complete Guide to Technical SEO Audits for Agencies", slug: "technical-seo-audits-agencies", category: "Technical SEO", schema: "HowTo", status: "Draft", description: "Step-by-step technical SEO audit process for agency teams.", tags: ["Technical SEO", "Audits", "Agency"], content: "# Complete Guide to Technical SEO Audits\n\nA thorough technical audit is the foundation of any SEO strategy.\n\n## Crawlability\n\nEnsure search engines can access all important pages.\n\n## Core Web Vitals\n\nMeasure and optimize LCP, FID, and CLS." },
  "3": { id: 3, title: "10 Link Building Strategies That Still Work", slug: "link-building-strategies", category: "Link Building", schema: "Article", status: "Review", description: "Proven link building tactics that continue to deliver results.", tags: ["Link Building", "Backlinks"], content: "# 10 Link Building Strategies That Still Work\n\n## 1. Guest Posting\n\nStill effective when done right.\n\n## 2. Broken Link Building\n\nFind broken links and offer your content as a replacement." },
  "4": { id: 4, title: "Why Content Marketing Drives Organic Growth", slug: "content-marketing-organic-growth", category: "Content", schema: "BlogPosting", status: "Published", description: "How strategic content marketing fuels sustainable organic traffic growth.", tags: ["Content Marketing", "Growth"], content: "# Why Content Marketing Drives Organic Growth\n\nContent marketing is a long-term investment that compounds over time." },
  "5": { id: 5, title: "Schema Markup Best Practices for E-Commerce Sites", slug: "schema-markup-ecommerce", category: "Technical SEO", schema: "FAQPage", status: "Scheduled", description: "Implementing structured data for better e-commerce visibility in search.", tags: ["Schema", "E-Commerce", "Structured Data"], content: "# Schema Markup Best Practices for E-Commerce\n\n## Product Schema\n\nAdd Product schema to all product pages.\n\n## FAQ Schema\n\nAdd FAQ schema to category and product pages." },
};

export default function PostEditor() {
  const [, navigate] = useLocation();
  const [, params] = useRoute("/:workspaceId/content/posts/:postId/edit");
  const { selectedWorkspace } = useWorkspace();
  const { toast } = useToast();
  const postId = params?.postId || "";
  const isNew = postId === "new";
  const existing = !isNew ? samplePosts[postId] : null;

  const [title, setTitle] = useState(existing?.title || "");
  const [slug, setSlug] = useState(existing?.slug || "");
  const [category, setCategory] = useState(existing?.category || "general");
  const [schemaType, setSchemaType] = useState(existing?.schema || "Article");
  const [description, setDescription] = useState(existing?.description || "");
  const [tags, setTags] = useState<string[]>(existing?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [content, setContent] = useState(existing?.content || "");
  const [subTab, setSubTab] = useState<"editor" | "images">("editor");
  const [previewMode, setPreviewMode] = useState<"preview" | "html">("preview");

  const wsId = selectedWorkspace?.id || "";

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleSaveDraft = () => {
    if (!title.trim()) {
      toast({ title: "Title required", variant: "destructive" });
      return;
    }
    toast({ title: "Draft saved", description: `"${title}" has been saved as draft.` });
  };

  const handlePublish = () => {
    if (!title.trim()) {
      toast({ title: "Title required", variant: "destructive" });
      return;
    }
    toast({ title: "Post published", description: `"${title}" is now live.` });
  };

  const autoSlug = () => {
    if (title && !slug) {
      setSlug(title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
    }
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <Button variant="ghost" onClick={() => navigate(`/${wsId}/content/posts`)} data-testid="button-back-to-posts">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Posts
        </Button>
        <div className="flex items-center gap-2">
          {existing && (
            <Badge variant={existing.status === "Published" ? "default" : "secondary"} data-testid="badge-post-status">
              {existing.status}
            </Badge>
          )}
          <Button variant="outline" onClick={handleSaveDraft} data-testid="button-save-draft">
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={handlePublish} data-testid="button-publish-now">
            <Globe className="h-4 w-4 mr-2" />
            Publish Now
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Title</label>
          <Input
            placeholder="Post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={autoSlug}
            data-testid="input-post-title"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Slug</label>
          <Input
            placeholder="url-slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            data-testid="input-post-slug"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Category</label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger data-testid="select-post-category"><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="SEO">SEO</SelectItem>
              <SelectItem value="Technical SEO">Technical SEO</SelectItem>
              <SelectItem value="Content">Content</SelectItem>
              <SelectItem value="Link Building">Link Building</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Schema Markup</label>
          <Select value={schemaType} onValueChange={setSchemaType}>
            <SelectTrigger data-testid="select-post-schema"><SelectValue placeholder="Schema" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Article">Article</SelectItem>
              <SelectItem value="BlogPosting">BlogPosting</SelectItem>
              <SelectItem value="HowTo">HowTo</SelectItem>
              <SelectItem value="FAQPage">FAQPage</SelectItem>
              <SelectItem value="LocalBusiness">LocalBusiness</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">Meta Description</label>
        <Input
          placeholder="Short description for SEO"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          data-testid="input-post-description"
        />
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Tag className="h-4 w-4 text-muted-foreground shrink-0" />
        {tags.map((tag, i) => (
          <Badge key={i} variant="secondary" className="gap-1" data-testid={`badge-tag-${i}`}>
            {tag}
            <X className="h-3 w-3 cursor-pointer" onClick={() => setTags(tags.filter((_, idx) => idx !== i))} />
          </Badge>
        ))}
        <Input
          placeholder="Add tag + Enter"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagKeyDown}
          className="w-40 h-7 border-dashed"
          data-testid="input-post-tag"
        />
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <Input type="date" value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)} className="w-48" data-testid="input-post-schedule" />
        </div>
        <Button variant="outline" size="sm" disabled={!scheduleDate} data-testid="button-schedule">
          <Clock className="h-4 w-4 mr-1" />
          Schedule
        </Button>
        <Button variant="outline" size="sm" data-testid="button-ai-assist">
          <Sparkles className="h-4 w-4 mr-1" />
          AI Assist
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant={subTab === "editor" ? "default" : "outline"}
          size="sm"
          onClick={() => setSubTab("editor")}
          data-testid="button-tab-editor"
        >
          <FileText className="h-4 w-4 mr-1" />
          Editor + Preview
        </Button>
        <Button
          variant={subTab === "images" ? "default" : "outline"}
          size="sm"
          onClick={() => setSubTab("images")}
          data-testid="button-tab-images"
        >
          <Image className="h-4 w-4 mr-1" />
          Images
        </Button>
      </div>

      {subTab === "editor" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">MDX Editor</span>
              <Button variant="ghost" size="icon" data-testid="button-fullscreen-editor"><Maximize2 className="h-4 w-4" /></Button>
            </div>
            <Textarea
              placeholder="Write your MDX content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[450px] font-mono text-sm"
              data-testid="textarea-mdx-editor"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">Live Preview</span>
              <div className="flex items-center gap-2">
                <Select value={previewMode} onValueChange={(v: any) => setPreviewMode(v)}>
                  <SelectTrigger className="h-7 w-28" data-testid="select-preview-mode">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="preview">Preview</SelectItem>
                    <SelectItem value="html">Raw HTML</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="ghost" size="icon" data-testid="button-fullscreen-preview"><Maximize2 className="h-4 w-4" /></Button>
              </div>
            </div>
            <Card className="min-h-[450px]">
              <CardContent className="p-4">
                {content ? (
                  previewMode === "preview" ? (
                    <div className="prose dark:prose-invert max-w-none text-sm whitespace-pre-wrap" data-testid="preview-content">
                      {content}
                    </div>
                  ) : (
                    <pre className="text-xs font-mono whitespace-pre-wrap text-muted-foreground" data-testid="preview-html">
                      {content}
                    </pre>
                  )
                ) : (
                  <p className="text-muted-foreground text-sm" data-testid="text-preview-empty">Preview will appear here...</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <Card className="min-h-[450px]">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <Image className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-1">Post Images</h3>
            <p className="text-sm text-muted-foreground mb-4">Upload or generate images for this post</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" data-testid="button-upload-image">Upload Image</Button>
              <Button variant="outline" data-testid="button-generate-image">
                <Sparkles className="h-4 w-4 mr-1" />
                AI Generate
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

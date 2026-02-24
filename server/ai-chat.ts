import { storage } from "./storage";

export interface ResolvedAiKey {
  apiKey: string | null;
  source: "agency" | "client" | "platform";
  provider: string;
}

export async function resolveAiKey(
  workspaceId: string,
  provider: string = "openai"
): Promise<ResolvedAiKey> {
  const workspace = await storage.getWorkspace(workspaceId);

  if (!workspace) {
    return { apiKey: null, source: "platform", provider };
  }

  const keySource = workspace.aiKeySource as "agency" | "client";
  const allProviders = await storage.getAiProviderSettings(workspaceId);
  const providerSettings = allProviders.find((p) => p.provider === provider);

  if (keySource === "client") {
    const hasValidKey = providerSettings?.apiKey && providerSettings?.isEnabled;
    return {
      apiKey: hasValidKey ? providerSettings.apiKey : null,
      source: "client",
      provider,
    };
  }

  if (providerSettings?.apiKey && providerSettings?.isEnabled) {
    return { apiKey: providerSettings.apiKey, source: "agency", provider };
  }

  const platformKey =
    provider === "openai" ? process.env.OPENAI_API_KEY : null;

  return { apiKey: platformKey || null, source: "platform", provider };
}

export function buildWidgetSystemPrompt(
  venueName: string,
  venueType: string,
  knowledgeBase?: any[],
  welcomeMessage?: string | null
): string {
  let prompt = `You are a helpful AI assistant for ${venueName}, a ${venueType}. Help users with their questions and provide a great experience.`;
  if (welcomeMessage) {
    prompt += `\n\nWelcome message context: ${welcomeMessage}`;
  }
  if (knowledgeBase?.length) {
    prompt += "\n\nKnowledge base:\n";
    knowledgeBase.forEach((item: any) => {
      prompt += `- ${item.question}: ${item.answer}\n`;
    });
  }
  return prompt;
}

export async function getAiResponse(
  workspaceId: string,
  systemPrompt: string,
  userMessage: string,
  conversationHistory: Array<{ role: string; content: string }>
): Promise<string> {
  try {
    const resolved = await resolveAiKey(workspaceId, "openai");

    if (!resolved.apiKey) {
      if (resolved.source === "client") {
        return "AI features are currently unavailable for this workspace. The workspace API key may be missing or inactive.";
      }
      return "AI features are not configured yet. Please set up your API key in the connections settings.";
    }

    const { default: OpenAI } = await import("openai");
    const openai = new OpenAI({ apiKey: resolved.apiKey });
    const messages: any[] = [
      { role: "system", content: systemPrompt },
      ...conversationHistory,
      { role: "user", content: userMessage },
    ];
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      max_tokens: 500,
    });
    return response.choices[0]?.message?.content || "I'm sorry, I couldn't process that request.";
  } catch (error: any) {
    console.error("AI chat error:", error);
    if (error?.status === 401 || error?.code === "invalid_api_key") {
      return "AI features are currently unavailable. The API key appears to be invalid or expired.";
    }
    return "I'm sorry, I'm having trouble responding right now. Please try again later.";
  }
}

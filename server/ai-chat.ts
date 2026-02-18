export function buildWidgetSystemPrompt(
  venueName: string,
  venueType: string,
  knowledgeBase?: any[],
  welcomeMessage?: string | null
): string {
  let prompt = `You are a helpful AI booking assistant for ${venueName}, a ${venueType}. Help guests with reservations, answer questions about the venue, and provide a great experience.`;
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
    const openaiKey = process.env.OPENAI_API_KEY;
    if (!openaiKey) {
      return "I'm sorry, the AI assistant is not configured yet. Please contact the venue directly for reservations.";
    }
    const { default: OpenAI } = await import("openai");
    const openai = new OpenAI({ apiKey: openaiKey });
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
  } catch (error) {
    console.error("AI chat error:", error);
    return "I'm sorry, I'm having trouble responding right now. Please try again later.";
  }
}

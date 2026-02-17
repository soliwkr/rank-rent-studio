import type { Express } from "express";

export function registerTwilioWebhooks(app: Express) {
  app.post("/api/twilio/voice", (req, res) => {
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>Thank you for calling. Our AI assistant will help you with your reservation.</Say>
  <Gather input="speech" action="/api/twilio/voice/gather" method="POST" timeout="5">
    <Say>Please tell me how I can help you today.</Say>
  </Gather>
</Response>`;
    res.type("text/xml").send(twiml);
  });

  app.post("/api/twilio/voice/gather", (req, res) => {
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>Thank you. Let me help you with that. Please hold while I process your request.</Say>
  <Hangup />
</Response>`;
    res.type("text/xml").send(twiml);
  });

  app.post("/api/twilio/sms", (req, res) => {
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>Thank you for your message. We'll get back to you shortly.</Message>
</Response>`;
    res.type("text/xml").send(twiml);
  });
}

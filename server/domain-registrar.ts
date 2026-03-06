/**
 * Domain Registrar Service — Porkbun & OVH
 *
 * Handles: availability check, domain registration, DNS A-record configuration.
 * All network calls are direct fetch — no SDK dependencies.
 */

const PORKBUN_BASE = "https://api.porkbun.com/api/json/v3";

// ── RDAP availability check (RFC 7483, no auth, works for all TLDs) ──────────

export async function checkDomainAvailability(domain: string): Promise<{
  available: boolean | null;
  error?: string;
}> {
  try {
    // RDAP protocol: 404 = not found (available), 200 = registered (taken)
    const res = await fetch(`https://rdap.org/domain/${encodeURIComponent(domain)}`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(8000),
    });
    if (res.status === 404) return { available: true };
    if (res.status === 200) return { available: false };
    return { available: null, error: `Unexpected RDAP status ${res.status}` };
  } catch (e: any) {
    return { available: null, error: e.message ?? "Availability check failed" };
  }
}

// ── Porkbun ──────────────────────────────────────────────────────────────────

async function porkbunPost(endpoint: string, apiKey: string, secretKey: string, body: Record<string, any> = {}) {
  const res = await fetch(`${PORKBUN_BASE}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ apikey: apiKey, secretapikey: secretKey, ...body }),
    signal: AbortSignal.timeout(15000),
  });
  return res.json() as Promise<any>;
}

export async function getPorkbunTldPricing(apiKey: string, secretKey: string, tld: string): Promise<{
  registration?: number;
  renewal?: number;
  currency: string;
  error?: string;
}> {
  const data = await porkbunPost("/pricing/get", apiKey, secretKey);
  if (data.status !== "SUCCESS") return { currency: "USD", error: data.message ?? "Pricing fetch failed" };
  const info = data.pricing?.[tld.toLowerCase()];
  if (!info) return { currency: "USD", error: `TLD .${tld} not supported by Porkbun` };
  return {
    registration: parseFloat(info.registration ?? "0"),
    renewal: parseFloat(info.renewal ?? "0"),
    currency: "USD",
  };
}

export async function registerWithPorkbun(
  domain: string,
  apiKey: string,
  secretKey: string,
  years = 1
): Promise<{ success: boolean; error?: string }> {
  const data = await porkbunPost("/domain/create", apiKey, secretKey, { domain, years });
  if (data.status === "SUCCESS") return { success: true };
  return { success: false, error: data.message ?? "Registration failed" };
}

export async function configurePorkbunDns(
  domain: string,
  ip: string,
  apiKey: string,
  secretKey: string
): Promise<{ success: boolean; errors: string[] }> {
  const errors: string[] = [];
  for (const name of ["", "www"]) {
    const data = await porkbunPost(`/dns/create/${domain}`, apiKey, secretKey, {
      name,
      type: "A",
      content: ip,
      ttl: "600",
    });
    if (data.status !== "SUCCESS") errors.push(`${name || "@"}: ${data.message ?? "DNS create failed"}`);
  }
  return { success: errors.length === 0, errors };
}

// ── OVH ──────────────────────────────────────────────────────────────────────

import crypto from "crypto";

const OVH_ENDPOINTS: Record<string, string> = {
  "ovh-eu": "https://eu.api.ovh.com/1.0",
  "ovh-ca": "https://ca.api.ovh.com/1.0",
  "ovh-us": "https://api.us.ovhcloud.com/1.0",
};

async function ovhRequest(
  method: string,
  path: string,
  appKey: string,
  appSecret: string,
  consumerKey: string,
  endpoint: string,
  body?: Record<string, any>
): Promise<any> {
  const base = OVH_ENDPOINTS[endpoint] ?? OVH_ENDPOINTS["ovh-eu"];
  const url = `${base}${path}`;
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const bodyStr = body ? JSON.stringify(body) : "";
  const toSign = [appSecret, consumerKey, method.toUpperCase(), url, bodyStr, timestamp].join("+");
  const signature = "$1$" + crypto.createHash("sha1").update(toSign).digest("hex");

  const res = await fetch(url, {
    method: method.toUpperCase(),
    headers: {
      "Content-Type": "application/json",
      "X-Ovh-Application": appKey,
      "X-Ovh-Consumer": consumerKey,
      "X-Ovh-Timestamp": timestamp,
      "X-Ovh-Signature": signature,
    },
    body: body ? bodyStr : undefined,
    signal: AbortSignal.timeout(15000),
  });
  return res.json();
}

export async function checkOvhDomainAvailability(
  domain: string,
  appKey: string,
  appSecret: string,
  consumerKey: string,
  endpoint = "ovh-eu"
): Promise<{ available: boolean | null; error?: string }> {
  // OVH domain availability: GET /order/catalog/public/domain (public, no auth)
  const base = OVH_ENDPOINTS[endpoint] ?? OVH_ENDPOINTS["ovh-eu"];
  try {
    const res = await fetch(`${base}/domain/data/extension?serviceName=${encodeURIComponent(domain)}`, {
      headers: { "X-Ovh-Application": appKey },
      signal: AbortSignal.timeout(8000),
    });
    const data = await res.json();
    // If domain exists as a service it's taken — OVH uses separate cart/order flow for availability
    return { available: null, error: "Use RDAP for availability check; OVH credentials used only for registration" };
  } catch (e: any) {
    return { available: null, error: e.message };
  }
}

export async function registerWithOvh(
  domain: string,
  appKey: string,
  appSecret: string,
  consumerKey: string,
  endpoint = "ovh-eu"
): Promise<{ success: boolean; orderId?: number; error?: string }> {
  // Step 1: create cart
  const cart = await ovhRequest("POST", "/order/cart", appKey, appSecret, consumerKey, endpoint, {
    ovhSubsidiary: endpoint === "ovh-eu" ? "FR" : "CA",
  });
  if (!cart?.cartId) return { success: false, error: cart?.message ?? "Failed to create cart" };
  const cartId = cart.cartId;

  // Step 2: add domain to cart
  const item = await ovhRequest("POST", `/order/cart/${cartId}/domain`, appKey, appSecret, consumerKey, endpoint, {
    domain,
    duration: "P1Y",
    quantity: 1,
    offerId: null,
  });
  if (item?.error || !item?.itemId) return { success: false, error: item?.message ?? "Failed to add domain to cart" };

  // Step 3: checkout
  const order = await ovhRequest("POST", `/order/cart/${cartId}/checkout`, appKey, appSecret, consumerKey, endpoint, {
    autoPayWithPreferredPaymentMethod: true,
    waiveRetractationPeriod: true,
  });
  if (order?.orderId) return { success: true, orderId: order.orderId };
  return { success: false, error: order?.message ?? "Checkout failed" };
}

export async function configureOvhDns(
  domain: string,
  ip: string,
  appKey: string,
  appSecret: string,
  consumerKey: string,
  endpoint = "ovh-eu"
): Promise<{ success: boolean; errors: string[] }> {
  const errors: string[] = [];
  for (const subDomain of ["", "www"]) {
    const res = await ovhRequest(
      "POST",
      `/domain/zone/${domain}/record`,
      appKey, appSecret, consumerKey, endpoint,
      { fieldType: "A", subDomain, target: ip, ttl: 600 }
    );
    if (res?.id == null) errors.push(`${subDomain || "@"}: ${res?.message ?? "DNS create failed"}`);
  }
  // Refresh zone
  await ovhRequest("POST", `/domain/zone/${domain}/refresh`, appKey, appSecret, consumerKey, endpoint);
  return { success: errors.length === 0, errors };
}

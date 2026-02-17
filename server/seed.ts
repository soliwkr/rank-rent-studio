import { db } from "./db";
import { clients, articles, keywords, gridResults, leads, gscData } from "@shared/schema";
import { sql } from "drizzle-orm";

export async function seedDatabase() {
  const existingClients = await db.select().from(clients);
  if (existingClients.length > 0) return;

  const [client1, client2, client3, client4] = await db
    .insert(clients)
    .values([
      {
        name: "Apex Dental Group",
        domain: "apexdental.com",
        industry: "Dental",
        status: "active",
        articlesPublished: 142,
        keywordsTracked: 380,
        leadsGenerated: 67,
        avgPosition: 8.4,
      },
      {
        name: "Summit Plumbing Co",
        domain: "summitplumbing.com",
        industry: "Home Services",
        status: "active",
        articlesPublished: 89,
        keywordsTracked: 210,
        leadsGenerated: 43,
        avgPosition: 12.1,
      },
      {
        name: "Greenfield Law Firm",
        domain: "greenfieldlaw.com",
        industry: "Legal",
        status: "active",
        articlesPublished: 64,
        keywordsTracked: 150,
        leadsGenerated: 28,
        avgPosition: 6.7,
      },
      {
        name: "Pacific Auto Repair",
        domain: "pacificautorepair.com",
        industry: "Automotive",
        status: "active",
        articlesPublished: 53,
        keywordsTracked: 120,
        leadsGenerated: 19,
        avgPosition: 15.3,
      },
    ])
    .returning();

  await db.insert(articles).values([
    { clientId: client1.id, title: "Best Dentist in Austin TX - Top Rated Dental Care", slug: "best-dentist-austin-tx", targetKeyword: "best dentist austin tx", status: "published", wordCount: 1850, impressions: 4200, clicks: 310, position: 3.2 },
    { clientId: client1.id, title: "Emergency Dental Services Near Downtown Austin", slug: "emergency-dental-austin", targetKeyword: "emergency dentist austin", status: "published", wordCount: 1420, impressions: 2800, clicks: 195, position: 5.1 },
    { clientId: client1.id, title: "Teeth Whitening Cost in Austin - Complete Guide", slug: "teeth-whitening-cost-austin", targetKeyword: "teeth whitening austin cost", status: "published", wordCount: 2100, impressions: 3600, clicks: 245, position: 4.8 },
    { clientId: client1.id, title: "Invisalign vs Braces - Austin Orthodontist Guide", slug: "invisalign-vs-braces-austin", targetKeyword: "invisalign austin", status: "draft", wordCount: 1900, impressions: 0, clicks: 0 },
    { clientId: client2.id, title: "24 Hour Plumber in Denver - Emergency Services", slug: "24-hour-plumber-denver", targetKeyword: "24 hour plumber denver", status: "published", wordCount: 1650, impressions: 5100, clicks: 420, position: 2.8 },
    { clientId: client2.id, title: "Water Heater Repair Denver - Same Day Service", slug: "water-heater-repair-denver", targetKeyword: "water heater repair denver", status: "published", wordCount: 1380, impressions: 2300, clicks: 178, position: 6.4 },
    { clientId: client2.id, title: "Drain Cleaning Services in Denver Metro Area", slug: "drain-cleaning-denver", targetKeyword: "drain cleaning denver", status: "published", wordCount: 1200, impressions: 1800, clicks: 134, position: 7.9 },
    { clientId: client3.id, title: "Personal Injury Lawyer Miami - Free Consultation", slug: "personal-injury-lawyer-miami", targetKeyword: "personal injury lawyer miami", status: "published", wordCount: 2400, impressions: 8900, clicks: 670, position: 1.9 },
    { clientId: client3.id, title: "Car Accident Attorney Miami - No Win No Fee", slug: "car-accident-attorney-miami", targetKeyword: "car accident attorney miami", status: "published", wordCount: 2100, impressions: 6200, clicks: 490, position: 3.4 },
    { clientId: client3.id, title: "Slip and Fall Lawyer Miami Beach", slug: "slip-fall-lawyer-miami-beach", targetKeyword: "slip and fall lawyer miami", status: "scheduled", wordCount: 1800, impressions: 0, clicks: 0 },
    { clientId: client4.id, title: "Auto Repair Shop Portland OR - ASE Certified", slug: "auto-repair-portland-or", targetKeyword: "auto repair portland", status: "published", wordCount: 1550, impressions: 3100, clicks: 210, position: 5.6 },
    { clientId: client4.id, title: "Brake Service Portland - Best Prices Guaranteed", slug: "brake-service-portland", targetKeyword: "brake service portland", status: "published", wordCount: 1300, impressions: 1900, clicks: 145, position: 8.2 },
  ]);

  await db.insert(keywords).values([
    { clientId: client1.id, keyword: "best dentist austin tx", currentPosition: 3.2, previousPosition: 5.8, searchVolume: 2400, difficulty: 42, url: "/best-dentist-austin-tx", trend: "up" },
    { clientId: client1.id, keyword: "emergency dentist austin", currentPosition: 5.1, previousPosition: 7.3, searchVolume: 1800, difficulty: 38, url: "/emergency-dental-austin", trend: "up" },
    { clientId: client1.id, keyword: "teeth whitening austin", currentPosition: 4.8, previousPosition: 4.2, searchVolume: 1200, difficulty: 35, url: "/teeth-whitening-cost-austin", trend: "down" },
    { clientId: client1.id, keyword: "dental implants austin tx", currentPosition: 8.9, previousPosition: 12.4, searchVolume: 900, difficulty: 55, url: "/dental-implants-austin", trend: "up" },
    { clientId: client2.id, keyword: "24 hour plumber denver", currentPosition: 2.8, previousPosition: 4.1, searchVolume: 3200, difficulty: 48, url: "/24-hour-plumber-denver", trend: "up" },
    { clientId: client2.id, keyword: "water heater repair denver", currentPosition: 6.4, previousPosition: 6.8, searchVolume: 1600, difficulty: 32, url: "/water-heater-repair-denver", trend: "up" },
    { clientId: client2.id, keyword: "drain cleaning denver", currentPosition: 7.9, previousPosition: 9.2, searchVolume: 1100, difficulty: 28, url: "/drain-cleaning-denver", trend: "up" },
    { clientId: client3.id, keyword: "personal injury lawyer miami", currentPosition: 1.9, previousPosition: 3.1, searchVolume: 8800, difficulty: 78, url: "/personal-injury-lawyer-miami", trend: "up" },
    { clientId: client3.id, keyword: "car accident attorney miami", currentPosition: 3.4, previousPosition: 5.6, searchVolume: 5400, difficulty: 72, url: "/car-accident-attorney-miami", trend: "up" },
    { clientId: client3.id, keyword: "slip and fall lawyer miami", currentPosition: 11.2, previousPosition: 14.8, searchVolume: 2200, difficulty: 65, url: "/slip-fall-lawyer-miami-beach", trend: "up" },
    { clientId: client4.id, keyword: "auto repair portland or", currentPosition: 5.6, previousPosition: 7.1, searchVolume: 2100, difficulty: 40, url: "/auto-repair-portland-or", trend: "up" },
    { clientId: client4.id, keyword: "brake service portland", currentPosition: 8.2, previousPosition: 8.5, searchVolume: 800, difficulty: 25, url: "/brake-service-portland", trend: "stable" },
  ]);

  function generateGrid(): number[][] {
    return Array.from({ length: 5 }, () =>
      Array.from({ length: 5 }, () => Math.floor(Math.random() * 18) + 1)
    );
  }

  await db.insert(gridResults).values([
    { clientId: client1.id, keyword: "dentist near me", location: "Austin, TX", gridData: [[2, 3, 1, 4, 6], [3, 1, 2, 5, 8], [5, 4, 3, 7, 9], [8, 6, 5, 4, 11], [12, 9, 7, 6, 14]], avgRank: 5.6, visibility: 72 },
    { clientId: client1.id, keyword: "dental clinic austin", location: "Austin, TX", gridData: [[1, 2, 3, 5, 7], [2, 1, 4, 6, 9], [4, 3, 5, 8, 11], [6, 5, 7, 10, 13], [9, 8, 10, 12, 15]], avgRank: 6.3, visibility: 64 },
    { clientId: client2.id, keyword: "plumber near me", location: "Denver, CO", gridData: [[3, 2, 4, 7, 10], [2, 1, 3, 5, 8], [4, 3, 2, 6, 9], [7, 5, 4, 3, 11], [10, 8, 6, 5, 14]], avgRank: 5.2, visibility: 68 },
    { clientId: client3.id, keyword: "injury lawyer near me", location: "Miami, FL", gridData: [[1, 1, 2, 3, 5], [1, 2, 1, 4, 6], [2, 3, 3, 5, 8], [4, 4, 5, 7, 10], [6, 5, 7, 9, 12]], avgRank: 4.2, visibility: 80 },
    { clientId: client4.id, keyword: "auto repair near me", location: "Portland, OR", gridData: generateGrid(), avgRank: 8.1, visibility: 48 },
  ]);

  await db.insert(leads).values([
    { clientId: client1.id, name: "Sarah Mitchell", email: "sarah.m@email.com", phone: "(512) 555-0142", source: "organic", landingPage: "/best-dentist-austin-tx", keyword: "best dentist austin tx", status: "booked", createdAt: new Date("2026-02-10") },
    { clientId: client1.id, name: "James Rodriguez", email: "j.rodriguez@email.com", phone: "(512) 555-0198", source: "form", landingPage: "/emergency-dental-austin", keyword: "emergency dentist austin", status: "contacted", createdAt: new Date("2026-02-12") },
    { clientId: client1.id, name: "Linda Chen", email: "linda.chen@email.com", source: "organic", landingPage: "/teeth-whitening-cost-austin", keyword: "teeth whitening austin", status: "new", createdAt: new Date("2026-02-15") },
    { clientId: client2.id, name: "Mike Thompson", phone: "(720) 555-0234", source: "phone", keyword: "24 hour plumber denver", status: "booked", createdAt: new Date("2026-02-08"), bookedAt: new Date("2026-02-09") },
    { clientId: client2.id, name: "Karen Davis", email: "karen.d@email.com", phone: "(720) 555-0187", source: "form", landingPage: "/water-heater-repair-denver", keyword: "water heater repair denver", status: "qualified", createdAt: new Date("2026-02-11") },
    { clientId: client3.id, name: "Robert Garcia", email: "r.garcia@email.com", phone: "(305) 555-0321", source: "organic", landingPage: "/personal-injury-lawyer-miami", keyword: "personal injury lawyer miami", status: "booked", createdAt: new Date("2026-01-28"), bookedAt: new Date("2026-02-01") },
    { clientId: client3.id, name: "Patricia Wilson", email: "p.wilson@email.com", source: "chat", keyword: "car accident attorney miami", status: "contacted", createdAt: new Date("2026-02-13") },
    { clientId: client3.id, name: "David Lee", phone: "(305) 555-0456", source: "referral", keyword: "slip and fall lawyer miami", status: "new", createdAt: new Date("2026-02-16") },
    { clientId: client4.id, name: "Jennifer Brown", email: "j.brown@email.com", phone: "(503) 555-0189", source: "organic", landingPage: "/auto-repair-portland-or", keyword: "auto repair portland", status: "qualified", createdAt: new Date("2026-02-09") },
    { clientId: client4.id, name: "Chris Anderson", email: "chris.a@email.com", source: "form", landingPage: "/brake-service-portland", keyword: "brake service portland", status: "new", createdAt: new Date("2026-02-14") },
  ]);

  const dates = ["2026-02-01", "2026-02-02", "2026-02-03", "2026-02-04", "2026-02-05", "2026-02-06", "2026-02-07", "2026-02-08", "2026-02-09", "2026-02-10"];

  const gscEntries = [];
  for (const date of dates) {
    gscEntries.push(
      { clientId: client1.id, date, query: "best dentist austin tx", page: "/best-dentist-austin-tx", clicks: Math.floor(Math.random() * 40) + 20, impressions: Math.floor(Math.random() * 400) + 200, ctr: 0.08 + Math.random() * 0.05, position: 2.5 + Math.random() * 2 },
      { clientId: client1.id, date, query: "emergency dentist austin", page: "/emergency-dental-austin", clicks: Math.floor(Math.random() * 25) + 10, impressions: Math.floor(Math.random() * 300) + 150, ctr: 0.06 + Math.random() * 0.04, position: 4 + Math.random() * 3 },
      { clientId: client2.id, date, query: "24 hour plumber denver", page: "/24-hour-plumber-denver", clicks: Math.floor(Math.random() * 50) + 30, impressions: Math.floor(Math.random() * 500) + 300, ctr: 0.07 + Math.random() * 0.05, position: 2 + Math.random() * 2 },
      { clientId: client3.id, date, query: "personal injury lawyer miami", page: "/personal-injury-lawyer-miami", clicks: Math.floor(Math.random() * 80) + 50, impressions: Math.floor(Math.random() * 800) + 500, ctr: 0.06 + Math.random() * 0.06, position: 1.5 + Math.random() * 2 },
    );
  }

  await db.insert(gscData).values(gscEntries);

  console.log("Database seeded successfully");
}

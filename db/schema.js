import { pgTable, serial, text, timestamp, integer, boolean, jsonb } from "drizzle-orm/pg-core";

// USERS — anyone who signs up via magic link
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// SCANS — cached results of free keyword scans
export const scans = pgTable("scans", {
  id: serial("id").primaryKey(),
  keyword: text("keyword").notNull(),
  resultData: jsonb("result_data"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ORDERS — paid $99 report purchases
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  keyword: text("keyword").notNull(),
  status: text("status").notNull().default("pending"), // pending, paid, fulfilled
  paypalOrderId: text("paypal_order_id"),
  amount: integer("amount").notNull().default(99),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// REPORTS — the finished $99 report, linked to an order
export const reports = pgTable("reports", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull().references(() => orders.id),
  reportData: jsonb("report_data"),
  pdfUrl: text("pdf_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// JOBS — tracks progress of a scan/report being built
export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").references(() => orders.id),
  status: text("status").notNull().default("queued"), // queued, running, done, failed
  progress: integer("progress").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
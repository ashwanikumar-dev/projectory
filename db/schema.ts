import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  timestamp,
  json,
  uniqueIndex,
  index,
  unique,
  pgEnum,
} from "drizzle-orm/pg-core";

export const VoteTypeEnum = pgEnum("vote_type", ["UP", "DOWN"]);
// ============= PRODUCTS =============
export const products = pgTable(
  "products",
  {
    id: serial("id").primaryKey(),

    // Core product info
    name: varchar("name", { length: 120 }).notNull(),
    slug: varchar("slug", { length: 140 }).notNull(),
    tagline: varchar("tagline", { length: 200 }),
    description: varchar("description", { length: 300 }),

    // Links & media
    websiteUrl: text("website_url"),
    tags: json("tags").$type<string[]>(), // e.g. ["AI", "Productivity"]

    // Voting
    voteCount: integer("vote_count").notNull().default(0),

    // Metadata
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    approvedAt: timestamp("approved_at", { withTimezone: true }),
    status: varchar("status", { length: 20 }).default("pending"), // pending | approved | rejected
    submittedBy: varchar("submitted_by", { length: 120 }).default("anonymous"),
    userId: varchar("user_id", { length: 255 }), // Clerk user ID

    // Organization reference (for backend queries only)
    organizationId: varchar("organization_id", { length: 255 }), // Clerk org ID
  },
  (table) => ({
    slugIdx: uniqueIndex("products_slug_idx").on(table.slug),
    statusIdx: index("products_status_idx").on(table.status),
    organizationIdx: index("products_organization_idx").on(
      table.organizationId,
    ),
  }),
);

export const vote = pgTable(
  "vote",
  {
    id: serial("id").primaryKey(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    productId: integer("product_id")
      .notNull()
      .references(() => products.id),
    createdAt: timestamp("created_at", {
      withTimezone: true,
    }).defaultNow(),
    type: VoteTypeEnum("type").notNull(),
  },
  (table) => ({
    productIdx: index("vote_product_idx").on(table.productId),
    userIdx: index("vote_user_idx").on(table.userId),
    uniqueVote: unique("vote_user_product_unique").on(
      table.userId,
      table.productId,
    ),
  }),
);

export const comments = pgTable(
  "comments",
  {
    id: serial("id").primaryKey(),
    content: text("content").notNull(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    productId: integer("product_id")
      .notNull()
      .references(() => products.id),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    }).defaultNow(),
  },
  (table) => ({
    productIdx: index("comments_product_idx").on(table.productId),
    userIdx: index("comment_user_idx").on(table.userId),
  }),
);

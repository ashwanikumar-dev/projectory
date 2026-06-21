import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { allProducts } from "./data";
import { products } from "./schema";

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await db.delete(products);
  console.log("✅ Cleared existing data");

  // Insert products from data.ts
  for (const product of allProducts) {
    await db.insert(products).values({
      name: product.name,
      slug: product.slug,
      tagline: product.tagline,
      description: product.description,
      websiteUrl: product.websiteUrl,
      tags: product.tags,
      voteCount: product.voteCount || 0,
      createdAt: product.createdAt,
      approvedAt: product.approvedAt,
      status: product.status,
      submittedBy: product.submittedBy,
    });

    console.log(
      `Added product: ${product.name} (${product.voteCount || 0} votes)`,
    );
  }

  // Verify inserted products
  const insertedProducts = await db.select().from(products);
  console.log(`\n🎉 Successfully seeded ${insertedProducts.length} products!`);

  console.log("\n📦 Products in database:");
  insertedProducts.forEach((product) => {
    console.log(
      `  - ${product.name} (${product.slug}) - ${product.voteCount} votes`,
    );
  });
}

main()
  .catch((error) => {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  })
  .finally(() => {
    console.log("\n✨ Seeding complete!");
    process.exit(0);
  });

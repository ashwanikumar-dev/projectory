import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUserDashboardData(userId: string) {
  if (!userId) {
    return {
      success: false,
      message: "You must be signed in to see your products",
      data: null,
    };
  }

  const userProducts = await db
    .select()
    .from(products)
    .where(eq(products.userId, userId));

  return {
    success: true,
    data: userProducts,
  };
}

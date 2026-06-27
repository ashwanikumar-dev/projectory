import { db } from "@/db";
import { comments } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export default async function ProductReviewsList({
  productId,
}: {
  productId: number;
}) {
  const productReview = await db
    .select()
    .from(comments)
    .where(eq(comments.productId, productId))
    .orderBy(desc(comments.createdAt));
  return productReview;
}

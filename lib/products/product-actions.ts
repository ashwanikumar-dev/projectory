"use server";

import { db } from "@/db";
import { comments, products, vote } from "@/db/schema";
import { VoteType } from "@/types";
import { auth, currentUser } from "@clerk/nextjs/server";
import { and, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import z from "zod";
import { commentSchema, productSchema } from "./product-validations";

export const addProductAction = async (formData: FormData) => {
  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: "You must be signed in to submit a product",
        errors: undefined,
      };
    }

    if (!orgId) {
      return {
        success: false,
        message: "You must be a member of an organization to submit a product",
        errors: undefined,
      };
    }

    const user = await currentUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress || "anonymous";

    const rawFormData = Object.fromEntries(formData.entries());

    // validate the data
    const validatedData = productSchema.safeParse(rawFormData);

    if (!validatedData.success) {
      console.log(validatedData.error.format());
      return {
        success: false,
        errors: validatedData.error.format(),
        message: "Invalid data",
      };
    }

    const { name, slug, tagline, description, websiteUrl, tags } =
      validatedData.data;

    const tagsArray = tags ? tags.filter((tag) => typeof tag === "string") : [];

    // transform & insert
    await db.insert(products).values({
      name,
      slug,
      tagline,
      description,
      websiteUrl,
      tags: tagsArray,
      status: "pending",
      submittedBy: userEmail,
      organizationId: orgId,
      userId,
    });

    return {
      success: true,
      message: "Product submitted successfully! It will be reviewed shortly.",
      errors: undefined,
    };
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.format(),
        message: "Validation failed. Please check the form.",
      };
    }

    return {
      success: false,
      errors: undefined,
      message: "Failed to submit product",
    };
  }
};

export const voteProductAction = async (productId: number, type: VoteType) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      console.log("User not signed in");
      return {
        success: false,
        currentVote:null,
        message: "You must be signed in to vote",
      };
    }

    const existingVote = await db
      .select()
      .from(vote)
      .where(and(eq(vote.userId, userId), eq(vote.productId, productId)))
      .limit(1);

    const currentVote = existingVote[0] ?? null;
    let newVote: VoteType | null = null;
    let delta = 0;

    if (!currentVote) {
      await db.insert(vote).values({
        type,
        userId,
        productId,
      });
      newVote = type;
      delta = type === "UP" ? 1 : -1;
      await db
        .update(products)
        .set({
          voteCount: sql`${products.voteCount} + ${delta}`,
        })
        .where(eq(products.id, productId));
    } else if (currentVote.type === type) {
      await db.delete(vote).where(eq(vote.id, currentVote.id));
      newVote = null;
      delta = type === "UP" ? -1 : 1;
      await db
        .update(products)
        .set({
          voteCount: sql`${products.voteCount} + ${delta}`,
        })
        .where(eq(products.id, productId));
    } else {
      await db
        .update(vote)
        .set({
          type,
        })
        .where(eq(vote.id, currentVote.id));
      newVote = type;
      delta = type === "UP" ? 2 : -2;
      await db
        .update(products)
        .set({
          voteCount: sql`${products.voteCount} + ${delta}`,
        })
        .where(eq(products.id, productId));
    }

    revalidatePath("/");
    revalidatePath(`/product/${productId}`);

    return {
      success: true,
      currentVote: newVote,
      message: "Vote updated successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      currentVote: null,
      message: "Failed to update vote",
    };
  }
};

export async function addCommentAction(formData: FormData) {
  try {
    const { userId } = await auth();
    if (!userId) return null;

    const rawFormData = Object.fromEntries(formData.entries());

    const validatedData = commentSchema.safeParse(rawFormData);

    if (!validatedData.success) {
      console.log(validatedData.error.format());
      return {
        success: false,
        errors: validatedData.error.format(),
        message: "Invalid data",
      };
    }

    const productId = Number(formData.get("productId"));
    const { content } = validatedData.data;

    await db.insert(comments).values({
      content,
      userId,
      productId,
    });

    revalidatePath(`/products/${productId}`);

    return {
      success: true,
      message: "Comment submitted successfully.",
      errors: undefined,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      errors: undefined,
      message: "Failed to submit comment",
    };
  }
}

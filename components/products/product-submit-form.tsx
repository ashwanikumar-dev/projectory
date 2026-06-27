"use client";

import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { addProductAction } from "@/lib/products/product-actions";
import { FormState } from "@/types";
import { Loader2Icon, SparklesIcon } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const initialState: FormState = {
  success: false,
  errors: undefined,
  message: "",
};

export default function ProductSubmitForm() {
  const [state, formAction, isPending] = useActionState(
    addProductAction,
    initialState,
  );

  const { errors, message, success } = state;

  useEffect(() => {
    if (!message) return;

    if (success) {
      toast.success("Launch Request Received 🚀", {
        description: "Your product is now waiting for admin review.",
      });
    } else {
      toast.error(message);
    }
  }, [message, success]);

  const getFieldErrors = (fieldName: string): string[] => {
    if (!errors) return [];
    return (errors as Record<string, string[]>)[fieldName] ?? [];
  };

  return (
    <form className="space-y-6" action={formAction}>
      <FormField
        label="Product Name"
        name="name"
        id="name"
        placeholder="My Awesome Product"
        required
        onChange={() => {}}
        error={getFieldErrors("name")}
      />

      <FormField
        label="Slug"
        name="slug"
        id="slug"
        placeholder="my-awesome-product"
        required
        onChange={() => {}}
        helperText="URL-friendly version of your product name"
        error={getFieldErrors("slug")}
      />

      <FormField
        label="Tagline"
        name="tagline"
        id="tagline"
        placeholder="A brief, catchy description"
        required
        onChange={() => {}}
        error={getFieldErrors("tagline")}
      />

      <FormField
        label="Description"
        name="description"
        id="description"
        placeholder="Describe what your product does, who it's for, and why it's useful..."
        required
        onChange={() => {}}
        error={getFieldErrors("description")}
        textarea
      />

      <FormField
        label="Website URL"
        name="websiteUrl"
        id="websiteUrl"
        placeholder="https://yourproduct.com"
        required
        onChange={() => {}}
        error={getFieldErrors("websiteUrl")}
        helperText="Enter your product's website or landing page"
      />

      <FormField
        label="Tags"
        name="tags"
        id="tags"
        placeholder="AI, Productivity, SaaS"
        required
        onChange={() => {}}
        error={getFieldErrors("tags")}
        helperText="Comma-separated tags (e.g., AI, SaaS, Productivity)"
      />

      <div className="mt-28 border-t pt-6">
        <Button
          type="submit"
          size="lg"
          disabled={isPending}
          className="group h-13 w-full rounded-2xl bg-linear-to-r from-primary via-violet-500 to-fuchsia-500 text-white shadow-[0_12px_35px_rgba(139,92,246,.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(139,92,246,.45)] disabled:pointer-events-none disabled:opacity-70"
        >
          {isPending ? (
            <>
              <Loader2Icon className="size-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <SparklesIcon className="size-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
              Submit Product
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

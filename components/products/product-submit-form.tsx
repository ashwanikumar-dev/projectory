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
    <form className="relative flex w-full flex-1 flex-col" action={formAction}>
      <div className="space-y-6 pb-28">
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
      </div>

      <div className="border-t pt-6 absolute bottom-0 left-0 w-full">
        <Button
          type="submit"
          size="lg"
          disabled={isPending}
          className="group h-13 w-full rounded-2xl border border-white/10 bg-[linear-gradient(180deg,#2B2B2B_0%,#181818_45%,#090909_100%)] text-white shadow-[0_14px_35px_rgba(0,0,0,.45)] transition-all duration-300 hover:border-primary/25 hover:brightness-110 hover:shadow-[0_18px_45px_rgba(168,85,247,.18)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60"
        >
          {isPending ? (
            <>
              <Loader2Icon className="size-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <SparklesIcon className="size-6 text-primary transition-transform duration-300 group-hover:rotate-12" />
              <span className="text-lg">Submit Product</span>
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

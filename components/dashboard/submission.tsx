"use client";

import { useState } from "react";
import { ProductType } from "@/types";
import { SubmissionCard } from "./submission-card";

type TabType = "all" | "pending" | "approved" | "rejected" | "deleted";

export function Submissions({ products }: { products: ProductType[] }) {
  const [activeTab, setActiveTab] = useState<TabType>("all");

  const filteredProducts =
    activeTab === "all"
      ? products
      : products.filter((product) => product.status === activeTab);

  const tabs = [
    {
      id: "all",
      label: "All",
      count: products.length,
    },
    {
      id: "pending",
      label: "Pending",
      count: products.filter((p) => p.status === "pending").length,
    },
    {
      id: "approved",
      label: "Approved",
      count: products.filter((p) => p.status === "approved").length,
    },
    {
      id: "rejected",
      label: "Rejected",
      count: products.filter((p) => p.status === "rejected").length,
    },
    {
      id: "deleted",
      label: "Deleted",
      count: products.filter((p) => p.status === "deleted").length,
    },
  ];

  return (
    <section className="mt-10">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">My Submissions</h2>

        <p className="text-sm text-muted-foreground">
          Track and manage your submitted products.
        </p>
      </div>

      <div className="mb-8">
        <div className="inline-flex rounded-2xl border bg-muted/30 p-1 backdrop-blur-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`
          relative
          flex
          items-center
          gap-2
          rounded-xl
          px-4
          py-2.5
          text-sm
          font-medium
          transition-all
          duration-300
          ${
            activeTab === tab.id
              ? "bg-background shadow-sm text-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-background/50"
          }
        `}
            >
              <span>{tab.label}</span>

              <span
                className={`
            rounded-full
            px-2
            py-0.5
            text-xs
            ${activeTab === tab.id ? "bg-primary/10 text-primary" : "bg-muted"}
          `}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      <SubmissionGrid products={filteredProducts} />
    </section>
  );
}

function SubmissionGrid({ products }: { products: ProductType[] }) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-62.5 flex-col items-center justify-center rounded-2xl border border-dashed text-center">
        <h3 className="text-lg font-semibold">No submissions found</h3>

        <p className="mt-2 text-sm text-muted-foreground">
          Products matching this filter will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto grid gap-6 md:grid-cols-3">
      {products.map((product) => (
        <SubmissionCard key={product.id} product={product} />
      ))}
    </div>
  );
}

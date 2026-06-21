"use cache";
import SectionHeader from "@/components/common/section-header";
import ProductExplorer from "@/components/products/product-explorer";
import { getAllApprovedProducts } from "@/lib/products/products-select";
import { CompassIcon } from "lucide-react";

export default async function ExplorePage() {
  const products = await getAllApprovedProducts();

  return (
    <div className="py-20">
      <div className="wrapper">
        <div className="mb-12">
          <SectionHeader
            title="Explore All Products"
            icon={CompassIcon}
            description="Browse and discover amazing projects from our community"
          />
        </div>
        <ProductExplorer products={products} />
      </div>
    </div>
  );
}

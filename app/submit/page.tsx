import SectionHeader from "@/components/common/section-header";
import FormSidebar from "@/components/products/form-sidebar";
import ProductSubmitForm from "@/components/products/product-submit-form";
import { Card } from "@/components/ui/card";
import { SparklesIcon } from "lucide-react";

export default function SubmitPage() {
  return (
    <section className="py-20">
      <div className="wrapper">
        <div className="mb-12">
          <SectionHeader
            title="Submit Your Product"
            icon={SparklesIcon}
            description="Launch your project, get discovered by the community, and receive valuable feedback from developers, creators, and makers."
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Form */}
          <Card className="border-border/60 p-8 shadow-sm">
            <ProductSubmitForm />
          </Card>

          {/* Sidebar */}
          <FormSidebar />
        </div>
      </div>
    </section>
  );
}

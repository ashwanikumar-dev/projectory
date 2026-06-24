import SectionHeader from "@/components/common/section-header";
import ProductSubmitForm from "@/components/products/product-submit-form";
import { Card } from "@/components/ui/card";
import { SparklesIcon, Clock3Icon, ShieldCheckIcon } from "lucide-react";

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
          <div className="space-y-6">
            <Card className="h-fit border-border/60 p-6">
              <h3 className="mb-4 font-semibold">Submission Process</h3>

              <div className="space-y-4 text-sm">
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary font-medium">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Submit Product</p>
                    <p className="text-muted-foreground">
                      Fill in your product details and submit.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary font-medium">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Admin Review</p>
                    <p className="text-muted-foreground">
                      We verify information before publishing.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary font-medium">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Go Live</p>
                    <p className="text-muted-foreground">
                      Your product becomes visible to the community.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="h-fit border-border/60 p-6">
              <h3 className="mb-4 font-semibold">Submission Tips</h3>

              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>✓ Use a clear and memorable product name.</li>
                <li>✓ Add a compelling tagline.</li>
                <li>✓ Include relevant tags.</li>
                <li>✓ Make sure your website link works.</li>
                <li>✓ Provide enough context for reviewers.</li>
              </ul>
            </Card>

            <Card className="h-fit border-border/60 p-6">
              <div className="flex items-start gap-3">
                <Clock3Icon className="mt-0.5 size-5 text-primary" />

                <div>
                  <p className="font-medium">Review Time</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Most submissions are reviewed within 24 hours.
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-start gap-3">
                <ShieldCheckIcon className="mt-0.5 size-5 text-primary" />

                <div>
                  <p className="font-medium">Quality Review</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Every submission is checked before it appears publicly.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

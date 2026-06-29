import { BadgeCheckIcon, Clock3Icon, ShieldCheckIcon } from "lucide-react";
import { Card } from "../ui/card";

const submissionSteps = [
  {
    step: "1",
    title: "Submit Product",
    description: "Fill in your product details and submit for review.",
  },
  {
    step: "2",
    title: "Admin Review",
    description: "Our team verifies your submission for quality and accuracy.",
  },
  {
    step: "3",
    title: "Go Live",
    description: "Once approved, your product becomes visible to everyone.",
  },
];

const tips = [
  "Use a memorable product name.",
  "Write a short, compelling tagline.",
  "Choose relevant tags.",
  "Double-check your website URL.",
  "Provide enough context for reviewers.",
];

export default function FormSidebar() {
  return (
    <div className="sticky top-24 space-y-6">
      <Card className="overflow-hidden rounded-[30px] bg-background/50 p-7 backdrop-blur-3xl shadow-[0_20px_60px_rgba(0,0,0,.10)] ring-1 ring-white/5">
        <div className="mb-8">
          <h3 className="text-lg font-bold tracking-tight">
            Submission Process
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Every product goes through a short review before it is published.
          </p>
        </div>

        <div className="space-y-7">
          {submissionSteps.map((item, index) => (
            <div key={item.step} className="relative flex gap-4">
              {index !== submissionSteps.length - 1 && (
                <div className="absolute left-5 top-12 h-10 w-px bg-border/60" />
              )}

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-primary/20 to-violet-500/20 font-bold text-primary ring-1 ring-primary/15">
                {item.step}
              </div>

              <div>
                <h4 className="font-semibold">{item.title}</h4>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="overflow-hidden rounded-[30px] bg-background/50 p-7 backdrop-blur-3xl shadow-[0_20px_60px_rgba(0,0,0,.10)] ring-1 ring-white/5">
        <div className="mb-7">
          <h3 className="text-lg font-bold tracking-tight">
            Before You Submit
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            A few recommendations to improve your approval chances.
          </p>
        </div>

        <div className="space-y-4">
          {tips.map((tip) => (
            <div key={tip} className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <BadgeCheckIcon className="size-4 text-primary" />
              </div>
              <p className="text-sm leading-6 text-muted-foreground">{tip}</p>
            </div>
          ))}
        </div>

        <div className="my-8 h-px bg-linear-to-r from-transparent via-border to-transparent" />

        <div className="space-y-5">
          <div className="flex items-start gap-4 rounded-2xl border border-border/40 bg-background/50 p-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
              <Clock3Icon className="size-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold">Review Time</h4>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Most submissions are reviewed within 24 hours.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-2xl border border-border/40 bg-background/50 p-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
              <ShieldCheckIcon className="size-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold">Quality Review</h4>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Every submission is manually reviewed before appearing publicly.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

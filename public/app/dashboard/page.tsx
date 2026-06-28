import { Submissions } from "@/components/dashboard/submission";
import { UserStatCard } from "@/components/dashboard/user-stat-card";
import { getUserDashboardData } from "@/lib/user/user-action";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const result = await getUserDashboardData(userId);

  if (!result.success) {
    return <div>Unable to load dashboard.</div>;
  }

  const products = result.data;
  if (!products) return null;

  return (
    <main className="container mx-auto px-4 py-8 mt-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Track and manage your product submissions.
        </p>
      </div>

      <UserStatCard products={products} />
      <Submissions products={products} />
    </main>
  );
}

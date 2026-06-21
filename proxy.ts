import { clerkClient, clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth) => {
  const { userId, orgId } = await auth();

  if (userId && !orgId) {
    try {
      const client = await clerkClient();
      //check if user has any organizations

      const { data: organizations } =
        await client.users.getOrganizationMembershipList({ userId: userId });

      if (organizations && organizations.length > 0) {
        return NextResponse.next();
      }

      const user = await client.users.getUser(userId);

      const orgName = user.fullName
        ? `${user.fullName}'s Organization`
        : user.firstName
          ? `${user.firstName}'s Organization`
          : user.username
            ? `${user.username}'s Organization`
            : user.primaryEmailAddress?.emailAddress
              ? `${user.primaryEmailAddress?.emailAddress}'s Organization`
              : "My Organization";

      await client.organizations.createOrganization({
        name: orgName,
        createdBy: userId,
      });

      console.log("Auto-created organization:", orgName);
    } catch (error) {
      console.error("Error auto-creating organization:", error);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);
  const key = "vpBqd9i4AwGFvUDnzQdaHA9aVm8NwuUtFLJzPDI-odw";

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const response = await fetch("https://api.whop.com/api/v2/memberships", {
      headers: {
        Authorization: `Bearer ${key}`,
        Accept: "application/json",
      },
    });

    const data = await response.json();
    
    // Filter memberships to find if user's email exists
    const userMembership = data.data.find(
      (membership: any) => membership.email === session.user.email
    );

    // Return relevant membership data including plan, status, etc.
    if (userMembership) {
      const membershipData = {
        email: userMembership.email,
        plan: userMembership.plan,
        status: userMembership.status,
        valid: userMembership.valid,
        cancelAtPeriodEnd: userMembership.cancel_at_period_end,
        licenseKey: userMembership.license_key,
        expiresAt: userMembership.expires_at,
        renewalPeriodStart: userMembership.renewal_period_start
      };
      return NextResponse.json({ data: [membershipData] });
    }

    return NextResponse.json({ data: [] });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch memberships" },
      { status: 500 }
    );
  }
}

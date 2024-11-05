import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);
  const key = "vpBqd9i4AwGFvUDnzQdaHA9aVm8NwuUtFLJzPDI-odw";
  console.log("Logging the unauthorized response", session);

  if (!session?.user?.email) {
    console.log("Logging the unauthorized response", session);

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

    return NextResponse.json({ data: userMembership ? [userMembership] : [] });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch memberships" },
      { status: 500 }
    );
  }
}

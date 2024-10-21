




import { NextRequest, NextResponse } from 'next/server';
import { getUserUsage, updateUserUsage } from '../../lib/usageData';

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId');
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }
  const usage = await getUserUsage(userId);
  return NextResponse.json(usage);
}

export async function POST(request: NextRequest) {
  const { userId, type } = await request.json();
  if (!userId || !type) {
    return NextResponse.json({ error: 'User ID and usage type are required' }, { status: 400 });
  }
  await updateUserUsage(userId, type);
  return NextResponse.json({ message: 'Usage updated successfully' });
}
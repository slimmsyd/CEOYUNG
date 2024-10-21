import fs from 'fs/promises';
import path from 'path';

const USAGE_DATA_FILE = path.join(process.cwd(), 'data', 'usage_data.json');

interface UsageData {
  users: {
    [userId: string]: {
      responses: number;
      images: number;
    };
  };
}

async function loadUsageData(): Promise<UsageData> {
  try {
    const data = await fs.readFile(USAGE_DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist or is invalid, return default structure
    return { users: {} };
  }
}

async function saveUsageData(data: UsageData): Promise<void> {
  await fs.writeFile(USAGE_DATA_FILE, JSON.stringify(data, null, 2));
}

export async function getUserUsage(userId: string) {
  const data = await loadUsageData();
  return data.users[userId] || { responses: 0, images: 0 };
}

export async function updateUserUsage(userId: string, type: 'responses' | 'images') {
  const data = await loadUsageData();
  if (!data.users[userId]) {
    data.users[userId] = { responses: 0, images: 0 };
  }
  data.users[userId][type]++;
  await saveUsageData(data);
}
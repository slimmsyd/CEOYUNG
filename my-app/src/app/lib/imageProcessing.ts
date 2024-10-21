import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
const MAX_SIZE = 1024; // Maximum width or height in pixels

export async function optimizeImage(file: File): Promise<string> {
  // Ensure upload directory exists
  await fs.mkdir(UPLOAD_DIR, { recursive: true });

  // Read file buffer
  const buffer = await file.arrayBuffer();

  // Process image
  const optimizedBuffer = await sharp(Buffer.from(buffer))
    .resize(MAX_SIZE, MAX_SIZE, {
      fit: 'inside',
      withoutEnlargement: true
    })
    .toFormat('webp', { quality: 80 })
    .toBuffer();

  // Generate unique filename
  const filename = `optimized_${Date.now()}.webp`;
  const filePath = path.join(UPLOAD_DIR, filename);

  // Save optimized image
  await fs.writeFile(filePath, optimizedBuffer);

  // Return path relative to public directory
  return `/uploads/${filename}`;
}
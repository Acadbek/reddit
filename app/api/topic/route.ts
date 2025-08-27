import { db } from '@/db';

export async function GET(request: Request) {
  const topics = await db.topic.findMany();

  return new Response(JSON.stringify(topics), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

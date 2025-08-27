import { db } from '@/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const post = await db.post.findMany({
    where: {
      id: params.id,
    },
    include: {
      comments: true,
      user: true,
    },
  });

  return new Response(JSON.stringify(post), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

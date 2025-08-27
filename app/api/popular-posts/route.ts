import { db } from "@/db";

export async function GET(request: Request) {
  const post = await db.post.findMany({
    include: {
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  return new Response(JSON.stringify(post), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

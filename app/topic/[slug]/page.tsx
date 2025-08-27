import CreatePostForm from '@/components/create-post-form';
import { db } from '@/db';
import { path } from '@/helpers/path';
import Link from 'next/link';

async function TopicSlugPage({ params }: any) {
  const { slug } = params;

  const posts = await db.post.findMany({
    where: {
      topic: {
        slug: slug,
      },
    },
    include: {
      user: true,
      comments: true,
    },
  });
  return (
    <div>
      <div className='flex items-center justify-between'>
        <p className='capitalize text-3xl font-semibold mb-6'>{slug}</p>
        <CreatePostForm slug={slug} />
      </div>
      <div className='grid grid-cols-4'>
        <div className='col-span-3 flex flex-col gap-3'>
          {posts.map((post) => (
            <article key={post.id} className='border p-3 rounded-md'>
              <Link href={path.topicSlug(slug, post.id)} className='text-2xl'>
                {post.title}
              </Link>
              <p className='mt-2 line-clamp-3'>{post.content}</p>
            </article>
          ))}
        </div>
        <div className='col-span-1'>2</div>
      </div>
    </div>
  );
}

export default TopicSlugPage;

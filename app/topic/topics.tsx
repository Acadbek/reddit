import { db } from '@/db';
import { path } from '@/helpers/path';
import Link from 'next/link';
import React from 'react';

const Topics = async () => {
  const topics = await db.topic.findMany();

  return (
    <div className='flex flex-col gap-2 mt-4'>
      {topics.map((topic) => (
        <Link key={topic.id} href={path.showTopicPage(topic.slug)}>
          {topic.slug}
        </Link>
      ))}
    </div>
  );
};

export default Topics;

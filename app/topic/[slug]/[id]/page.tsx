import React from 'react';
import { Button } from '@heroui/button';
// import Image from 'next/image';
import Post from '@/components/post';
import { Textarea } from '@heroui/input';
import { use } from 'react';
import Image from 'next/image';

interface PostSlugProps {
  params: Promise<{ id: string }>;
}

const PostSlug = ({ params }: PostSlugProps) => {
  const { id } = use(params);

  return (
    <div>
      <Post id={id} />
    </div>
  );
};

export default PostSlug;

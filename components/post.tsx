import { db } from '@/db';
import { Button } from '@heroui/button';
import { Textarea } from '@heroui/input';
import React from 'react';
import * as actions from "@/actions";
import { CommentItem } from './CommentItem';

interface PostProps {
  id: string;
}

function buildCommentTree(comments: any[]): any[] {
  const commentMap = new Map();
  const rootComments: any[] = [];

  comments.forEach(comment => {
    commentMap.set(comment.id, { ...comment, children: [] });
  });

  comments.forEach(comment => {
    if (comment.parentId) {
      const parent = commentMap.get(comment.parentId);
      if (parent) {
        parent.children.push(commentMap.get(comment.id));
      }
    } else {
      rootComments.push(commentMap.get(comment.id));
    }
  });

  return rootComments;
}

const Post = async ({ id }: PostProps) => {
  const post = await db.post.findFirst({
    where: { id },
    include: {
      user: true,
      comments: {
        include: {
          user: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      },
    },
  });

  if (!post) {
    return <p className="text-red-500">Post not found</p>;
  }

  const nestedComments = buildCommentTree(post.comments);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <article className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="prose max-w-none">
          <p>{post.content}</p>
        </div>
      </article>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Add a Comment</h3>
        <form action={actions.postComment}>
          <Textarea
            className="w-full mb-4"
            placeholder="Share your thoughts..."
            name="content"
            minRows={3}
            required
          />
          <input type="hidden" name="postId" value={post.id} />
          <input type="hidden" name="userId" value={post.user.id} />
          <input type="hidden" name="parentId" value="" />

          <Button type="submit" color="primary">
            Post Comment
          </Button>
        </form>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4">
          Comments ({post.comments.length})
        </h3>

        {nestedComments.length === 0 ? (
          <p className="text-gray-500 italic">No comments yet</p>
        ) : (
          <div className="space-y-4">
            {nestedComments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                postId={post.id}
                userId={post.user.id}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Post;
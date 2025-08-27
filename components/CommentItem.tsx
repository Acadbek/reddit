"use client";
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import Image from "next/image";
import { useState } from "react";
import * as actions from "@/actions";

type Comment = {
  id: string;
  content: string;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
  parentId?: string | null;
  children?: Comment[];
};

interface CommentItemProps {
  comment: Comment;
  postId: string;
  userId: string;
  level?: number;
}

export function CommentItem({
  comment,
  postId,
  userId,
  level = 0
}: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const maxLevel = 5;
  const canReply = level < maxLevel;

  return (
    <div
      className={`border p-3 rounded mb-2 ${level > 0 ? 'ml-6 border-l-2 border-l-blue-200' : ''
        }`}
      style={{ marginLeft: level > 0 ? `${level * 20}px` : '0' }}
    >
      <div className="flex items-center gap-2">
        <Image
          width={32}
          height={32}
          src={comment.user.image || '/default-avatar.png'}
          alt={comment.user.name || 'User'}
          className="rounded-full"
        />
        <p className="font-medium text-sm">{comment.user.name}</p>
        {level > 0 && (
          <span className="text-xs text-gray-500">
            • Reply to parent
          </span>
        )}
      </div>

      <div className="ml-10 mt-2">
        <p className="text-gray-800">{comment.content}</p>

        {canReply && (
          <Button
            variant="ghost"
            size="sm"
            className="mt-2 text-xs"
            onPress={() => setShowReplyForm(!showReplyForm)}
          >
            {showReplyForm ? 'Cancel' : 'Reply'}
          </Button>
        )}

        {showReplyForm && (
          <form action={actions.postComment} className="mt-3">
            <Textarea
              name="content"
              placeholder="Write your reply..."
              className="w-full text-sm"
              minRows={2}
              required
            />
            {/* TODO: hidden inputs */}
            <input type="hidden" name="postId" value={postId} />
            <input type="hidden" name="userId" value={userId} />
            <input type="hidden" name="parentId" value={comment.id} />

            <div className="flex gap-2 mt-2">
              <Button
                type="submit"
                size="sm"
                color="primary"
                onPress={() => setShowReplyForm(false)}
              >
                Send Reply
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onPress={() => setShowReplyForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}

        {comment.children && comment.children.length > 0 && (
          <div className="mt-4">
            {comment.children.map((child) => (
              <CommentItem
                key={child.id}
                comment={child}
                postId={postId}
                userId={userId}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
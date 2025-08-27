// actions/index.ts - Server Action
"use server";
import { db } from "@/db";
import { revalidatePath } from "next/cache";

export async function postComment(formData: FormData) {
  console.log("Hello");

  const content = formData.get("content") as string;
  const postId = formData.get("postId") as string;
  const userId = formData.get("userId") as string;
  const parentId = formData.get("parentId") as string;

  console.log(content, postId, userId, parentId);

  if (!content || !postId || !userId) {
    throw new Error("Required fields are missing");
  }

  await db.comment.create({
    data: {
      content,
      postId,
      userId,
      parentId: parentId || null,
    },
  });

  console.log("Hello postComment");

  revalidatePath(`/posts/${postId}`);
}

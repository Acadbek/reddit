"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import z from "zod";

interface CreatePostProps {
  error: {
    name?: string[];
    content?: string[];
    _form?: string[];
  };
}

const createPostSchema = z.object({
  name: z.string().min(5),
  content: z.string().max(3000).min(10),
});

export async function createPost(
  slug: string,
  formState: CreatePostProps,
  formData: FormData
): Promise<CreatePostProps> {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return { error: { _form: ["User topilmadi"] } };
    }

    const result = createPostSchema.safeParse({
      name: formData.get("name"),
      content: formData.get("content"),
    });

    if (!result.success) {
      const error = result.error.flatten().fieldErrors;

      return { error };
    }

    const topic = await db.topic.findFirst({
      where: { slug: slug },
    });

    if (!topic) {
      return { error: { _form: ["Something went wrong"] } };
    }

    await db.post.create({
      data: {
        title: result.data.name,
        content: result.data.content,
        userId: session?.user?.id!,
        topicId: topic.id,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: {
          _form: [error.message],
        },
      };
    } else {
      return {
        error: {
          _form: ["Something went wroong"],
        },
      };
    }
  }
  return {
    error: {},
  };

  // revalidate
}

"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { path } from "@/helpers/path";
import { z } from "zod";

// .regex(/^[a-zA-Z]+$/)

const topicSchema = z.object({
  name: z.string().min(5),
  description: z.string().min(10, {
    message: "Descrioption 10dan ortiq bolishi kerak",
  }),
});

interface FormStateType {
  error: {
    name?: string[];
    description?: string[];
  };
}

export async function createTopic(
  formState: FormStateType,
  formData: FormData
): Promise<FormStateType> {
  const data = {
    name: formData.get("name"),
    description: formData.get("description"),
  };
  const result = topicSchema.safeParse(data);

  if (!result.success) {
    const error = result.error?.flatten().fieldErrors;

    return { error };
  }

  const response = await db.topic.create({
    data: {
      slug: result.data.name,
      description: result.data.description,
    },
  });

  console.log("response: ", response);

  revalidatePath("/");
  redirect(path.showTopicPage(response.slug));
}

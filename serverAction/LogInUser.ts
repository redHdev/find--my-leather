"use server";

import getErrorMessage from "@/lib/getErrorMessage";
import { LogInSchema, LogInType } from "@/lib/user/AuthSchema";

export async function LogInUser(data: LogInType) {
  const result = LogInSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: result.error.format() };
  }

  try {
    const newUser = "User Logged In";

    return { success: true, data: newUser };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

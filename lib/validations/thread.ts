import * as z from 'zod'

export const ThreadValidation = z.object({
  thread: z
    .string().nonempty()
    .min(3, { message: "Minimum 3 characters." })
    .max(300, { message: "Maximum 30 caracters." }),
  accountId: z
    .string()
});

export const CommentsValidation= z.object({
  thread: z
    .string().nonempty()
    .min(3, { message: "Minimum 3 characters." })
    .max(100, { message: "Maximum 30 caracters." }),
});
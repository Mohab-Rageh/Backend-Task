import { ZodError, ZodSchema } from "zod";

export const validate = <T>(schema: ZodSchema<T>, data: unknown): T => {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      throw error;
    }
    throw new Error("An error occurred while validating data");
  }
};

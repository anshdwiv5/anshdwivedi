import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { sendResumeRequest } from "./resume.server";

export const requestResume = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      email: z.string().trim().email().max(255),
    }),
  )
  .handler(async ({ data }) => {
    return sendResumeRequest(data.email);
  });
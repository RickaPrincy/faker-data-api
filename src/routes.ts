import { defaultEndpointsFactory } from "express-zod-api";
import { z } from "zod";

export const getHello = defaultEndpointsFactory.build({
  method: "get",
  input: z.object({}),
  output: z.object({ hello: z.string() }),
  handler: async () => {
    return { hello: "Welcome to faker-backed" };
  },
});

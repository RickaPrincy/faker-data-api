import { defaultEndpointsFactory } from "express-zod-api"; 
import { z } from "zod";

export const helloWorld = defaultEndpointsFactory.build({
  method: "get",
  input: z.object({}),
  output: z.object({ name: z.string()}),
  handler: async ({ options, logger})=>{
    logger.debug("Options : " + options);
    return { name: "Ricka" };
  },
});

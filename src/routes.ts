import { defaultEndpointsFactory } from "express-zod-api";
import { z } from "zod";
import { fakerGenerator } from "./logic/faker";

export const getHello = defaultEndpointsFactory.build({
  method: "get",
  input: z.object({}),
  output: z.object({ hello: z.string() }),
  handler: async () =>  { 
    return { hello: "Welcome to faker-backed" }; 
  }
});

const AllFakerSupported = Object.keys(fakerGenerator);

export const getAllFaker= defaultEndpointsFactory.build({
  method: "get",
  input: z.object({}),
  output: z.object({ columns : z.array(z.string()).min(AllFakerSupported.length)}),
  handler: async () =>  { 
    return { columns: AllFakerSupported }; 
  }
});

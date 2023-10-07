import { helloWorld } from "./routes";
import { Routing } from "express-zod-api";

const router : Routing = {
  hello: helloWorld
};

export default router;

import { getHello } from "./routes";
import { Routing } from "express-zod-api";

const router: Routing = {
  hello: getHello,
};

export default router;

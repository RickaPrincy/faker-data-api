import { getAllFaker, getHello } from "./routes";
import { Routing } from "express-zod-api";

const router: Routing = {
  hello: getHello,
  all: getAllFaker,
};

export default router;

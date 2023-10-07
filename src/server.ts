import config from "./config";
import { createServer } from "express-zod-api";
import router from "./router";

createServer(config, router);

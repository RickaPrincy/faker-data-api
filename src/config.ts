import { createConfig } from "express-zod-api";
import * as dotenv from "dotenv" ;

dotenv.config();
const port = +process.env.PORT! || 3000;

const config = createConfig({
  server:{
    listen: port
  },
  cors: true,
  logger:{
    level: "debug",
    color: true
  }
});

export default config;

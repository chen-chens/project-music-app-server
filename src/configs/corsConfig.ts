import { CorsOptions } from "cors";

const corsConfigs: CorsOptions = {
  preflightContinue: true,
  origin: [
    "http://localhost:3000", // dev
  ],
};
export default corsConfigs;

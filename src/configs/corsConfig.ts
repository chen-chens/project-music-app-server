import cors, { CorsOptions } from "cors";

export const corsConfigs: CorsOptions = {
    preflightContinue: true,
    origin: [
        "http://localhost:3000", // dev
        
    ]
}
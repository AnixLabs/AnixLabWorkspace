import { config } from "../config";

export const loggerConfig =
  config.NODE_ENV === "development"
    ? { transport: { target: "pino-pretty", options: { colorize: true } } }
    : true;

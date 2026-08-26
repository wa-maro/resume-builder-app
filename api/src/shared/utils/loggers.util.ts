import winston from "winston";

const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.printf(({ timestamp, level, message }) => {
    return `[${timestamp}] ${level}: ${message}`;
  }),
);

const errorConsoleFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.colorize(),
  winston.format.printf(
    ({ timestamp, level, message, stack, statusCode, method, route }) => {
      return [
        `[${timestamp}] ${level}: ${message}`,
        `${method} ${route} → ${statusCode}`,
        stack,
      ]
        .filter(Boolean)
        .join("\n");
    },
  ),
);

const jsonFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json(),
);

// Application information logs
export const infoLogger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console({
      format: consoleFormat,
    }),

    new winston.transports.File({
      filename: "logs/app.log",
      level: "info",
      format: jsonFormat,
    }),
  ],
});

// HTTP request logs
export const httpLogger = winston.createLogger({
  level: "http",
  transports: [
    new winston.transports.Console({
      format: consoleFormat,
    }),

    new winston.transports.File({
      filename: "logs/request.log",
      level: "http",
      format: jsonFormat,
    }),
  ],
});

// Error logs
export const errorLogger = winston.createLogger({
  level: "error",
  transports: [
    new winston.transports.Console({
      format: errorConsoleFormat,
    }),

    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      format: jsonFormat,
    }),
  ],
});

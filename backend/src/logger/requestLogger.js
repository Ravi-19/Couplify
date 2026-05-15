const pinoHttp = require("pino-http");
const logger = require("./index");

const requestLogger = pinoHttp({
  logger,
});

module.exports = requestLogger;
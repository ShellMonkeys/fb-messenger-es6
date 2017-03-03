import winston from 'winston';
import moment from 'moment';

const logger = new (winston.Logger)({
    level: process.env.LOG_LEVEL || 'debug',
    transports: [
        new (winston.transports.Console)({
            timestamp: () => moment().format('H:mm:ss'),
            prettyPrint: true,
            colorize: true,
        }),
    ],
});

export default {
    error: logger.error,
    debug: logger.debug,
    info: logger.info,
};

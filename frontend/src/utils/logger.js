import pino from 'pino';

export const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
	prettyPrint: process.env.NODE_ENV !== 'production' ? {
		colorize: true,
		translateTime: 'SYS:standard',
	} : false,
  transport: {
    target: 'pino-pretty'
  },
});
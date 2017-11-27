import winston from 'winston';
import moment from 'moment';
import path from 'path';
const label = path.basename(process.mainModule.filename);
const logger = winston.createLogger({
	format: winston.format.combine(
		winston.format.timestamp(), 
		winston.format.label({ label }), 
		winston.format.printf(({ timestamp, label, level, message }) => [
			`[${moment(timestamp).format('YYYY-MM-DD HH:mm:ss.SSS')}]`, 
			`[${label}]`, 
			`[${level}]`, 
			` ${message}`, 
		].join(''))
	), 
	transports: [
		new winston.transports.Console(), 
	], 
});
export default logger;
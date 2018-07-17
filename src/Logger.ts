export enum LogLevel {
    normal,
    warn,
    critical
}

export class Logger {

    public static log(message: string, level: LogLevel): void {
        if (level === LogLevel.normal) {
            this.logNormal(message);
        } else if (level === LogLevel.warn) {
            this.logWarn(message);
        } else if (level === LogLevel.critical) {
            this.logCritical(message);
        } else {
            throw new Error('Unkown logging type');
        }
    }

    private static logNormal(message: string): void {
        console.log('normal: ' + message);
    }

    private static logWarn(message: string): void {
        console.log('warn: ' + message);
    }

    private static logCritical(message: string): void {
        console.log('critical: ' + message);
    }
}

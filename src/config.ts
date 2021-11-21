import "dotenv/config";

export class BotConfiguration {

    readonly nodeEnv: Environemnt;
    readonly token: string;
    readonly webhook?: Webhook;
    
    constructor() {
        this.nodeEnv = process.env.NODE_ENV === "PROD" ? Environemnt.PROD : Environemnt.DEV;
        this.token = process.env.TELEGRAM_BOT_TOKEN || "";
        if(process.env.WEBHOOK_PORT !== undefined && process.env.TELEGRAM_BOT_APP_NAME !== undefined) {
            this.webhook = {
                appName: process.env.TELEGRAM_BOT_APP_NAME,
                port: Number.parseInt(process.env.WEBHOOK_PORT),
                url: `https://${process.env.TELEGRAM_BOT_APP_NAME}.herokuapp.com/bot${process.env.TELEGRAM_BOT_TOKEN}`
            }
        }
    }

    public isProdEnv() : boolean {
        return Environemnt.PROD === this.nodeEnv;
    }
}

interface Webhook {
    port: number,
    appName: string, 
    url: string
}

enum Environemnt {
    PROD, DEV
}
import {BotConfiguration} from './config'
import {Telegraf} from 'telegraf'

export class BotApp {
    
    private botConfig : BotConfiguration;
    private bot : Telegraf;

    constructor() {
        this.botConfig = new BotConfiguration();
        this.bot = new Telegraf(this.botConfig.token)
    }

    public start() {
        if(this.botConfig.isProdEnv() && this.botConfig.webhook != undefined){
            this.bot.telegram.setWebhook(this.botConfig.webhook?.url);
            console.info("Running in production. Bot will start with webhooks enabled!");
        }

         /** Register exit callbacks */
         process.once('SIGINT', () => this.stopBot('SIGINT'));
         process.once('SIGTERM', () => this.stopBot('SIGTERM'));

        this.bot.launch();
    }

    public stop() {
        this.stopBot('SIGTERM');
    }

    private stopBot(signal : string) {
        this.bot.stop(signal);
        console.info("Boot have been stoped!");
    }
}
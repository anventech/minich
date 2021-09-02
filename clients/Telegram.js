const chalk = require('chalk');
const Telegram = require("node-telegram-bot-api");
const Logger = require("../structures/Logger");
const Manager = require("../structures/Manager");

module.exports = {
  name: "Telegram",
  idLength: [9, 10],
  async create(terminal, chat) {
    const logger = new Logger(terminal, this.name);

    if (!process.env.TELEGRAM_TOKEN) return logger.error("No se ha encontrado el archivo de configuración, para crearlo use el comando genConfig.");
    
    this.bot = new Telegram(process.env.TELEGRAM_TOKEN, {
      polling: true
    });

    const manager = new Manager(terminal);

    manager.connect(this.name);

    const ignoredTypes = [
      "audio",
      "document",
      "photo",
      "sticker",
      "video",
      "voice",
      "contact",
      "location",
      "new_chat_members",
      "left_chat_member",
      "new_chat_title",
      "new_chat_photo",
      "delete_chat_photo",
      "group_chat_created",
      "game",
      "pinned_message",
      "poll",
      "dice",
      "migrate_from_chat_id",
      "migrate_to_chat_id",
      "channel_chat_created",
      "supergroup_chat_created",
      "successful_payment",
      "invoice",
      "video_note",
      "successful_payment",
      "invoice",
      "video_note"
    ];

    this.bot.on("message", (message) => {
      if (ignoredTypes.some(type => message[type])) return;

      const id = message.from.id.toString();

      chat.last = id;

      if (chat.actual != id) return logger.warning("Hay nuevos mensajes de otro chat:", chalk.yellow.bold(betweenCor(message.from.id), chalk.magenta.bold(betweenCor(message.from.username))));

      chat.message("receive", this.name, message.text, {
        author: {
          id: id,
          username: message.from.username
        }
      });
    });

    this.bot.on("polling_error", (error) => {
      logger.error("Error de conexión.");
    });

    this.send = (content, data) => {
      this.bot.sendMessage(data.author.id, content).then(message => {
        chat.message("send", this.name, content, {
          author: {
            id: data.author.id
          }
        });

        terminal.resume();
      }).catch(error => {
        logger.error("No se pudo contactar a ese usuario.");
      });
    };
  }
}
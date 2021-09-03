const chalk = require("chalk");
const Discord = require("discord.js-light");
const Logger = require("../structures/Logger");
const Manager = require("../structures/Manager");
const { betweenCor } = require("../structures/Utils");

module.exports = {
  name: "Discord",
  modes: ["dm", "channel"],
  mode: "dm",
  idLength: [18],
  async create(terminal, chat) {
    const logger = new Logger(terminal, this.name);

    if (!process.env.DISCORD_TOKEN) return logger.error("No se ha encontrado el archivo de configuración, para crearlo use el comando genConfig.");

    this.bot = new Discord.Client({
      disabledEvents: ["GUILD_CREATE", "GUILD_DELETE", "GUILD_MEMBERS_CHUNK", "GUILD_UPDATE"],
      ws: {
        intents: Discord.Intents.NON_PRIVILEGED
      }
    });

    const manager = new Manager(terminal);

    this.bot.on("ready", () => {
      this.ready = true;

      manager.connect(this.name);
    });

    this.bot.on("message", (message) => {
      if (message.author.id == this.bot.user.id) return;

      if (this.mode == "dm") {
        if (message.channel.type != "dm") return;

        chat.last = message.author.id;

        if (chat.actual != message.author.id) return logger.warn("Hay nuevos mensajes de otro chat:", chalk.yellow.bold(betweenCor(message.author.id), chalk.magenta.bold(betweenCor(message.author.tag))));

        chat.message("receive", this.name, message.content, {
          author: {
            id: message.author.id,
            tag: message.author.tag
          }
        });
      } if (this.mode == "channel") {
        if (message.channel.type != "text") return;

        if (chat.actual != message.channel.id) return logger.warning("Hay nuevos mensajes de otro chat:", chalk.yellow.bold(betweenCor(message.channel.id), chalk.magenta.bold(betweenCor(`#${message.channel.name}`))));
        
        chat.last = message.author.id;

        chat.message("receive", this.name, message.content, {
          guild: {
            id: message.guild.id,
            name: message.guild.name
          },
          channel: {
            id: message.channel.id,
            name: message.channel.name
          },
          author: {
            id: message.author.id,
            tag: message.author.tag
          }
        });
      }

      terminal.resume();
    });

    this.send = (content, data) => {
      if (this.mode == "dm") {
        this.bot.users.fetch(data.author.id).then(user => {
          user.send(content);

          chat.message("send", this.name, content, {
            author: {
              id: user.id,
              tag: user.tag
            }
          });
        }).catch(error => {
          logger.error("No se pudo contactar a ese usuario.");
        });
      } if (this.mode == "channel") {
        this.bot.channels.fetch(data.channel.id).then(channel => {
          this.bot.guilds.fetch(channel.guild.id).then(guild => {
            channel.send(content);

            chat.message("send", this.name, content, {
              guild: {
                id: guild.id,
                name: guild.name
              },
              channel: {
                id: channel.id,
                name: channel.name
              }
            });
          }).catch(error => {
            logger.error("No se pudo obtener ese servidor.");
          });
        }).catch(error => {
          logger.error("No se pudo obtener ese canal.");
        });
      }

      terminal.resume();
    };

    this.bot.login(process.env.DISCORD_TOKEN).catch(error => {
      return logger.error("Error al loguear.");
    });
  }
}
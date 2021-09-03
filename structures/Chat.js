const chalk = require('chalk');
const Logger = require('./Logger');
const { betweenCor } = require('./Utils');

module.exports = class Chat extends Logger {
  constructor(terminal, app) {
    super(terminal);
  
    this.app = app;
    this.actual = false;
    this.last = false;
    this.clients = false;
    this.commands = false;
  }

  message(type, app, content, data) {
    type = (type == "send") ? betweenCor("➖") : betweenCor("➕");

    const render = [
      chalk.grey.bold(type),
      chalk.blue.bold(betweenCor(app))
    ];

    if (data.guild) {
      if (data.guild.id) {
        render.push(chalk.yellow.bold(betweenCor(data.guild.id)));
      } if (data.guild.name) {
        render.push(chalk.magenta.bold(betweenCor(data.guild.name)));
      }
    } 

    if (data.channel) {
      if (data.channel.id) {
        render.push(chalk.yellow.bold(betweenCor(data.channel.id)));
      } if (data.channel.name) {
        render.push(chalk.magenta.bold(betweenCor(`#${data.channel.name}`)))
      }
    }

    if (data.author) {
      if (data.author.id) {
        render.push(chalk.yellow.bold(betweenCor(data.author.id)));
      } if (data.author.username) {
        render.push(chalk.magenta.bold(betweenCor(data.author.username)));
      } if (data.author.tag) {
        render.push(chalk.magenta.bold(betweenCor(data.author.tag)));
      }
    }

    render.push(content);

    this.log(...render);
  }
}
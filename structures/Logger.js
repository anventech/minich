const chalk = require('chalk');
const { betweenCor } = require('./Utils');

module.exports = class Logger {
  constructor(terminal, app = false) {
    this.terminal = terminal;
    if (app) this.app = app;
  }

  log(...args) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    console.log(...args);
    this.terminal.prompt(true);
  }

  clear() {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    this.terminal.prompt(true);
  }

  error(...args) {
    if (this.app) args.push(`(${this.app})`);

    this.log(chalk.red.bold(betweenCor("❌"), ...args));
  }

  success(...args) {
    if (this.app) args.push(`(${this.app})`);

    this.log(chalk.green.bold(betweenCor("✅"), ...args));
  }

  info(...args) {
    if (this.app) args.push(`(${this.app})`);

    this.log(chalk.blue.bold(betweenCor("❔"), ...args));
  }

  warn(...args) {
    if (this.app) args.push(`(${this.app})`);

    this.log(chalk.yellow.bold(betweenCor("❕"), ...args));
  }

  loading(...args) {
    if (this.app) args.push(`(${this.app})`);

    this.log(chalk.cyan.bold(betweenCor("♻️"), ...args));
  }
}
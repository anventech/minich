const chalk = require('chalk');
const Logger = require('./Logger');
const { betweenCor } = require('./Utils');

module.exports = class Manager extends Logger {
  constructor(terminal) {
    super(terminal);
  }

  load() {
    this.success("Aplicación iniciada.");
    this.loading("Conectando clientes...");
  }

  connect(app) {
    this.log(chalk.blue.bold(betweenCor("🔌"), "Cliente conectado:", app));
  }
}
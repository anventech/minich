const Logger = require("../structures/Logger");
const Manager = require("../structures/Manager");

module.exports = {
  name: "",
  modes: [],
  mode: "",
  idLength: [],
  async create(terminal, chat) {
    this.bot = false;

    const logger = new Logger(terminal, this.name);

    const manager = new Manager(terminal);
  }
}
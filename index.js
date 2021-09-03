require('dotenv').config();
const readline = require('readline');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const emojis = require('emojis');
const Logger = require('./structures/Logger');
const Manager = require('./structures/Manager');
const Chat = require('./structures/Chat');
const Conector = require('./structures/Conector');
const Utils = require('./structures/Utils');
const ArrayMap = require('./structures/ArrayMap');
const packageJSON = require('./package.json');

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const join = (...args) => {
  return path.join(__dirname, ...args);
};

const logger = new Logger(terminal);

const title = fs.readFileSync(join("title.txt")).toString();

logger.log(chalk.green.bold(title));

logger.info("Usando la versión", chalk.white.bold(packageJSON.version));

const manager = new Manager(terminal);

manager.load();

const database = new Conector(join("database.sqlite"));

const chat = new Chat(terminal, "Telegram");

const clients = new ArrayMap();

const clientsFiles = fs.readdirSync(join("clients")).filter(file => file.endsWith(".js"));

for (let client of clientsFiles) {
  client = require(join("clients", client));

  client.create(terminal, chat);

  clients.set(client.name, client);
}

chat.clients = clients;

const commands = new ArrayMap();

const commandsFiles = fs.readdirSync(join("commands")).filter(file => file.endsWith(".js"));

for (let command of commandsFiles) {
  command = require(join("commands", command));

  commands.set(command.name, command);
}

chat.commands = commands;

const dependencies = {
  fs: require('fs'),
  chalk: require('chalk'),
  join: join,
  utils: Utils
};

terminal.on("line", async (line) => {
  let message = line.trim();

  if (message.length < 1) return logger.clear();

  const defaultPrefix = "/";

  const prefix = (await database.has("SELECT * FROM config WHERE name = \"prefix\";")) ? (await database.get("SELECT * FROM config WHERE name = \"prefix\";")).value : defaultPrefix;
  
  if (message.startsWith(prefix) || message.startsWith(defaultPrefix)) {
    const prefixLength = (message.startsWith(prefix)) ? prefix.length : defaultPrefix.length;

    const arguments = message.slice(prefixLength).split(/ +/g);

    const commandName = arguments.shift();

    if (commandName.length < 1) return logger.clear();

    const command = commands.get(commandName);

    if (!command) return logger.error("Comando inexistente.");

    try {
      return command.execute(logger, chat, database, arguments, dependencies);
    } catch (error) {
      return logger.error("No se pudo ejecutar ese comando.");
    }
  }

  if (!chat.actual) return logger.error("Debes establecer un chat.");

  const client = clients.get(chat.app);

  if (!client.idLength.includes(chat.actual.length)) return logger.error("La ID del chat actual probablemente es de otro cliente.");

  terminal.pause();

  message = ` ${message}`;

  const middlewares = [
    emojis.unicode
  ];

  middlewares.forEach(middleware => {
    message = middleware(message);
  });

  message = message.trim();

  if (!client.modes || client.mode == "dm") {
    return client.send(message, {
      author: {
        id: chat.actual
      }
    });
  } if (client.mode == "channel") {
    return client.send(message, {
      channel: {
        id: chat.actual
      }
    });
  }
});
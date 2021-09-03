module.exports = {
  name: "switch",
  description: "Cambia entre clientes.",
  usage: "{Nombre del cliente}",
  async execute(logger, chat, database, arguments, {}) {
    if (!arguments[0]) return logger.error("Debes insertar el nombre del cliente.");

    const clients = chat.clients.getKeys();

    if (!clients.includes(arguments[0])) return logger.error("Ese cliente no existe.");

    if (chat.app == arguments[0]) return logger.error("Ya estás usando ese cliente.");

    chat.app = arguments[0];

    logger.success("Cliente cambiado a:", chat.app);
  }
}
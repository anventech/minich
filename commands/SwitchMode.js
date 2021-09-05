module.exports = {
  name: "switchMode",
  description: "Cambia entre modos.",
  usage: "{Nombre del modo}",
  async execute(logger, chat, database, arguments, {}) {
    const client = chat.clients.get(chat.app);

    if (!client.modes) return logger.error("Este cliente no soporta múltiples modos.");
  
    if (!arguments[0]) return logger.error("Debes insertar el nombre del modo.");

    if (!client.modes.includes(arguments[0])) return logger.error("Ese modo no existe.");

    if (client.mode == arguments[0]) return logger.error("Ya estás usando ese modo.");

    client.mode = arguments[0];

    logger.success("Modo cambiado a:", client.mode);
  }
}
module.exports = {
  name: "removeContact",
  description: "Elimina un contacto.",
  usage: "{Nombre del contacto} [Nombre del cliente]",
  async execute(logger, chat, database, arguments, {}) {
    if (!arguments[0]) return logger.error("Debe insertar el nombre del contacto.");

    let client = false;
    
    if (arguments[1]) {
      if (!chat.clients.has(arguments[1])) return log.error("Ese cliente no existe.");

      client = chat.clients.get(arguments[1]);
    } else {
      client = chat.clients.get(chat.app);
    }

    if (!await database.has(`SELECT * FROM contacts WHERE name = "${arguments[0]}" AND app = "${client.name}";`)) return logger.error("No existe ningún contacto llamado así en ese cliente.");
      
    await database.run(`DELETE FROM contacts WHERE name = "${arguments[0]}" AND app = "${client.name}";`);

    const render = [
      arguments[0],
      "-",
      client.name
    ];

    logger.success("Contacto eliminado:", ...render);
  }
}
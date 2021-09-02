module.exports = {
  name: "addContact",
  description: "Añade un contacto.",
  usage: "{Nombre del contacto} {ID del usuario} [Nombre del cliente]",
  async execute(logger, chat, database, arguments, {}) {
    if (!arguments[0]) return logger.error("Debe insertar el nombre del contacto, sin espacios.");

    if (!arguments[1]) return logger.error("Debes insertar la ID del contacto, con el formato adecuado.");

    const ID = parseInt(arguments[1]);

    if (ID != arguments[1]) return logger.error("ID inválida.");

    let client = false;
    
    if (arguments[2]) {
      if (!chat.clients.has(arguments[2])) return log.error("Ese cliente no existe.");

      client = chat.clients.get(arguments[2]);
    } else {
      client = chat.clients.get(chat.app);
    }

    if (await database.has(`SELECT * FROM contacts WHERE name = "${arguments[0]}" AND app = "${client.name}";`)) return logger.error("Ya existe un contacto llamado así en ese cliente.");
    
    if (!client.idLength.includes(arguments[1].length)) return logger.error("Esa ID probablemente es de otra app.");
  
    await database.run(`INSERT INTO contacts(app, name, id) VALUES("${client.name}", "${arguments[0]}", "${arguments[1]}");`);

    const render = [
      arguments[0],
      "-",
      arguments[1],
      "-",
      client.name
    ];

    logger.success("Contacto añadido:", ...render);
  }
}
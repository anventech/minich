module.exports = {
  name: "chat",
  description: "Cambia entre chats.",
  usage: "{ID del chat/Nombre del contacto}",
  async execute(logger, chat, database, arguments, {}) {
    if (!arguments[0]) return logger.error("Debes insertar la ID de un chat.");

    const contacts = await database.all(`SELECT * FROM contacts WHERE app = "${chat.app}";`);

    const contactsNames = contacts.map(contact => contact.name);

    if (contactsNames.includes(arguments[0])) {
      chat.actual = contacts.find(contact => contact.name == arguments[0]).id;
    } else {
      const ID = parseInt(arguments[0]);

      if (ID != arguments[0]) return logger.error("ID inválida.");
  
      const app = chat.clients.get(chat.app);
  
      if (!app.idLength.includes(arguments[0].length)) return logger.error("Esa ID probablemente es de otro cliente.");
  
      chat.actual = arguments[0];
    }

    logger.success("Chat cambiado a:", chat.actual);
  }
}
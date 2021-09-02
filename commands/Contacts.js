module.exports = {
  name: "contacts",
  description: "Muestra la lista de contactos.",
  usage: "[Nombre del contacto]",
  async execute(logger, chat, database, arguments, { chalk }) {
    let before;
    
    const contacts = await database.all(`SELECT * FROM contacts WHERE app = "${chat.app}";`);

    const contactsNames = contacts.map(contact => contact.name);

    if (!arguments[0]) {
      before = `Lista de contactos de ${chalk.magenta.bold(chat.app)}:`;
    
      const renderedContacts = contacts.map(contact => {
        const render = [
          chalk.white.bold("-"),
          chalk.blue.bold(contact.name),
          chalk.white.bold("-"),
          chalk.yellow.bold(contact.id)
        ];

        return render.join(" ");
      });

      return logger.info(`${before}\n\n${renderedContacts.join("\n\n")}`);
    }

    if (!contactsNames.includes(arguments[0])) return logger.error("Ese contacto no existe.");

    before = `Información del contacto ${chalk.magenta.bold(arguments[0])}:`;

    const contact = contacts.find(contact => contact.name == arguments[0]);

    const render = [
      chalk.white.bold("- Nombre: "),
      chalk.blue.bold(contact.name),
      "\n",
      chalk.white.bold("- ID: "),
      chalk.yellow.bold(contact.id),
    ];

    logger.info(`${before}\n\n${render.join("")}`);
  }
}
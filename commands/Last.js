module.exports = {
  name: "last",
  description: "Cambia al último chat.",
  usage: false,
  async execute(logger, chat, database, arguments, {}) {
    if (!chat.last) return logger.error("No existe un \"último chat\".");

    const client = chat.clients.get(chat.app);

    if (!client.idLength.includes(chat.last.length)) return logger.error("La ID del \"último chat\" probablemente es de otro cliente.");
  
    chat.actual = chat.last;

    logger.success("Chat cambiado al \"último chat\":", chat.actual);
  }
}
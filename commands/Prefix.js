module.exports = {
  name: "prefix",
  description: "Muestra el prefijo actual.",
  usage: false,
  async execute(logger, chat, database, arguments, { chalk }) {
    const prefix = await database.get("SELECT * FROM config WHERE name = \"prefix\";");

    logger.info("Prefijo actual:", chalk.white.bold(prefix.value));
  }
}
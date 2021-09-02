module.exports = {
  name: "setPrefix",
  description: "Cambia el prefijo.",
  usage: "{Prefijo}",
  async execute(logger, chat, database, arguments, {}) {
    if (!arguments[0]) return logger.error("Debes insertar un prefijo, este debe contener menos de 4 caracteres.");
  
    if (arguments[0].length > 4) return logger.error("El prefijo debe contener menos de 4 caracteres.");

    const prefix = await database.get("SELECT * FROM config WHERE name = \"prefix\";");

    if (prefix.value == arguments[0]) return logger.error("El prefijo actual es igual al que insertaste, intenta con otro.");

    await database.run(`UPDATE config SET value = "${arguments[0]}" WHERE name = "prefix";`);

    logger.success("Prefijo actualizado:", arguments[0]);
  }
}
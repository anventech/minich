module.exports = {
  name: "genConfig",
  description: "Genera el archivo de configuración para los clientes.",
  usage: false,
  async execute(logger, chat, database, arguments, { fs, join }) {
    if (!fs.existsSync(join(".env"))) {
      const lines = [
        "DISCORD_TOKEN=",
        "TELEGRAM_TOKEN=",
        "NTBA_FIX_319=true",
        "NTBA_FIX_350=true"
      ];

      fs.writeFileSync(join(".env"), lines.join("\n"));

      return logger.success("Archivo de configuración para los clientes generado.");
    }

    return logger.error("El archivo de configuración ya existe.");
  }
}
module.exports = {
  name: "setup",
  description: "Configura la aplicación.",
  usage: "[Confirmación]",
  async execute(logger, chat, database, arguments, {}) {
    if (!arguments[0] || arguments[0] != "yes") {
      return logger.warn("Si estás seguro de hacer eso, vuelve a ejecutar el comando junto con la palabra \"yes\".");
    } if (arguments[0] == "yes") {
      logger.loading("Configurando base de datos...");

      const queries = [
        "CREATE TABLE IF NOT EXISTS config(name TEXT, value TEXT);",
        "CREATE TABLE IF NOT EXISTS contacts(app TEXT, name TEXT, id TEXT);"
      ];

      queries.forEach(async (query) => {
        await database.run(query);
      });

      const conditional = [
        async () => { 
          if (!await database.has("SELECT * FROM config WHERE name = \"prefix\";")) {
            await database.run("INSERT INTO config(name, value) VALUES(\"prefix\", \"/\");");
          }
         }
      ];

      conditional.forEach(query => {
        query();
      });

      logger.success("Base de datos configurada exitósamente.");
    }
  }
}
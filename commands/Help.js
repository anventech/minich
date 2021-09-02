module.exports = {
  name: "help",
  description: "Muestra el mensaje de ayuda y la lista de comandos.",
  usage: "[Nombre del comando]",
  async execute(logger, chat, database, arguments, { chalk }) {
    let before;

    let after = "Los <> indican que el argumento es obligatorio y los [] indican que el argumento es opcional.";

    const prefix = (await database.get("SELECT * FROM config WHERE name = \"prefix\";")).value;

    if (!arguments[0]) {
      before = "Lista de comandos:";

      const commands = chat.commands.getValues().map(command => {
        const render = [
          chalk.white.bold("-"),
          chalk.blue.bold(command.name),
          chalk.white.bold("-"),
          chalk.yellow.bold(command.description)
        ];
  
        if (command.usage) render.push(chalk.white.bold("-"), chalk.grey.bold(`${prefix}${command.name}`, command.usage));
  
        return render.join(" ");
      });

      after += "\nPuedes ver información detallada de un comando usando el comando help junto con el nombre del comando.";
  
      return logger.info(`${before}\n\n${commands.join("\n")}\n\n${chalk.magenta.bold(after)}`);
    }

    if (!chat.commands.has(arguments[0])) return logger.error("Ese comando no existe.");

    before = `Información del comando ${chalk.magenta.bold(arguments[0])}:`;

    const command = chat.commands.get(arguments[0]);

    const render = [
      chalk.white.bold("- Nombre: "),
      chalk.blue.bold(command.name),
      "\n",
      chalk.white.bold("- Descripción: "),
      chalk.yellow.bold(command.description),
    ];      

    if (command.usage) render.push("\n", chalk.white.bold("- Uso: "), chalk.grey.bold(`${prefix}${command.name}`, command.usage));

    logger.info(`${before}\n\n${render.join("")}\n\n${chalk.magenta.bold(after)}`);
  }
}
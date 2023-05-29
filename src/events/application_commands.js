const client = require("../index");
const config = require("../config/main");
const ms = require("ms");

const map_cooldown = new Map();

client.on("interactionCreate", async (interaction) => {
  if (interaction.isChatInputCommand() || interaction.isUserContextMenuCommand() || interaction.isMessageContextMenuCommand()) {
    const command = await client.commands.get(interaction.commandName);

    if (!command)
      return interaction.reply({
        content: `\`❌\` Invalid command, please try again later.`,
        ephemeral: true,
      });

    try {
      if (command.cooldown && typeof command.cooldown === "string") {
        const milliseconds = ms(command.cooldown);

        if (map_cooldown.has(interaction.user.id)) {
          const date_now = Date.now();

          const data = map_cooldown.get(interaction.user.id);

          if (data.cooldown_date > date_now) {
            return interaction.reply({
              content: `\`❌\` Eh! Relax! Tu pourras réessayer <t:${Math.floor(data.cooldown_date / 1000)}:R>.`,
              ephemeral: true,
            });
          }
        } else {
          const date_now = new Date().getTime();

          map_cooldown.set(interaction.user.id, {
            cooldown_date: date_now + milliseconds,
          });

          setTimeout(async () => {
            map_cooldown.delete(interaction.user.id);
          }, milliseconds);
        }
      }

      command.run(client, interaction, config);
    } catch (err) {
      console.warn(`[WARN] Failed to run the command \'${interaction.commandName}\'.`);
      console.log(err);
    }
  } else return;
});

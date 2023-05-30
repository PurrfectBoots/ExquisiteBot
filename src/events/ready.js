const client = require("../index");

client.once("ready", async () => {
  console.log("> Logged in as " + client.user.username + ".");

  // Setting up status msg
  const statusChannel = await client.channels.fetch("1113179421260656702");
  statusChannelMessages = await statusChannel.messages.fetch().then(async (messages) => {
    clientMessages = messages.filter((m) => m.author.id == client.user.id);
    if (clientMessages.size == 0) {
      statusEmbed = await client.getStatusMessage();
      statusChannel.send({ embeds: [statusEmbed] }).then((m) => (client.statusMessageId = m.id));
    } else {
      if (clientMessages.size) {
        client.statusMessageId = clientMessages.first();
      } else {
        console.log("Couldn't get status message");
      }
    }
  });

  const statusMessage = await statusChannel.messages.fetch(client.statusMessageId);

  setInterval(async () => {
    client.emit("checkGames");

    statusEmbed = await client.getStatusMessage(60000);
    statusMessage.edit({ embeds: [statusEmbed] });
  }, 5000);
});

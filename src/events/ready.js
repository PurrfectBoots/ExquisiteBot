const client = require('../index');

client.once('ready', async () => {
    console.log('> Logged in as ' + client.user.username + '.');

    setInterval(() => {
        client.emit("checkGames");
      }, 5000);
      
});
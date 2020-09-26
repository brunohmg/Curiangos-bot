const Discord = require('discord.js');
const client = new Discord.Client();
const { token } = require('./config.json');
const clearMessages = require('./commands/WipeMessages.js');
const { roleManage, roleSet, roleRemove } = require('./commands/RoleManage');
const destroyBot = require('./commands/Destroy');
const musicPlay  = require('./src/MusicBot');


client.login(token);

client.on('ready', () => {
    console.log('Bot started');
})

//!roles command
client.on('message', message => {
    roleManage(message);
})
client.on('messageReactionAdd', async (reaction, user) => {
    roleSet(reaction, user)
})
client.on('messageReactionRemove', async (reaction, user) => {
    roleRemove(reaction, user);
})

//!destroy command
client.on('message', message => {
    destroyBot(message);
})

//!clear command
client.on('message', message => {
     clearMessages(message);
})

//MusicBot
client.on('message', message => {
    musicPlay(message);
})

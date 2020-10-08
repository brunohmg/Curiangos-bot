const Discord = require('discord.js');
const client = new Discord.Client();
const { token, prefix } = require('./config.json');
const clearMessages = require('./commands/WipeMessages.js');
const { roleManage, roleSet, roleRemove } = require('./commands/RoleManage');
const  musicPlay = require('./src/MusicBot');


//------------// Bot Startup //------------
client.login(token);

client.on('ready', () => {
    console.log('Bot started');
})
client.on('reconnecting', () => {
    console.log('Reconnecting...');
})
client.on('disconnect', () => {
    console.log('Bot disconnected!');
})

//-----------// !roles command by reactions //-----------
client.on('message', message => {
    roleManage(message);
})
client.on('messageReactionAdd', async (reaction, user) => {
    roleSet(reaction, user)
})
client.on('messageReactionRemove', async (reaction, user) => {
    roleRemove(reaction, user);
})

//----------// !clear command //-----------
client.on('message', message => {
     clearMessages(message);
})



//----------// MusicBot //-----------
client.on('message', message => {
    musicPlay(message);
})
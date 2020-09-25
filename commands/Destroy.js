const { Client } = require('discord.js');
const client = new Client();
const { prefix } = require('../config.json');

const destroyCommand = (msg) => {
    if(msg.author.id === '209447242740793344' 
    || msg.author.id === '160348475589001216' 
    || msg.author.id === '207612904357363712')
    {
        if(msg.content.toLowerCase() === `${prefix}destroy`) 
        {
            client.destroy();
            console.log('Bot is dead');
        }
    }
}
module.exports = destroyCommand;
const { Client } = require('discord.js');
const client = new Client();
const { prefix } = require('../config.json');

const destroyCommand = (msg) => {
    if(msg.channel.id === '345488749523632128')
    {
        if(msg.content.toLowerCase() === `${prefix}destroy`) 
        {
            client.destroy();
            console.log('Bot is dead');
        }
    }
}
module.exports = destroyCommand;
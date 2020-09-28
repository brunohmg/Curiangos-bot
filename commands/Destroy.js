const { token, prefix } = require('../config.json');

const destroyCommand = (msg, client) => {
    if(msg.channel.id === '345488749523632128')
    {
        if(msg.content.toLowerCase() === `${prefix}destroy`) 
        {
            client.destroy();
            console.log('Bot is dead');
            
        }
        
    }
    
    return client.login(token) && msg.channel.send("Bot restarted.");
    
}
module.exports = destroyCommand;
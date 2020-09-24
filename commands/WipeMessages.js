const { prefix } = require('../config.json')

const clearMessages = (msg) => {
    if(msg.channel.id)
    {
        if(msg.author.id === '209447242740793344' 
        || msg.author.id === '160348475589001216' 
        || msg.author.id === '207612904357363712')
        {
            if(msg.content.toLowerCase() === `${prefix}clear`)
            {
                return msg.channel.bulkDelete(100);
            }
        }
    }
}

module.exports = clearMessages;
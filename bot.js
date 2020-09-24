const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
const { prefix, token } = require('./config.json')

client.login(token);

client.on('ready', () => {
    console.log('Bot started');
})

client.on('message', message => {
    if(message.author.bot) {
        if(message.embeds) {
            const embedMsg = message.embeds.find(msg => msg.title === 'Cargos do Servidor')
            if(embedMsg) {
                message.react('🦉')
                .then(() => message.react('📷'))
                .then(() => message.react('💻'))
                .catch(err => console.log(err));
                (function(){
                    setTimeout(() => {
                        message.channel.bulkDelete(10)
                    }, 20*1000)
                })();
            }
        }
        return
    };

    if(message.content.toLowerCase() === `${prefix}roles`) {
        const embed = new MessageEmbed();
        embed.setTitle('Cargos do Servidor');
        embed.setColor('#663399');
        embed.setDescription('🦉 - Curiangos\n📷 - Streamer\n💻 - Dev');
        message.channel.send(embed);
    }
})

client.on('messageReactionAdd', async (reaction, user) => {
    if(user.bot) return;
    if(!reaction.message.guild) return;

    const emojiName = reaction.emoji.name;
    const roleUsers = reaction.message.guild.members.cache.get(user.id);

    if(reaction.message.channel.id === '758458123982864424') {
        if(emojiName === '🦉') {
            if(!roleUsers.roles.cache.get('209861058226159617')) {
                await roleUsers.roles.add('209861058226159617')
            }
        }
    
        if(emojiName === '📷') {
            if(!roleUsers.roles.cache.get('357346528798572554')) {
                await roleUsers.roles.add('357346528798572554')
            }
        }
    
        if(emojiName === '💻') {
            if(!roleUsers.roles.cache.get('476372426700357632')) {
                await roleUsers.roles.add('476372426700357632')
            }
        }
    }
})

client.on('messageReactionRemove', async (reaction, user) => {
    if(user.bot) return;
    if(!reaction.message.guild) return;

    const emojiName = reaction.emoji.name;
    const roleUsers = reaction.message.guild.members.cache.get(user.id);

    if(reaction.message.channel.id === '758458123982864424') {
        if(emojiName === '🦉') {
            await roleUsers.roles.remove('209861058226159617')            
        }
    
        if(emojiName === '📷') {
            await roleUsers.roles.remove('357346528798572554')
        }
    
        if(emojiName === '💻') {
            await roleUsers.roles.remove('476372426700357632')
        }
    }
})


client.on('message', message => {
    if(message.author.id === '209447242740793344' 
    || message.author.id === '160348475589001216' 
    || message.author.id === '207612904357363712')
    {
        if(message.content.toLowerCase() === `${prefix}destroy`) {
            client.destroy();
            console.log('Bot is dead');
        }
    }
})
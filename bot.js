const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
const { prefix, token } = require('./config.json')

client.login(token);

client.on('ready', () => {
    console.log('Bot online');
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

    if(reaction.message.channel.id === '757628757833023529') {
        if(emojiName === '🦉') {
            if(!roleUsers.roles.cache.get('757633569769259079')) {
                await roleUsers.roles.add('757633569769259079')
            }
        }
    
        if(emojiName === '📷') {
            if(!roleUsers.roles.cache.get('757633618607603744')) {
                await roleUsers.roles.add('757633618607603744')
            }
        }
    
        if(emojiName === '💻') {
            if(!roleUsers.roles.cache.get('757638167372365945')) {
                await roleUsers.roles.add('757638167372365945')
            }
        }
    }
})

client.on('messageReactionRemove', async (reaction, user) => {
    if(user.bot) return;
    if(!reaction.message.guild) return;

    const emojiName = reaction.emoji.name;
    const roleUsers = reaction.message.guild.members.cache.get(user.id);

    if(reaction.message.channel.id === '757628757833023529') {
        if(emojiName === '🦉') {
            await roleUsers.roles.remove('757633569769259079')            
        }
    
        if(emojiName === '📷') {
            await roleUsers.roles.remove('757633618607603744')
        }
    
        if(emojiName === '💻') {
            await roleUsers.roles.remove('757638167372365945')
        }
    }
})

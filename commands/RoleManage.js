const { MessageEmbed } = require('discord.js')
const { prefix } = require('../config.json')

const roleManage = (msg) => {
    if(msg.author.bot) {
        if(msg.embeds) {
            const embedMsg = msg.embeds.find(vl => vl.title === 'Cargos do Servidor')
            if(embedMsg) {
                msg.react('🦉')
                .then(() => msg.react('📷'))
                .then(() => msg.react('💻'))
                .catch(err => console.log(err));
                (function(){
                    setTimeout(() => {
                        msg.channel.bulkDelete(10)
                    }, 20*1000)
                })();
            }
        }
        return
    };

    if(msg.content.toLowerCase() === `${prefix}roles`) {
        const embed = new MessageEmbed();
        embed.setTitle('Cargos do Servidor');
        embed.setColor('#663399');
        embed.setDescription('🦉 - Curiangos\n📷 - Streamer\n💻 - Dev');
        msg.channel.send(embed);
    }
}

const roleSet = async (userReact, userId) => {
    if(userId.bot) return;
    if(!userReact.message.guild) return;

    const emojiName = userReact.emoji.name;
    const roleUsers = userReact.message.guild.members.cache.get(userId.id);

    if(userReact.message.channel.id === '758458123982864424') {
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
}

const roleRemove = async (userReact, userId) => {
    if(userId.bot) return;
    if(!userReact.message.guild) return;

    const emojiName = userReact.emoji.name;
    const roleUsers = userReact.message.guild.members.cache.get(userId.id);

    if(userReact.message.channel.id === '758458123982864424') {
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
}

module.exports = {
    roleManage,
    roleSet,
    roleRemove
}
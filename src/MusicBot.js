const { prefix } = require ('../config.json');
const ytdl = require('ytdl-core');
const queue = new Map();

function musicPlay(msg) {
    if(msg.author.bot) return;
    if(!msg.content.startsWith(prefix)) return;
    if(msg.channel.id !== '758046915311960155') return;

    const serverQueue = queue.get(msg.guild.id);
    if(msg.content.startsWith(`${prefix}play`)) 
    {
        execute(msg, serverQueue);
        return;

    } else if(msg.content.startsWith(`${prefix}stop`))
    {
        stopMusic(msg, serverQueue);
        return;

    } else if(msg.content.startsWith(`${prefix}skip`))
    {
        skipMusic(msg, serverQueue);
        return;
    } else {
        return;
    }

    async function execute(msg, serverQueue) {
        const args = msg.content.split(' ');
        const voiceChannel = msg.member.voice.channel;
    
        if(!voiceChannel) 
            return msg.channel.send('Você estar dentro de um canal de voz');
    
        const permissions = voiceChannel.permissionsFor(msg.client.user);
        if(!permissions.has('CONNECT') || !permissions.has('SPEAK'))
            return msg.channel.send(
                'You need permission to join and speak in your voice channel'
            );
    
        const songInfo = await ytdl.getInfo(args[1]);
        const song = {
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url
        };
    
        if(!serverQueue)
        {
            const queueConstruct = {
                textChannel: msg.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 1,
                playing: true
            };
    
            queue.set(msg.guild.id, queueConstruct);
    
            queueConstruct.songs.push(song);
    
            try {
                var connection = await voiceChannel.join();
                queueConstruct.connection = connection;
                play(msg.guild, queueConstruct.songs[0]);
            } catch (err) {
                console.log(err);
                queue.delete(msg.guild.id);
                return msg.channel.send(err);
            }
            
        } else {
            serverQueue.songs.push(song);
            return msg.channel.send(`${song.title} foi adicionado na fila!`);
        }
    
        function play(guild, song) {
            const serverQueue = queue.get(guild.id);
        
            if(!song) 
            {
                serverQueue.voiceChannel.leave();
                queue.delete(guild.id);
                return;
            }
        
            const dispatcher = serverQueue.connection
                .play(ytdl(song.url, {
                    quality: 'highestaudio',
                    highWaterMark: 1 << 25
                }))
                .on('finish', () => {
                    serverQueue.songs.shift();
                    play(guild, serverQueue.songs[0]);
                })
                .on('error', err => console.log(err));
            dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
            serverQueue.textChannel.send(`Start playing **${song.title}**`);
        }
    }

}

function skipMusic(msg, serverQueue){

    if (!msg.member.voice.channel)
        return msg.channel.send(
            "You must be in a voice channel to skip the music!"
        ); 
        
    try {
        if (serverQueue.songs.length === 1) 
            return msg.channel.send("There's no more music on the queue!");

    } catch(err) {
        //console.log(err)
        return msg.channel.send('Queue is empty!')
    }
    serverQueue.connection.dispatcher.end()
}

function stopMusic(msg, serverQueue){
    
    if(!msg.member.voice.channel)
            return msg.channel.send(
                "You must be in a voice channel to stop the music!"
            );

    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
} 

module.exports = musicPlay;
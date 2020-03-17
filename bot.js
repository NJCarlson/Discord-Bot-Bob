//#region Discord JS
const Discord  = require('discord.js');
const fetch = require('node-fetch');
const querystring = require('querystring');

const client = new Discord.Client();
const prefix = '!';
const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    
switch(command)
{
    case 'ping':
        message.channel.send('Pong!');
    break;
    case 'cat':
        const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());
        message.channel.send(file);
    break;
    case 'urban':
       

        if (!args.length) {
			return message.channel.send('You need to supply a search term!');
		}

        const query = querystring.stringify({ term: args.join(' ') });

		const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());

		if (!list.length) {
			return message.channel.send(`No results found for **${args.join(' ')}**.`);
		}

		const [answer] = list;
		const embed = new Discord.MessageEmbed()
			.setColor('#EFFF00')
			.setTitle(answer.word)
			.setURL(answer.permalink)
			.addField('Definition', trim(answer.definition, 1024))
			.addField('Example', trim(answer.example, 1024))
			.addField('Rating', `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.`);

		message.channel.send(embed);
             
    break;
    

}
	
});

client.login('Njg3MTIwMDU0MTg5MjkzNTkx.Xm2wJw.Tr7tEuk_6V6feNwWDTEOYfVJIJ0');


//#endregion

//#region  DiscordIO
//var Discord = require('discord.io');
// var logger = require('winston');
// var auth = require('./auth.json');
// //var ApiManager = require('./ApiManager');
// // Configure logger settings
// logger.remove(logger.transports.Console);
// logger.add(new logger.transports.Console, {
//     colorize: true
// });
// logger.level = 'debug';
// // Initialize Discord Bot
// var bot = new Discord.Client({
//    token: auth.token,
//    autorun: true
// });
// bot.on('ready', function (evt) {
//     logger.info('Connected');
//     logger.info('Logged in as: ');
//     logger.info(bot.username + ' - (' + bot.id + ')');
// });
// bot.on('message', function (user, userID, channelID, message, evt) {
//     // Our bot needs to know if it will execute a command
//     // It will listen for messages that will start with `!`
//     if (message.substring(0, 1) == '!') {
//         var args = message.substring(1).split(' ');
//         var cmd = args[0]; 
//         args = args.splice(1);
//         switch(cmd) {
//             // !ping
//             case 'ping':
//                 bot.sendMessage({
//                     to: channelID,
//                     message: 'Pong!'
//                 });
//             break;
//             case 'cat':
//                 fetch('https://aws.random.cat/meow').then(response => response.json())
//                 bot.uploadFile({
//                      to: channelID,
//                      file: ,
//                      message : 'Meow! Here is a cat: '
//                 });
//             break;
//             // Just add any case commands if you want to..
//          }
//      }
// });
//#endregion

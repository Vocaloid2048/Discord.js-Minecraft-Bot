var Discord = require('discord.js');
var client = new Discord.Client();
var UMR;
const fs = require('fs');
const fetch = require('node-fetch');
const util = require('minecraft-server-util');
const {Rcon} = require("rcon-client-fork");
const path = require('path');
const {NodeSSH} = require('node-ssh');

client.on('ready', () => {

		var d = new Date();
		var dMth ;
		var dDay ;
		var dHr ;
		var dMin ;
		var dSec ;
		if(d.getMonth()+1 < 10){dMth = "0"+(d.getMonth()+1)}else{dMth = d.getMonth()+1}
		if(d.getDate() < 10){dDay = "0"+(d.getDate())}else{dDay = d.getDate()}
		if(d.getHours() < 10){dHr = "0"+(d.getHours())}else{dHr = d.getHours()}
		if(d.getMinutes() < 10){dMin = "0"+(d.getMinutes())}else{dMin = d.getMinutes()}
		if(d.getSeconds() < 10){dSec = "0"+(d.getSeconds())}else{dSec = d.getSeconds()}
	
		var dformat = [
		d.getFullYear(),dMth,dDay].join('-')+' '+
		[dHr,dMin,dSec].join(':');
		
		
		fs.appendFile('logs.txt', "\n["+dformat+"] : "+"BOT Online", function (err) { // If u put on DSM -> Add "/volume1/docker/ZGT-OTHER-JS/" before logs.txt/-*
			if (err)
			console.log(err);
		else
			console.log('Append operation complete.');
		});
		
	
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`${client.user.tag} IS READY!`);
  client.user.setActivity("%help ", {
  type: "LISTENING"
});
});


client.on('message', async message => {
	/**
	METHOD PART :
	**/
	
	// Server 
	var SERVER_PATH
	var SERVER_HOST = "192.168.0.1"
	var SERVER_HOST_NAME = "google.com" // Change to your host name (Better to use domain name since it's public to everyone)
	var SERVER_PORT = 25565 // SERVER Port
	// Rcon -> Remember to switch on RCON + Query function First
	var RCON_PORT = 25575 // RCON Port 
	var RCON_PASSWORD = "ABC123" // RCON PASSWORD
	var options = {
		tcp: true,       // false for UDP, true for TCP (default true) [KEEP]
		challenge: false  // true to use the challenge protocol (default true) [KEEP]
	};
	// SSH -> If you want to use it on Synology DSM, you may enable this
	var WAY_START = "SSH" // IF you use start server by .bat, please change to "PC", Default is "SSH"
	var SSH_USERNAME = "USER01" // SSH USERNAME
	var SSH_PASSWORD = "ABC123" // SSH PASSWORD
	var SSH_PORT = 22 // SSH PORT [CHANGE IF INNEED]
	var SSH_HOST = "192.168.0.1" // SSH IP

	// OP & Admin -> Remember you must follow the sort -> User 0 is Admin_Name[0],Admin_Password[0],Admin_UID[0]. Not accept : User 0 is Admin_Name[0],Admin_Password[1],Admin_UID[0].
	const OP_UID = ["842662341451317270","794763546700939314"] // Put OP's Discord ID into there, such as "417665898548166678"
	var Admin_Name = ["USER01","USER02"] // Put Admin's Discord ID into there, such as "User"
	var Admin_Password = ["ABC123","DEF456"] // Put Admin's Discord ID into there, such as "123456"
	var Admin_UID = ["842662341451317270","794763546700939314"] // Put Admin's Discord ID into there, such as "417665898548166678"
	var NON_CMD = ["/help","/list","/me","/msg","/teammsg","/tell","/tm","/trigger","/w"] // Non OP User Command List , Add or delete any if necessery
	
	
	/**
		[KEEP]
	**/
    message2 = message.content.toLowerCase(); // Basic setup
	var botName = client.user.username;
	if (message.channel.type !== 'dm') {botName = message.guild.members.cache.get(client.user.id).displayName;}
	
	var offline_RM = new Discord.MessageEmbed()
            .setColor('#FF506E')
            .setTitle('<:negative_squared_cross_mark:843112395559534614> Server is OFFLINE')
			.setDescription("Check your server isn't on and still setting up\n- If No : Switch it on by `%start`\n- If Yes : Check that have you set the settings rightly on Both bot.js and Server.properties");
	
	/**
		Minecraft Command 
	**/
	var str=message2.split("");
	if (str[0]==="/") {
			var cmd = message.content.toString().replace('/', '')
		if(message2.includes(NON_CMD)){
			var msg = message;
			const rcon = new util.RCON(SERVER_HOST, { port: RCON_PORT, enableSRV: true, timeout: 3000, password: RCON_PASSWORD });
			rcon.on('output', (message) => {
				if(message === ""){
					msg.channel.send(RM_Desc_OK("Command `/"+cmd+"` Exclused Sucessfully"));
					}
				else if(message.toString() === "Unknown or incomplete command, see below for error"+cmd+"<--[HERE]"){
					msg.channel.send(RM_Desc_Error("Unknown or incomplete command, see below for error `/"+cmd+"`<--[HERE]"))
					}
				else {msg.channel.send(RM_Desc_Error(message));}
				
				
				rcon.close();
			});

			rcon.connect()
				.then(() => rcon.run(cmd))
				.catch((error) => {
					console.log(error)
				if(error == "" ||error == " " || error == null){msg.channel.send(RM_Desc_Error("Server is offline already"))}else {msg.channel.send(RM_Desc_Error(error.toString()))}
			});
		}else{
			if(OP_UID.includes(message.author.id)){
				var msg = message;
			const rcon = new util.RCON(SERVER_HOST, { port: RCON_PORT, enableSRV: true, timeout: 3000, password: RCON_PASSWORD });
			rcon.on('output', (message) => {
				if(message === ""){
					msg.channel.send(RM_Desc_OK("Command `/"+cmd+"` Exclused Sucessfully"));
					}
				else if(message.toString() === "Unknown or incomplete command, see below for error"+cmd+"<--[HERE]"){
					msg.channel.send(RM_Desc_Error("Unknown or incomplete command, see below for error `/"+cmd+"`<--[HERE]"))
					}
				else {msg.channel.send(RM_Desc_Error(message));}
				
				rcon.close();
			});

			rcon.connect()
				.then(() => rcon.run(cmd))
				.catch((error) => {
					var ers = "Error: connect ECONNREFUSED "+SERVER_HOST.toString()+":"+RCON_PORT.toString();
				if(error == "" ||error == " " || error == null){
					message.channel.send(offline_RM);
					}else if(error.toString() === ers){msg.channel.send(offline_RM)}else {msg.channel.send(RM_Desc_Error(error.toString()))}
			});
			}
			if(!OP_UID.includes(message.author.id)){message.channel.send(RM_Desc_Error("Sorry, but seems you didn't have permission of using `/"+cmd+"`"))}
		}
			
    };

	/**
	Bot Functions
	**/
	
	// Help
    if (message2.includes('%help')) {
        var exampleEmbed = new Discord.MessageEmbed()
            .setColor('#03f4fc')
            .setAuthor(botName, 'http://vt.25u.com/vt/bot/mc_bot_demo.png')
            .setDescription(botName+"is the most customize bot of manage your Minecraft Server! Just type few commands and let it run ~")
            .addFields(
                { name: 'Creator', value: '<@417665898548166678>' + " , Xectorda" },
                { name: 'Birthday :', value: '2021/05/14', inline: true },
                { name: 'Functions :', value: '`%start` Start Server\n`%stop` Stop Server\n`%status` Check Server Status\n`%end` Shutdown this bot\n\nUse `/` Send Commands of Minecraft Server [Server must be on First]\n E.g. `/msg @a hi`' });
        message.channel.send(exampleEmbed);
    };
	
	// End Bot
    if (message2 === '%end') {
        var array = message.content.split(" ");
		if (array[1] !== undefined | array[2] !== undefined){
		if (array[1].indexOf(Admin_Name) && array[2].indexOf(Admin_Password) && Admin_UID.includes(message.author.id)) {
			message.delete();shutdown(Admin_Name);
        }
		else if  (array[1] !== "" | array[2] !== ""){
			message.delete();message.channel.send(RM_Desc_Error("Wrong Password / Username / Discord ID, please try again."))
		}
    }else {
		var exampleEmbed = new Discord.MessageEmbed()
            .setColor('#03f4fc')
			.setTitle("`%end`")
            .setDescription("Usage : `%end <USERNAME> <PASSWORD>`")
            .addFields(
                { name: '<USERNAME> :', value: '[String] Admin UserName' },
                { name: '<PASSWORD> :', value: '[String] Admin Password' });
        message.channel.send(exampleEmbed);
		}
	}
	// Start Server
	var str=message2.split("");
	if (str[0]=== '%' &&str[1]=== 's' &&str[2]=== 't' &&str[3]=== 'a' &&str[4]=== 'r'&&str[5]=== 't') {
        var array = message.content.split(" ");
		if (array[1] !== undefined | array[2] !== undefined){
		if (array[1].indexOf(Admin_Name) && array[2].indexOf(Admin_Password) && Admin_UID.includes(message.author.id)) {
		message.delete();	
		var host = {
		server:        {     
		host:         SSH_HOST,
		userName:     SSH_USERNAME,
		password:     SSH_PASSWORD,
		},
		commands:      [ "cd /volume1/rocker/Rocker_server_1.16.5", "nohup java -Xms512m -Xmx5120m -XX:+AggressiveOpts -XX:+UseCompressedOops -jar server.jar nogui &" ] // Customize your code 
		};
		
		var SSH2Shell = require ('ssh2shell'),
		SSH = new SSH2Shell(host),
		callback = function(sessionText){
		//if(sessionText.toString() !== "" | sessionText.toString() !== null){message.channel.send(RM_Desc_OK(sessionText.toString()))};
		}
		SSH.connect(callback);
		message.channel.send(RM_Desc_OK("Server Online request send already, check it later"))
		}
		else if  (array[1] !== "" | array[2] !== ""){
			message.delete();message.channel.send(RM_Desc_Error("Wrong Password / Username / Discord ID, please try again."))
		}}else {
		var exampleEmbed = new Discord.MessageEmbed()
            .setColor('#03f4fc')
			.setTitle("`%start`")
            .setDescription("Usage : `%start <USERNAME> <PASSWORD>`")
            .addFields(
                { name: '<USERNAME> :', value: '[String] Admin UserName' },
                { name: '<PASSWORD> :', value: '[String] Admin Password' });
        message.channel.send(exampleEmbed);
		}
	}
	
	// Stop SERVER
	var str=message2.split("");
	var msg = message;
	if (str[0]=== '%' &&str[1]=== 's' &&str[2]=== 't' &&str[3]=== 'o' &&str[4]=== 'p') {
        var array = message.content.split(" ");
		if (array[1] !== undefined | array[2] !== undefined){
		if (array[1].indexOf(Admin_Name) && array[2].indexOf(Admin_Password) && Admin_UID.includes(message.author.id)) {
			message.delete();
			const rcon = new util.RCON(SERVER_HOST, { port: RCON_PORT, enableSRV: true, timeout: 3000, password: RCON_PASSWORD });
			rcon.on('output', (message) => {
				if(message !== ""){msg.channel.send(RM_Desc_OK(message));}else {msg.channel.send(RM_Desc_OK("Server Stop Sucessfully"));}
				
				rcon.close();
			});

			rcon.connect()
				.then(() => rcon.run("/stop"))
				.catch((error) => {
					var ers = "Error: connect ECONNREFUSED "+SERVER_HOST.toString()+":"+RCON_PORT.toString();
				if(error == "" ||error == " " || error == null){
					message.channel.send(offline_RM);
					}else if(error.toString() === ers){msg.channel.send(offline_RM)}else {msg.channel.send(RM_Desc_Error(error.toString()))}
			});
		}
		else if (array[1] !== "" | array[2] !== ""){
			message.delete();message.channel.send(RM_Desc_Error("Wrong Password / Username / Discord ID, please try again."))
	}}else {
		var exampleEmbed = new Discord.MessageEmbed()
            .setColor('#03f4fc')
			.setTitle("`%stop`")
            .setDescription("Usage : `%stop <USERNAME> <PASSWORD>`")
            .addFields(
                { name: '<USERNAME> :', value: '[String] Admin UserName' },
                { name: '<PASSWORD> :', value: '[String] Admin Password' });
        message.channel.send(exampleEmbed);
		}
	}
	
	// SERVER Status check
	if (message2 === '%status') {
        util.status(SERVER_HOST, { port: SERVER_PORT, enableSRV: true, timeout: 3000, protocolVersion: 47 }) // These are the default options
		.then((response) => {
       
			
		response.toString();
			var Player = "[NOPE]";
			var Plugins;
			var Version;
			var desc = "This is a Minecraft Server";
			Player = ""
			
			if(response.samplePlayers !== "" | response.samplePlayers !== null | response.samplePlayers !== "null"){
				for (i in response.samplePlayers) {
					if(Player !== ""){Player = Player+" , " + response.samplePlayers[i].name;}else{Player = response.samplePlayers[i].name;}
				}
			}
			Version = "Minecraft "+response.version 
			var pattern = new RegExp(Object.keys(replacements).join('|'), 'g');
			
			if(response.rawResponse !== "" | response.rawResponse !== null){desc = response.rawResponse.description.text};
		var exampleEmbed = new Discord.MessageEmbed()
            .setColor('#03f4fc')
            .setTitle('<:white_check_mark:843112116897841196> Server is ONLINE')
			.setDescription(desc.replace(pattern, key =>  replacements[key]))
            .addFields(
                { name: 'Server IP', value: SERVER_HOST_NAME+":"+SERVER_PORT },
                { name: 'Version', value: Version },
                { name: 'Player in Server'+ " ["+ response.onlinePlayers +"/"+ response.maxPlayers+"]", value: Player});
        message.channel.send(exampleEmbed);
		
		})
    .catch((error) => {
        console.error(error);
        message.channel.send(offline_RM);
    });
    }
	
	/**
		Function Part
	**/
	
	function RM_Desc_Error (str){
		var RM = new Discord.MessageEmbed()
            .setColor('#FF506E')
			.setAuthor(botName, 'http://vt.25u.com/vt/bot/mc_bot_demo.png')
			.setDescription(str);
		return RM;
	}
	
	function RM_Desc_OK (str){
		var RM = new Discord.MessageEmbed()
            .setColor('#45FF6E')
			.setAuthor(botName, 'http://vt.25u.com/vt/bot/mc_bot_demo.png')
			.setDescription(str);
		return RM;
	}
	
	function getCurrentTime(){
		var d = new Date();
		var dMth ;
		var dDay ;
		var dHr ;
		var dMin ;
		var dSec ;
		if(d.getMonth()+1 < 10){dMth = "0"+(d.getMonth()+1)}else{dMth = d.getMonth()+1}
		if(d.getDate() < 10){dDay = "0"+(d.getDate())}else{dDay = d.getDate()}
		if(d.getHours() < 10){dHr = "0"+(d.getHours())}else{dHr = d.getHours()}
		if(d.getMinutes() < 10){dMin = "0"+(d.getMinutes())}else{dMin = d.getMinutes()}
		if(d.getSeconds() < 10){dSec = "0"+(d.getSeconds())}else{dSec = d.getSeconds()}
	
		var dformat = [
		d.getFullYear(),dMth,dDay].join('-')+' '+
		[dHr,dMin,dSec].join(':');
		
		return dformat;
	}
	
	function shutdown (code){
		var d = new Date();
		var dMth ;
		var dDay ;
		var dHr ;
		var dMin ;
		var dSec ;
		if(d.getMonth()+1 < 10){dMth = "0"+(d.getMonth()+1)}else{dMth = d.getMonth()+1}
		if(d.getDate() < 10){dDay = "0"+(d.getDate())}else{dDay = d.getDate()}
		if(d.getHours() < 10){dHr = "0"+(d.getHours())}else{dHr = d.getHours()}
		if(d.getMinutes() < 10){dMin = "0"+(d.getMinutes())}else{dMin = d.getMinutes()}
		if(d.getSeconds() < 10){dSec = "0"+(d.getSeconds())}else{dSec = d.getSeconds()}
	
		var dformat = [
		d.getFullYear(),dMth,dDay].join('-')+' '+
		[dHr,dMin,dSec].join(':');
		
		/** Custom Part **/
		
		fs.appendFile('logs.txt', "\n["+dformat+"] : "+"BOT OFFLINE BY "+code, function (err) {
		if (err)
			console.log(err);
		else
			console.log('Append operation complete.');
		});
		
		throw new Error("BOT OFFLINE BY "+code);
		}
		
	var replacements = {
		'§0': '',
		'§1': '',
		'§2': '',
		'§3': '',
		'§4': '',
		'§5': '',
		'§6': '',
		'§7': '',
		'§8': '',
		'§9': '',
		
		'§a': '',
		'§b': '',
		'§c': '',
		'§d': '',
		'§e': '',
		'§f': '',
		
		'§A': '',
		'§B': '',
		'§C': '',
		'§D': '',
		'§E': '',
		'§F': '',
		
		'§k': '',
		'§l': '',
		'§m': '',
		'§n': '',
		'§o': '',
		'§r': '',
		
		'§K': '',
		'§L': '',
		'§M': '',
		'§N': '',
		'§O': '',
		'§R': ''
};
	
    });
	client.login('ODQyNjYTrxQxNDUxMzE3Mjcw.YJ4kdg.kC44LhlZRpm8AlfOdUgu26JJSpQ');
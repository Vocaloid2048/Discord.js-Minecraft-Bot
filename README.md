# Discord.js-Minecraft-Bot

A Discord Bot base on Discord.js, which aimed to help user control the Minecraft Server without login to Server`

## Setup

1. [File Setup](#file setup)
2. [Discord Dev Setup](#discord dev setup)
3. [Server & bot.js Setup](#server & bot.js setup)
4. [Discord Channel Setup](#discord channel setup)

## Commands

1. [%status](#status)
2. [%start](#start)
3. [%stop](#stop)
4. [%end](#end)
5. [Server Commands](#Server Commands)



### File Setup

1. Please install `node.js` to the device that you will run the bot first -> https://nodejs.org/en/
2. Download the zip file from Github -> [Vocaloid2048](https://github.com/Vocaloid2048)/**Discord.js-Minecraft-Bot**
3. Unzip it into a new folder -> In the device that you want to run this bot

### Discord Dev Setup

1. Please visit https://discord.com/developers/applications to create a new Application
2. Enter the `name` of the Application (Just name it as you like ~) [Team just need to choose "Personal"]
3. When you created the Application, please upload a nice icon to it (If you didn't have a suggestion, you may upload the image `mcbot.png` from the unzipped file)
4. Please copy the `APPLICATION ID`
5. Please go to "Bot" Page (Press "Bot" button at the left side of the website)
6. Create a "Bot" -> the name and the icon may use the same one
7. Copy the `TOKEN` by click the "COPY" Button
8. If you want to customize a invite link, you may use the *Bot Permissions* at the bottom

### Server & bot.js Setup

1. Make sure that you have already setup the Minecraft Server, and copy the path of it

2. Make sure your server.properties have already added rocn.port , rcon.password , query.port , and enabler rcon and query

3. Edit the `Bot.js`'s *method part*!![image-20210518183448877](http://vt.25u.com/typora/image-20210518183448877.png)

4. If you want to change the icon of this bot, simply cover the String "http://vt.25u.com/vt/bot/mc_bot_demo.png" to your new image's location

5. Remember to change the `commands` to suitable to your environment (This example is base on Synology DSM + SSH)![image-20210518183626692](http://vt.25u.com/typora/image-20210518183626692.png)

6. Don't forget to change the `client.login()`'s **KEY**

7. You may customize the messages of this bot

8. If you want the bot being 24/7 in Windows : via Task scheduler (May use `start_bot.bat`)

9. Synology DSM -> Control Panel -> Task scheduler -> Add -> Schedule Task -> Custom Command 

   ![image-20210518184534076](http://vt.25u.com/typora/image-20210518184534076.png)

   Please set the bot run Everyday , may set each minutes / 5 minutes

   ![image-20210518184606528](http://vt.25u.com/typora/image-20210518184606528.png)

   Copy this command to the box : node <Your Bot's Location>/bot.js (E.g. node volume1/bot/mcbot/bot.js)

   ![image-20210518185053620](http://vt.25u.com/typora/image-20210518185053620.png)

   Then, do the steps again (Create new task, the run time must same as your first setting), finally copy "killall node" command to the boxes.

   #### Congrats ! You have done 90% work !!!

### Discord Channel Setup

1. Please send the invite link to the Discord Server Admin (You may use the demo invite link in `invite.txt`)
2. Accept and invite the bot join your channel
3. Sucess ~

// ------------------------------ //

### Status

Simply type `%status` to get the status of Minecraft Server

Please make sure your server has been on, else it will send a error message like image2

![image-20210518190549862](http://vt.25u.com/typora/image-20210518190549862.png)



![image-20210518190649385](http://vt.25u.com/typora/image-20210518190649385.png)

There have some reasons that cause error :

1. You haven't run the server
2. Your server got bugs / problems / wrong setting in .properties while setting up
3. You have enter wrong IP / Port / Run Commands in the bot.js
4. You have added "-XX:+AggressiveOpts -XX:+UseCompressedOops" in your start command
5. Some of the plugins cause the server paused for saving resources
6. Your server is being shutdown-ing

### Start

Simply type `%start <USERNAME> <PASSWORD>` to run the setup of Minecraft Server

![image-20210518191052571](http://vt.25u.com/typora/image-20210518191052571.png)

**Your message will be deleted after send into a channel to protect your personal pravicy**

### Stop

Simply type `%stop <USERNAME> <PASSWORD>` to stop your Minecraft Server

![image-20210518191052571](http://vt.25u.com/typora/image-20210518191231122.png)

**Your message will be deleted after send into a channel to protect your personal pravicy**

### End

Simply type `%end <USERNAME> <PASSWORD>` to kill this bot

![image-20210518191052571](http://vt.25u.com/typora/image-20210518191304028.png)

**Your message will be deleted after send into a channel to protect your personal pravicy**

### Server Commands

Simply type `/` to straightly type commands via RCON (You must in the OP List in the bot [Please add it via edit the bot.js])

E.g. `/say tom is there` ![image-20210518191533299](http://vt.25u.com/typora/image-20210518191533299.png)

The bot will send the Error Message while your command is incorrect / You don't have permission to use it

Such as : 

![image-20210518191645476](http://vt.25u.com/typora/image-20210518191645476.png)

// ------ THE END ------ //

## Any Ideas and Questions ? U may PM me via Discord 

My Discord ID is Voc-夜芷冰#2512
const Discord = require("discord.js");
const SQLite = require("better-sqlite3");

const {
  GatewayIntentBits,
  Partials,
  Routes,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Collection,
  PermissionsBitField,
} = require("discord.js");

const { REST } = require("@discordjs/rest");
const token = process.env["TOKEN"];

//console.log(GatewayIntentBits)
const client = new Discord.Client({
  intents: [
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
  ],
  partials: [Partials.Channel],
});
module.exports = client;

client.commands = new Collection();
client.buttons = new Collection();

// Setup database
const db = new SQLite("./Altix.sqlite");
db.prepare('CREATE TABLE IF NOT EXISTS verifysettings (guildid INTEGER PRIMARY KEY, message INTEGER, questions STRING, channel INTEGER)').run()
db.prepare('CREATE TABLE IF NOT EXISTS tickets (tickid STRING PRIMARY KEY, userid INTEGER, answers STRING)').run()

client.database = db;

["Events", "Commands", "Buttons"].forEach((handler) => {
  require(`./Handlers/${handler}`)(client);
});

client.login(token);

module.exports = {
	cmdPerPage: 10, //- Number of commands per page of help command
	adminId: "457543653343100928", //- Replace UserId with the Discord ID of the admin of the bot
	token: process.env.token || "MTA3MDI4NzQzNzA4OTIxMDQ0MA.GtKWUC.a_OODWaCnSdA-Jx4G_-v-SR155d605H4U_nCyY", //- Bot's Token
	clientId: process.env.clientId || "1070287437089210440", //- ID of the bot
	clientSecret: process.env.clientSecret || "l7zSKLD7LL5xLwcVuCQ4NdSDFN0agGUm", //- Client Secret of the bot
	port: 4200, //- Port of the API and Dashboard
	scopes: ["identify", "guilds", "applications.commands"], //- Discord OAuth2 Scopes
	serverDeafen: true, //- If you want bot to stay deafened
	defaultVolume: 100, //- Sets the default volume of the bot, You can change this number anywhere from 1 to 100
	supportServer: "https://discord.gg/pYmX4JgCtV", //- Support Server Link
	Issues: "https://discord.gg/pYmX4JgCtV", //- Bug Report Link
	permissions: 277083450689, //- Bot Inviting Permissions
	disconnectTime: 30000, //- How long should the bot wait before disconnecting from the voice channel (in miliseconds). Set to 1 for instant disconnect.
	twentyFourSeven: false, //- When set to true, the bot will never disconnect from the voice channel
	autoQueue: false, //- When set to true, related songs will automatically be added to the queue
	autoPause: true, //- When set to true, music will automatically be paused if everyone leaves the voice channel
	debug: true, //- Debug mode
	cookieSecret: "kyryuwa epica", //- Cookie Secret
	website: "http://localhost:4200", //- without the / at the end
	// You need a lavalink server for this bot to work!!!!
	// Lavalink server; public lavalink -> https://lavalink-list.darrennathanael.com/; create one yourself -> https://darrennathanael.com/post/how-to-lavalink
	nodes: [
		{
			identifier: "Main Node", //- Used for indentifier in stats commands.
			host: "lavalink.sneakynodes.com", //- The host name or IP of the lavalink server.
			port: 2333, // The port that lavalink is listening to. This must be a number!
			password: "sneakynodes.com", //- The password of the lavalink server.
			retryAmount: 200, //- The amount of times to retry connecting to the node if connection got dropped.
			retryDelay: 40, //- Delay between reconnect attempts if connection is lost.
			secure: false, //- Can be either true or false. Only use true if ssl is enabled!
		},
	],
	embedColor: "#2f3136", //- Color of the embeds, hex supported
	presence: {
		// PresenceData object | https://discord.js.org/#/docs/main/stable/typedef/PresenceData
		status: "online", //- You can have online, idle, dnd and invisible (Note: invisible makes people think the bot is offline)
		activities: [
			{
				name: "kyryuwa", //- Status Text
				type: "LISTENING", //- PLAYING, WATCHING, LISTENING, STREAMING
			},
		],
	},
	iconURL: "https://i.pinimg.com/originals/b6/2b/d6/b62bd653a5ea86726d1b28b9cfc9916d.gif", //- This icon will be in every embed's author field
};

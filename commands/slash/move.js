const SlashCommand = require("../../lib/SlashCommand");
const { MessageEmbed } = require("discord.js");

const command = new SlashCommand()
	.setName("move")
	.setDescription("переместить песню на другую позицию")
	.addIntegerOption((option) =>
		option
			.setName("track")
			.setDescription("номер песни")
			.setRequired(true),
	)
	.addIntegerOption((option) =>
		option
			.setName("position")
			.setDescription("позиция, на которую надо переместить")
			.setRequired(true),
	)
	
	.setRun(async (client, interaction) => {
		const track = interaction.options.getInteger("track");
		const position = interaction.options.getInteger("position");
		
		let channel = await client.getChannel(client, interaction);
		if (!channel) {
			return;
		}
		
		let player;
		if (client.manager) {
			player = client.manager.players.get(interaction.guild.id);
		} else {
			return interaction.reply({
				embeds: [
					new MessageEmbed()
						.setColor("RED")
						.setDescription("Lavalink node не подключён"),
				],
			});
		}
		
		if (!player) {
			return interaction.reply({
				embeds: [
					new MessageEmbed()
						.setColor("RED")
						.setDescription("Сейчас ничего не играет."),
				],
				ephemeral: true,
			});
		}
		
		let trackNum = Number(track) - 1;
		if (trackNum < 0 || trackNum > player.queue.length - 1) {
			return interaction.reply(":x: | **Неверный номер песни**");
		}
		
		let dest = Number(position) - 1;
		if (dest < 0 || dest > player.queue.length - 1) {
			return interaction.reply(":x: | **Неверная позиция**");
		}
		
		const thing = player.queue[trackNum];
		player.queue.splice(trackNum, 1);
		player.queue.splice(dest, 0, thing);
		return interaction.reply({
			embeds: [
				new MessageEmbed()
					.setColor(client.config.embedColor)
					.setDescription(":white_check_mark: | **Трэк перемещён**"),
			],
		});
	});

module.exports = command;

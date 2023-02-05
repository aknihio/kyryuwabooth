const SlashCommand = require("../../lib/SlashCommand");
const { MessageEmbed } = require("discord.js");

const command = new SlashCommand()
	.setName("stop")
	.setDescription("отсановка трэка\n(эта команда очистит очередь)")
	
	.setRun(async (client, interaction, options) => {
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
						.setDescription("Я не нахожусь в г/с."),
				],
				ephemeral: true,
			});
		}
		
		if (player.twentyFourSeven) {
			player.queue.clear();
			player.stop();
			player.set("autoQueue", false);
		} else {
			player.destroy();
		}
		
		interaction.reply({
			embeds: [
				new MessageEmbed()
					.setColor(client.config.embedColor)
					.setDescription(`:wave: | **Пока Пока!**`),
			],
		});
	});

module.exports = command;

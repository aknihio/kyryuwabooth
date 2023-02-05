const SlashCommand = require("../../lib/SlashCommand");
const { MessageEmbed } = require("discord.js");

const command = new SlashCommand()
	.setName("loopq")
	.setDescription("зацикливание очереди")
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
						.setDescription("Сейчас ничего не играет."),
				],
				ephemeral: true,
			});
		}
		
		if (player.setQueueRepeat(!player.queueRepeat)) {
			;
		}
		const queueRepeat = player.queueRepeat? "включено" : "выключено";
		
		interaction.reply({
			embeds: [
				new MessageEmbed()
					.setColor(client.config.embedColor)
					.setDescription(
						`:thumbsup: | **Зацикливание очереди \`${ queueRepeat }\`**`,
					),
			],
		});
	});

module.exports = command;

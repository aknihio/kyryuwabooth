const SlashCommand = require("../../lib/SlashCommand");
const { MessageEmbed } = require("discord.js");

const command = new SlashCommand()
	.setName("volume")
	.setDescription("изменить громкость.")
	.addNumberOption((option) =>
		option
			.setName("amount")
			.setDescription("выберите кол-во единиц громкости. Пример: 10")
			.setRequired(false),
	)
	.setRun(async (client, interaction) => {
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
		
		let vol = interaction.options.getNumber("amount");
		if (!vol || vol < 1 || vol > 125) {
			return interaction.reply({
				embeds: [
					new MessageEmbed()
						.setColor(client.config.embedColor)
						.setDescription(
							`:loud_sound: | Громкость **${ player.volume }**`,
						),
				],
			});
		}
		
		player.setVolume(vol);
		return interaction.reply({
			embeds: [
				new MessageEmbed()
					.setColor(client.config.embedColor)
					.setDescription(
						`:loud_sound: | Громкость изменена на **${ player.volume }**`,
					),
			],
		});
	});

module.exports = command;

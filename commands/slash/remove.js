const SlashCommand = require("../../lib/SlashCommand");
const { MessageEmbed } = require("discord.js");

const command = new SlashCommand()
	.setName("remove")
	.setDescription("удаление песни из очереди")
	.addNumberOption((option) =>
		option
			.setName("number")
			.setDescription("введите номер трэка.")
			.setRequired(true),
	)
	
	.setRun(async (client, interaction) => {
		const args = interaction.options.getNumber("number");
		
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
						.setDescription("Нечего удалять."),
				],
				ephemeral: true,
			});
		}
		
		await interaction.deferReply();
		
		const position = Number(args) - 1;
		if (position > player.queue.size) {
			let thing = new MessageEmbed()
				.setColor(client.config.embedColor)
				.setDescription(
					`В очереди только **${ player.queue.size }** песен`,
				);
			return interaction.editReply({ embeds: [thing] });
		}
		
		const song = player.queue[position];
		player.queue.remove(position);
		
		const number = position + 1;
		let removeEmbed = new MessageEmbed()
			.setColor(client.config.embedColor)
			.setDescription(`Удалён трэк **${ number }** из очереди`);
		return interaction.editReply({ embeds: [removeEmbed] });
	});

module.exports = command;

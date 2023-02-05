const SlashCommand = require("../../lib/SlashCommand");
const { MessageEmbed } = require("discord.js");

const command = new SlashCommand()
	.setName("skipto")
	.setDescription("промотать до определённой песни в очереди")
	.addNumberOption((option) =>
		option
			.setName("number")
			.setDescription("кол-во трэков для пропуска")
			.setRequired(true),
	)
	
	.setRun(async (client, interaction, options) => {
		const args = interaction.options.getNumber("number");
		//const duration = player.queue.current.duration
		
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
						.setDescription("Я не нахожусь в голосовм канале."),
				],
				ephemeral: true,
			});
		}
		
		await interaction.deferReply();
		
		const position = Number(args);
		
		try {
			if (!position || position < 0 || position > player.queue.size) {
				let thing = new MessageEmbed()
					.setColor(client.config.embedColor)
					.setDescription("❌ | Некорректная позиция!");
				return interaction.editReply({ embeds: [thing] });
			}
			
			player.queue.remove(0, position - 1);
			player.stop();
			
			let thing = new MessageEmbed()
				.setColor(client.config.embedColor)
				.setDescription("✅ | Пропущено до позиции " + position);
			
			return interaction.editReply({ embeds: [thing] });
		} catch {
			if (position === 1) {
				player.stop();
			}
			return interaction.editReply({
				embeds: [
					new MessageEmbed()
						.setColor(client.config.embedColor)
						.setDescription("✅ | Пропущено до позиции " + position),
				],
			});
		}
	});

module.exports = command;

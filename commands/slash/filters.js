const { MessageEmbed } = require("discord.js");
const SlashCommand = require("../../lib/SlashCommand");

const command = new SlashCommand()
	.setName("filters")
	.setDescription("добавить или удалить фильтр")
	.addStringOption((option) =>
		option
			.setName("preset")
			.setDescription("шаблон для добавления")
			.setRequired(true)
			.addChoices(
				{ name: "Nightcore", value: "nightcore" },
				{ name: "BassBoost", value: "bassboost" },
				{ name: "Vaporwave", value: "vaporwave" },
				{ name: "Pop", value: "pop" },
				{ name: "Soft", value: "soft" },
				{ name: "Treblebass", value: "treblebass" },
				{ name: "Eight Dimension", value: "eightD" },
				{ name: "Karaoke", value: "karaoke" },
				{ name: "Vibrato", value: "vibrato" },
				{ name: "Tremolo", value: "tremolo" },
				{ name: "Сброс", value: "off" },
			),
	)
	
	.setRun(async (client, interaction, options) => {
		const args = interaction.options.getString("preset");
		
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
		
		// create a new embed
		let filtersEmbed = new MessageEmbed().setColor(client.config.embedColor);
		
		if (args == "nightcore") {
			filtersEmbed.setDescription("✅ | Nightcore фильтр активирован!");
			player.nightcore = true;
		} else if (args == "bassboost") {
			filtersEmbed.setDescription("✅ | BassBoost фильтр активирован!");
			player.bassboost = true;
		} else if (args == "vaporwave") {
			filtersEmbed.setDescription("✅ | Vaporwave фильтр активирован!");
			player.vaporwave = true;
		} else if (args == "pop") {
			filtersEmbed.setDescription("✅ | Pop фильтр активирован!");
			player.pop = true;
		} else if (args == "soft") {
			filtersEmbed.setDescription("✅ | Soft фильтр активирован!");
			player.soft = true;
		} else if (args == "treblebass") {
			filtersEmbed.setDescription("✅ | Treblebass фильтр активирован!");
			player.treblebass = true;
		} else if (args == "eightD") {
			filtersEmbed.setDescription("✅ | Eight Dimension фильтр активирован!");
			player.eightD = true;
		} else if (args == "karaoke") {
			filtersEmbed.setDescription("✅ | Karaoke фильтр активирован!");
			player.karaoke = true;
		} else if (args == "vibrato") {
			filtersEmbed.setDescription("✅ | Vibrato фильтр активирован!");
			player.vibrato = true;
		} else if (args == "tremolo") {
			filtersEmbed.setDescription("✅ | Tremolo фильтр активирован!");
			player.tremolo = true;
		} else if (args == "off") {
			filtersEmbed.setDescription("✅ | EQ был очищен!");
			player.reset();
		} else {
			filtersEmbed.setDescription("❌ | Такого фильтра нет!");
		}
		
		return interaction.reply({ embeds: [filtersEmbed] });
	});

module.exports = command;

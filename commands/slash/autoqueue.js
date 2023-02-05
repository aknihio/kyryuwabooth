const colors = require("colors");
const { MessageEmbed } = require("discord.js");
const SlashCommand = require("../../lib/SlashCommand");

const command = new SlashCommand()
	.setName("autoqueue")
	.setDescription("автоматически добавляет похожие песни в очередь")
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
						.setDescription("Сейчас ничего не играет"),
				],
				ephemeral: true,
			});
		}
		
		let autoQueueEmbed = new MessageEmbed().setColor(client.config.embedColor);
		const autoQueue = player.get("autoQueue");
		player.set("requester", interaction.guild.me);
		
		if (!autoQueue || autoQueue === false) {
			player.set("autoQueue", true);
		} else {
			player.set("autoQueue", false);
		}
		autoQueueEmbed
		  .setDescription(`**Автоматическая Очередь** \`${!autoQueue ? "ВКЛЮЧЕНА" : "ОТКЛЮЧЕНА"}\``)
		  .setFooter({
		    text: `Похожая музыка ${!autoQueue ? "будет" : "больше не будет"} добавлена в очередь.`
      });
		client.warn(
			`Проигрывание: ${ player.options.guild } | [${ colors.blue(
				"AUTOQUEUE",
			) }] было [${ colors.blue(!autoQueue? "ВКЛЮЧЕНО" : "ВЫКЛЮЧЕНО") }] в ${
				client.guilds.cache.get(player.options.guild)
					? client.guilds.cache.get(player.options.guild).name
					: "гильде"
			}`,
		);
		
		return interaction.reply({ embeds: [autoQueueEmbed] });
	});

module.exports = command;

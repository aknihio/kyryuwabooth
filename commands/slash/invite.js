const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const SlashCommand = require("../../lib/SlashCommand");

const command = new SlashCommand()
	.setName("invite")
	.setDescription("приглашение бота")
	.setRun(async (client, interaction, options) => {
		return interaction.reply({
			embeds: [
				new MessageEmbed()
					.setColor(client.config.embedColor)
					.setTitle(`Добавить меня на ваш сервер!`),
			],
			components: [
				new MessageActionRow().addComponents(
					new MessageButton()
						.setLabel("Пригласить меня")
						.setStyle("LINK")
						.setURL(
							`https://discord.com/oauth2/authorize?client_id=${
								client.config.clientId
							}&permissions=${
								client.config.permissions
							}&scope=${ client.config.scopes.toString().replace(/,/g, "%20") }`,
						),
				),
			],
		});
	});
module.exports = command;

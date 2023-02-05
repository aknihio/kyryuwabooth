const SlashCommand = require("../../lib/SlashCommand");

const command = new SlashCommand()
	.setName("clean")
	.setDescription("удалить сообщения от бота.")
	.addIntegerOption((option) =>
		option
			.setName("число")
			.setDescription("число сообщений для удаления")
			.setMinValue(2).setMaxValue(100)
			.setRequired(false),
	)
	.setRun(async (client, interaction, options) => {
		
		await interaction.deferReply();
		let number = interaction.options.getInteger("number");
		number = number && number < 100? ++number : 100;
		
		
		interaction.channel.messages.fetch({
			limit: number,
		}).then((messages) => {
			const botMessages = [];
			messages.filter(m => m.author.id === client.user.id).forEach(msg => botMessages.push(msg))
			
			botMessages.shift();
			interaction.channel.bulkDelete(botMessages, true)
				.then(async deletedMessages => {
					//Filtering out messages that did not get deleted.
					messages = messages.filter(msg => {
						!deletedMessages.some(deletedMsg => deletedMsg == msg);
					});
					if (messages.size > 0) {
						client.log(`Удаление [${ messages.size }] сообщений старше 14 дней.`)
						for (const msg of messages) {
							await msg.delete();
						}
					}
					
					await interaction.editReply({ embeds: [client.Embed(`:white_check_mark: | Удалено ${ botMessages.length } сообщений`)] });
					setTimeout(() => {
						interaction.deleteReply();
					}, 5000);
				})
			
		});
	})

module.exports = command;

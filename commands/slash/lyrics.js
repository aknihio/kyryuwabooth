const SlashCommand = require("../../lib/SlashCommand");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const api = require('lyrics-searcher-musixmatch').default

const command = new SlashCommand()
	.setName("lyrics")
	.setDescription("текст песни")
	.addStringOption((option) =>
		option
			.setName("song")
			.setDescription("название песни")
			.setRequired(false),
	)
	.setRun(async (client, interaction, options) => {
		await interaction.reply({
			embeds: [
				new MessageEmbed()
					.setColor(client.config.embedColor)
					.setDescription("🔎 **Поиск...**"),
			],
		});
		
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
		
		const args = interaction.options.getString("song");
		if (!args && !player) {
			return interaction.editReply({
				embeds: [
					new MessageEmbed()
						.setColor("RED")
						.setDescription("Сейчас ничего не играет"),
				],
			});
		}
		
		let search = args? args : player.queue.current.title;
        api(search).then((lyrics) => {
		let text = lyrics.lyrics
		const button = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('tipsbutton')
					.setLabel('Типс')
					.setEmoji(`📌`)
					.setStyle('SECONDARY'),
				new MessageButton()
					.setLabel('Источник')
					.setURL(lyrics.info.track.shareUrl)
					.setStyle('LINK'),
			);
		
		let lyricsEmbed = new MessageEmbed()
					.setColor(client.config.embedColor)
					.setTitle(`${ lyrics.info.track.name }`)
					.setURL(lyrics.info.track.shareUrl)
					.setThumbnail(lyrics.info.track.albumCoverart350x350)
                    .setFooter({ text: 'Текст предоставлен MusixMatch.', iconURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Musixmatch_logo_icon_only.svg/480px-Musixmatch_logo_icon_only.svg.png' })
					.setDescription(text);
		
		if (text.length > 4096) {
				text = text.substring(0, 4050) + "\n\n[...]";
				lyricsEmbed
					.setDescription(text + `\nТекст слишком длинный.`)
			}

		return interaction.editReply({ 
				embeds: [lyricsEmbed],
				components: [button],
			
			});
		
		}) 
		.catch((err) => {	
		if (err.message == `Текст не найден!`) {
			const button = new MessageActionRow()
			.addComponents(
				new MessageButton()
				    .setEmoji(`📌`)
				    .setCustomId('tipsbutton')
					.setLabel('Типс')
					.setStyle('SECONDARY'),
			);	

		return interaction.editReply({
			embeds: [
				new MessageEmbed()
					.setColor("RED")
					.setDescription(
						`❌ | Текст не найден ${ search }!\nУбедитесь что название введено правильно.`,
					),
			],
			components: [button],
		});
	} else {
		return interaction.editReply({
			embeds: [
				new MessageEmbed()
					.setColor("RED")
					.setDescription(
						`❌ | Произошла неизвестная ошибка, проверьте консоль.`,
					),
			],
		});
	};
});

const collector = interaction.channel.createMessageComponentCollector({time: 1000 * 3600 });

collector.on('collect', async i => {
	if (i.customId === 'tipsbutton') {
		await i.deferUpdate();
		await i.followUp({ 			
		embeds: [
			new MessageEmbed()
			    .setTitle(`Подсказки`)
			    .setColor(client.config.embedColor)
				.setDescription(
					`ПОдсказка: как получить верный текст \n\n1. Добавьте имя артиста перед названием песни.\n2. Попробуйте ввести название песни сами.\n3. Избегайте любых других языков кроме Английского, кроме тех песен у которых названия используют другой язык.`,
				),
		], ephemeral: true, components: [] });
	    };
    });
});

module.exports = command;

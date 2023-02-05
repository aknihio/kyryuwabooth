const colors = require("colors");
const { MessageEmbed } = require("discord.js");
const SlashCommand = require("../../lib/SlashCommand");

const command = new SlashCommand()
  .setName("autopause")
  .setDescription("автоматическая пауза после того как все покинут г/с")
  .setRun(async (client, interaction) => {
    let channel = await client.getChannel(client, interaction);
    if (!channel) return;

    let player;
    if (client.manager)
      player = client.manager.players.get(interaction.guild.id);
    else
      return interaction.reply({
        embeds: [
          new MessageEmbed()
            .setColor("RED")
            .setDescription("Lavalink node не подключён"),
        ],
      });

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

    let autoPauseEmbed = new MessageEmbed().setColor(client.config.embedColor);
    const autoPause = player.get("autoPause");
    player.set("requester", interaction.guild.me);

    if (!autoPause || autoPause === false) {
      player.set("autoPause", true);
    } else {
      player.set("autoPause", false);
    }
    autoPauseEmbed
			.setDescription(`**Авто Пауза** \`${!autoPause ? "ВКЛЮЧЕНА" : "ВЫКЛЮЧЕНА"}\``)
			.setFooter({
			  text: `Проигрывание ${!autoPause ? "будет автоматически" : "не будет автоматически"} поставлено на паузу когда все покинут г/с.`
			});
    client.warn(
      `Проигрывание: ${player.options.guild} | [${colors.blue(
        "AUTOPAUSE"
      )}] было [${colors.blue(!autoPause ? "ВКЛЮЧЕНО" : "ОТКЛЮЧЕНО")}] в ${
        client.guilds.cache.get(player.options.guild)
          ? client.guilds.cache.get(player.options.guild).name
          : "гильдии"
      }`
    );

    return interaction.reply({ embeds: [autoPauseEmbed] });
  });

module.exports = command;

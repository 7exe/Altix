const { ButtonInteraction } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   * @param {Client} client
   * @param {ButtonInteraction} interaction
   **/

  async execute(interaction, client) {
    if (!interaction.isButton()) return;

    const Button = client.buttons.get(interaction.customId.split("-")[0]);

    if (
      Button.permission &&
      !interaction.member.permissions.has(Button.permission)
    ) {
      const Error = new EmbedBuilder()
        .setColor(0xffffff)
        .setTitle("Whoa there cowboy!")
        .setDescription(`You don't have permission to do that!`);
      return interaction.reply({ embeds: [Error], ephemeral: true });
    }

    if (
      Button.ownerOnly &&
      interaction.member.id !== interaction.guild.ownerId
    ) {
      const Error = new EmbedBuilder()
        .setColor(0xffffff)
        .setTitle("Hm, something isn't quite right!")
        .setDescription(`You're not the owner of that action!`);
      return interaction.reply({ embeds: [Error], ephemeral: true });
    }

    Button.execute(interaction, client);
  },
};

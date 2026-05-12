import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('slowmode')
  .setDescription('Set slowmode for the current channel.')
  .addIntegerOption(option => option.setName('seconds').setDescription('Seconds of slowmode').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels);

export const feature = 'moderation';
export const category = 'Moderation';

export async function execute(interaction) {
  const seconds = interaction.options.getInteger('seconds');
  const channel = interaction.channel;

  if (!channel?.isTextBased()) {
    return interaction.reply({ content: 'This command works only in text channels.', ephemeral: true });
  }

  if (seconds < 0 || seconds > 21600) {
    return interaction.reply({ content: 'Please provide a number between 0 and 21600 seconds.', ephemeral: true });
  }

  await channel.setRateLimitPerUser(seconds, `Slowmode set by ${interaction.user.tag}`);
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Slowmode Updated',
        description: `⏱️ Slowmode is now set to ${seconds} second(s).`,
        fields: [{ name: 'Channel', value: channel.name, inline: true }]
      })
    ]
  });
}

import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('purge')
  .setDescription('Remove a number of recent messages from the channel.')
  .addIntegerOption(option => option.setName('amount').setDescription('Amount of messages to delete').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages);

export const feature = 'moderation';
export const category = 'Moderation';

export async function execute(interaction) {
  const amount = interaction.options.getInteger('amount');
  if (amount < 1 || amount > 100) {
    return interaction.reply({ content: 'Please provide a number between 1 and 100.', ephemeral: true });
  }

  const deleted = await interaction.channel.bulkDelete(amount, true).catch(() => null);
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Messages Purged',
        description: `🧹 Deleted ${deleted?.size || 0} message(s) from this channel.`,
        fields: [{ name: 'Moderator', value: interaction.user.tag, inline: true }]
      })
    ],
    ephemeral: true
  });
}

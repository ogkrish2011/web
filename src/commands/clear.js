import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('clear')
  .setDescription('Bulk delete messages from the current channel.')
  .addIntegerOption(option => option.setName('amount').setDescription('Number of messages to delete').setRequired(true))
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
        title: 'Messages Deleted',
        description: `Deleted ${deleted?.size || 0} messages.`,
        color: '#2f3136'
      })
    ],
    ephemeral: true
  });
}

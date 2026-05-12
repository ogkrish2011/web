import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('closeticket')
  .setDescription('Close the current ticket.')
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels);

export const feature = 'automation';
export const category = 'Automation';

export async function execute(interaction) {
  if (!interaction.channel.name.startsWith('ticket-')) {
    return interaction.reply({ content: 'This is not a ticket channel.', ephemeral: true });
  }
  await interaction.channel.delete();
}
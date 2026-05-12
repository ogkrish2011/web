import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('setfilter')
  .setDescription('Set word filter.')
  .addStringOption(option => option.setName('words').setDescription('Words').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export const feature = 'automation';
export const category = 'Automation';

export async function execute(interaction) {
  const words = interaction.options.getString('words');
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Filter Set',
        description: `Filtered words: ${words}`,
        color: '#4a90e2'
      })
    ]
  });
}
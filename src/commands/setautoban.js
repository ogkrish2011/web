import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('setautoban')
  .setDescription('Set auto-ban for certain words.')
  .addStringOption(option => option.setName('words').setDescription('Words separated by commas').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export const feature = 'automation';
export const category = 'Automation';

export async function execute(interaction) {
  const words = interaction.options.getString('words');
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Auto-Ban Set',
        description: `Auto-ban words: ${words}`,
        color: '#4a90e2'
      })
    ]
  });
}
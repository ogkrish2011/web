import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('customcommand')
  .setDescription('Create a custom command.')
  .addStringOption(option => option.setName('name').setDescription('Command name').setRequired(true))
  .addStringOption(option => option.setName('response').setDescription('Response').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export const feature = 'customization';
export const category = 'Customization';

export async function execute(interaction) {
  const name = interaction.options.getString('name');
  const response = interaction.options.getString('response');
  // Store custom command
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Custom Command Created',
        description: `/${name} will respond with: ${response}`,
        color: '#4a90e2'
      })
    ]
  });
}
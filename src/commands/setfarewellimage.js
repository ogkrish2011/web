import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('setfarewellimage')
  .setDescription('Set farewell image.')
  .addStringOption(option => option.setName('url').setDescription('Image URL').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export const feature = 'automation';
export const category = 'Automation';

export async function execute(interaction) {
  const url = interaction.options.getString('url');
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Farewell Image Set',
        description: `Image: ${url}`,
        color: '#4a90e2'
      })
    ]
  });
}
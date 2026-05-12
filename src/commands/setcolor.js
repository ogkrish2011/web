import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('setcolor')
  .setDescription('Set embed color.')
  .addStringOption(option => option.setName('color').setDescription('Hex color').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export const feature = 'customization';
export const category = 'Customization';

export async function execute(interaction) {
  const color = interaction.options.getString('color');
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Color Set',
        description: `Embed color set to ${color}.`,
        color: color
      })
    ]
  });
}
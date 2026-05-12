import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('version')
  .setDescription('Get bot version.');

export const feature = 'utility';
export const category = 'Utility';

export async function execute(interaction) {
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Version',
        description: 'Aegis Guard v1.0.0',
        color: '#4a90e2'
      })
    ]
  });
}
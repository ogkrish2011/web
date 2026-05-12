import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('support')
  .setDescription('Get support information.');

export const feature = 'utility';
export const category = 'Utility';

export async function execute(interaction) {
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Support',
        description: 'For support, visit our website or join our Discord.',
        color: '#4a90e2'
      })
    ]
  });
}
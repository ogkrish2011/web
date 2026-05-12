import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('meme')
  .setDescription('Get a random meme.');

export const feature = 'fun';
export const category = 'Fun & Engagement';

export async function execute(interaction) {
  // Placeholder for meme API
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Meme',
        description: 'Here\'s a meme!',
        color: '#4a90e2'
      })
    ]
  });
}
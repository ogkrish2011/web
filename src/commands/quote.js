import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('quote')
  .setDescription('Get a random quote.');

export const feature = 'fun';
export const category = 'Fun & Engagement';

export async function execute(interaction) {
  const quotes = ['"The only way to do great work is to love what you do." - Steve Jobs'];
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Quote',
        description: quote,
        color: '#4a90e2'
      })
    ]
  });
}
import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('dare')
  .setDescription('Get a dare.');

export const feature = 'fun';
export const category = 'Fun & Engagement';

export async function execute(interaction) {
  const dares = ['Do a silly dance!'];
  const dare = dares[Math.floor(Math.random() * dares.length)];
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Dare',
        description: dare,
        color: '#4a90e2'
      })
    ]
  });
}
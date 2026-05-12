import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('coinflip')
  .setDescription('Flip a coin.');

export const feature = 'fun';
export const category = 'Fun & Engagement';

export async function execute(interaction) {
  const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Coin Flip',
        description: `You got: ${result}`,
        color: '#4a90e2'
      })
    ]
  });
}
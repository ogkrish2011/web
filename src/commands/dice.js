import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('dice')
  .setDescription('Roll a dice.');

export const feature = 'fun';
export const category = 'Fun & Engagement';

export async function execute(interaction) {
  const result = Math.floor(Math.random() * 6) + 1;
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Dice Roll',
        description: `You rolled: ${result}`,
        color: '#4a90e2'
      })
    ]
  });
}
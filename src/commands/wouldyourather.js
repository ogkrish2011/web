import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('wouldyourather')
  .setDescription('Get a would you rather question.');

export const feature = 'fun';
export const category = 'Fun & Engagement';

export async function execute(interaction) {
  const questions = ['Would you rather be able to fly or be invisible?'];
  const question = questions[Math.floor(Math.random() * questions.length)];
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Would You Rather',
        description: question,
        color: '#4a90e2'
      })
    ]
  });
}
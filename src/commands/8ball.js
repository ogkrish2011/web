import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('8ball')
  .setDescription('Ask the magic 8-ball.')
  .addStringOption(option => option.setName('question').setDescription('Your question').setRequired(true));

export const feature = 'fun';
export const category = 'Fun & Engagement';

export async function execute(interaction) {
  const answers = ['Yes', 'No', 'Maybe', 'Ask again later'];
  const answer = answers[Math.floor(Math.random() * answers.length)];
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Magic 8-Ball',
        description: answer,
        color: '#4a90e2'
      })
    ]
  });
}
import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('compliment')
  .setDescription('Get a compliment.')
  .addUserOption(option => option.setName('user').setDescription('User to compliment'));

export const feature = 'fun';
export const category = 'Fun & Engagement';

export async function execute(interaction) {
  const user = interaction.options.getUser('user') || interaction.user;
  const compliments = ['You\'re awesome!', 'You\'re amazing!'];
  const compliment = compliments[Math.floor(Math.random() * compliments.length)];
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Compliment',
        description: `${user}, ${compliment}`,
        color: '#4a90e2'
      })
    ]
  });
}
import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('joke')
  .setDescription('Get a random joke.');

export const feature = 'fun';
export const category = 'Fun & Engagement';

export async function execute(interaction) {
  const jokes = ['Why did the scarecrow win an award? Because he was outstanding in his field!', 'What do you call fake spaghetti? An impasta!'];
  const joke = jokes[Math.floor(Math.random() * jokes.length)];
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Joke',
        description: joke,
        color: '#4a90e2'
      })
    ]
  });
}
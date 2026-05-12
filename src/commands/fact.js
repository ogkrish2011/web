import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('fact')
  .setDescription('Get a random fact.');

export const feature = 'fun';
export const category = 'Fun & Engagement';

export async function execute(interaction) {
  const facts = ['Honey never spoils.'];
  const fact = facts[Math.floor(Math.random() * facts.length)];
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Fun Fact',
        description: fact,
        color: '#4a90e2'
      })
    ]
  });
}
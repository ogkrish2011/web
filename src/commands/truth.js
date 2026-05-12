import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('truth')
  .setDescription('Get a truth question.');

export const feature = 'fun';
export const category = 'Fun & Engagement';

export async function execute(interaction) {
  const truths = ['What\'s your biggest secret?'];
  const truth = truths[Math.floor(Math.random() * truths.length)];
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Truth',
        description: truth,
        color: '#4a90e2'
      })
    ]
  });
}
import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('rate')
  .setDescription('Rate something.')
  .addStringOption(option => option.setName('thing').setDescription('Thing to rate').setRequired(true));

export const feature = 'fun';
export const category = 'Fun & Engagement';

export async function execute(interaction) {
  const thing = interaction.options.getString('thing');
  const rating = Math.floor(Math.random() * 11);
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Rating',
        description: `I rate ${thing} a ${rating}/10!`,
        color: '#4a90e2'
      })
    ]
  });
}
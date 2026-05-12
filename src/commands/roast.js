import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('roast')
  .setDescription('Get a roast.')
  .addUserOption(option => option.setName('user').setDescription('User to roast'));

export const feature = 'fun';
export const category = 'Fun & Engagement';

export async function execute(interaction) {
  const user = interaction.options.getUser('user') || interaction.user;
  const roasts = ['You\'re so cool, you make ice jealous!'];
  const roast = roasts[Math.floor(Math.random() * roasts.length)];
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Roast',
        description: `${user}, ${roast}`,
        color: '#4a90e2'
      })
    ]
  });
}
import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('uptime')
  .setDescription('Get bot uptime.');

export const feature = 'utility';
export const category = 'Utility';

export async function execute(interaction) {
  const uptime = interaction.client.uptime;
  const days = Math.floor(uptime / 86400000);
  const hours = Math.floor(uptime / 3600000) % 24;
  const minutes = Math.floor(uptime / 60000) % 60;
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Uptime',
        description: `${days}d ${hours}h ${minutes}m`,
        color: '#4a90e2'
      })
    ]
  });
}
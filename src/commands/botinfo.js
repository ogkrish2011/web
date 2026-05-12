import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('botinfo')
  .setDescription('Get bot information.');

export const feature = 'utility';
export const category = 'Utility';

export async function execute(interaction) {
  const client = interaction.client;
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Bot Info',
        fields: [
          { name: 'Uptime', value: `${Math.floor(client.uptime / 1000 / 60)} minutes`, inline: true },
          { name: 'Servers', value: client.guilds.cache.size.toString(), inline: true },
          { name: 'Users', value: client.users.cache.size.toString(), inline: true }
        ],
        color: '#4a90e2'
      })
    ]
  });
}
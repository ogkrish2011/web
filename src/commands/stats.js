import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('stats')
  .setDescription('Get server stats.');

export const feature = 'utility';
export const category = 'Utility';

export async function execute(interaction) {
  const guild = interaction.guild;
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Server Stats',
        fields: [
          { name: 'Members', value: guild.memberCount.toString(), inline: true },
          { name: 'Channels', value: guild.channels.cache.size.toString(), inline: true },
          { name: 'Roles', value: guild.roles.cache.size.toString(), inline: true }
        ],
        color: '#4a90e2'
      })
    ]
  });
}
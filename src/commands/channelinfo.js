import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('channelinfo')
  .setDescription('Get info about a channel.')
  .addChannelOption(option => option.setName('channel').setDescription('Channel').setRequired(false));

export const feature = 'utility';
export const category = 'Utility';

export async function execute(interaction) {
  const channel = interaction.options.getChannel('channel') || interaction.channel;
  await interaction.reply({
    embeds: [
      createEmbed({
        title: `Channel: ${channel.name}`,
        fields: [
          { name: 'Type', value: channel.type.toString(), inline: true },
          { name: 'Created', value: `<t:${Math.floor(channel.createdTimestamp / 1000)}:R>`, inline: true }
        ],
        color: '#4a90e2'
      })
    ]
  });
}
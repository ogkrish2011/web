import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('serverinfo')
  .setDescription('Show detailed information about this server.');

export const feature = 'utility';
export const category = 'Utility';

export async function execute(interaction) {
  const guild = interaction.guild;
  await interaction.reply({
    embeds: [
      createEmbed({
        title: `Server Info: ${guild.name}`,
        description: guild.description || 'No description available.',
        fields: [
          { name: 'Member Count', value: `${guild.memberCount}`, inline: true },
          { name: 'Channels', value: `${guild.channels.cache.size}`, inline: true },
          { name: 'Created', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline: true },
          { name: 'Owner', value: `<@${guild.ownerId}>`, inline: true }
        ]
      })
    ]
  });
}

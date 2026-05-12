import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';
import { logAction } from '../utils/logger.js';

export const data = new SlashCommandBuilder()
  .setName('lockdown')
  .setDescription('Lock all channels to prevent new messages.')
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export const feature = 'security';
export const category = 'Security & Anti-Nuke';

export async function execute(interaction) {
  const channels = interaction.guild.channels.cache.filter(ch => ch.isTextBased());
  for (const channel of channels.values()) {
    await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: false });
  }
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Lockdown Activated',
        description: 'All channels locked.',
        color: '#4a90e2'
      })
    ]
  });
  await logAction(interaction.guild, { embeds: [createEmbed({ title: 'Lockdown', description: 'Activated by ' + interaction.user.tag })] });
}
import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';
import { logAction } from '../utils/logger.js';

export const data = new SlashCommandBuilder()
  .setName('unlockdown')
  .setDescription('Unlock all channels.')
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export const feature = 'security';
export const category = 'Security & Anti-Nuke';

export async function execute(interaction) {
  const channels = interaction.guild.channels.cache.filter(ch => ch.isTextBased());
  for (const channel of channels.values()) {
    await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: null });
  }
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Lockdown Deactivated',
        description: 'All channels unlocked.',
        color: '#4a90e2'
      })
    ]
  });
  await logAction(interaction.guild, { embeds: [createEmbed({ title: 'Unlockdown', description: 'Deactivated by ' + interaction.user.tag })] });
}
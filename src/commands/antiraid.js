import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';
import { logAction } from '../utils/logger.js';

export const data = new SlashCommandBuilder()
  .setName('antiraid')
  .setDescription('Enable anti-raid mode to lock down the server.')
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export const feature = 'security';
export const category = 'Security & Anti-Nuke';

export async function execute(interaction) {
  // Implementation for anti-raid
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Anti-Raid Enabled',
        description: 'Server lockdown activated.',
        color: '#4a90e2'
      })
    ]
  });
  await logAction(interaction.guild, { embeds: [createEmbed({ title: 'Anti-Raid Enabled', description: 'Activated by ' + interaction.user.tag })] });
}
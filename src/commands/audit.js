import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('audit')
  .setDescription('View recent audit logs.')
  .setDefaultMemberPermissions(PermissionFlagsBits.ViewAuditLog);

export const feature = 'security';
export const category = 'Security & Anti-Nuke';

export async function execute(interaction) {
  const logs = await interaction.guild.fetchAuditLogs({ limit: 10 });
  const entries = logs.entries.map(entry => `${entry.action}: ${entry.target} by ${entry.executor}`).join('\n');
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Audit Logs',
        description: entries || 'No recent logs.',
        color: '#4a90e2'
      })
    ]
  });
}
import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('antispam')
  .setDescription('Toggle anti-spam protection.')
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export const feature = 'security';
export const category = 'Security & Anti-Nuke';

export async function execute(interaction) {
  // Toggle logic
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Anti-Spam',
        description: 'Anti-spam protection toggled.',
        color: '#4a90e2'
      })
    ]
  });
}
import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';
import { logAction } from '../utils/logger.js';

export const data = new SlashCommandBuilder()
  .setName('massban')
  .setDescription('Ban multiple users at once.')
  .addStringOption(option => option.setName('users').setDescription('User IDs separated by commas').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers);

export const feature = 'security';
export const category = 'Security & Anti-Nuke';

export async function execute(interaction) {
  const userIds = interaction.options.getString('users').split(',').map(id => id.trim());
  let banned = 0;
  for (const id of userIds) {
    try {
      await interaction.guild.members.ban(id);
      banned++;
    } catch {}
  }
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Mass Ban',
        description: `Banned ${banned} users.`,
        color: '#4a90e2'
      })
    ]
  });
  await logAction(interaction.guild, { embeds: [createEmbed({ title: 'Mass Ban', description: `${banned} users banned by ${interaction.user.tag}` })] });
}
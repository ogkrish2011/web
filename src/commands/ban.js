import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';
import { logAction } from '../utils/logger.js';

export const data = new SlashCommandBuilder()
  .setName('ban')
  .setDescription('Ban a user from the server.')
  .addUserOption(option => option.setName('target').setDescription('User to ban').setRequired(true))
  .addStringOption(option => option.setName('reason').setDescription('Reason for the ban'))
  .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers);

export const feature = 'security';
export const category = 'Security';

export async function execute(interaction) {
  const target = interaction.options.getUser('target');
  const reason = interaction.options.getString('reason') || 'No reason provided';
  const member = await interaction.guild.members.fetch(target.id).catch(() => null);

  if (!member) {
    return interaction.reply({ content: 'User not found in this server.', ephemeral: true });
  }
  if (!member.bannable) {
    return interaction.reply({ content: 'I cannot ban that user.', ephemeral: true });
  }

  await member.ban({ reason });
  const embed = createEmbed({
    title: 'User Banned',
    description: `${target.tag} has been banned.`,
    fields: [
      { name: 'Reason', value: reason, inline: false },
      { name: 'Moderator', value: interaction.user.tag, inline: true }
    ],
    color: '#f04747'
  });

  await interaction.reply({ embeds: [embed] });
  await logAction(interaction.guild, { embeds: [embed] });
}

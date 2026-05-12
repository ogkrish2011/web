import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';
import { logAction } from '../utils/logger.js';

export const data = new SlashCommandBuilder()
  .setName('softban')
  .setDescription('Softban a user (ban and unban immediately).')
  .addUserOption(option => option.setName('target').setDescription('User to softban').setRequired(true))
  .addStringOption(option => option.setName('reason').setDescription('Reason'))
  .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers);

export const feature = 'moderation';
export const category = 'Moderation';

export async function execute(interaction) {
  const target = interaction.options.getUser('target');
  const reason = interaction.options.getString('reason') || 'No reason';
  const member = await interaction.guild.members.fetch(target.id).catch(() => null);

  if (!member) {
    return interaction.reply({ content: 'User not in server.', ephemeral: true });
  }
  if (!member.bannable) {
    return interaction.reply({ content: 'Cannot softban this user.', ephemeral: true });
  }

  await member.ban({ reason });
  await interaction.guild.members.unban(target.id);
  const embed = createEmbed({
    title: 'User Softbanned',
    description: `${target.tag} softbanned.`,
    fields: [{ name: 'Reason', value: reason }],
    color: '#f9a825'
  });
  await interaction.reply({ embeds: [embed] });
  await logAction(interaction.guild, { embeds: [embed] });
}
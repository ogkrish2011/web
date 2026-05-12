import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';
import { logAction } from '../utils/logger.js';

export const data = new SlashCommandBuilder()
  .setName('kick')
  .setDescription('Kick a user from the server.')
  .addUserOption(option => option.setName('target').setDescription('User to kick').setRequired(true))
  .addStringOption(option => option.setName('reason').setDescription('Reason for the kick'))
  .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers);

export const feature = 'security';
export const category = 'Security';

export async function execute(interaction) {
  const target = interaction.options.getUser('target');
  const reason = interaction.options.getString('reason') || 'No reason provided';
  const member = await interaction.guild.members.fetch(target.id).catch(() => null);

  if (!member) {
    return interaction.reply({ content: 'User not found in this server.', ephemeral: true });
  }
  if (!member.kickable) {
    return interaction.reply({ content: 'I cannot kick that user.', ephemeral: true });
  }

  await member.kick(reason);
  const embed = createEmbed({
    title: 'User Kicked',
    description: `${target.tag} has been kicked.`,
    fields: [
      { name: 'Reason', value: reason, inline: false },
      { name: 'Moderator', value: interaction.user.tag, inline: true }
    ],
    color: '#f9a825'
  });

  await interaction.reply({ embeds: [embed] });
  await logAction(interaction.guild, { embeds: [embed] });
}

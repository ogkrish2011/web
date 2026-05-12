import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('unban')
  .setDescription('Unban a user.')
  .addStringOption(option => option.setName('userid').setDescription('User ID to unban').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers);

export const feature = 'moderation';
export const category = 'Moderation';

export async function execute(interaction) {
  const userid = interaction.options.getString('userid');
  try {
    await interaction.guild.members.unban(userid);
    await interaction.reply({
      embeds: [
        createEmbed({
          title: 'User Unbanned',
          description: `User ${userid} unbanned.`,
          color: '#4a90e2'
        })
      ]
    });
  } catch {
    await interaction.reply({ content: 'Failed to unban.', ephemeral: true });
  }
}
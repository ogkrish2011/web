import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('untimeout')
  .setDescription('Remove timeout from a user.')
  .addUserOption(option => option.setName('target').setDescription('User to untimeout').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers);

export const feature = 'moderation';
export const category = 'Moderation';

export async function execute(interaction) {
  const target = interaction.options.getUser('target');
  const member = await interaction.guild.members.fetch(target.id).catch(() => null);

  if (!member) {
    return interaction.reply({ content: 'User not in server.', ephemeral: true });
  }

  await member.timeout(null);
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Timeout Removed',
        description: `${target.tag} timeout removed.`,
        color: '#4a90e2'
      })
    ]
  });
}
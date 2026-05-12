import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('timeout')
  .setDescription('Timeout a user.')
  .addUserOption(option => option.setName('target').setDescription('User to timeout').setRequired(true))
  .addIntegerOption(option => option.setName('minutes').setDescription('Timeout duration').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers);

export const feature = 'moderation';
export const category = 'Moderation';

export async function execute(interaction) {
  const target = interaction.options.getUser('target');
  const minutes = interaction.options.getInteger('minutes');
  const member = await interaction.guild.members.fetch(target.id).catch(() => null);

  if (!member) {
    return interaction.reply({ content: 'User not in server.', ephemeral: true });
  }

  await member.timeout(minutes * 60_000);
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'User Timed Out',
        description: `${target.tag} timed out for ${minutes} minutes.`,
        color: '#f9a825'
      })
    ]
  });
}
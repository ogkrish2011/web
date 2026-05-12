import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('nick')
  .setDescription('Change a user\'s nickname.')
  .addUserOption(option => option.setName('target').setDescription('User').setRequired(true))
  .addStringOption(option => option.setName('nickname').setDescription('New nickname'))
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames);

export const feature = 'moderation';
export const category = 'Moderation';

export async function execute(interaction) {
  const target = interaction.options.getUser('target');
  const nickname = interaction.options.getString('nickname');
  const member = await interaction.guild.members.fetch(target.id).catch(() => null);

  if (!member) {
    return interaction.reply({ content: 'User not in server.', ephemeral: true });
  }

  await member.setNickname(nickname);
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Nickname Changed',
        description: `${target.tag}'s nickname set to ${nickname || 'none'}.`,
        color: '#4a90e2'
      })
    ]
  });
}
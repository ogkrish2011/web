import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('unmute')
  .setDescription('Unmute a user.')
  .addUserOption(option => option.setName('target').setDescription('User to unmute').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers);

export const feature = 'moderation';
export const category = 'Moderation';

export async function execute(interaction) {
  const target = interaction.options.getUser('target');
  const member = await interaction.guild.members.fetch(target.id).catch(() => null);

  if (!member) {
    return interaction.reply({ content: 'User not in server.', ephemeral: true });
  }

  const muteRole = interaction.guild.roles.cache.find(role => role.name === 'Guardian Mute');
  if (muteRole && member.roles.cache.has(muteRole.id)) {
    await member.roles.remove(muteRole);
    await interaction.reply({
      embeds: [
        createEmbed({
          title: 'User Unmuted',
          description: `${target.tag} unmuted.`,
          color: '#4a90e2'
        })
      ]
    });
  } else {
    await interaction.reply({ content: 'User is not muted.', ephemeral: true });
  }
}
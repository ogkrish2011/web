import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('mute')
  .setDescription('Mute a user by assigning a moderation role.')
  .addUserOption(option => option.setName('target').setDescription('User to mute').setRequired(true))
  .addIntegerOption(option => option.setName('minutes').setDescription('Mute duration in minutes'))
  .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers);

export const feature = 'moderation';
export const category = 'Moderation';

const roleName = 'Guardian Mute';

export async function execute(interaction) {
  const target = interaction.options.getUser('target');
  const duration = interaction.options.getInteger('minutes');
  const member = await interaction.guild.members.fetch(target.id).catch(() => null);

  if (!member) {
    return interaction.reply({ content: 'User not found in this server.', ephemeral: true });
  }

  let muteRole = interaction.guild.roles.cache.find(role => role.name === roleName);
  if (!muteRole) {
    muteRole = await interaction.guild.roles.create({
      name: roleName,
      color: 'Grey',
      permissions: []
    });

    for (const channel of interaction.guild.channels.cache.values()) {
      if (channel.isTextBased()) {
        await channel.permissionOverwrites.edit(muteRole, {
          SendMessages: false,
          AddReactions: false,
          Speak: false
        }).catch(() => null);
      }
    }
  }

  await member.roles.add(muteRole);
  const message = duration
    ? `${target.tag} has been muted for ${duration} minute(s).`
    : `${target.tag} has been muted.`;

  if (duration) {
    setTimeout(async () => {
      await member.roles.remove(muteRole).catch(() => null);
    }, duration * 60_000);
  }

  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'User Muted',
        description: message,
        fields: [{ name: 'Moderator', value: interaction.user.tag, inline: true }],
        color: '#2f3136'
      })
    ]
  });
}

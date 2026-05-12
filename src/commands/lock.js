import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('lock')
  .setDescription('Lock the current channel to stop new messages.')
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels);

export const feature = 'moderation';
export const category = 'Moderation';

export async function execute(interaction) {
  const channel = interaction.channel;
  if (!channel?.isTextBased()) {
    return interaction.reply({ content: 'This command works only in text channels.', ephemeral: true });
  }

  await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
    SendMessages: false
  });

  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Channel Locked',
        description: `🔒 ${channel} has been locked for all members.`,
        fields: [{ name: 'Moderator', value: interaction.user.tag, inline: true }]
      })
    ]
  });
}

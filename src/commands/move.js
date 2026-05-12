import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('move')
  .setDescription('Move a user to another voice channel.')
  .addUserOption(option => option.setName('target').setDescription('User').setRequired(true))
  .addChannelOption(option => option.setName('channel').setDescription('Voice channel').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.MoveMembers);

export const feature = 'moderation';
export const category = 'Moderation';

export async function execute(interaction) {
  const target = interaction.options.getUser('target');
  const channel = interaction.options.getChannel('channel');
  const member = await interaction.guild.members.fetch(target.id).catch(() => null);

  if (!member) {
    return interaction.reply({ content: 'User not in server.', ephemeral: true });
  }

  await member.voice.setChannel(channel);
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'User Moved',
        description: `${target.tag} moved to ${channel.name}.`,
        color: '#4a90e2'
      })
    ]
  });
}
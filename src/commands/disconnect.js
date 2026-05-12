import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('disconnect')
  .setDescription('Disconnect a user from voice.')
  .addUserOption(option => option.setName('target').setDescription('User').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.MoveMembers);

export const feature = 'moderation';
export const category = 'Moderation';

export async function execute(interaction) {
  const target = interaction.options.getUser('target');
  const member = await interaction.guild.members.fetch(target.id).catch(() => null);

  if (!member) {
    return interaction.reply({ content: 'User not in server.', ephemeral: true });
  }

  await member.voice.disconnect();
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'User Disconnected',
        description: `${target.tag} disconnected from voice.`,
        color: '#f9a825'
      })
    ]
  });
}
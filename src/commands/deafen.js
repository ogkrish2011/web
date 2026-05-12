import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('deafen')
  .setDescription('Deafen a user in voice.')
  .addUserOption(option => option.setName('target').setDescription('User').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.DeafenMembers);

export const feature = 'moderation';
export const category = 'Moderation';

export async function execute(interaction) {
  const target = interaction.options.getUser('target');
  const member = await interaction.guild.members.fetch(target.id).catch(() => null);

  if (!member) {
    return interaction.reply({ content: 'User not in server.', ephemeral: true });
  }

  await member.voice.setDeaf(true);
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'User Deafened',
        description: `${target.tag} deafened.`,
        color: '#f9a825'
      })
    ]
  });
}
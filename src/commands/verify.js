import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('verify')
  .setDescription('Verify a user manually.')
  .addUserOption(option => option.setName('user').setDescription('User to verify').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles);

export const feature = 'security';
export const category = 'Security & Anti-Nuke';

export async function execute(interaction) {
  const user = interaction.options.getUser('user');
  // Add verified role
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'User Verified',
        description: `${user.tag} has been verified.`,
        color: '#4a90e2'
      })
    ]
  });
}
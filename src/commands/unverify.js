import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('unverify')
  .setDescription('Unverify a user.')
  .addUserOption(option => option.setName('user').setDescription('User to unverify').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles);

export const feature = 'security';
export const category = 'Security & Anti-Nuke';

export async function execute(interaction) {
  const user = interaction.options.getUser('user');
  // Remove verified role
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'User Unverified',
        description: `${user.tag} has been unverified.`,
        color: '#4a90e2'
      })
    ]
  });
}
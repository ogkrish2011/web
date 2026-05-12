import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('blacklist')
  .setDescription('Blacklist a user or role.')
  .addUserOption(option => option.setName('user').setDescription('User to blacklist'))
  .addRoleOption(option => option.setName('role').setDescription('Role to blacklist'))
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export const feature = 'security';
export const category = 'Security & Anti-Nuke';

export async function execute(interaction) {
  const user = interaction.options.getUser('user');
  const role = interaction.options.getRole('role');
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Blacklist Added',
        description: `${user ? user.tag : role.name} added to blacklist.`,
        color: '#4a90e2'
      })
    ]
  });
}
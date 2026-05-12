import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('whitelist')
  .setDescription('Whitelist a user or role.')
  .addUserOption(option => option.setName('user').setDescription('User to whitelist'))
  .addRoleOption(option => option.setName('role').setDescription('Role to whitelist'))
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export const feature = 'security';
export const category = 'Security & Anti-Nuke';

export async function execute(interaction) {
  const user = interaction.options.getUser('user');
  const role = interaction.options.getRole('role');
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Whitelist Added',
        description: `${user ? user.tag : role.name} added to whitelist.`,
        color: '#4a90e2'
      })
    ]
  });
}
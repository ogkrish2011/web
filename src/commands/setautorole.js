import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';
import { saveConfig } from '../utils/config.js';

export const data = new SlashCommandBuilder()
  .setName('setautorole')
  .setDescription('Set the auto-role for new members.')
  .addRoleOption(option => option.setName('role').setDescription('Role to assign').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export const feature = 'automation';
export const category = 'Automation';

export async function execute(interaction) {
  const role = interaction.options.getRole('role');
  const config = saveConfig({ autoRoleId: role.id });
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Auto-Role Set',
        description: `New members will get the ${role.name} role.`,
        color: '#4a90e2'
      })
    ]
  });
}
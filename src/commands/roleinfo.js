import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('roleinfo')
  .setDescription('Get info about a role.')
  .addRoleOption(option => option.setName('role').setDescription('Role').setRequired(true));

export const feature = 'utility';
export const category = 'Utility';

export async function execute(interaction) {
  const role = interaction.options.getRole('role');
  await interaction.reply({
    embeds: [
      createEmbed({
        title: `Role: ${role.name}`,
        fields: [
          { name: 'Color', value: role.hexColor, inline: true },
          { name: 'Members', value: role.members.size.toString(), inline: true },
          { name: 'Position', value: role.position.toString(), inline: true }
        ],
        color: role.color || '#4a90e2'
      })
    ]
  });
}
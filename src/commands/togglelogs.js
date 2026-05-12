import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('togglelogs')
  .setDescription('Toggle logging.')
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export const feature = 'customization';
export const category = 'Customization';

export async function execute(interaction) {
  // Toggle logic
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Logs Toggled',
        description: 'Logging settings updated.',
        color: '#4a90e2'
      })
    ]
  });
}
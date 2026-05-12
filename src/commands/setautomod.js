import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('setautomod')
  .setDescription('Set auto-mod rules.')
  .addStringOption(option => option.setName('rules').setDescription('Rules').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export const feature = 'automation';
export const category = 'Automation';

export async function execute(interaction) {
  const rules = interaction.options.getString('rules');
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Auto-Mod Set',
        description: `Rules: ${rules}`,
        color: '#4a90e2'
      })
    ]
  });
}
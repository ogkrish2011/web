import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('setantiraid')
  .setDescription('Set anti-raid sensitivity.')
  .addIntegerOption(option => option.setName('level').setDescription('Level 1-10').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export const feature = 'security';
export const category = 'Security & Anti-Nuke';

export async function execute(interaction) {
  const level = interaction.options.getInteger('level');
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Anti-Raid Set',
        description: `Anti-raid level set to ${level}.`,
        color: '#4a90e2'
      })
    ]
  });
}
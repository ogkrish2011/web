import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { createEmbed } from '../utils/embeds.js';

const warningsPath = path.resolve('src/data/warnings.json');

function loadWarnings() {
  if (!fs.existsSync(warningsPath)) {
    fs.writeFileSync(warningsPath, JSON.stringify({}), 'utf8');
  }
  return JSON.parse(fs.readFileSync(warningsPath, 'utf8'));
}

export const data = new SlashCommandBuilder()
  .setName('warnings')
  .setDescription('View warnings for a user.')
  .addUserOption(option => option.setName('target').setDescription('User to check').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers);

export const feature = 'moderation';
export const category = 'Moderation';

export async function execute(interaction) {
  const target = interaction.options.getUser('target');
  const warnings = loadWarnings();
  const userWarnings = warnings[target.id] || [];

  const embed = createEmbed({
    title: `Warnings for ${target.tag}`,
    description: userWarnings.length ? userWarnings.map((w, i) => `${i+1}. ${w.reason} by ${w.moderator}`).join('\n') : 'No warnings.',
    color: '#f9a825'
  });
  await interaction.reply({ embeds: [embed] });
}
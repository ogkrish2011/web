import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { createEmbed } from '../utils/embeds.js';
import { logAction } from '../utils/logger.js';

const warningsPath = path.resolve('src/data/warnings.json');

function loadWarnings() {
  if (!fs.existsSync(warningsPath)) {
    fs.writeFileSync(warningsPath, JSON.stringify({}), 'utf8');
  }
  return JSON.parse(fs.readFileSync(warningsPath, 'utf8'));
}

function saveWarnings(data) {
  fs.writeFileSync(warningsPath, JSON.stringify(data, null, 2), 'utf8');
}

export const data = new SlashCommandBuilder()
  .setName('warn')
  .setDescription('Issue a warning to a user.')
  .addUserOption(option => option.setName('target').setDescription('User to warn').setRequired(true))
  .addStringOption(option => option.setName('reason').setDescription('Reason for the warning'))
  .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers);

export const feature = 'moderation';
export const category = 'Moderation';

export async function execute(interaction) {
  const target = interaction.options.getUser('target');
  const reason = interaction.options.getString('reason') || 'No reason specified';
  const warnings = loadWarnings();

  if (!warnings[target.id]) {
    warnings[target.id] = [];
  }

  warnings[target.id].push({
    moderator: interaction.user.tag,
    reason,
    date: new Date().toISOString()
  });

  saveWarnings(warnings);

  const embed = createEmbed({
    title: 'User Warned',
    description: `${target.tag} has been warned.`,
    fields: [
      { name: 'Reason', value: reason, inline: false },
      { name: 'Moderator', value: interaction.user.tag, inline: true }
    ],
    color: '#f9a825'
  });

  await interaction.reply({ embeds: [embed] });
  await logAction(interaction.guild, { embeds: [embed] });
}

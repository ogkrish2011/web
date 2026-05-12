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

function saveWarnings(data) {
  fs.writeFileSync(warningsPath, JSON.stringify(data, null, 2), 'utf8');
}

export const data = new SlashCommandBuilder()
  .setName('clearwarns')
  .setDescription('Clear all warnings for a user.')
  .addUserOption(option => option.setName('target').setDescription('User').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export const feature = 'security';
export const category = 'Security & Anti-Nuke';

export async function execute(interaction) {
  const target = interaction.options.getUser('target');
  const warnings = loadWarnings();
  delete warnings[target.id];
  saveWarnings(warnings);
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Warnings Cleared',
        description: `Cleared warnings for ${target.tag}.`,
        color: '#4a90e2'
      })
    ]
  });
}
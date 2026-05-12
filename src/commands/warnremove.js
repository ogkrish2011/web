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
  .setName('warnremove')
  .setDescription('Remove a warning from a user.')
  .addUserOption(option => option.setName('target').setDescription('User').setRequired(true))
  .addIntegerOption(option => option.setName('index').setDescription('Warning index').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers);

export const feature = 'moderation';
export const category = 'Moderation';

export async function execute(interaction) {
  const target = interaction.options.getUser('target');
  const index = interaction.options.getInteger('index') - 1;
  const warnings = loadWarnings();
  if (!warnings[target.id] || !warnings[target.id][index]) {
    return interaction.reply({ content: 'Warning not found.', ephemeral: true });
  }
  warnings[target.id].splice(index, 1);
  saveWarnings(warnings);
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Warning Removed',
        description: `Removed warning ${index + 1} from ${target.tag}.`,
        color: '#4a90e2'
      })
    ]
  });
}
import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';
import { saveConfig } from '../utils/config.js';

export const data = new SlashCommandBuilder()
  .setName('setprefix')
  .setDescription('Set the bot prefix.')
  .addStringOption(option => option.setName('prefix').setDescription('New prefix').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export const feature = 'customization';
export const category = 'Customization';

export async function execute(interaction) {
  const prefix = interaction.options.getString('prefix');
  const config = saveConfig({ serverPrefix: prefix });
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Prefix Set',
        description: `Prefix changed to ${prefix}.`,
        color: '#4a90e2'
      })
    ]
  });
}
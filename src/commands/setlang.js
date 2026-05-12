import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('setlang')
  .setDescription('Set the bot language.')
  .addStringOption(option => option.setName('lang').setDescription('Language code').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export const feature = 'customization';
export const category = 'Customization';

export async function execute(interaction) {
  const lang = interaction.options.getString('lang');
  // Placeholder for language setting
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Language Set',
        description: `Language set to ${lang}.`,
        color: '#4a90e2'
      })
    ]
  });
}
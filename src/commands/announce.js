import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('announce')
  .setDescription('Make an announcement.')
  .addStringOption(option => option.setName('message').setDescription('Announcement').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export const feature = 'automation';
export const category = 'Automation';

export async function execute(interaction) {
  const message = interaction.options.getString('message');
  await interaction.channel.send(`📢 ${message}`);
  await interaction.reply({ content: 'Announcement sent.', ephemeral: true });
}
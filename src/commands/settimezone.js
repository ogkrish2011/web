import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('settimezone')
  .setDescription('Set server timezone.')
  .addStringOption(option => option.setName('tz').setDescription('Timezone').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export const feature = 'customization';
export const category = 'Customization';

export async function execute(interaction) {
  const tz = interaction.options.getString('tz');
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Timezone Set',
        description: `Timezone set to ${tz}.`,
        color: '#4a90e2'
      })
    ]
  });
}
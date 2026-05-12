import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('setjoinmessage')
  .setDescription('Set join message.')
  .addStringOption(option => option.setName('message').setDescription('Message').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export const feature = 'automation';
export const category = 'Automation';

export async function execute(interaction) {
  const message = interaction.options.getString('message');
  // Store message
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Join Message Set',
        description: `Message: ${message}`,
        color: '#4a90e2'
      })
    ]
  });
}
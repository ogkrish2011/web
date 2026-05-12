import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('setleavemessage')
  .setDescription('Set leave message.')
  .addStringOption(option => option.setName('message').setDescription('Message').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export const feature = 'automation';
export const category = 'Automation';

export async function execute(interaction) {
  const message = interaction.options.getString('message');
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Leave Message Set',
        description: `Message: ${message}`,
        color: '#4a90e2'
      })
    ]
  });
}
import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';
import { saveConfig } from '../utils/config.js';

export const data = new SlashCommandBuilder()
  .setName('setwelcome')
  .setDescription('Set the welcome channel.')
  .addChannelOption(option => option.setName('channel').setDescription('Channel for welcomes').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export const feature = 'automation';
export const category = 'Automation';

export async function execute(interaction) {
  const channel = interaction.options.getChannel('channel');
  const config = saveConfig({ welcomeChannelId: channel.id });
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Welcome Channel Set',
        description: `Welcome messages will be sent to ${channel}.`,
        color: '#4a90e2'
      })
    ]
  });
}
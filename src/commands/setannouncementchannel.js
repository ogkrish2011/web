import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('setannouncementchannel')
  .setDescription('Set announcement channel.')
  .addChannelOption(option => option.setName('channel').setDescription('Channel').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export const feature = 'automation';
export const category = 'Automation';

export async function execute(interaction) {
  const channel = interaction.options.getChannel('channel');
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Announcement Channel Set',
        description: `Announcements to ${channel}.`,
        color: '#4a90e2'
      })
    ]
  });
}
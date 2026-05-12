import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('lockdownchannel')
  .setDescription('Lock down a specific channel.')
  .addChannelOption(option => option.setName('channel').setDescription('Channel to lock').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export const feature = 'security';
export const category = 'Security & Anti-Nuke';

export async function execute(interaction) {
  const channel = interaction.options.getChannel('channel');
  await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: false });
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Channel Locked',
        description: `${channel} locked.`,
        color: '#4a90e2'
      })
    ]
  });
}
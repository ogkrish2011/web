import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('unlockchannel')
  .setDescription('Unlock a specific channel.')
  .addChannelOption(option => option.setName('channel').setDescription('Channel to unlock').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export const feature = 'security';
export const category = 'Security & Anti-Nuke';

export async function execute(interaction) {
  const channel = interaction.options.getChannel('channel');
  await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: null });
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Channel Unlocked',
        description: `${channel} unlocked.`,
        color: '#4a90e2'
      })
    ]
  });
}
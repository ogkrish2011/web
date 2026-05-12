import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('setpollchannel')
  .setDescription('Set poll channel.')
  .addChannelOption(option => option.setName('channel').setDescription('Channel').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export const feature = 'automation';
export const category = 'Automation';

export async function execute(interaction) {
  const channel = interaction.options.getChannel('channel');
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Poll Channel Set',
        description: `Polls to ${channel}.`,
        color: '#4a90e2'
      })
    ]
  });
}
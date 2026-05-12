import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('ticket')
  .setDescription('Create a support ticket.')
  .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages);

export const feature = 'automation';
export const category = 'Automation';

export async function execute(interaction) {
  // Create ticket channel
  const ticketChannel = await interaction.guild.channels.create({
    name: `ticket-${interaction.user.username}`,
    type: 0, // text
    permissionOverwrites: [
      { id: interaction.guild.roles.everyone, deny: ['ViewChannel'] },
      { id: interaction.user.id, allow: ['ViewChannel', 'SendMessages'] }
    ]
  });
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Ticket Created',
        description: `Your ticket: ${ticketChannel}`,
        color: '#4a90e2'
      })
    ],
    ephemeral: true
  });
}
import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('schedule')
  .setDescription('Schedule a message.')
  .addStringOption(option => option.setName('message').setDescription('Message').setRequired(true))
  .addIntegerOption(option => option.setName('minutes').setDescription('Minutes from now').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export const feature = 'automation';
export const category = 'Automation';

export async function execute(interaction) {
  const message = interaction.options.getString('message');
  const minutes = interaction.options.getInteger('minutes');
  setTimeout(() => {
    interaction.channel.send(message);
  }, minutes * 60_000);
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Message Scheduled',
        description: `Message will be sent in ${minutes} minutes.`,
        color: '#4a90e2'
      })
    ],
    ephemeral: true
  });
}
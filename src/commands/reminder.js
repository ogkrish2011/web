import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('reminder')
  .setDescription('Set a reminder.')
  .addStringOption(option => option.setName('message').setDescription('Reminder message').setRequired(true))
  .addIntegerOption(option => option.setName('minutes').setDescription('Minutes from now').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages);

export const feature = 'automation';
export const category = 'Automation';

export async function execute(interaction) {
  const message = interaction.options.getString('message');
  const minutes = interaction.options.getInteger('minutes');
  setTimeout(() => {
    interaction.user.send(`⏰ Reminder: ${message}`);
  }, minutes * 60_000);
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Reminder Set',
        description: `I'll remind you in ${minutes} minutes.`,
        color: '#4a90e2'
      })
    ],
    ephemeral: true
  });
}
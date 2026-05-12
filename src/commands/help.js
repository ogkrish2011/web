import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('help')
  .setDescription('Get help with commands.');

export const feature = 'utility';
export const category = 'Utility';

export async function execute(interaction) {
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Help',
        description: 'Use /command to see available commands. Categories: Security, Moderation, Automation, Utility, Customization, Fun.',
        color: '#4a90e2'
      })
    ]
  });
}
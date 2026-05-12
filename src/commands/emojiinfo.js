import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('emojiinfo')
  .setDescription('Get emoji info.')
  .addStringOption(option => option.setName('emoji').setDescription('Emoji').setRequired(true));

export const feature = 'utility';
export const category = 'Utility';

export async function execute(interaction) {
  const emoji = interaction.options.getString('emoji');
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Emoji Info',
        description: `Emoji: ${emoji}`,
        color: '#4a90e2'
      })
    ]
  });
}
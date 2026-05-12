import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('stickerinfo')
  .setDescription('Get sticker info.')
  .addStringOption(option => option.setName('sticker').setDescription('Sticker ID').setRequired(true));

export const feature = 'utility';
export const category = 'Utility';

export async function execute(interaction) {
  const sticker = interaction.options.getString('sticker');
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Sticker Info',
        description: `Sticker ID: ${sticker}`,
        color: '#4a90e2'
      })
    ]
  });
}
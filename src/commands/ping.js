import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Check bot latency.');

export const feature = 'utility';
export const category = 'Utility';

export async function execute(interaction) {
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Pong!',
        description: `Gateway ping is ${Math.round(interaction.client.ws.ping)}ms.`,
        color: '#6d9df3'
      })
    ]
  });
}

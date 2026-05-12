import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('invite')
  .setDescription('Get bot invite link.');

export const feature = 'utility';
export const category = 'Utility';

export async function execute(interaction) {
  const invite = `https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&permissions=8&scope=bot%20applications.commands`;
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Invite Aegis Guard',
        description: `[Click here to invite](${invite})`,
        color: '#4a90e2'
      })
    ]
  });
}
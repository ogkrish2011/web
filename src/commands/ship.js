import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('ship')
  .setDescription('Ship two users.')
  .addUserOption(option => option.setName('user1').setDescription('First user').setRequired(true))
  .addUserOption(option => option.setName('user2').setDescription('Second user').setRequired(true));

export const feature = 'fun';
export const category = 'Fun & Engagement';

export async function execute(interaction) {
  const user1 = interaction.options.getUser('user1');
  const user2 = interaction.options.getUser('user2');
  const percentage = Math.floor(Math.random() * 101);
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Ship',
        description: `${user1} and ${user2} are ${percentage}% compatible!`,
        color: '#4a90e2'
      })
    ]
  });
}
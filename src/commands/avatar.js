import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('avatar')
  .setDescription('Get a user\'s avatar.')
  .addUserOption(option => option.setName('user').setDescription('User').setRequired(false));

export const feature = 'utility';
export const category = 'Utility';

export async function execute(interaction) {
  const user = interaction.options.getUser('user') || interaction.user;
  await interaction.reply({
    embeds: [
      createEmbed({
        title: `${user.username}'s Avatar`,
        color: '#4a90e2'
      }).setImage(user.displayAvatarURL({ dynamic: true, size: 512 }))
    ]
  });
}
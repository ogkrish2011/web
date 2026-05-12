import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('unbanall')
  .setDescription('Unban all users.')
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export const feature = 'security';
export const category = 'Security & Anti-Nuke';

export async function execute(interaction) {
  const bans = await interaction.guild.bans.fetch();
  for (const ban of bans.values()) {
    await interaction.guild.members.unban(ban.user.id);
  }
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Unbanned All',
        description: 'All users unbanned.',
        color: '#4a90e2'
      })
    ]
  });
}
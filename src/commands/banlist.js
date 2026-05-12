import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('banlist')
  .setDescription('List banned users.')
  .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers);

export const feature = 'security';
export const category = 'Security & Anti-Nuke';

export async function execute(interaction) {
  const bans = await interaction.guild.bans.fetch();
  const list = bans.map(ban => `${ban.user.tag}: ${ban.reason || 'No reason'}`).join('\n') || 'No bans.';
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Ban List',
        description: list,
        color: '#4a90e2'
      })
    ]
  });
}
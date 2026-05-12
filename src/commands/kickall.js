import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('kickall')
  .setDescription('Kick all members (except admins).')
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export const feature = 'security';
export const category = 'Security & Anti-Nuke';

export async function execute(interaction) {
  const members = await interaction.guild.members.fetch();
  let kicked = 0;
  for (const member of members.values()) {
    if (!member.permissions.has(PermissionFlagsBits.Administrator) && member.id !== interaction.client.user.id) {
      await member.kick();
      kicked++;
    }
  }
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Kicked All',
        description: `Kicked ${kicked} members.`,
        color: '#4a90e2'
      })
    ]
  });
}
import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('unmuteall')
  .setDescription('Unmute all members in voice.')
  .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers);

export const feature = 'security';
export const category = 'Security & Anti-Nuke';

export async function execute(interaction) {
  const members = await interaction.guild.members.fetch();
  for (const member of members.values()) {
    if (member.voice.channel) {
      await member.voice.setMute(false);
    }
  }
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Unmuted All',
        description: 'All voice members unmuted.',
        color: '#4a90e2'
      })
    ]
  });
}
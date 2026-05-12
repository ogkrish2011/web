import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('muteall')
  .setDescription('Mute all members in voice.')
  .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers);

export const feature = 'security';
export const category = 'Security & Anti-Nuke';

export async function execute(interaction) {
  const members = await interaction.guild.members.fetch();
  for (const member of members.values()) {
    if (member.voice.channel) {
      await member.voice.setMute(true);
    }
  }
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Muted All',
        description: 'All voice members muted.',
        color: '#4a90e2'
      })
    ]
  });
}
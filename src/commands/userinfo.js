import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('userinfo')
  .setDescription('Display information about a server member.')
  .addUserOption(option => option.setName('target').setDescription('User to lookup').setRequired(false));

export const feature = 'utility';
export const category = 'Utility';

export async function execute(interaction) {
  const target = interaction.options.getUser('target') || interaction.user;
  const member = await interaction.guild.members.fetch(target.id);

  await interaction.reply({
    embeds: [
      createEmbed({
        title: `User Info: ${target.tag}`,
        fields: [
          { name: 'User ID', value: target.id, inline: true },
          { name: 'Joined Server', value: member.joinedAt ? `<t:${Math.floor(member.joinedAt / 1000)}:R>` : 'Unknown', inline: true },
          { name: 'Created Account', value: `<t:${Math.floor(target.createdTimestamp / 1000)}:R>`, inline: true },
          { name: 'Roles', value: member.roles.cache.filter(role => role.id !== interaction.guild.id).map(role => role.name).join(', ') || 'None' }
        ]
      })
    ]
  });
}

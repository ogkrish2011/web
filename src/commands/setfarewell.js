import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';
import { saveConfig } from '../utils/config.js';

export const data = new SlashCommandBuilder()
  .setName('setfarewell')
  .setDescription('Set the farewell channel.')
  .addChannelOption(option => option.setName('channel').setDescription('Channel for farewells').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export const feature = 'automation';
export const category = 'Automation';

export async function execute(interaction) {
  const channel = interaction.options.getChannel('channel');
  const config = saveConfig({ farewellChannelId: channel.id });
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Farewell Channel Set',
        description: `Farewell messages will be sent to ${channel}.`,
        color: '#4a90e2'
      })
    ]
  });
}
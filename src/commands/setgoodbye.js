import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';
import { saveConfig } from '../utils/config.js';

export const data = new SlashCommandBuilder()
  .setName('setgoodbye')
  .setDescription('Set the goodbye channel.')
  .addChannelOption(option => option.setName('channel').setDescription('Channel').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export const feature = 'automation';
export const category = 'Automation';

export async function execute(interaction) {
  const channel = interaction.options.getChannel('channel');
  const config = saveConfig({ farewellChannelId: channel.id });
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Goodbye Channel Set',
        description: `Goodbye messages to ${channel}.`,
        color: '#4a90e2'
      })
    ]
  });
}
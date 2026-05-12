import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('embedbuilder')
  .setDescription('Build a custom embed.')
  .addStringOption(option => option.setName('title').setDescription('Title').setRequired(true))
  .addStringOption(option => option.setName('description').setDescription('Description').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export const feature = 'customization';
export const category = 'Customization';

export async function execute(interaction) {
  const title = interaction.options.getString('title');
  const description = interaction.options.getString('description');
  await interaction.channel.send({
    embeds: [
      createEmbed({
        title,
        description,
        color: '#4a90e2'
      })
    ]
  });
  await interaction.reply({ content: 'Embed sent.', ephemeral: true });
}
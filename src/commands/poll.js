import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('poll')
  .setDescription('Create a poll.')
  .addStringOption(option => option.setName('question').setDescription('Poll question').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages);

export const feature = 'automation';
export const category = 'Automation';

export async function execute(interaction) {
  const question = interaction.options.getString('question');
  const pollMessage = await interaction.channel.send(`📊 **Poll:** ${question}\n\n✅ Yes\n❌ No`);
  await pollMessage.react('✅');
  await pollMessage.react('❌');
  await interaction.reply({ content: 'Poll created.', ephemeral: true });
}
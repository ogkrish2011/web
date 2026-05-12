import { EmbedBuilder } from 'discord.js';

export function createEmbed({ title, description, fields = [], color = '#6d9df3', footer = 'Guardian Shield', timestamp = true }) {
  const embed = new EmbedBuilder()
    .setTitle(title)
    .setDescription(description)
    .setColor(color)
    .setFooter({ text: footer });

  if (timestamp) {
    embed.setTimestamp();
  }

  if (fields.length) {
    embed.addFields(fields);
  }

  return embed;
}

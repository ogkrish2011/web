import { loadConfig } from './config.js';

export async function logAction(guild, messagePayload) {
  const config = loadConfig();
  if (!config.logChannelId) return;
  const logChannel = guild.channels.cache.get(config.logChannelId);
  if (!logChannel?.isTextBased()) return;
  await logChannel.send(messagePayload).catch(() => null);
}

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { Client, Collection, GatewayIntentBits, REST, Routes, Partials } from 'discord.js';
import { createEmbed } from './utils/embeds.js';
import { isFeatureEnabled, loadConfig } from './utils/config.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
  partials: [Partials.Channel]
});
client.commands = new Collection();

for (const file of commandFiles) {
  const imported = await import(path.join(commandsPath, file));

  if (Array.isArray(imported.commands)) {
    for (const command of imported.commands) {
      if (command.data && command.execute) {
        client.commands.set(command.data.name, command);
      }
    }
  } else {
    const command = imported.default?.data && imported.default?.execute ? imported.default : imported;
    if (command.data && command.execute) {
      client.commands.set(command.data.name, command);
    }
  }
}

client.once('ready', async () => {
  console.log(`Aegis Guard ready as ${client.user.tag}`);
  await registerCommands();
});

client.on('guildMemberAdd', async member => {
  const config = loadConfig();
  if (!config.features.automation) return;

  if (config.autoRoleId) {
    await member.roles.add(config.autoRoleId).catch(() => null);
  }

  if (config.welcomeChannelId) {
    const welcomeChannel = member.guild.channels.cache.get(config.welcomeChannelId);
    if (welcomeChannel?.isTextBased()) {
      await welcomeChannel.send({
        embeds: [
          createEmbed({
            title: 'Welcome Aboard',
            description: `Hello ${member.user}, welcome to **${member.guild.name}**!`,
            fields: [{ name: 'Member', value: member.user.tag, inline: true }]
          })
        ]
      }).catch(() => null);
    }
  }
});

client.on('guildMemberRemove', async member => {
  const config = loadConfig();
  if (!config.features.automation) return;

  if (config.farewellChannelId) {
    const farewellChannel = member.guild.channels.cache.get(config.farewellChannelId);
    if (farewellChannel?.isTextBased()) {
      await farewellChannel.send({
        embeds: [
          createEmbed({
            title: 'Goodbye',
            description: `${member.user.tag} has left the server.`,
            color: '#f04747'
          })
        ]
      }).catch(() => null);
    }
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  if (command.feature && !isFeatureEnabled(command.feature)) {
    return interaction.reply({
      embeds: [
        createEmbed({
          title: 'Feature Disabled',
          description: `The \`${command.feature}\` category is currently disabled via the website dashboard.`,
          color: '#f04747'
        })
      ],
      ephemeral: true
    });
  }

  try {
    await command.execute(interaction, client);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: 'An error occurred while running this command.', ephemeral: true });
    } else {
      await interaction.reply({ content: 'An error occurred while running this command.', ephemeral: true });
    }
  }
});

async function registerCommands() {
  const commands = [];
  for (const command of client.commands.values()) {
    commands.push(command.data.toJSON());
  }

  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
  try {
    console.log('Refreshing application slash commands...');
    if (!process.env.CLIENT_ID || !process.env.GUILD_ID) {
      throw new Error('CLIENT_ID and GUILD_ID must be set in .env');
    }
    await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {
      body: commands
    });
    console.log('Slash commands registered for guild:', process.env.GUILD_ID);
  } catch (error) {
    console.error('Failed to register commands:', error);
  }
}

client.login(process.env.DISCORD_TOKEN);

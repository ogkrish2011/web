# Aegis Guard

A professional Discord moderation bot with 100+ commands and a live dashboard for feature toggling.

## Features
- Slash commands for moderation
- Ban, kick, mute, warn, clear messages
- Warning system with history
- Static website served with Express

## Setup
1. Set `DISCORD_TOKEN`, `CLIENT_ID`, `GUILD_ID`, and `PORT`
2. Run `npm install`
3. Start the website: `npm run web`
4. Start the bot: `npm run bot`
5. Open `http://localhost:3000`

## Dashboard
The website now includes a live dashboard for toggling feature categories and automation settings. Changes are stored in `src/data/config.json` and apply immediately for command execution.

## Deploy
Use `npm run dev` to start both web and bot locally.

## Website
The site is served from `website/index.html` and styled with `website/styles.css`.

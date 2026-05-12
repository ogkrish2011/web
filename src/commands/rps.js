import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('rps')
  .setDescription('Play rock-paper-scissors.')
  .addStringOption(option => option.setName('choice').setDescription('Rock, paper, or scissors').setRequired(true));

export const feature = 'fun';
export const category = 'Fun & Engagement';

export async function execute(interaction) {
  const choices = ['rock', 'paper', 'scissors'];
  const userChoice = interaction.options.getString('choice').toLowerCase();
  const botChoice = choices[Math.floor(Math.random() * choices.length)];
  let result = 'Draw';
  if ((userChoice === 'rock' && botChoice === 'scissors') || (userChoice === 'paper' && botChoice === 'rock') || (userChoice === 'scissors' && botChoice === 'paper')) {
    result = 'You win!';
  } else if (userChoice !== botChoice) {
    result = 'You lose!';
  }
  await interaction.reply({
    embeds: [
      createEmbed({
        title: 'Rock Paper Scissors',
        description: `You: ${userChoice}\nBot: ${botChoice}\n${result}`,
        color: '#4a90e2'
      })
    ]
  });
}
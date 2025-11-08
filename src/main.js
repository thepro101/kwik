import { SideScrollerGame } from './game/SideScrollerGame.js';

async function bootstrap() {
  const canvas = document.getElementById('game-canvas');
  const statusLabel = document.getElementById('status-text');
  const pauseButton = document.getElementById('pause-toggle');

  try {
    const game = new SideScrollerGame({ canvas, statusLabel, pauseButton });
    await game.init();
  } catch (error) {
    statusLabel.textContent = 'Error';
    pauseButton.disabled = true;
    console.error(error);
  }
}

window.addEventListener('DOMContentLoaded', bootstrap);

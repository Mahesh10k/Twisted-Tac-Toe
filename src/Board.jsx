import { useState } from 'react';

const Board=({ 
  currentPlayer, 
  player1Category, 
  player2Category, 
  emojiCategories, 
  onPlayerChange, 
  onWin,
  player1Emojis,
  setPlayer1Emojis,
  player2Emojis,
  setPlayer2Emojis
})=> {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [placementHistory, setPlacementHistory] = useState({
    1: [],
    2: []
  });
  const [availableEmojis, setAvailableEmojis] = useState({
    1: [...emojiCategories[player1Category].emojis],
    2: [...emojiCategories[player2Category].emojis]
  });

  const getRandomEmoji = (player) => {
    const emojis = availableEmojis[player];
    if (emojis.length === 0) {
      // Reset available emojis if all have been used
      const category = player === 1 ? player1Category : player2Category;
      const newEmojis = [...emojiCategories[category].emojis];
      setAvailableEmojis(prev => ({
        ...prev,
        [player]: newEmojis
      }));
      return newEmojis[Math.floor(Math.random() * newEmojis.length)];
    }
    
    const randomIndex = Math.floor(Math.random() * emojis.length);
    const selectedEmoji = emojis[randomIndex];
    
    // Remove the selected emoji from available emojis
    setAvailableEmojis(prev => ({
      ...prev,
      [player]: emojis.filter((_, index) => index !== randomIndex)
    }));
    
    return selectedEmoji;
  };

  const checkWinner = (currentBoard) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (currentBoard[a] && 
          currentBoard[b] && 
          currentBoard[c] &&
          currentBoard[a].player === currentBoard[b].player && 
          currentBoard[a].player === currentBoard[c].player) {
        return currentBoard[a].player;
      }
    }
    return null;
  };

  const handleCellClick = (index) => {
    const cell = board[index];

    // If cell is taken by the opponent, block
    if (cell && cell.player !== currentPlayer) return;

    let newBoard = [...board];
    let playerHistory = [...placementHistory[currentPlayer]];
    let currentPlayerEmojis = currentPlayer === 1 ? [...player1Emojis] : [...player2Emojis];

    // Handle replacement if 3 emojis already placed
    if (playerHistory.length >= 3) {
      const oldestIndex = playerHistory[0];

      // Block if trying to re-place on the same spot as oldest emoji
      if (index === oldestIndex) return;

      // Remove oldest emoji and return it to available emojis
      const oldestEmoji = newBoard[oldestIndex].emoji;
      setAvailableEmojis(prev => ({
        ...prev,
        [currentPlayer]: [...prev[currentPlayer], oldestEmoji]
      }));
      
      newBoard[oldestIndex] = null;
      playerHistory.shift();
      currentPlayerEmojis.shift();
    }

    // Place new emoji
    const newEmoji = {
      emoji: getRandomEmoji(currentPlayer),
      player: currentPlayer
    };
    newBoard[index] = newEmoji;
    playerHistory.push(index);
    currentPlayerEmojis.push(newEmoji.emoji);

    // Update state
    if (currentPlayer === 1) {
      setPlayer1Emojis(currentPlayerEmojis);
    } else {
      setPlayer2Emojis(currentPlayerEmojis);
    }

    setBoard(newBoard);
    setPlacementHistory({
      ...placementHistory,
      [currentPlayer]: playerHistory
    });

    // Check winner
    const winner = checkWinner(newBoard);
    if (winner) {
      onWin(winner);
    } else {
      // Switch turn only if no winner
      onPlayerChange(currentPlayer === 1 ? 2 : 1);
    }
  };

  return (
    <div className="board">
      {board.map((cell, index) => (
        <div 
          key={index} 
          className={`cell ${cell?.player === 1 ? 'player1' : 'player2'}`}
          onClick={() => handleCellClick(index)}
        >
          {cell?.emoji && <div className="cell-emoji">{cell.emoji}</div>}
        </div>
      ))}
    </div>
  );
}

export default Board;
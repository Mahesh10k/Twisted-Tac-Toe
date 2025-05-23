import { useState } from "react";
import Board from "./Board";
import CategorySelector from "./CategorySelector";
import GameOverModal from "./GameOverModal";
import HelpModal from "./HelpModal";
import "./App.css";

const EMOJI_CATEGORIES = {
  Animals: {
    image:
      "https://cbvalueaddrealty.in/wp-content/uploads/2024/01/Pet-animals.jpg",
    emojis: ["🐶", "🐱", "🐵", "🐰"],
    desc: "Cute animal friends",
  },
  Food: {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMa4ZN0HKW-GFQiICnn19OFMko1j_DT7BAZw&s",
    emojis: ["🍕", "🍟", "🍔", "🍩"],
    desc: "Yummy treats",
  },
  Sports: {
    image: "https://etimg.etb2bimg.com/photo/74881928.cms",
    emojis: ["⚽", "🏀", "🏈", "🎾"],
    desc: "Action packed",
  },
  Nature: {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWwD2FVRhVtjzgOH8wJWy51Xbim300yYK0bg&s",
    emojis: ["🌹", "🌻", "🌴", "🌵"],
    desc: "Natural wonders",
  },
  Tech: {
    image:
      "https://assets.thehansindia.com/h-upload/2019/11/03/232012-digital-age.jpg",
    emojis: ["📱", "💻", "🖥️", "⌚"],
    desc: "Digital world",
  },
};

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [player1Category, setPlayer1Category] = useState(null);
  const [player2Category, setPlayer2Category] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [winner, setWinner] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [player1Emojis, setPlayer1Emojis] = useState([]);
  const [player2Emojis, setPlayer2Emojis] = useState([]);

  const startGame = () => {
    if (player1Category && player2Category) {
      setGameStarted(true);
      setCurrentPlayer(1);
      setWinner(null);
      setPlayer1Emojis([]);
      setPlayer2Emojis([]);
    }
  };

  const restartGame = () => {
    setWinner(null);
    setGameStarted(false);
    setPlayer1Category(null);
    setPlayer2Category(null);
  };

  const handleWin = (player) => {
    setWinner(player);
  };

  return (
    <div className="app">
      {/* <h1>Twisted Tic Tac Toe</h1> */}
      <div className="container">
        <div className="title">
          <h1>Twisted Tic Tac Toe</h1>
        </div>
        <div className="ghost">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      {!gameStarted ? (
        <>
          <CategorySelector
            player={1}
            categories={EMOJI_CATEGORIES}
            selectedCategory={player1Category}
            onSelect={setPlayer1Category}
            disabledCategory={player2Category}
          />

          <CategorySelector
            player={2}
            categories={EMOJI_CATEGORIES}
            selectedCategory={player2Category}
            onSelect={setPlayer2Category}
            disabledCategory={player1Category}
          />

          {player1Category && player2Category && (
            <button className="start-button" onClick={startGame}>
              Start Game
            </button>
          )}

          <button className="help-button" onClick={() => setShowHelp(true)}>
            How to Play
          </button>
        </>
      ) : (
        <>
          <div className="game-status">
            <p className={`player-turn ${currentPlayer === 1 ? "active" : ""}`}>
              Player 1: {player1Category} {player1Emojis.length}/3
            </p>
            <p className={`player-turn ${currentPlayer === 2 ? "active" : ""}`}>
              Player 2: {player2Category} {player2Emojis.length}/3
            </p>
          </div>

          <Board
            currentPlayer={currentPlayer}
            player1Category={player1Category}
            player2Category={player2Category}
            emojiCategories={EMOJI_CATEGORIES}
            onPlayerChange={setCurrentPlayer}
            onWin={handleWin}
            player1Emojis={player1Emojis}
            setPlayer1Emojis={setPlayer1Emojis}
            player2Emojis={player2Emojis}
            setPlayer2Emojis={setPlayer2Emojis}
          />

          <button className="help-button" onClick={() => setShowHelp(true)}>
            Help
          </button>
        </>
      )}

      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
      {winner && (
        <GameOverModal
          winner={winner}
          onRestart={restartGame}
          onClose={() => setWinner(null)}
        />
      )}
    </div>
  );
}

export default App;

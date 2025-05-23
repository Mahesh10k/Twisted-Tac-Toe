import winner_Image from "./assets/winner.gif"

function GameOverModal({ winner, onRestart }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Game Over!</h2>
        <p className="winner-message">
          Player {winner} Wins
        </p>
        <img src={winner_Image} alt="winner_Img" height={150} style={{display:"block",margin:"auto"}}/>

        <button className="restart-button" onClick={onRestart}>
          Play Again 
        </button>
      </div>
    </div>
  );
}

export default GameOverModal;

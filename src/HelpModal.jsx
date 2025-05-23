function HelpModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal help-modal">
        <h2>How to Play Twisted Tic Tac Toe</h2>
        <div className="rules">
          <div className="rule">
            <span>1</span>
            <p>Each player selects a category of emojis</p>
          </div>
          <div className="rule">
            <span>2</span>
            <p>Take turns placing random emojis from your category</p>
          </div>
          <div className="rule">
            <span>3</span>
            <p>You can only have 3 emojis on the board at once</p>
          </div>
          <div className="rule">
            <span>4</span>
            <p>Placing a 4th emoji makes your oldest emoji vanish!</p>
          </div>
          <div className="rule">
            <span>5</span>
            <p>First to get 3 matching emojis in a row wins!</p>
          </div>
        </div>
        <button className="close-button" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
}

export default HelpModal;
function CategorySelector({
  player,
  categories,
  selectedCategory,
  onSelect,
  disabledCategory,
}) {
  return (
    <div className={`player-section player${player}-section`}>
      <h3 className={`player-title player${player}-title`}>
        {player === 1 ? "Player 1" : "Player 2"} - Choose Your Emoji Theme
      </h3>
      <div className="category-cards">
        {Object.entries(categories).map(([name, category]) => {
          const isDisabled = player === 2 && name === disabledCategory;
          return (
            <div
              key={name}
              className={`category-card player${player} 
                ${selectedCategory === name ? "selected" : ""}
                ${isDisabled ? "disabled" : ""}`}
              onClick={() => !isDisabled && onSelect(name)}
              style={{backgroundImage:`url(${category.image})`}}
            >
              {/* <div className="category-emoji">
                {category.emojis.slice(0, 3).map((emoji, i) => (
                  <span key={i}>{emoji}</span>
                ))}
              </div> */}
              <div className="category-name">{name}</div>
              <div className="category-desc">{category.desc}</div>
              <div className="category-disabled">
                {isDisabled ? "Selected by Player 1" : "\u00A0"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategorySelector;

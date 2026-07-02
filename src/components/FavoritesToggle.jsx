const FavoritesToggle = ({ showFavoritesOnly, onToggle, count }) => {
  return (
    <div className='controls'>
      <button
        className={`favorites-toggle ${showFavoritesOnly ? 'active' : ''}`}
        aria-pressed={showFavoritesOnly}
        onClick={() => onToggle(!showFavoritesOnly)}
      >
        ★ Favorites ({count})
      </button>
    </div>
  );
};

export default FavoritesToggle;

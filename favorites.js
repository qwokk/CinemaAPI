const favoritesContainer = document.getElementById('favoritesContainer');

function loadFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favoritesContainer.innerHTML = '';

  if (favorites.length === 0) {
    favoritesContainer.classList.remove('favoritesContainer');
    favoritesContainer.classList.add('empty-message');
    favoritesContainer.innerHTML = `<p>You haven't added any favorites yet 🎥</p>`;
    return;
  }

  favorites.forEach((movie) => {
    const card = document.createElement('div');
    card.classList.add('movie-card');
    card.innerHTML = `
      <button class="remove-btn" onclick="removeFavorite('${
        movie.imdbID
      }')">×</button>
      <img src="${
        movie.Poster !== 'N/A'
          ? movie.Poster
          : 'https://via.placeholder.com/220x320'
      }" alt="${movie.Title}">
      <h2>${movie.Title}</h2>
      <p>${movie.Year}</p>
    `;
    favoritesContainer.appendChild(card);
  });
}

function removeFavorite(id) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites = favorites.filter((movie) => movie.imdbID !== id);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  loadFavorites();
}

loadFavorites();
const API_KEY = 'thewdb';
const searchBtn = document.getElementById('searchBtn');
const movieInput = document.getElementById('movieInput');
const movieContainer = document.getElementById('movieContainer');
const modal = document.getElementById('movieModal');
const modalDetails = document.getElementById('modalDetails');
const modalPoster = document.getElementById('modalPoster');
const closeModal = document.getElementById('closeModal');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const pageInfo = document.getElementById('pageInfo');
const pagination = document.querySelector('.pagination');
const scrollTopBtn = document.getElementById('scrollTopBtn');

let currentPage = 1;
let currentQuery = '';

pagination.style.display = 'none';

searchBtn.addEventListener('click', () => {
    currentPage = 1;
    fetchMovies();
});

movieInput.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
        currentPage = 1;
        fetchMovies()
    }
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
    currentPage--;
    fetchMovies();
    scrollToTop(); 
}
});

nextPageBtn.addEventListener('click', () => {
    currentPage++;
    fetchMovies();
    scrollToTop();
});

window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > 200) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    scrollToTop();
})

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth'});
}

async function fetchMovies() {
    currentQuery = movieInput.value.trim();
    if (!currentQuery) {
        movieContainer.innerHTML = '<p>Please enter a movie name </p>';
        pagination.style.display = 'none';
        return;
    }

    movieContainer.innerHTML = '<p>Loading ...</p>';

    try{
        const res = await fetch(
             `https://www.omdbapi.com/?s=${currentQuery}&page=${currentPage}&apikey=${API_KEY}`
        );
        const data = await res.json();

        if (data.Response == 'False') {
            movieContainer.innerHTML = `<p>${data.Error}</p>`;
            pagination.style.display = 'none';
            return;
        }
        
        movieContainer.innerHTML = data.Search.map((movie) => `
        <div class="movie-card" onclick="showDetails('${movie.imdbID}')">
            <img src="${
                movie.Poster !== 'N/A'
                    ? movie.Poster
                    : 'https://via.placeholder.com/220x330'
            }" alt="${movie.Title}">
            <h2>${movie.Title}</h2>
            <p>${movie.Year}</p>
      </div>
        `
    ).join('');

    pagination.style.display = 'flex';
    pageInfo.textContent = `Page ${currentPage}`;
    prevPageBtn.disabled = currentPage == 1;
    nextPageBtn.disabled = data.Search.length < 10;
    } catch(e) {

    }
    
}


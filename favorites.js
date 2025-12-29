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
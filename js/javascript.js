
$(document).ready(() => {
  $("#FormRecherche").on('submit', (e) => {
    e.preventDefault();
    var recherche = $("#Recherche").val();
    getFilms(recherche);
  });
});




function getFilms($recherche) {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": 'https://api.themoviedb.org/3/search/movie?api_key=bc2aec4e7428ce69a684f62d618e55f4&language=fr&query='+$recherche,
    "method": "GET",
    "headers": {},
    "data": "{}"
  }
    $.ajax(settings).done(function(response) {

            var films = response.results;
            var rendu = '';
            $.each(films, (index, film) => {
              rendu+=`
                <div>
                  <div>
                    <img src="https://image.tmdb.org/t/p/w500${film.poster_path}">
                    <h5>${film.title}</h5>
                    <a onclick="movieSelected('${film.id}')" class="" href="#">Movie Details</a>
                  </div>
                </div>
              `;
            });
            $('#film').html(rendu);

    });

}﻿

function movieSelected(id){
  sessionStorage.setItem('idFilm', id);
  window.location = 'fiche_film.html';
  return false;
}

function getFilm(){
  var idFilm = sessionStorage.getItem('idFilm');
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": 'https://api.themoviedb.org/3/movie/' + idFilm + '?api_key=bc2aec4e7428ce69a684f62d618e55f4&language=fr',
    "method": "GET",
    "headers": {},
    "data": "{}"
  }
  // Make a request for a user with a given ID
$.ajax(settings).done(function(response) {
    var film = response;
    console.log(film);
    var rendu = `
        <div>
          <div>
            <img src="https://image.tmdb.org/t/p/w500${film.poster_path}">
          </div>
          <div>
            <h2>${film.title}</h2>
            <ul>
              <li><strong>Genre :</strong> ${film.genres[0].name}</li>
              <li><strong>Sortie :</strong> ${film.release_date}</li>
              <li><strong>Note :</strong> ${film.vote_average}</li>
              <li><strong>Durée :</strong> ${film.runtime} min.</li>
            </ul>
          </div>
        </div>
        <div>
          <div>
            <h3>Résumé</h3>
            ${film.overview}
            <hr>
            <a href="http://imdb.com/title/${film.imdb_id}" target="_blank">Voir fiche IMDB</a>
            <a href="accueil.html">Retour à l'accueil</a>
          </div>
        </div>
    `;
    $('#film').html(rendu);
  });
}

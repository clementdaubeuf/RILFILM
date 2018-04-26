
$(document).ready(() => {
  $("#FormRecherche").on('submit', (e) => {
    e.preventDefault();
    var recherche = $("#Recherche").val();
    getFilms(recherche);
  });
});

          function affichagefilm($tri)
          {
            affiche = "";
            var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.themoviedb.org/3/discover/movie?api_key=bc2aec4e7428ce69a684f62d618e55f4&primary_release_date.gte=2018-01-01&primary_release_date.lte=2018-04-26"+$tri,
            "method": "GET",
            "headers": {},
            "data": "{}"
          };
          console.log("https://api.themoviedb.org/3/discover/movie?api_key=bc2aec4e7428ce69a684f62d618e55f4&primary_release_date.gte=2018-01-01&primary_release_date.lte=2018-04-26"+$tri);
          $.ajax(settings).done(function(response) {
            $.each(response.results, (index, film) => {
              if (film.poster_path) {
                affiche = affiche + ('<p class="affiche"><a onclick="movieSelected(' + film.id + ')" href="#"><img src="https://image.tmdb.org/t/p/w500/' + film.poster_path + '" alt="' + film.original_title + '"></a><br/>' + film.title + '</p>');
              } else {
                affiche = affiche + ('<p class="affiche"><a onclick="movieSelected(' + film.id + ')" href="#"><img src="img/no_image.png" alt="' + film.original_title + '"></a><br/>' + film.title + '</p>');
                document.getElementById("mur_film").innerHTML = affiche;
              }
              document.getElementById("mur_film").innerHTML = affiche;
            });
          });
          };

function getMur() {
  affiche = "";
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.themoviedb.org/3/discover/movie?api_key=bc2aec4e7428ce69a684f62d618e55f4&language=fr&primary_release_date.gte=2018-01-01&primary_release_date.lte=2018-04-26&sort_by=release_date.desc",
    "method": "GET",
    "headers": {},
    "data": "{}"
  };

  $.ajax(settings).done(function(response) {
    $.each(response.results, (index, film) => {
      if (film.poster_path) {
        affiche = affiche + ('<p class="affiche"><a onclick="movieSelected(' + film.id + ')" href="#"><img src="https://image.tmdb.org/t/p/w500/' + film.poster_path + '" alt="' + film.itle + '"></a><br/>' + film.title + '</p>');
      } else {
        affiche = affiche + ('<p class="affiche"><a onclick="movieSelected(' + film.id + ')" href="#"><img src="img/no_image.png" alt="' + film.itle + '"></a><br/>' + film.title + '</p>');
        document.getElementById("mur_film").innerHTML = affiche;
      }
      document.getElementById("mur_film").innerHTML = affiche;
    });
  });
}

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

  $.ajax(settings).done(function(response) {
    var film = response;
    console.log(film);
    var rendu = `
      <h2 id="title">${film.title}</h2>
      <img src="https://image.tmdb.org/t/p/w500${film.poster_path}">
      <article>
        <p><strong>Genre :</strong> ${film.genres[0].name}</p>
        <p><strong>Sortie :</strong> ${film.release_date}</p>
        <p><strong>Note :</strong> ${film.vote_average}</li></p>
        <p><strong>Durée :</strong> ${film.runtime} min.</li></p>
        <p><strong>Résumé :</strong> ${film.overview}</p>
        <a href="http://imdb.com/title/${film.imdb_id}" target="_blank">Voir fiche IMDB</a>
        <a href="accueil.html">Retour à l'accueil</a>
      </article>
    `;
    $('#film').html(rendu);
  });
}

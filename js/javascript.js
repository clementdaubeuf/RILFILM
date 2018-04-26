
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

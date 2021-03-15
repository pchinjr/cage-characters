let arc = require('@architect/functions')

let tiny = require('tiny-json-http')

async function route(req) {

  let url = `https://api.themoviedb.org/3/person/2963/movie_credits?api_key=${process.env.MOVIE_API_KEY}`
  let imageUrl = 'http://image.tmdb.org/t/p/w500/'
  let result = await tiny.get({url})
  let movies = result.body.cast

  let html = movies.map(movie => `<h3>${movie.character} - ${movie.original_title}</h3> <p>${movie.overview}</p> <img src=${imageUrl + movie.backdrop_path}></img>`).join('')

  return {
    statusCode: 200,
    html: html
  }
}


exports.handler = arc.http.async(route)
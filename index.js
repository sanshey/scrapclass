var request = require('request')
var cheerio = require('cheerio')
var url = 'http://www.bollywoodhungama.com/movies/top-100-movies/'
var data = [];

var fs = require ('fs');

request(url, function(err, response, body){
  if (!err & response.statusCode == 200){
    var $ = cheerio.load(body);
    var $movies = $('.bh-top-100-movies-wrapper .hentry');
    var $rating = $('.hentry .bh-poll-view-count');
    console.log($($rating[10]).text().trim());

//var movies_name = $($movies[5]).find('.name').text().trim()
//var rank = $($movies[5]).find('.rank').text().trim()

//console.log(rank, movies_name);

//for (x=0; x<100; x=x+1)
$movies.each(function(i, movie){
  var obj = {}
  obj.movie_name = $(movie).find('.name').text().trim()
  obj.rank = $(movie).find('.rank').text().trim()
  obj.rating= $(movie).find('.bh-poll-view-count').text().trim()
  obj.star= $(movie).find('.current-rating').attr('class').split('rating-')[1]/10
  console.log(obj.star);
  data.push(obj)
})

  //var movies_name = $($movies[x]).find('.name').text().trim()
    //var rank = $($movies[x]).find('.rank').text().trim()


//  console.log(rank, movies_name);

//console.log(data);

fs.writeFileSync('data.json', JSON.stringify(data));


    //console.log($($movies[5]).find('.name').text().trim())
    //console.log($($movies[5]).find('.rank').text().trim())

    //console.log($($movies[0]).html())
    //console.log($movies.length)
    //console.log();


  }else{
    console.log('error.fetch incomplete');
  }
})

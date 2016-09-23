var tweets = function() {
	console.log('my tweets!');
	var Twitter = require('twitter');
	 
	var client = new Twitter({
	  consumer_key: 'QKi7jCYxi7wq5KysPKPIDRy1R',
	  consumer_secret: 'IxcpQwAKB7P6T7GAjCtiigBFOaEZv3HRdbbUgxuret4k3SCjYu',
	  access_token_key: '3294149374-5VibLnfzCDk689JgtiKyNYNvHfxWU0lQyjDjfin',
	  access_token_secret: 'p7WGPn123en1P9ZMj8zfhkRGbZ6YCm7sJSpxiChCp8MqR'
	});
	 
	var params = {screen_name: 'hcbreedluv', count: 24};

	client.get('statuses/home_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    console.log(params.screen_name);

	  	for(i=2;i<22;i++) {
	  		console.log('');
	    	console.log(i-1 + ': ' + JSON.stringify(tweets[i].text));
	    	console.log('');
	    };
	  }
	});
};

var spotify = function() {
	var spotify = require('spotify');

	var userInput = process.argv;
	var songName = '';

	for (var i=4; i<userInput.length; i++){
		songName = songName + " " + userInput[i];
	}
 
	spotify.search({ type: 'track', query: songName }, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    } else if (songName == '') {
	    	console.log('');
		    console.log('Artist: Ace of Base');
		    console.log('Song Name: The Sign');
		    console.log('Album: The Sign');
		    console.log('Preview Link: https://play.spotify.com/album/5UwIyIyFzkM7wKeGtRJPgB?play=true&utm_source=open.spotify.com&utm_medium=open');
		    console.log('');
	    } else { 
		    console.log('');
		    console.log('Artist: ', data.tracks.items[0].artists[0].name);
		    console.log('Song Name: ', data.tracks.items[0].name);
		    console.log('Album: ', data.tracks.items[0].album.name);
		    console.log('Preview Link: ', data.tracks.items[0].album.href);
		    console.log('');
		}
	});
};

var movie = function() {
	var request = require('request');

	var userInput = process.argv;
	var movieName = '';

	for (var i=4; i<userInput.length; i++){
		movieName = movieName + " " + userInput[i];
	}

	request('http://www.omdbapi.com/?tomatoes=true&t=' + movieName, function (error, response, body) {
	  if (!error && response.statusCode == 200 && movieName == '') {
	  	console.log('');
	  	console.log('Title: Mr. Nobody');
	  	console.log('Year: 2009');
	  	console.log('IMDB Rating: 7.9');
	  	console.log('Country: Belgium, Germany, Canada, France');
	  	console.log('Language: English, Mohawk');
	  	console.log('Plot: A boy stands on a station platform as a train is about to leave. Should he go with his mother or stay with his father? Infinite possibilities arise from this decision. As long as he doesn\'t choose, anything is possible.');
	  	console.log('Actors: Jared Leto, Sarah Polley, Diane Kruger, Linh Dan Pham');
	  	console.log('Rotten Tomatoe\'s Rating: 6.6');
	  	console.log('Rotten Tomatoes\'s URL: http://www.rottentomatoes.com/m/mr-nobody/');
	  	console.log('');
	  } else {
	  	var parsedBody = JSON.parse(body);
	  	console.log('');
	  	console.log('Title: ', parsedBody.Title);
	  	console.log('Year: ', parsedBody.Year);
	  	console.log('IMDB Rating: ', parsedBody.imdbRating);
	  	console.log('Country: ', parsedBody.Country);
	  	console.log('Language: ', parsedBody.Language);
	  	console.log('Plot: ', parsedBody.Plot);
	  	console.log('Actors: ', parsedBody.Actors);
	  	console.log('Rotten Tomatoe\'s Rating: ', parsedBody.tomatoRating);
	  	console.log('Rotten Tomatoes\'s URL: ', parsedBody.tomatoURL);
	  	console.log('');
	  }
	});
}
if (process.argv[2] == 'my-tweets') {
	tweets();
} else if (process.argv[2] == 'spotify-this-song') {
	spotify();
} else if (process.argv[2] == 'movie-this') {
	movie();
} else if (process.argv[2] == 'do-what-it-says') {
	var fs = require('fs');
	fs.readFile('random.txt', 'utf8', function(err, data) {
		var doIt = data.split(',');
	
		if(doIt[0] == 'spotify-this-song') {
			var spotify = require('spotify');

			var userInput = process.argv;
			var songName = doIt[1];
		 
			spotify.search({ type: 'track', query: songName }, function(err, data) {
			    if ( err ) {
			        console.log('Error occurred: ' + err);
			        return;
			    } else { 
				    console.log('');
				    console.log('Artist: ', data.tracks.items[0].artists[0].name);
				    console.log('Song Name: ', data.tracks.items[0].name);
				    console.log('Album: ', data.tracks.items[0].album.name);
				    console.log('Preview Link: ', data.tracks.items[0].album.href);
				    console.log('');
				}
			});
		}
	})
}









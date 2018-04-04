"use strict";
var path = require('path');
var express = require('express');
var app = express();
var SpotifyWebApi = require('spotify-web-api-node');

// Spotify credentials
var spotifyApi = new SpotifyWebApi({
  clientId : '490cf01062154dcaa86f8b71c1a10583',
  clientSecret : '38ddfe45f49d43138186d84e662b48d9',
  redirectUri : 'http://www.example.com/callback'
});

// Grants app an auth token
spotifyApi.clientCredentialsGrant()
    .then(function(data) {
        console.log('The access token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);

        // Save the access token so that it's used in future calls
        spotifyApi.setAccessToken(data.body['access_token']);
    }, function(err) {
        console.log('Something went wrong when retrieving an access token', err.message);
    });

// Set engine
//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'ejs');

// Where static files are being served
app.use(express.static('public'));

// Body parser
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Holds query
var artist;

// This responds with html on the homepage
app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname + '/public/html/index.html'));
});

// This responds a POST request for the homepage
app.post('/artist_list', function (req, res) {

    artist = req.body.name;
    console.log(artist);

    spotifyApi.searchArtists(artist, { limit : 2 })
        .then(function(data) {
        console.log(data.body);

        if (data.body.artists.length) {
            console.log('I found ' + data.body.artists.length + ' artists with a similar name.');
            //console.log('The most similar one is ' + data.body.artists[0].name);
        } else {
            console.log('I didn\'t find any similar artists.. Sorry.');
        }
    }, function(err) {
        console.log('Something went wrong..', err.message);
    });

    //res.render('/', { name: req.body.name });

	res.end('Artist: ' + artist);
});

var server = app.listen(3000, function () {

   var host = server.address().address;
   var port = server.address().port;

   console.log("Server listening at http://localhost:%s", port)
});

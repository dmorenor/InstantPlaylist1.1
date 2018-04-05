"use strict";
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
var SpotifyWebApi = require('spotify-web-api-node');

// Set engine
//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'ejs');

// Where static files are being served
app.use(express.static('public'));

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Spotify credentials
var spotifyApi = new SpotifyWebApi({
  clientId : '490cf01062154dcaa86f8b71c1a10583',
  clientSecret : '38ddfe45f49d43138186d84e662b48d9',
  redirectUri : 'http://www.example.com/callback'
});

// Holds auth token once retrieved
var token;

// Grants app an auth token
spotifyApi.clientCredentialsGrant()
    .then(function(data) {
        token = data.body['access_token'];
        console.log('The access token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);

        // Save the access token so that it's used in future calls
        spotifyApi.setAccessToken(data.body['access_token']);
    }, function(err) {
        console.log('Something went wrong when retrieving an access token', err.message);
    });

// Holds query string
var artist;

// This responds with html on the homepage
app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname + '/public/html/index.html'));
});

// This responds a POST request
app.post('/artist_list', function (req, res) {

    artist = req.body.name;
    console.log(artist);
    var ident;
    var ident2;

    const options = {
        url: 'https://api.spotify.com/v1/search?q=' + artist + '&type=artist&limit=1',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        json: true,
    };

    request(options, function(err, res, body) {
        //console.log(JSON.stringify(body));
        ident = JSON.stringify(body.artists.items[0].id);
        ident = ident.replace(/['"]+/g, '');
        console.log(artist + ' ID is ' + ident);
    });

    // Tried to search for artist's related artists but failed
    /*const options2 = {
        url: 'https://api.spotify.com/v1/artists/' + ident + '/related-artists',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        json: true,
    };

    request(options2, function(err, res, body) {
        console.log(JSON.stringify(body));
        ident2 = JSON.stringify(body.artists[0].id);
        ident2 = ident2.replace(/['"]+/g, '');
        console.log('ID is ' + ident2);
    }); */

	res.end('Artist: ' + artist);
});

// Server
var server = app.listen(3000, function () {

   var host = server.address().address;
   var port = server.address().port;

   console.log("Server listening at http://localhost:%s", port)
});
"use strict";
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
var SpotifyWebApi = require('spotify-web-api-node');
var playlistData = new Array();

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
app.post('/', function (req, res) {

    artist = req.body.name;
    console.log(artist);
    var ident;
    var ident2;
    var artistIds = new Array();

    spotifyApi.searchArtists(artist)
      .then(function(data) {
        ident = JSON.stringify(data.body.artists.items[0].id);
        ident = ident.replace(/['"]+/g, '');
        console.log(artist + ' ID is ' + ident);
        return ident;
      })
      .then(function(relartist) {
        return spotifyApi.getArtistRelatedArtists(relartist);
      })
      .then(function(data) {
        //ident2 = JSON.stringify(data.body.artists[0].id);
        //ident2 = ident2.replace(/['"]+/g, '');
        //console.log('ID is ' + ident2);
    		for(var i = 0; i < 10; i++){
    			artistIds[i] = JSON.stringify(data.body.artists[i].id)
    				.replace(/['"]+/g, '');
    		}
		    console.log(artistIds);
        return artistIds;
      })
      .then(function(artistIds) {
    		return spotifyApi.getArtistTopTracks(artistIds[0], 'US');
      })
      .then(function(data) {
        console.log(JSON.stringify(data.body.tracks[0].name));
        playlistData[0] = JSON.stringify(data.body.tracks[0].name) + "|" + JSON.stringify(data.body.tracks[0].artists[0].name) + "|" + JSON.stringify(data.body.tracks[0].album.name) + "|" + JSON.stringify(data.body.tracks[0].external_urls.spotify);
        return artistIds;
      })
      .then(function(artistIds) {
    		return spotifyApi.getArtistTopTracks(artistIds[1], 'US');
      })
      .then(function(data) {
        console.log(JSON.stringify(data.body.tracks[0].name));
        playlistData[1] = JSON.stringify(data.body.tracks[0].name) + "|" + JSON.stringify(data.body.tracks[0].artists[0].name) + "|" + JSON.stringify(data.body.tracks[0].album.name) + "|" + JSON.stringify(data.body.tracks[0].external_urls.spotify);
        return artistIds;
      })
      .then(function(artistIds) {
    		return spotifyApi.getArtistTopTracks(artistIds[2], 'US');
      })
      .then(function(data) {
        console.log(JSON.stringify(data.body.tracks[0].name));
        playlistData[2] = JSON.stringify(data.body.tracks[0].name) + "|" + JSON.stringify(data.body.tracks[0].artists[0].name) + "|" + JSON.stringify(data.body.tracks[0].album.name) + "|" + JSON.stringify(data.body.tracks[0].external_urls.spotify);
        return artistIds;
      })
      .then(function(artistIds) {
    		return spotifyApi.getArtistTopTracks(artistIds[3], 'US');
      })
      .then(function(data) {
        console.log(JSON.stringify(data.body.tracks[0].name));
        playlistData[3] = JSON.stringify(data.body.tracks[0].name) + "|" + JSON.stringify(data.body.tracks[0].artists[0].name) + "|" + JSON.stringify(data.body.tracks[0].album.name) + "|" + JSON.stringify(data.body.tracks[0].external_urls.spotify);
        return artistIds;
      })
      .then(function(artistIds) {
    		return spotifyApi.getArtistTopTracks(artistIds[4], 'US');
      })
      .then(function(data) {
        console.log(JSON.stringify(data.body.tracks[0].name));
        playlistData[4] = JSON.stringify(data.body.tracks[0].name) + "|" + JSON.stringify(data.body.tracks[0].artists[0].name) + "|" + JSON.stringify(data.body.tracks[0].album.name) + "|" + JSON.stringify(data.body.tracks[0].external_urls.spotify);
        return artistIds;
      })
      .then(function(artistIds) {
    		return spotifyApi.getArtistTopTracks(artistIds[5], 'US');
      })
      .then(function(data) {
        console.log(JSON.stringify(data.body.tracks[0].name));
        playlistData[5] = JSON.stringify(data.body.tracks[0].name) + "|" + JSON.stringify(data.body.tracks[0].artists[0].name) + "|" + JSON.stringify(data.body.tracks[0].album.name) + "|" + JSON.stringify(data.body.tracks[0].external_urls.spotify);
        return artistIds;
      })
      .then(function(artistIds) {
    		return spotifyApi.getArtistTopTracks(artistIds[6], 'US');
      })
      .then(function(data) {
        console.log(JSON.stringify(data.body.tracks[0].name));
        playlistData[6] = JSON.stringify(data.body.tracks[0].name) + "|" + JSON.stringify(data.body.tracks[0].artists[0].name) + "|" + JSON.stringify(data.body.tracks[0].album.name) + "|" + JSON.stringify(data.body.tracks[0].external_urls.spotify);
        return artistIds;
      })
      .then(function(artistIds) {
    		return spotifyApi.getArtistTopTracks(artistIds[7], 'US');
      })
      .then(function(data) {
        console.log(JSON.stringify(data.body.tracks[0].name));
        playlistData[7] = JSON.stringify(data.body.tracks[0].name) + "|" + JSON.stringify(data.body.tracks[0].artists[0].name) + "|" + JSON.stringify(data.body.tracks[0].album.name) + "|" + JSON.stringify(data.body.tracks[0].external_urls.spotify);
        return artistIds;
      })
      .then(function(artistIds) {
    		return spotifyApi.getArtistTopTracks(artistIds[8], 'US');
      })
      .then(function(data) {
        console.log(JSON.stringify(data.body.tracks[0].name));
        playlistData[8] = JSON.stringify(data.body.tracks[0].name) + "|" + JSON.stringify(data.body.tracks[0].artists[0].name) + "|" + JSON.stringify(data.body.tracks[0].album.name) + "|" + JSON.stringify(data.body.tracks[0].external_urls.spotify);
        return artistIds;
      })
      .then(function(artistIds) {
    		return spotifyApi.getArtistTopTracks(artistIds[9], 'US');
      })
      .then(function(data) {
        console.log(JSON.stringify(data.body.tracks[0].name));
        playlistData[9] = JSON.stringify(data.body.tracks[0].name) + "|" + JSON.stringify(data.body.tracks[0].artists[0].name) + "|" + JSON.stringify(data.body.tracks[0].album.name) + "|" + JSON.stringify(data.body.tracks[0].external_urls.spotify);
        console.log(playlistData);
        return artistIds;
      })
      .catch(function(err) {
        console.error(err);
      });

	    res.end('Artist: ' + artist);
});

// Server
var server = app.listen(3000, function () {

   var host = server.address().address;
   var port = server.address().port;

   console.log("Server listening at http://localhost:%s", port)
});

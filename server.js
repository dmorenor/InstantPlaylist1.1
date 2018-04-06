"use strict";
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
var SpotifyWebApi = require('spotify-web-api-node');
var util = require('util');


// Holds auth token once retrieved
var token;

// Holds query string
var artist;

// Holds playlist data
var playlistData = new Array();

var jarr = new Array();

// Where static files are being served
app.use(express.static('public'));


// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Set engine
app.set('view engine', 'ejs');

// Spotify credentials
var spotifyApi = new SpotifyWebApi({
  clientId : '490cf01062154dcaa86f8b71c1a10583',
  clientSecret : '38ddfe45f49d43138186d84e662b48d9',
  redirectUri : 'http://www.example.com/callback'
});

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

// This responds with html on the homepage
app.get('/', function (req, res) {
   res.render('index', {playlist: null} );
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
        //console.log(JSON.stringify(data));
    		for(var i = 0; i < 10; i++){
    			artistIds[i] = JSON.stringify(data.body.artists[i].id)
    				.replace(/['"]+/g, '');
    		}
		    console.log(artistIds);
        return artistIds;
      })
      .then(function(artistIds){	
      		artistIds.forEach(function(id){
      			Promise.resolve().then(function reslover(){
      				return spotifyApi.getArtistTopTracks(id, 'US')
      				.then(function(data){
      					console.log(JSON.stringify(data.body.tracks[0].name));
      					
      					var pos = artistIds.indexOf(id);
      					console.log(pos);
      					playlistData[pos] = JSON.stringify(data.body.tracks[0].name) + "|" + JSON.stringify(data.body.tracks[0].artists[0].name) + "|" + JSON.stringify(data.body.tracks[0].album.name) + "|" + JSON.stringify(data.body.tracks[0].external_urls.spotify);

      					if(playlistData.length === 10 && !playlistData.includes(undefined)){
      					  console.log(playlistData);
      					  res.render('index', {playlist: playlistData});
      					  playlistData = new Array();
      					} 
      				})
      			}).catch((error) => {
    					console.log("Error: " + error);
				});
      		})
      })
      .catch(function(err) {
        console.error(err);
      });
});



// Server
var server = app.listen(3111, function () {

   var host = server.address().address;
   var port = server.address().port;

   console.log("Server listening at http://localhost:%s", port)
});

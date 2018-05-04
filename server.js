"use strict";
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const querystring = require('querystring');
const request = require('request');
var SpotifyWebApi = require('spotify-web-api-node');
var localStorage;

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

// Holds auth token once retrieved
var token;

// Holds user's token
var userToken;

// Holds query string
var artist;

// Holds playlist data
var playlistData = new Array();

var clientID = '490cf01062154dcaa86f8b71c1a10583';
var clientSec = '38ddfe45f49d43138186d84e662b48d9';
var redirectURL = 'http://localhost:3000/';
var stateKey = 'spotify_auth_state';

// Where static files are being served
app.use(express.static('public'));


// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set engine
app.set('view engine', 'ejs');

// Spotify credentials
var spotifyApi = new SpotifyWebApi({
  clientId : clientID,
  clientSecret : clientSec,
  redirectUri : redirectURL
});

var userSpotifyApi;

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
app.get('/', async function (req, res) {
    let tok = req.query.access_token;
    console.log('User token is ' + tok);
    res.render('index', {playlist: null, baseArtist: null, token: null} );
});

app.get('/login', function(req, res) {
    var state = generateRandomString(16);

    localStorage.setItem(stateKey, state);
    var scopes = ['user-read-private user-read-email'];
        //redirectUri = redirectURL,
        //clientId = clientID,
        //state = state1;

    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(clientID);
    url += '&scope=' + encodeURIComponent(scopes);
    url += '&redirect_uri=' + encodeURIComponent(redirectURL);
    url += '&state=' + encodeURIComponent(state);

    /*userSpotifyApi = new SpotifyWebApi( {
       redirectUri: redirectURL,
       clientId: clientID
    });*/

    //var url = userSpotifyApi.createAuthorizeURL(scopes, state);

    res.redirect(url);
});

// This responds a POST request
app.post('/tracks', function (req, res) {

    artist = req.body.name;
    var ident;
    var ident2;
    var artistIds = new Array();

    spotifyApi.searchArtists(artist)
      .then(function(data) {
        ident = JSON.stringify(data.body.artists.items[0].id);
        ident = ident.replace(/['"]+/g, '');
        console.log(artist + 's ID is ' + ident);
        return ident;
      })
      .then(function(relartist) {
        return spotifyApi.getArtistRelatedArtists(relartist);
      })
      .then(function(data) {        
    		for(var i = 0; i < 10; i++){
    			artistIds[i] = JSON.stringify(data.body.artists[i].id)
    				.replace(/['"]+/g, '');
    		}
        return artistIds;
      })
      .then(function(artistIds) {
    		return spotifyApi.getArtistTopTracks(artistIds[0], 'US');
      })
      .then(function(data) {        
        playlistData[0] = JSON.stringify(data.body.tracks[0].name) + "|" + JSON.stringify(data.body.tracks[0].artists[0].name) + "|" + JSON.stringify(data.body.tracks[0].album.name) + "|" + JSON.stringify(data.body.tracks[0].external_urls.spotify);
        return artistIds;
      })
      .then(function(artistIds) {
    		return spotifyApi.getArtistTopTracks(artistIds[1], 'US');
      })
      .then(function(data) {
        playlistData[1] = JSON.stringify(data.body.tracks[0].name) + "|" + JSON.stringify(data.body.tracks[0].artists[0].name) + "|" + JSON.stringify(data.body.tracks[0].album.name) + "|" + JSON.stringify(data.body.tracks[0].external_urls.spotify);
        return artistIds;
      })
      .then(function(artistIds) {
    		return spotifyApi.getArtistTopTracks(artistIds[2], 'US');
      })
      .then(function(data) {
        playlistData[2] = JSON.stringify(data.body.tracks[0].name) + "|" + JSON.stringify(data.body.tracks[0].artists[0].name) + "|" + JSON.stringify(data.body.tracks[0].album.name) + "|" + JSON.stringify(data.body.tracks[0].external_urls.spotify);
        return artistIds;
      })
      .then(function(artistIds) {
    		return spotifyApi.getArtistTopTracks(artistIds[3], 'US');
      })
      .then(function(data) {
        playlistData[3] = JSON.stringify(data.body.tracks[0].name) + "|" + JSON.stringify(data.body.tracks[0].artists[0].name) + "|" + JSON.stringify(data.body.tracks[0].album.name) + "|" + JSON.stringify(data.body.tracks[0].external_urls.spotify);
        return artistIds;
      })
      .then(function(artistIds) {
    		return spotifyApi.getArtistTopTracks(artistIds[4], 'US');
      })
      .then(function(data) {
        playlistData[4] = JSON.stringify(data.body.tracks[0].name) + "|" + JSON.stringify(data.body.tracks[0].artists[0].name) + "|" + JSON.stringify(data.body.tracks[0].album.name) + "|" + JSON.stringify(data.body.tracks[0].external_urls.spotify);
        return artistIds;
      })
      .then(function(artistIds) {
    		return spotifyApi.getArtistTopTracks(artistIds[5], 'US');
      })
      .then(function(data) {
        playlistData[5] = JSON.stringify(data.body.tracks[0].name) + "|" + JSON.stringify(data.body.tracks[0].artists[0].name) + "|" + JSON.stringify(data.body.tracks[0].album.name) + "|" + JSON.stringify(data.body.tracks[0].external_urls.spotify);
        return artistIds;
      })
      .then(function(artistIds) {
    		return spotifyApi.getArtistTopTracks(artistIds[6], 'US');
      })
      .then(function(data) {
        playlistData[6] = JSON.stringify(data.body.tracks[0].name) + "|" + JSON.stringify(data.body.tracks[0].artists[0].name) + "|" + JSON.stringify(data.body.tracks[0].album.name) + "|" + JSON.stringify(data.body.tracks[0].external_urls.spotify);
        return artistIds;
      })
      .then(function(artistIds) {
    		return spotifyApi.getArtistTopTracks(artistIds[7], 'US');
      })
      .then(function(data) {
        playlistData[7] = JSON.stringify(data.body.tracks[0].name) + "|" + JSON.stringify(data.body.tracks[0].artists[0].name) + "|" + JSON.stringify(data.body.tracks[0].album.name) + "|" + JSON.stringify(data.body.tracks[0].external_urls.spotify);
        return artistIds;
      })
      .then(function(artistIds) {
    		return spotifyApi.getArtistTopTracks(artistIds[8], 'US');
      })
      .then(function(data) {
        playlistData[8] = JSON.stringify(data.body.tracks[0].name) + "|" + JSON.stringify(data.body.tracks[0].artists[0].name) + "|" + JSON.stringify(data.body.tracks[0].album.name) + "|" + JSON.stringify(data.body.tracks[0].external_urls.spotify);
        return artistIds;
      })
      .then(function(artistIds) {
    		return spotifyApi.getArtistTopTracks(artistIds[9], 'US');
      })
      .then(function(data) {
        playlistData[9] = JSON.stringify(data.body.tracks[0].name) + "|" + JSON.stringify(data.body.tracks[0].artists[0].name) + "|" + JSON.stringify(data.body.tracks[0].album.name) + "|" + JSON.stringify(data.body.tracks[0].external_urls.spotify);
        console.log(playlistData);
        res.render('index', {playlist: playlistData, baseArtist: artist, token: token});
        return artistIds;
      })
      .catch(function(err) {
        console.error(err);
      });
});

function generateRandomString(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

// Server
var server = app.listen(3000, function () {

   var host = server.address().address;
   var port = server.address().port;

   console.log("Server listening at http://localhost:%s", port)
});

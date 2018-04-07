"use strict";
const request = require('request');
var SpotifyWebApi = require('spotify-web-api-node');


var userId, playlistId;

module.exports{
	checkPlaylist : checkPlaylist,
	addTrack : addTrack,
	init : init
}

function getUser(){
	return spotifyApi.getMe();
}

function createPlaylist(id){
	var name = 'Related Playlist';
	var create = spotifyApi.createPlaylist(id, name, { 'public' : false });
	return create.id;
}

function addTrack(trackUri){
	return spotifyApi.addTracksToPlaylist(userId, playlistId, trackUri);
}

function checkPlaylist(){
	userId = getUser().id;
	var initname = 'Related Playlist';
	var userPlaylists = spotifyApi.getUserPlaylists(userId);
	var playlist;
	var i = userPlaylists.items.length;
	for(playlist in userPlaylists.items){
		if(playlist.name === initname){
			playlistId = playlist.id;
			break;
		}else if(i === 1){
			playlistId = createPlaylist(userId);
		}else{
			i--;
		}
	}
	return 'Now we get the playlist';
}

function init(){
	userId = '';
	playlistId = '';
	return 'it has been initialized';
}
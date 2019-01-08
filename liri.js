//require 
require('dotenv').config();

const keys = require('./keys');
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);

//global vars 
var track = '';
var movie = '';
var artist = '';
var input = process.argv;

//spotify 
if (input[2] === 'spotify-this-song') {
    //check for further user input
    if (input[3]) {
        //for loop magic to handle inclusion of spaces
        for (var i = 3; i < input.length; i++) {
            if (i > 3 && i < input.length) {
                track = track + ' ' + input[i];
            } else {
                track += input[i];
            }
        }
        // console.log(track)
        
        //spotify search function
        spotify.search({
            type: 'track',
            query: track,
            limit: 1
        }) //take response and log appropriate info
        .then (function(response) {
            console.log('Track: ' + response.tracks.items[0].name);
            console.log('Artist: ' + response.tracks.items[0].artists[0].name);
            console.log('Spotify Link: ' + response.tracks.items[0].external_urls.spotify);
            console.log('Album: ' + response.tracks.items[0].album.name);

        }) //catch and display if there is an error
        .catch(function(err) {
            console.log('Error occured: ' + err);
        });

    } //if no song is provided show information for the song 'The Sign' by Ace of Base 
    else {
        spotify.search({
            type: 'track',
            query: 'The Sign',
            limit: 10
        }).then (function(response) {
            // console.log(response.tracks.items[9]);
            console.log('Track: ' + response.tracks.items[9].name);
            console.log('Artist: ' + response.tracks.items[9].artists[0].name);
            console.log('Spotify Link: ' + response.tracks.items[9].external_urls.spotify);
            console.log('Album: ' + response.tracks.items[9].album.name);
        }).catch(function(err) {
            console.log('Error occured: ' + err);
        });
    }
}

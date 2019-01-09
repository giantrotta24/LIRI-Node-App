//require 
require('dotenv').config();
const keys = require('./keys');
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
const axios = require('axios');
const moment = require('moment');
const inquirer = require('inquirer');
const fs = require('fs');

//global vars 
var track = '';
var movie = '';
var artist = '';
var omdbKey = 'fb226142';
var input = process.argv;
var user = '';
dataArr = [];

//do what it says -----------------------------------------
fs.readFile('random.txt', 'utf8', function (error, data) {
    if (error) {
        return console.log('Error: ' + error);
    }

    if (input[2] === 'do-what-it-says') {
        var dataArr = data.split('"');
        // console.log(dataArr);
    
        doWhatItSays();
    }
})
function doWhatItSays() {
    input[2] = dataArr[0];
    input[3] = dataArr[1];
} 
//do what it says -----------------------------------------

//startup
if (input[2] === 'start') {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'what is your name?',
                name: 'username'
            }
        ])
        .then(function (inquirerResponse) {
            user = inquirerResponse.username;
            console.log("\r\n\r\n\r\n");
            console.log('------------------------------');
            console.log("Hi " + user + ", I'm LIRI.");
            console.log('Type node liri.js more-info for help.')
            console.log('------------------------------');
            console.log("\r\n\r\n\r\n");
            fs.appendFile('log.txt', 'user logged: ' + user + '.' + '\n', 'utf8', (err) => {
                if (err) throw err;
            });
        });
}

//more-info
if (input[2] === 'more-info') {
    console.log("\r\n\r\n\r\n");
    console.log('------------------------------');
    console.log('Here are some of the things I can help you with!')
    console.log('Type node liri.js concert-this to find when your favorite artists are performing next.')
    console.log('Type node liri.js movie-this to find more info on your favorite movies.')
    console.log('Type node liri.js spotify-this-song to look up tracks on spotify.')
    console.log('------------------------------');
    console.log("\r\n\r\n\r\n");
    fs.appendFile('log.txt', 'More Info Request.' + '\n', 'utf8', (err) => {
        if (err) throw err;
    });
}

//Bands In Town
if (input[2] === 'concert-this') {
    //check for further user input 

    if (input[3]) {

        artist = process.argv.slice(3).join(" ");
        // artist = 'Maroon 5';

        var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        // console.log(queryURL);

        axios.get(queryURL)
            .then(function (response) {

                console.log("\r\n\r\n\r\n");
                console.log('Here are some upcoming ' + artist + ' events' + '.');
                console.log("\r\n\r\n\r\n");
                console.log('------------------------------');
                console.log(moment(response.data[0].datetime).format('MM/DD/YYYY, h:mm a'));
                console.log('Venue: ' + response.data[0].venue.name);
                console.log('City: ' + response.data[0].venue.city);
                console.log('Region: ' + response.data[0].venue.region);
                console.log('Country: ' + response.data[0].venue.country);
                console.log('------------------------------');
                console.log(moment(response.data[1].datetime).format('MM/DD/YYYY, h:mm a'));
                console.log('Venue: ' + response.data[1].venue.name);
                console.log('City: ' + response.data[1].venue.city);
                console.log('Region: ' + response.data[1].venue.region);
                console.log('Country: ' + response.data[1].venue.country);
                console.log('------------------------------');
                console.log(moment(response.data[2].datetime).format('MM/DD/YYYY, h:mm a'));
                console.log('Venue: ' + response.data[2].venue.name);
                console.log('City: ' + response.data[2].venue.city);
                console.log('Region: ' + response.data[2].venue.region);
                console.log('Country: ' + response.data[2].venue.country);
                console.log('------------------------------');
                console.log("\r\n\r\n\r\n");
                fs.appendFile('log.txt', 'Concert This Request: ' + artist + '.' + '\n', 'utf8', (err) => {
                    if (err) throw err;
                });
            })
            .catch(function (error) {
                console.log("\r\n\r\n\r\n");
                console.log('------------------------------');
                console.log('Error occured: ' + 'No upcoming events detected');
                console.log('------------------------------');
                console.log("\r\n\r\n\r\n");
                
            });
    }//if no artist is provided
    else {
        console.log("\r\n\r\n\r\n");
        console.log('------------------------------');
        console.log('You did not include an artist.');
        console.log('Please try again.');
        console.log('------------------------------');
        console.log("\r\n\r\n\r\n");
        fs.appendFile('log.txt', 'Concert This Request - failed.' + '\n', 'utf8', (err) => {
            if (err) throw err;
        });
    }
}

//OMDb
if (input[2] === 'movie-this') {
    //check for further user input
    if (input[3]) {

        movie = process.argv.slice(3).join(" ");
        // console.log(movie);

        //axios request
        var queryURL = 'http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&apikey=' + omdbKey;
        // console.log(queryURL);

        axios.get(queryURL)
            .then(function (response) {
                console.log("\r\n\r\n\r\n");
                console.log('Here is what I found for ' + movie + '.');
                console.log("\r\n\r\n\r\n");
                console.log('------------------------------');
                console.log('Title: ' + response.data.Title);
                console.log('Release Year: ' + response.data.Year);
                console.log('IMDB Rating: ' + response.data.Ratings[0].Value);
                console.log('Tomato Meter: ' + response.data.Ratings[1].Value);
                console.log('Country: ' + response.data.Country);
                console.log('Language: ' + response.data.Language);
                console.log('Actors: ' + response.data.Actors);
                console.log('Plot: ' + response.data.Plot);
                console.log('------------------------------');
                console.log("\r\n\r\n\r\n");
                fs.appendFile('log.txt', 'Movie This Request: ' + movie + '.' + '\n', 'utf8', (err) => {
                    if (err) throw err;
                });
            })
            .catch(function (error) {
                console.log("\r\n\r\n\r\n");
                console.log('------------------------------');
                console.log('Error occured: ' + error);
                console.log('------------------------------');
                console.log("\r\n\r\n\r\n");
            });
    } //if no movie is provided show Mr. Nobody
    else {
        //axios request
        var queryURL = 'http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=' + omdbKey;
        // console.log(queryURL);

        axios.get(queryURL)
            .then(function (response) {
                console.log("\r\n\r\n\r\n");
                console.log('You did not include a movie.');
                console.log('Check this movie out, it is available on Netflix!');
                console.log("\r\n\r\n\r\n");
                console.log('------------------------------');
                console.log('Title: ' + response.data.Title);
                console.log('Release Year: ' + response.data.Year);
                console.log('IMDB Rating: ' + response.data.Ratings[0].Value);
                console.log('Metascore: ' + response.data.Ratings[1].Value);
                console.log('Country: ' + response.data.Country);
                console.log('Language: ' + response.data.Language);
                console.log('Actors: ' + response.data.Actors);
                console.log('Plot: ' + response.data.Plot);
                console.log('------------------------------');
                console.log("\r\n\r\n\r\n");
            })
            .catch(function (error) {
                console.log("\r\n\r\n\r\n");
                console.log('------------------------------');
                console.log('Error occured: ' + error);
                console.log('------------------------------');
                console.log("\r\n\r\n\r\n");
                fs.appendFile('log.txt', 'Movie This Request Failed.' + '\n', 'utf8', (err) => {
                    if (err) throw err;
                });
            });
    }


}

//spotify 
if (input[2] === 'spotify-this-song') {
    //check for further user input
    if (input[3]) {

        track = process.argv.slice(3).join(" ");
        // console.log(track);

        //spotify search function
        spotify.search({
            type: 'track',
            query: track,
            limit: 1
        }) //take response and log appropriate info
            .then(function (response) {
                console.log("\r\n\r\n\r\n");
                console.log('Here is what I found for ' + track + '.');
                console.log("\r\n\r\n\r\n");
                console.log('------------------------------');
                console.log('Track: ' + response.tracks.items[0].name);
                console.log('Artist: ' + response.tracks.items[0].artists[0].name);
                console.log('Spotify Link: ' + response.tracks.items[0].external_urls.spotify);
                console.log('Album: ' + response.tracks.items[0].album.name);
                console.log('------------------------------');
                console.log("\r\n\r\n\r\n");
                fs.appendFile('log.txt', 'Spotify This Song Request: ' + track + '.' + '\n', 'utf8', (err) => {
                    if (err) throw err;
                });
            }) //catch and display if there is an error
            .catch(function (err) {
                console.log("\r\n\r\n\r\n");
                console.log('------------------------------');
                console.log('Error occured: ' + err);
                console.log('------------------------------');
                console.log("\r\n\r\n\r\n");
            });

    } //if no song is provided show information for the song 'The Sign' by Ace of Base 
    else {
        spotify.search({
            type: 'track',
            query: 'The Sign',
            limit: 10
        }).then(function (response) {
            onsole.log("\r\n\r\n\r\n");
            // console.log(response.tracks.items[9]);
            console.log('You did not include a track.');
            console.log('Check out this awesome track!');
            console.log("\r\n\r\n\r\n");
            console.log('------------------------------');
            console.log('Track: ' + response.tracks.items[9].name);
            console.log('Artist: ' + response.tracks.items[9].artists[0].name);
            console.log('Spotify Link: ' + response.tracks.items[9].external_urls.spotify);
            console.log('Album: ' + response.tracks.items[9].album.name);
            console.log('------------------------------');
            onsole.log("\r\n\r\n\r\n");
            fs.appendFile('log.txt', 'Spotify This Song Request: Track Request Failed.' + '\n', 'utf8', (err) => {
                if (err) throw err;
            });
        }).catch(function (err) {
            console.log("\r\n\r\n\r\n");
            console.log('------------------------------');
            console.log('Error occured: ' + err);
            console.log('------------------------------');
            console.log("\r\n\r\n\r\n");
            
        });
    }
}


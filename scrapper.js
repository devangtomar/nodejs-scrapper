const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const URL = 'https://www.rottentomatoes.com/';

request(URL, function (error, response, html) {
    if (! error && response.statusCode === 200) {
        const $ = cheerio.load(html);

        // Example: Get the title and rating of the first movie on the homepage
        const firstMovieTitle = $('.mb-movie:nth-of-type(1) h3 a').text();
        const firstMovieRating = $('.mb-movie:nth-of-type(1) .tMeterScore').text();

        console.log(`Title: ${firstMovieTitle}`);
        console.log(`Rating: ${firstMovieRating}\n`);

        // Example: Get the titles and ratings of all movies on the homepage
        const movieTitles = [];
        const movieRatings = [];

        $('.mb-movie h3 a').each(function (i, elem) {
            movieTitles[i] = $(this).text();
        });

        $('.mb-movie .tMeterScore').each(function (i, elem) {
            movieRatings[i] = $(this).text();
        });

        for (let i = 0; i < movieTitles.length; i++) {
            console.log(`Title: ${
                movieTitles[i]
            }`);
            console.log(`Rating: ${
                movieRatings[i]
            }\n`);
        }

        // Example: Save the titles and ratings of all movies on the homepage to a file
        const data = [];

        $('.mb-movie').each(function (i, elem) {
            const title = $(this).find('h3 a').text();
            const rating = $(this).find('.tMeterScore').text();

            data.push({title, rating});
        });

        fs.writeFile('movies.json', JSON.stringify(data), function (err) {
            if (err) 
                throw err;
            
            console.log('Data saved to file.');
        });
    }
});

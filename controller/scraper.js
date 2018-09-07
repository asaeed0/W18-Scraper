const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const funcs = require('../functions');

const customHeaderRequest = request.defaults({
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'
    }
});


//  Returns a Promise
//  Returns an array of objects, each containing: headline, summary(if exists), url
function nyTimes() {
    console.log('Begin Scrape: NYTimes');
    return new Promise(resolve => {
        
        customHeaderRequest.get({
            url: `https://www.nytimes.com/section/world`,
            jar: true,
            followAllRedirects: true
        }, (error, response, body) => {3

            if (!error && response.statusCode == 200) {
                
                let $ = cheerio.load(body);
            
                let articles = [];
                let date = funcs.getDate();

                $('article').each(function(i, elem) {
                    
                    let article = {};
                    
                    article.headline = $('.headline', this).text().trim();
                    article.url = $('a', this).attr('href');
                    article.outlet = 'nyTimes';
                    article.date = date;
                    article.summary = $('.summary', this).text().trim();
                    article.comments = [];

                    articles.push(article);
                });

                resolve(articles);
            }
        });
    })
}

//  Returns a Promise
//  Returns an array of objects, each containing: headline, summary(if exists), url
function nyTimesArticle(articleUrl) {
    return new Promise(resolve => {
        
        customHeaderRequest.get({
            url: articleUrl,
            jar: true,
            followAllRedirects: true
        }, (error, response, body) => {

            if (!error && response.statusCode == 200) {
                
                let $ = cheerio.load(body);
                
                let article = ``;

                $('.StoryBodyCompanionColumn').each(function(i, elem) {
                    
                    paragraph = $('p', this).text().trim();

                    article = article + ' ' + paragraph;
                });

                // console.log(article);
                resolve(article);
            }
        });

    })

}

//  Fun
function scrapeNyTimes() {
    return new Promise(resolve => {
        (async () => {
            let result = await nyTimes();
            for (let article in result) {
                let url = (result[article].url);
                result[article].article = await nyTimesArticle(url);
                console.log(`Article ${article} scraped`);
            }
            resolve(result);
        })();
    })
}

//  Returns a Promise
//  Returns an array of objects, each containing: headline, summary(if exists), url
function cbc() {
    console.log('Begin Scrape: CBC');
    return new Promise(resolve => {
        
        customHeaderRequest.get({
            url: `http://www.cbc.ca/news/world`,
            jar: true,
            followAllRedirects: true
        }, (error, response, body) => {

            if (!error && response.statusCode == 200) {
                
                let $ = cheerio.load(body);

                let output = [];

                $('.card').each(function(i, elem) {
                
                    let article = {};
                    
                    article.headline = $('.headline', this).text().trim();
                    article.summary = $('.description', this).text();
                    article.url = `http://www.cbc.ca${$(this).attr('href')}`;

                    output.push(article);
                })

                resolve(output);
            }
        });

    });
}

//  Returns a Promise
//  Returns an array of objects, each containing: headline, summary(if exists), url
function dawn() {
    console.log('Begin Scrape: Dawn');
    return new Promise(resolve => {
        
        customHeaderRequest.get({
            url: `https://www.dawn.com/world`,
            jar: true,
            followAllRedirects: true
        }, (error, response, body) => {

            if (!error && response.statusCode == 200) {
                
                let $ = cheerio.load(body);

                let output = [];

                $('article').each(function(i, elem) {
                
                    let article = {};
                    
                    article.headline = $('.story__link', this).text().trim();
                    article.summary = $('.story__excerpt', this).text();
                    article.url = $('.story__link', this).attr('href');

                    output.push(article);
                })

                resolve(output);
            }
        });

    });
}

module.exports = {
    scrapeNyTimes: scrapeNyTimes,
};


// DEV

/* scrapeNyTimes().then(data => {
    let obj = {
        articles: data,
    };
    fs.writeFileSync('./data/data.json', obj);
    console.log(data[1]);
    console.log(data[2]);
}) */
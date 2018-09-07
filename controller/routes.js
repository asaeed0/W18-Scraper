// const data = require('../data/data.json');
const funcs = require('../functions');
const scraper = require('./scraper');
const crud = require('./crud');

const routes = (app) => {

    app.get('/', (req, res) => {
        
        ( async () => {

            //  Should return the last update date
            let lastUpdate = await crud.checkLastUpdate('nyTimes');
            console.log(`Last Update: ${lastUpdate}`);
            //  Checks to see if the last update was today
            if(funcs.getDate() === lastUpdate) {
                const today = funcs.getDate();
                let articles = await crud.getArticles(today);
                res.render('index', { articles: articles });
            } else {
                let articles = await scraper.scrapeNyTimes();
                await crud.bulkInsertArticles(articles);
                await crud.updateLastScrape();
                res.render('index', { articles: articles });
            }
        }) ();
    });

    app.post('/', (req, res) => {
        
    });
}

module.exports = routes;
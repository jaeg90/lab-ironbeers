const { error } = require('console');
const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

hbs.registerPartials(path.join(__dirname, 'views', 'partials'));
const app = express();
app.use(express.static(__dirname + 'stylesheets' + 'public'));
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      const beers = beersFromApi;
      res.render('beers', { beers });
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      const beer = responseFromAPI;
      res.render('beer', { beer });
    })
    .catch(error => console.log(error));
});

app.get('/beer-:uid', (req, res) => {
  punkAPI
    .getBeer(req.params.uid)
    .then(beerfromAPI => {
      const beer = beerfromAPI;
      console.log(beer);
      res.render('beer', { beer });
    })
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));

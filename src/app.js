const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const getWeather = require('./utils/getWeather');

app.use(express.static(path.join(__dirname, '../public')));

//set handlebars engine
app.set('view engine', 'hbs');;
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

app.get('/', (req, res)=>{
  res.render('index', {
    title: 'Weather',
    name: 'Sabira',
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Sabira',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'help',
    name: 'Sabira',
  });
});
app.get('/weather', (req, res) => {
  console.log(req.query)
  if(req.query.address){
    geocode(req.query.address, (error, { latitude, longitude, location }={} )=>{
      if(error) res.send({error});
      else{
        getWeather({latitude, longitude, location}, (error, data)=>{
          if(error) res.send({error});
          else res.send({
            forecast: data,
            location: location
          })
        }
        )}
    });
      // res.send({
      //   title: 'Weather',
      //   name: 'Sabira',
      //   address: req.query.address,
      // });
  } else {
    res.send({
      error: 'You must provide a search term'
    })
  }

});

//error handler
app.get('/help/*', (req, res)=>{
    res.render('errors', {
      title: '404',
      name: 'Sabira',
      errorMessage: 'help article was not found',
    });
})
app.get('*', (req, res)=>{
  res.render('errors', {
    title: '404',
    name: 'Sabira',
    errorMessage: 'Page was not found'
  })
})

app.listen(3000, ()=>{
  console.log('App is listening on port 3000')
})

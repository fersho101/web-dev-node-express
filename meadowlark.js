const express = require("express");
// const expressHandlebars = require('express-handlebars')
const {engine: expressHandlebars} = require('express-handlebars')

const fortune = require('./lib/fortune.js');

const app = express();

app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))

const port = process.env.PORT || 3000;

/*
app.get('/', (req, res) => {
    res.type('text/plain')
    res.send('Meadowlark Travel')
})

app.get('/about', (req, res) => {
    res.type('text/plain')
    res.send('About Meadowlark Travel')
})

*/

app.get('/', (req, res) => res.render('home'))


  

app.get('/about', (req, res) => {
  const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]
  res.render('about', {fortune: fortune.getFortune()})
})


app.use((req, res) => {
  res.status(404)
  res.render('404')
})
app.use((err, req, res, next) => {
  console.error(er.message);
  res.status(500)
  res.render('500')
})





//Custom 404 page

app.use((req, res) => {
  res.type("text/plain");
  res.status(404);
  res.send("404 - Not Found");
});

//Custom 500 page
app.use((err, req, res, next) => {
  console.error(err.message);
  res.type("text/plain");
  res.status(500);
  res.send("500 - Server Error");
});

app.listen(port, () =>
  console.log(
    `Express started on http://localhost:${port}; ` +
      `press Ctrl-C to terminate.`
  )
);

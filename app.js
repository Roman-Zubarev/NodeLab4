'use strict';
var debug = require('debug')('my express app');
var express = require('express');
var path = require('path');
var routes = require('./routes/index');

const handlebars = require("express-handlebars").create({
    extname: ".hbs",
    partialsDir: "./partials",
    helpers: {
      discard: () => {
        return '<a href="/" class="btn btn-warning" role="button">Back</a>';
      },
    },
  });
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);



app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});

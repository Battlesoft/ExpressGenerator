
// Instanciones
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bicicletasAPIRouter = require('./routes/api/bicicletas');


// Configuraciones
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Software Intermedio
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public/images', 'launch.ico')))

// Rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/bicicletas', bicicletasAPIRouter);

// Manejador de errores 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Manejador de errores general
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Arranque del servidor o exportación del servidor
module.exports = app;

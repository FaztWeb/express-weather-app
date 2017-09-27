const path = require('path');
const morgan = require('morgan');
const express = require('express');
const app = express();

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.resolve(__dirname,'views'));
app.set('view engine','ejs');

// middlewares
app.use(morgan('dev'));

// routes
app.use(require('./routes/index'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// not found
app.use((req,res) => {
  res.status(404).render("404");
});

// start the server
app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
});

var createError = require('http-errors');
var express = require('express');
var cors=require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var  indexRouter = require('./routes/index');
var messageRouter=require("./routes/Message");
var usersRouter=require("./routes/users")
var dataBase=require('./routes/db')
const Pusher = require("pusher");
var app = express();
// var Pusher=require("pusher")


// cnnect with server port 4000
const PORT=process.env.PORT ||4000;
app.listen(PORT,()=>{
  console.log(`Listening on port ${PORT}`);
  
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(cors()) // cors setup 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// cors

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","*");
  next();
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// pusher Setup



module.exports = app;

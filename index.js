const express = require('express');
var createError = require('http-errors');
const cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const hbs = require('hbs');
const categoryRoute = require('./routes/category');
const productRoute = require('./routes/product');
const authRoute = require('./routes/auth');
const dashboardRouter = require('./routes/dashboard');

dotenv.config();

// CONNECT DATABASE
mongoose.connect(process.env.DB_CONNECT);

app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined'));
app.use(logger('dev'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper({
  eq: (a, b) => a?.toString() === b?.toString(),
});
app.set('view engine', 'hbs');

// ROUTES
app.use('/api/category', categoryRoute);
app.use('/api/product', productRoute);
app.use('/api/auth', authRoute);
app.use('/dashboard', dashboardRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
 
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

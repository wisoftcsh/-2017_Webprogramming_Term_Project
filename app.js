const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
const Logger = require('morgan');
const BodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

let hbs = exphbs.create({
  defaultLayout : __dirname +'/views/layouts/main.handlebars.hbs',
  partialsDir   : __dirname +'/views/partials',
  layoutsDir    : __dirname +'/views/layouts'
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.use(express.static('views'));
app.use(Logger('dev'));
app.use(BodyParser.json()); //json 형태를 사용하겠다
app.use(BodyParser.urlencoded({extended: false})); //콜론이나 샵을 특수기호로 인코딩해주는 라이브러리 , 확장이 아닌 디폴트 라서 false
app.use('/api/accounts', require('./api/accounts')); // 해당 URI에 매칭
app.use('/api/menus', require('./api/menus/menus.index.js'));
app.use('/api/board', require('./api/board/board.index.js'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/views/login.html'));
});

app.get('/main', function (req, res) {
  res.sendFile(path.join(__dirname + '/views/main.html'));
});

app.get('/menu', function (req, res) {
  res.sendFile(path.join(__dirname + '/views/menu.html'));
});

app.get('/board', function (req, res) {
  res.sendFile(path.join(__dirname + '/views/board.html'));
});

app.get('/account/account_register', function (req, res) {
  res.sendFile(path.join(__dirname + '/views/account_register.html'));
});

let server = http.createServer(app).listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
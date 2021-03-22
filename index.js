const express = require("express");
const app = express();
const path = require('path');
const https = require('https');
const bodyParser = require("body-parser"), cookieParser = require('cookie-parser'),
 static = require('serve-static');
const expressSession = require('express-session');
var moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

var fs = require('fs');
const cors = require('cors');
var config = require('./config/config');
var route_loader = require('./routes/route_loader');
var db = require('./db_path/database');
app.locals.pretty = true;
const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/drawing.nopublisher.dev/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/drawing.nopublisher.dev/fullchain.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/live/drawing.nopublisher.dev/chain.pem')
};

app.set('port', process.env.PORT || config.server_port);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/images', static(path.join(__dirname, 'images')));
app.use(cors());

var router = express.Router();

route_loader.init(app, router, config);
// 프로세스 종료 시에 데이터베이스 연결 해제
process.on('SIGTERM', function () {
  console.log("프로세스가 종료됩니다.");
  app.close();
});
app.on('close', function () {
  console.log("Express 서버 객체가 종료됩니다.");
  if (db) {
    db.close();
  }
  });
  
  https.createServer(options, app).listen(18888, function(){
    console.log('18188 connected!'); 
    // 데이터베이스 연결을 위한 함수 호출
    db.init(app, config);
  });
  
  
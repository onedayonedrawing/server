var moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
var Schema = {};

Schema.createSchema = function (mongoose) {
  //var ObjectId = mongoose.Schema.Types.ObjectId;
  //스키마 정의
  var UserSchema = mongoose.Schema({
    super_user: { type: Boolean, index: true, 'default': false }
    , email: { type: String, required: true, unique: true, 'default': '' }
    , uid: { type: String, required: true, unique: true, 'default': '' }
    , id: { type: String, required: true, unique: true, 'default': '' }
    , nickname: { type: String, index: 'hashed', unique: true }
    , level: { type: Number, required: true, 'default': 1 }
    , exp: { type: Number, required: true, 'default': 0 }
    , latest_drawing_m: { type: Number, 'dㅎefault': null }
    , latest_drawing_d: { type: Number, 'default': null }
    , drawing_continue: { type: Number, 'default': 0 }
    , created_at: { type: String, index: { unique: false }, 'default': moment().format("YYYY-MM-DD HH:mm") }
    , drawing_number: { type: Number, 'default': 0 }
  });

  ////필수 속성에 대한 유효성 확인(길이 값 체크)
  //UserSchema.path('email').validate(function(email) {
  //  return email.length;
  //}, 'email 칼럼의 값이 없습니다.');

  //UserSchema.path('hashed_password').validate(function(hashed_password){
  //  return hashed_password.length;
  //}, 'hashed_password 칼럼의 값이 없습니다.');

  //스키마에 static 메소드 추가
  UserSchema.static('findByEmail', function (id, cb) {
    return this.find({ email: email }, cb);
  });
  UserSchema.static('findAll', function (cb) {
    return this.find({}, cb);
  });

  console.log('UserSchema 정의함');

  return UserSchema;
};

module.exports = Schema;
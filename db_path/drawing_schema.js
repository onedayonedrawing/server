var moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
var Schema = {};

Schema.createSchema = function (mongoose) {
  var ObjectId = mongoose.Schema.Types.ObjectId;
  //스키마 정의
  /*
  카테고리:
  1. 낙서 doodle
  2. 데셍 drawing
  3. 배경
  4. 인물
  5. 게임 일러스트
  6. 애니메이션
  7. 낙서
  8. 동물
  9. 판타지
  10. 사물
  */
  var DrawingBoardSchema = mongoose.Schema({
    create_user: { type: ObjectId, required: true, ref: 'users' }
    , category: [
      { type: Number }
    ]
    , title: { type: String, required: true, unique: true, 'default': '' }
    , image_name: { type: String, required: true, unique: true, 'default': '' }
    , content: { type: String, 'default': '' }
    , created_at: { type: String, index: { unique: false }, 'default': moment().format("YYYY-MM-DD HH:mm") }
    , updated_at: { type: String, index: { unique: false }, 'default': moment().format("YYYY-MM-DD HH:mm") }
    , views: { type: Number, 'default': 0 }
    , good: { type: Number, 'default': 0 }
    , comment: [
      {
        comment_user: { type: ObjectId, ref: 'users' }
        , comment_content: { type: String, 'default': '' }
        , comment_date: { type: String, index: { unique: false }, 'default': moment().format("YYYY-MM-DD HH:mm") }
      }
    ]
    , comment_number: { type: Number, 'default': 0 }
  });


  //필수 속성에 대한 유효성 확인(길이 값 체크)
  // DrawingBoardSchema.path('nickname').validate(function(nickname){
  //   return nickname.length;
  // }, 'nickname 칼럼의 값이 없습니다.');

  //스키마에 static 메소드 추가
  DrawingBoardSchema.static('findById', function (id, cb) {
    return this.find({ title: title }, cb);
  });
  DrawingBoardSchema.static('findAll', function (cb) {
    return this.find({}, cb);
  });

  console.log('UserSchema 정의함');

  return DrawingBoardSchema;
};

module.exports = Schema;
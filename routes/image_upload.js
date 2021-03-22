var moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

module.exports.image_upload = function (req, res) {
    var board = JSON.parse(req.body.board_info);
    var db = req.app.get('db');
    db.UserModel.findOne({ uid: board.create_user.uid }, function (err, userinfo) {
        if (err) throw err;
        if (userinfo) {
            db.DrawingBoardModel.findOne({ title: board.title }, function (err, board_result) {
                if (err) throw err;
                if (!board_result) {
                    /*  
                        나중에 파일이름 중복되면 알고리즘 수정할 것!!!!!!!!!!!!!!!
                    */
                    var drawing_board = new db.DrawingBoardModel({
                          create_user: userinfo._id
                        , category: board.category
                        , title: board.title
                        , content: board.content
                        , image_name: req.file.filename
                    });
                    //게시물 db에 저장
                    drawing_board.save(function (err, save_board) {
                        if (err) throw err;
                        
                        //유저 아이디에 게시물 id db 세션에 저장
                        if (userinfo.latest_drawing_m == null && userinfo.latest_drawing_d == null) {
                            userinfo.latest_drawing_d = parseInt(moment().format("DD"));
                            userinfo.latest_drawing_m = parseInt(moment().format("MM"));
                            ++userinfo.drawing_continue;
                            userinfo.exp += userinfo.drawing_continue;
                        } else {
                            var paDate = userinfo.latest_drawing_d;
                            var curDate = parseInt(moment().format("DD"));
                            var paMonth = userinfo.latest_drawing_m;
                            var curMonth = parseInt(moment().format("MM"));
                            var curYear = parseInt(moment().format("YYYY"));

                            switch (paMonth) {
                                //31일 일때 
                                case 1, 3, 5, 7, 8, 10, 12: {
                                    if (paDate != 31 && curMonth == paMonth) {
                                        if ((curDate - paDate) == 1 || (curDate - paDate) == -1130) {
                                            if (userinfo.drawing_continue < 50) {
                                                ++userinfo.drawing_continue;
                                                userinfo.exp += userinfo.drawing_continue;
                                            } else {
                                                userinfo.exp += userinfo.drawing_continue;
                                            }
                                        } else {
                                            userinfo.drawing_continue = 1;
                                            userinfo.exp += userinfo.drawing_continue;
                                        }
                                    } else if (paDate == 31 && ((curMonth - paMonth) == 1 || (paMonth - curMonth) == 11)) {
                                        if (userinfo.drawing_continue < 50) {
                                            ++userinfo.drawing_continue;
                                            userinfo.exp += userinfo.drawing_continue;
                                        } else {
                                            userinfo.exp += userinfo.drawing_continue;
                                        }
                                    } else {
                                        userinfo.drawing_continue = 1;
                                        ++userinfo.exp;
                                    }
                                    userinfo.latest_drawing_m = curMonth;
                                    userinfo.latest_drawing_d = curDate;
                                }
                                    break;
                                //30일 일때
                                case 4, 6, 9, 11: {
                                    if (paDate != 30 && curMonth == paMonth) {
                                        if ((curDate - paDate) == 1 || (curDate - paDate) == -1130) {
                                            if (userinfo.drawing_continue < 50) {
                                                ++userinfo.drawing_continue;
                                                userinfo.exp += userinfo.drawing_continue;
                                            } else {
                                                userinfo.exp += userinfo.drawing_continue;
                                            }
                                        } else {
                                            userinfo.drawing_continue = 1;
                                            userinfo.exp += userinfo.drawing_continue;
                                        }
                                    } else if (paDate == 30 && (curMonth - paMonth) == 1) {
                                        if (userinfo.drawing_continue < 50) {
                                            ++userinfo.drawing_continue;
                                            userinfo.exp += userinfo.drawing_continue;
                                        } else {
                                            userinfo.exp += userinfo.drawing_continue;
                                        }
                                    } else {
                                        userinfo.drawing_continue = 1;
                                        ++userinfo.exp;
                                    }
                                    userinfo.latest_drawing_m = curMonth;
                                    userinfo.latest_drawing_d = curDate;
                                }
                                    break;
                                //윤년 계산
                                case 2: {
                                    if ((curYear % 4) == 0) {
                                        if (paDate != 29 && curMonth == paMonth) {
                                            if ((curDate - paDate) == 1 || (curDate - paDate) == -1130) {
                                                if (userinfo.drawing_continue < 50) {
                                                    ++userinfo.drawing_continue;
                                                    userinfo.exp += userinfo.drawing_continue;
                                                } else {
                                                    userinfo.exp += userinfo.drawing_continue;
                                                }
                                            } else {
                                                userinfo.drawing_continue = 1;
                                                userinfo.exp += userinfo.drawing_continue;
                                            }
                                        } else if (paDate == 29 && (curMonth - paMonth) == 1) {
                                            if (userinfo.drawing_continue < 50) {
                                                ++userinfo.drawing_continue;
                                                userinfo.exp += userinfo.drawing_continue;
                                            } else {
                                                userinfo.exp += userinfo.drawing_continue;
                                            }
                                        } else {
                                            userinfo.drawing_continue = 1;
                                            ++userinfo.exp;
                                        }
                                    } else {
                                        if (paDate != 28 && curMonth == paMonth) {
                                            if ((curDate - paDate) == 1 || (curDate - paDate) == -1130) {
                                                if (userinfo.drawing_continue < 50) {
                                                    ++userinfo.drawing_continue;
                                                    userinfo.exp += userinfo.drawing_continue;
                                                } else {
                                                    userinfo.exp += userinfo.drawing_continue;
                                                }
                                            } else {
                                                userinfo.drawing_continue = 1;
                                                userinfo.exp += userinfo.drawing_continue;
                                            }
                                        } else if (paDate == 28 && (curMonth - paMonth) == 1) {
                                            if (userinfo.drawing_continue < 50) {
                                                ++userinfo.drawing_continue;
                                                userinfo.exp += userinfo.drawing_continue;
                                            } else {
                                                userinfo.exp += userinfo.drawing_continue;
                                            }
                                        } else {
                                            userinfo.drawing_continue = 1;
                                            ++userinfo.exp;
                                        }
                                    }
                                    userinfo.latest_drawing_m = curMonth;
                                    userinfo.latest_drawing_d = curDate;
                                }
                                    break;
                            }
                        }
                        //유저 정보 저장
                        userinfo.save(function (err, user) {
                            if (err) throw err;
                            console.log(save_board);
                            console.log(user);
                            res.status(200).send(save_board);
                            return;
                        });
                    });
                } else {
                    //게시물의 제목이 이미 존재합니다!!! 구현
                    res.status(400).send('title');
                    return;
                }
            });
        } else {
            //유저가 없을 경우 처리
            res.status(400).send('user');
        }
    });
    res.status(403);
};
module.exports.set_nickname = function(req, res){
    var uid = req.body.uid;
    var nickname = req.body.nickname;
    var db = req.app.get('db');

    db.UserModel.findOne({uid: uid}, function(err, user){
        if(err) {
            console.log('유저 찾기 오류');
            res.status(401);
            throw err;
        }
        if(user){
            user.nickname = nickname;
            user.save(function(err, user){
                if(err) {
                    console.log('닉네임 설정 오류');
                    res.status(401);
                    throw err;
                }
                console.log('닉네임 설정 성공! %s', user.email);
                res.status(200).send(user);
                return;
            });
        }
    })
    res.status(403);
}
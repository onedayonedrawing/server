module.exports.login = function(req, res){
    var email = req.body.email;
    var uid = req.body.uid;
    var id = req.body.id;
    var db = req.app.get('db');

db.UserModel.findOne({uid: uid}, function(err, user){
        if(err) {
            console.log('유저 찾기 오류');
            res.status(401);
            throw err;
        }

        //유저가 있다면
        if(user) res.status(200).send("welcome");
        else {// 유저가 없다면 새로 작성
            var userinfo = new db.UserModel({email: email, uid: uid, id: id});
            userinfo.save(function(err, user){
                if(err) {
                    console.log('유저 저장 오류');
                    res.status(401);
                    throw err;
                }

                console.log('유저가 추가되었습니다. %s', user);
                res.status(200).send(user);
                return;
            });
        }
    });
    res.status(403);
}
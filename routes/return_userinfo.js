module.exports.return_userinfo = function(req, res){
    var uid = req.body.uid;
    //var id = req.body.id;
    var db = req.app.get('db');
    db.UserModel.findOne({uid: uid}, function(err, userinfo){
        if(err) {
            console.log('유저 찾기 오류');
            res.status(401);
            throw err;
        }
        //유저가 있다면
        if(userinfo){
            res.status(200).send(user);
        } else { //유저를 찾기 못했다면 로그인 화면으로 가야함
            res.status(400);
        }
    });
    res.status(403);
};

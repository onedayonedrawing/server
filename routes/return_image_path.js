module.exports.return_image_path = function(req, res){
    var db = req.app.get('db');
    db.DrawingBoardModel.find({}, {_id: 0, image_name: 1}).exec((err, result)=>{
        if(err) {
            throw err;
        }
        if(result){ // 전송 할 데이터가 있으면
            console.log(result);
            res.status(200).send(result);
        }
    });
    //db.DrawingBoardModel.find({}).populate({path: 'create_user'}).exec((err, board)=>{
    //    if(err) throw err;
    //    if(board){
    //        res.status(200).send(board);
    //    }
    //});
    res.status(403);
};
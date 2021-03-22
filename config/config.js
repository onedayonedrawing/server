//{file: './user', path: '/user/login', method: 'login', type: 'post'},
//{file: './user', path: '/user/login', method: 'login_page', type: 'get'},
module.exports = {
    server_port: 3000,
    db_url: 'mongodb://localhost:27017/drawing_blog',
    db_schemas:[
          {file: './user_schema', collection: 'users', schemaName: 'UserSchema', modelName: 'UserModel'}
        , {file: './drawing_schema', collection: 'drawing_boards', schemaName: 'DrawingBoardSchema', modelName: 'DrawingBoardModel'}
    ],
    route_info: [
          {file: './return_image_path'  ,path: '/return_image_path',  method: 'return_image_path',  type: 'get'}
        , {file: './login'              ,path: '/user/login',    method: 'login',         type: 'post'}
        , {file:'./return_userinfo'     ,path: '/user/info',     method:'return_userinfo',type: 'post'}
        , {file: './set_nickname'       ,path: '/user/set_nickname',method:'set_nickname',type: 'post'}
        , {file: './image_upload'       ,path: '/image_upload'     ,method:'image_upload',type: 'image'}
    ],
}
access_token có 2 cách dùng. Thêm vào header "Auth" hoặc request query "access_token". Token có giá trị trong 30 ngày (hard code)
1. User
POST /users : signup // body gồm email và password, passowrd > 6 ký tự
POST /users/login: login // login bằng emal và password, trả về token
POST /users/logout: logout // dùng token để logout

2. Todo (RESTful API)
GET /api/todos
POST /api/todos
GET /api/todos/:todo_id
PUT /api/todos/:todo_id
DELETE /api/todos/:todo_id
// //ไฟล์ server
const express = require('express');
const app = express();
const path = require('path');
// const users = require('./users'); //ดึงไฟล์ user มาใช้
// const moment = require('moment'); //วันที่เวลา
const logger = require('./middleware/logger')
const exhdb = require('express-handlebars');
const users = require('./users');



//handle middleware
app.engine('handlebars', exhdb({ defaultLayout: 'main'} ));
app.set('view engine', 'handlebars');

//home page routes
app.get('/', function(req,res) {
    res.render('index',{
        title:'Users App',
        users
    });
})


const PORT = process.env.PORT || 5000; 
app.listen(PORT ,() => console.log(`server is running on port ${PORT}` ));



//body parse middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api/users', require('./routes/api/users')) //กำหนด routes api ****เรียกใช้ routes




//loging middle ware
// const logger = function(req,res,next){
//     console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
//     next();
// }

//init middle ware
// app.use(logger);
//ทุกครั้งที่สร้าง request middle ware จะทำงาน






// app.get('/' ,function(req , res){
//     res.sendFile(path.join(__dirname, 'public','index.html')); //ไม่ว่า path จะอยูที่ไหน มันจะหาให้
// })
//set static folder
app.use(express.static(path.join(__dirname,'public')));







//สร้าง rest api
// const users = [
//     {
//         id:1,
//         name: 'nueng',
//         email: '60050233@kmitl.ac.th'
//     },
//     {
//         id:2,
//         name: 'rin',
//         email: '60050249@kmitl.ac.th'
//     },
//     {
//         id:3,
//         name: 'we',
//         email: '60050245@kmitl.ac.th'
//     }
// ]
//get all users
// app.get('/api/users', function(req,res){
//     res.json(users);
// });
// app.get('/api/users', (req,res) => res.json(users));

//get single user
// app.get('/api/users/:id', function(req,res){
//     let found = users.some(user => user.id === parseInt(req.params.id));
//     if (found){
//         res.json(users.filter(user => user.id === parseInt(req.params.id)));
//     }else{
//         res.status(400).json({msg: `No users with this id of ${req.params.id}` });
//     }
// })




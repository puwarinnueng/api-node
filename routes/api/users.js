//สร้าง rest api
const express = require('express');
const router = express.Router();
const users = require('../../users');
const uuid = require('uuid')

//get all users
router.get('/', function(req,res){
    res.json(users);
});
// app.get('/api/users', (req,res) => res.json(users));

//get single user เอาข้อมูลออกมา
router.get('/:id', function(req,res){
    let found = users.some(user => user.id === parseInt(req.params.id));
    if (found){
        res.json(users.filter(user => user.id === parseInt(req.params.id)));
    }else{
        res.status(400).json({ msg: `No users with this id of ${req.params.id}` });
    }
});


//สร้างข้อมูล (post)
router.post('/', function(req,res){
    // res.send(req.body);
    const newUser = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email
    }
    if(!newUser.name || !newUser.email){
        return res.status(400).json({ msg: 'Please include name and email' })
    }

    users.push(newUser);
    // res.json(users);
    res.redirect('/');

});


//update ข้อมูล method put(push)
router.put('/:id', function(req,res){
    let found = users.some(user => user.id === parseInt(req.params.id));

    if(found){
        const updUser = req.body;
        users.forEach(user =>{
            if(user.id === parseInt(req.params.id)) {
               user.name = updUser.name? updUser.name: user.name; 
               user.email = updUser.email? updUser.email: user.email; 

               res.json({ msg: 'User update',user });
            }
        })
    }else{
        res.status(400).json({ msg: `No user with the id of ${req.params.id}` })
    }
})


//delete user
router.delete('/:id', (req,res) => {
    let found = users.some(user => user.id === parseInt(req.params.id));

    if(found){
        res.json({
            msg: 'Member delete',
            users: users.filter( user => user.id !== parseInt(req.params.id ))
        })
    }else{
        res.status(400).json({ msg: `no user with id ${req.params.id}`  });
    }
})

module.exports = router;

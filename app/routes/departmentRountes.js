const bodyParser = require('body-parser');
const express = require('express');
const { authenticateToken } = require('../middleware/authenticateToken');
const router = express.Router();
const app = express();
const bcrypt =require('bcrypt');
const jwt =require ('jsonwebtoken');
const config = require('../middleware/config');
const secretKey = config.secretKey;


const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());

const db = require('../config/database');



router.post('/deptreg', async (req, res) =>{

    try {

        const {department_name} = req.body;
    
        const insertUsersQuery = 'INSERT INTO departments (department_name) VALUES (?)';
        await db.promise().execute(insertUsersQuery,[department_name,user_id]);

        res.status(201).json({ message: 'User Department succesfully'});
    } catch (error) {

        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Username is already used'});
    }



    });



//GET ALL THE USERS
router.get('/users', authenticateToken, (req, res) => {

    try {

        db.query('SELECT user_id, name ,student_id,email,password,role_id FROM users', (err , result)=> {
            
            if(err){
                console.error('Error fetching items:', err);
            }else{
                res.status(200).json(result);
            }
        });
    } catch(error){

        console.error('Error loading users:', error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
});

//GET DETAILS OF 1 USER
router.get('/user/:id', authenticateToken, (req, res)=> {
    let user_id =req.params.id;
    if(!user_id){
        return res.status(400).send({ error: true, message: 'Please provide user_id'});
    }

    try{

        db.query('SELECT user_id, name ,student_id,email,password,role_id FROM users  WHERE user_id = ?', user_id, (err, result)=>{

            if(err){
                console.error('Error fetcing items:', err);
                res.status(500).json({message: 'Internal Server Error'});
            }else{
                res.status(200).json(result);
            }
        });
    }catch (error){
        console.error('Error loading user:', error);
        res.status(200).json({ error: 'Internal Server Error'});
    }
});

//UPDATE USER
router.put('/user/:id', authenticateToken, async(req, res)=>{

    let user_id =req.params.id;

    const {name, student_id,email, password,role_id} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    if(!user_id || !name || !student_id || !email || !password || !role_id){
        return res.status(400).send({ error: users, message: 'Please provide name, username and password'});
    }

    try{
        db.query('UPDATE users SET name = ? ,student_id =? ,email =?,password =? ,role_id = ? WHERE user_id =?', [name, student_id,email,hashedPassword,role_id, user_id],(err, result, field) =>{

          if(err){
            console.error('Error updating items:', err);
            res.status(500).json({ message: 'Internal Server Error'});
          } else{
            res.status(200).json(result);
          } 
        } );
    
    } catch(error){
        console.error('Error Loading User', error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
});

//DELETE USER
router.delete('/user/:id', authenticateToken, (req, res) => {
    let user_id = req.params.id;

    if( !user_id){
        return res.status(400).send({ error: true , message: 'Please provide user_id'});
    }

    try {

        db.query('DELETE FROM users WHERE user_id =?', user_id,(err, result, field)=>{
            if (err){
                console.error('Error Deleting item:');
                res.status(500).json({ message: 'Internal Server Error'});
            } else{
                res.status(200).json(result);
            }
        });
    }catch(error){
        console.error('Error loading users:',error);
        res.status(500).json({error: 'Internal Server Error'});
    }

   
});


module.exports = router;
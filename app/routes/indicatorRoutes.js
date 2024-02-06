const express = require('express');
const db = require('../config/database');
const jwt =require ('jsonwebtoken');
const bcrypt =require('bcrypt');
const config = require('../middleware/config');

const router = express.Router();
const { authenticateToken } = require('../middleware/authenticateToken');




router.post('/IndiReg',authenticateToken, async (req, res) =>{

    try {

        const { description ,evaluation_id, user_id} = req.body;
    
        const insertUserQuery = 'INSERT INTO indicators ( description, evaluation_id, user_id) VALUES (?,?,?)';
        await db.promise().execute(insertUserQuery,[ description, evaluation_id,user_id]);

        res.status(201).json({ message: 'Indicator registered succesfully'});
    } catch (error) {

        console.error('Error registering user:', error);
        res.status(500).json({ error: 'indicators is already used'});
    }



    });
    



router.get('/indicators', authenticateToken, (req, res) => {

    try {

        db.query('SELECT indicator_id, description ,user_id,evaluation_id FROM indicators', (err , result)=> {
            
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


router.get('/identicatorsget1/:id', authenticateToken, (req, res)=> {
    let indicator_id =req.params.id;
    if(!indicator_id){
        return res.status(400).send({ error: true, messgae: 'Please provide user_id'});
    }

    try{

        db.query('SELECT indicator_id, description ,user_id,evaluation_id FROM indicators WHERE indicator_id = ?', indicator_id, (err, result)=>{

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

//UPDATE INDICATOR
router.put('/indicatorupdate/:id', authenticateToken, async(req, res)=>{

let users_id =req.params.id;

const {description, evaluation_id} = req.body;

if(!users_id || !description || !evaluation_id ){
    return res.status(400).send({ error: users_id , message: 'Please provide  description and evaluation_id'});
}

try{
    db.query('UPDATE indicators SET description = ? , evaluation_id =?  WHERE indicator_id =?', [description ,evaluation_id,users_id],(err, result, field) =>{

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


router.delete('/deleteindicator/:id', authenticateToken, (req, res) => {
let indicator_id = req.params.id;

if( !indicator_id){
    return res.status(400).send({ error: true , message: 'Please provide role_id'});
}

try {

    db.query('DELETE FROM indicators WHERE indicator_id =?', indicator_id,(err, result, field)=>{
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
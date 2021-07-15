const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const conn = require('../dbConnection').promise();


exports.login = async (req,res,next) =>{


    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.json({ status:"0",errors: errors.array() });
    }

    try{

        const [row] = await conn.execute(
            "SELECT * FROM `users` WHERE `email`=? and password=?",
            [req.body.email,req.body.password]
          );

        if (row.length === 0) {
            return res.json({status:"1",
                message: "Invalid email address or password",
            });
        }

       /* const passMatch = await bcrypt.compare(req.body.password, row[0].password);
        if(!passMatch){
            return res.status(422).json({
                message: "Incorrect password",
            });
        }*/

        const theToken = jwt.sign({id:row[0].id},'the-super-strong-secrect',{ expiresIn: '1h' });

        return res.json({
            status:"2",
            token:theToken
        });

    }
    catch(err){
        next(err);
    }
}
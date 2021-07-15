const router = require('express').Router();
const {body} = require('express-validator');
const {login} = require('./controllers/loginController');
const {getUser} = require('./controllers/getUserController');
router.post('/login',[
    body('email',"Invalid email address")
    .notEmpty()
    .escape()
    .trim().isEmail(),
    body('password',"The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 }),
],login);

router.get('/getuser',getUser);

module.exports = router;
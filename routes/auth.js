const router = require('express').Router();
const User = require('../User');
const {registervalidation,loginvalidation} = require('./validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verify = require('./verifytoken');
 

router.post('/register', async (req,res) => {
    // to check whether entered right data
    const {error} = registervalidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // to check if email already used
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send('Email already Exist');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    // getting data from the request
    const user = new User({
        name : req.body.name,
        email : req.body.email,
        password : hashedPassword
    });
    // saving data into database
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
});



router.post('/login', async (req,res) => {
    
    const {error} = loginvalidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Email wrong or not registered');

    const validpassword = await bcrypt.compare(req.body.password,user.password);
    if (!validpassword) return res.status(400).send('Password Wrong');
    
    const secret = 'yooohoooo';
    const Token = jwt.sign({_id : user._id},secret);

    res.header('auth_token',Token);

    res.status(200).send('Logged In');

})


router.get('/posts',verify, (req,res) => {
    res.send('random posts')
});


module.exports = router ;
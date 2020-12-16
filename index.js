const express = require('express');
const app = express();
const mongoose = require('mongoose');

const authRoute = require('./routes/auth');


// connnecting to database 
mongoose.connect('mongodb+srv://Admin:yMSZfG3uNjd0KYuS@cluster0.bur5e.mongodb.net/credentials?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}, () => console.log('connected'))


const port = process.env.port || 5000 ; 

// middleware
app.use(express.json());

// api endpoints or routesssss
app.use('/api/user', authRoute);




// listener
app.listen(port , () => {
    console.log(`listening at ${port}`)
});





// yMSZfG3uNjd0KYuS
const Joi = require('joi');


const registervalidation = (data) =>{
    const schema  = Joi.object({
        name : Joi.string().min(5).required(),
        email : Joi.string().min(10).required(),
        password : Joi.string().min(8).required()
    });
    const validation =  schema.validate(data);
    return validation
};

const loginvalidation = (data) =>{
    const schema = Joi.object({
        email : Joi.string().min(10).required(),
        password : Joi.string().min(8).required()
    });
    const validation = schema.validate(data);
    return validation
}

module.exports.registervalidation = registervalidation;
module.exports.loginvalidation = loginvalidation;
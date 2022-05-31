const mongoose = require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');
const userSchema = mongoose.Schema({
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true}
});
userSchema.plugin(uniqueValidator);//deux utilisateurs ne peuvent pas utiliser 
//la même adresse e-mail

//exporter schéma sous forme de model
module.exports=mongoose.model('User', userSchema);
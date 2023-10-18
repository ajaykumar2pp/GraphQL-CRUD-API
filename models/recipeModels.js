const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    clicks:{
        type:Number,
        default: 0
    },
    date:{
        type:String
        
    }

});

module.exports = mongoose.model('FoodRecipe',recipeSchema);
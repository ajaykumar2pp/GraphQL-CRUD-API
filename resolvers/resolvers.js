const { Error } = require('mongoose');
const Recipe = require('../models/recipeModels')
var moment = require('moment');
moment().format();

const resolvers = {

    Query: {

        // Fetch all recipe 
        async recipes() {
            try {
                const recipes = await Recipe.find();
                return recipes;
            } catch (error) {
                throw new Error(`Could Not Fetch Recipe : ${error.message}`)
            }

        },
        // Fetch Single Recipe 
        async recipe(_, args) {
            try {
                console.log(args)
                const { id } = args;
                const recipe = await Recipe.findById(id);
                if (!recipe) {
                    throw new Error("Recipe Not Found")
                }
                return recipe;

            } catch (error) {
                throw new Error(`Could Not Fetch Recipe : ${error.message}`)
            }

        }

    },


    Mutation: {

        async addRecipe(_, args) {
            //  Note  1.    _ is a placeholder for the first argument, which is often the parent object  when dealing with nested resolvers.

            //Note   2.    In the code above, _ is a convention to indicate that the first parameter (often representing the parent object) is not used in this resolver.


            console.log(args.recipe)

            try {
                const { title, price, url, clicks } = args.recipe;
                const newRecipe = new Recipe({
                    title,
                    price,
                    url: `https://${url}`,    //https://Swiggy.com  //chat.com
                    clicks,
                    date: moment().format('MMMM Do YYYY, h:mm:ss a')
                })

                const savedRecipe = await newRecipe.save();
                return savedRecipe;

            } catch (error) {
                throw new Error(`Could not add Recipe : ${error.message}`)
            }
        },
        async deleteRecipe(_, args) {
            try {
                console.log(args)
                const { id } = args
                const deleteRecipe = await Recipe.findByIdAndRemove(id)
                console.log(deleteRecipe)
                if (!deleteRecipe) {
                    throw new Error("Could Not Found Recipe")
                }
                return [deleteRecipe];    // Return the deleted recipe as an array
            } catch (error) {
                throw new Error(`Could Not delete Recipe : ${error.message}`)
            }
        }
        ,
        async updateRecipe(_, args) {
            try {
                console.log(args)
                const { id, recipe } = args
                const updateRecipe = await Recipe.findById(id)
                if (!updateRecipe) {
                    throw new Error("Could Not found Recipe")
                }
                // spread 
                Object.assign(updateRecipe, recipe)
                const updateSavedRecipe = await updateRecipe.save()
                return updateSavedRecipe

            } catch (error) {
                throw new Error(`Could not update recipe:: ${error.message}`)
            }
        },
        async visitUrlRecipe(_, args) {
            try {
                console.log(args)
                const { id } = args
                const visiturl = await Recipe.findById(id)
                if (visiturl) {
                    // Increment the clicks field by 1
                    visiturl.clicks = (visiturl.clicks || 0) + 1
                    //   save recipe
                    const result = await visiturl.save();

                    return result;
                }
                else {
                    throw new Error("Recipe Not Found")
                }

            } catch (error) {
                throw new Error(`Could not visit URL Recipe : ${error.message}`)
            }
        }
    }
}

module.exports = { resolvers }
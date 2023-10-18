const typeDefs = `#graphql

  # Recipe Type : 
  type Recipe{
   id:ID  
   title :String 
   price :Int 
   url :String 
   clicks:String 
   date:String 

  }

  # Query Types : 
  type Query{
   recipes:[Recipe]
   recipe(id:ID):Recipe
  }

  # Mutation Types : 
  type Mutation{
   addRecipe(recipe:AddRecipe):Recipe
   updateRecipe(id:ID,recipe:UpdateRecipe):Recipe
   deleteRecipe(id:ID) : [Recipe]
   visitUrlRecipe(id:ID):Recipe
 
  },

  # Input Types :
  input AddRecipe{  
   title :String
   price :Int 
   url :String 
   clicks:String
   date:String
  }
  input UpdateRecipe{  
   title :String
   price :Int 
   url :String 
   clicks:String
   date:String
  }



`;

module.exports = { typeDefs }
const {ApolloServer} = require('@apollo/server')
const {startStandaloneServer } = require('@apollo/server/standalone')
const { typeDefs} = require('./typedefs/typedefs')
const {resolvers} = require('./resolvers/resolvers')
const {ConnectMongoose} = require('./Database/db')


async function startSever(){
 ConnectMongoose();

    const server = new ApolloServer({
        typeDefs,
        resolvers
      })
      
      const  PORT = process.env.PORT || 8000
      const {url} =  await startStandaloneServer(server,{listen:{port:PORT}})
      console.log(`server start at ${url}`)
}
startSever();



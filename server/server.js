require('dotenv').config();
const express = require('express');
const session = require('express-session');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const sequelize = require('./config/connection');
const PORT = process.env.PORT || 3001;
const path = require('path');

async function startApolloServer() {
  try {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });
    const app = express();
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    const SequelizeStore = require('connect-session-sequelize')(session.Store);
    const sessionStore = new SequelizeStore({
      db: sequelize,
      checkExpirationInterval: 15 * 60 * 1000,
      expiration: 7 * 24 * 60 * 60 * 1000,
    })
    app.use(
      session({
        secret: 'Super secret secret',
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
      })
    )
    sessionStore.sync()
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
    await server.start();
    server.applyMiddleware({ app });

    app.listen(() => {
      new Promise((resolve) => app.listen(PORT, resolve));
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`,
        `📭  Query at https://studio.apollographql.com/dev`
      );
      return { server, app };
    });
  } catch (err) {
    console.log(err.message);
  }
}

startApolloServer();

const express = require('express');

const { logger } = require('./middleware/middleware.js');
const usersRouter = require('./users/users-router.js');

const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json());
// global middlewares and the user's router need to be connected here
server.use('*', logger)
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || 'Error retrieving the users',
    stack: err.error.stack,
  });
});

module.exports = server;

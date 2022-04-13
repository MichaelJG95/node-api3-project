const Users = require('../users/users-model.js');

function logger(req, res, next) {
  // DO YOUR MAGIC
  req.timestamp = new Date();
  console.log(`${req.method} ${req.baseUrl} ${req.timestamp}`);
  next();
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  Users.getById(req.params.id)
    .then(user => {
      if(user) {
        req.user = user;
        next()
      } else {
        res.status(404).json({ message: "user not found" })
      }
    })
    .catch(error => next({ error }))
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId
}
const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
const Users = require('./users-model.js');
const Posts = require('../posts/posts-model.js');
// The middleware functions also need to be required
const { validateUserId, validateUser } = require('../middleware/middleware.js');

const router = express.Router();

router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => next({ error }))
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.status(200).json(req.existingUser);
});

router.post('/', validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  Users.insert(req.user)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => next({ error }));
});

router.put('/:id', validateUser, validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Users.update(req.params.id, req.user)
    .then(() => {
      res.status(200).json({ ...req.existingUser, ...req.user });
    })
    .catch(error => next({ error }));
});

router.delete('/:id', validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  Users.remove(req.params.id)
    .then(() => {
      res.status(200).json(req.existingUser);
    })
    .catch(error => next({ error }));
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  res.send('unimplemented')
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  res.send('unimplemented')
});

// do not forget to export the router
module.exports = router;
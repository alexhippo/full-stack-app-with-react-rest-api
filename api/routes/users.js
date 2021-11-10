const express = require('express');

const router = express.Router();
const User = require('../models').User;
const { authenticateUser } = require('../middleware/auth-user');
const { asyncHandler } = require('../middleware/async-handler');

// Return the list of users
router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
  const user = req.currentUser;

  const userResult = await User.findOne({
    where: {
      emailAddress: user.emailAddress
    },
    attributes: {
      exclude: ['password', 'createdAt', 'updatedAt']
    }
  });

  res.json(userResult);
}));

// Create a user
router.post('/users', asyncHandler(async (req, res) => {
  try {
    await User.create(req.body);
    res.status(201)
      .location('/')
      .end();
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors: errors });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
}));

module.exports = router;


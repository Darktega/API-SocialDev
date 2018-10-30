const router = require('express').Router();
const { usersController } = require('../controllers');
const { validator, auth, Authorizer } = require('../middlewares');

// const emailsRoutes = require('./emails');

// INDEX User
router.get('/', usersController.getAll);

// NEW User
router.post('/', (req, res, next) => {
  validator.validate(req, res, next, {
    body: {
      roleId: 'required integer',
      email: 'required email',
      password: 'required specialalphanum',
      githubToken: 'specialalphanum',
      firstName: 'word',
      lastName: 'word',
      age: 'integer',
      level: 'integer',
      profilePic: 'specialalphanum',
    },
  });
}, usersController.insert);

// SHOW User
router.get('/:userId', (req, res, next) => {
  validator.validate(req, res, next, {
    params: {
      userId: 'integer',
    },
  });
}, usersController.get);

// UPDATE User
router.put('/:userId', [
  (req, res, next) => {
    validator.validate(req, res, next, {
      params: {
        userId: 'integer',
      },
      body: {
        roleId: 'integer',
        email: 'email',
        password: 'specialalphanum',
        githubToken: 'specialalphanum',
        firstName: 'word',
        lastName: 'word',
        age: 'integer',
        level: 'integer',
        profilePic: 'blob',
      },
    });
  },
  auth.haveSession,
  (req, res, next) => {
    Authorizer.authorize(req, res, next, {
      user: 'isUser',
    });
  },
], usersController.update);

// DESTROY User
router.delete('/:userId', [
  (req, res, next) => {
    validator.validate(req, res, next, {
      params: {
        userId: 'integer',
      },
    });
  },
  auth.haveSession,
  (req, res, next) => {
    Authorizer.authorize(req, res, next, {
      user: 'isUser',
    });
  },
], usersController.delete);

// Friendships
// INDEX Friendship
router.get('/:userId/friendships', (req, res, next) => {
  validator.validate(req, res, next, {
    params: {
      userId: 'integer',
    },
  });
}, usersController.getFriends);

// NEW Friendship
router.post('/:userId/friendships/:friendId', [
  (req, res, next) => {
    validator.validate(req, res, next, {
      params: {
        userId: 'integer',
        friendId: 'integer',
      },
    });
  }, auth.haveSession,
], usersController.addFriend);

// User Feed
router.get('/:userId/feed', [
  (req, res, next) => {
    validator.validate(req, res, next, {
      params: {
        userId: 'integer',
      },
    });
  },
  auth.haveSession,
  (req, res, next) => {
    Authorizer.authorize(req, res, next, {
      user: 'isUser',
    });
  },
], usersController.getFeed);

// INDEX emails
router.get('/:userId/emails', [
  (req, res, next) => {
    validator.validate(req, res, next, {
      params: {
        userId: 'integer',
      },
    });
  },
  auth.haveSession,
  (req, res, next) => {
    Authorizer.authorize(req, res, next, {
      user: 'isUser',
    });
  },
], usersController.getEmails);

// NEW email
router.post('/:userId/emails', [
  (req, res, next) => {
    validator.validate(req, res, next, {
      params: {
        userId: 'integer',
      },
    });
  },
  auth.haveSession,
  (req, res, next) => {
    Authorizer.authorize(req, res, next, {
      user: 'isUser',
    });
  },
], usersController.addEmail);

// DELETE email
router.delete('/:userId/emails', [
  (req, res, next) => {
    validator.validate(req, res, next, {
      params: {
        userId: 'integer',
      },
      body: {
        email: 'email',
      },
    });
  },
  auth.haveSession,
  (req, res, next) => {
    Authorizer.authorize(req, res, next, {
      user: 'isUser',
    });
  },
], usersController.deleteEmail);

module.exports = router;

const router = require('express').Router();
// const multer = require('multer');
const commentsRoutes = require('./comments');
const { postsController } = require('../controllers');
const {
  validator,
  // FileHandler,
  Auth,
  Authorizer,
} = require('../middlewares');

// const upload = multer({ dest: 'tmp/' });

// INDEX Post
router.get('/', postsController.getAll);

// INDEX Network posts
router.get('/network', postsController.getTopPosts);

// NEW Post
router.post('/', [
  (req, res, next) => {
    validator.validate(req, res, next, {
      body: {
        title: 'required word',
        text: 'required word',
      },
    });
  },
  Auth.haveSession,
], postsController.insert);

// SHOW Post
router.get('/:postId', (req, res, next) => {
  validator.validate(req, res, next, {
    params: {
      postId: 'integer',
    },
  });
}, postsController.get);

// UPDATE Post
router.put('/:postId', [
  (req, res, next) => {
    validator.validate(req, res, next, {
      params: {
        postId: 'integer',
      },
      body: {
        title: 'word',
        text: 'word',
        score: 'integer',
      },
    });
  },
  Auth.haveSession,
  (req, res, next) => {
    Authorizer.authorize(req, res, next, {
      user: 'owns',
    });
  },
], postsController.update);

// DESTROY Post
router.delete('/:postId', [
  (req, res, next) => {
    validator.validate(req, res, next, {
      params: {
        postId: 'integer',
      },
    });
  },
  Auth.haveSession,
  (req, res, next) => {
    Authorizer.authorize(req, res, next, {
      user: 'owns',
    });
  },
], postsController.delete);

// INDEX Attachment
router.get('/:postId/attachments', [
  (req, res, next) => {
    validator.validate(req, res, next, {
      params: {
        postId: 'integer',
      },
    });
  },
  Auth.haveSession,
  (req, res, next) => {
    Authorizer.authorize(req, res, next, {
      user: 'ownsParent',
    });
  },
], postsController.getAttachments);

// NEW Attachment
router.post('/:postId/attachments', [
//  upload.fields([{ name: 'data', maxCount: 1 }]), // Upload attachment
  (req, res, next) => {
    validator.validate(req, res, next, {
      params: {
        postId: 'integer',
      },
    });
  },
  Auth.haveSession,
  (req, res, next) => {
    Authorizer.authorize(req, res, next, {
      user: 'ownsParent',
    });
  },
//  FileHandler.moveFiles, // Move profile picture to correct folder
//  (req, res, next) => {
//    [req.body.data] = req.filePaths;
//    next();
//  },
], postsController.addAttachment);

// DELETE Attachment
router.delete('/:postId/attachments/:attachmentId', [
  (req, res, next) => {
    validator.validate(req, res, next, {
      params: {
        postId: 'integer',
        attachmentId: 'integer',
      },
    });
  },
  Auth.haveSession,
  (req, res, next) => {
    Authorizer.authorize(req, res, next, {
      user: 'ownsParent',
    });
  },
], postsController.deleteAttachment);

// INDEX score
router.get('/:postId/scores', (req, res, next) => {
  validator.validate(req, res, next, {
    params: {
      postId: 'integer',
    },
  });
}, postsController.getScores);

// NEW score
router.post('/:postId/scores', [
  (req, res, next) => {
    validator.validate(req, res, next, {
      params: {
        postId: 'integer',
      },
      body: {
        score: 'required integer',
      },
    });
  },
  Auth.haveSession,
], postsController.addScore);

// DELETE score
router.delete('/:postId/scores/:scoreId', [
  (req, res, next) => {
    validator.validate(req, res, next, {
      params: {
        postId: 'integer',
        scoreId: 'integer',
      },
    });
  },
  Auth.haveSession,
  (req, res, next) => {
    Authorizer.authorize(req, res, next, {
      user: 'ownsChild',
    });
  },
], postsController.deleteScore);

router.use('/:postId/comments', commentsRoutes);

module.exports = router;

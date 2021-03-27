const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/authenticate-user');
const attachCurrentUser = require("../middlewares/attach-current-user");

const postController = require("../controllers/post.controller.js");


// Create a new Post
router.post("/", isAuth, attachCurrentUser, postController.create);

// Retrieve all Tutorials
router.get("/", isAuth, attachCurrentUser, postController.findAll);

// Retrieve a single Post with id
router.get("/:id", isAuth, attachCurrentUser, postController.findOne);

// Update a Post with id
router.patch("/:id", isAuth, attachCurrentUser, postController.update);

// Delete a Post with id
router.delete("/:id", isAuth, attachCurrentUser, postController.delete);

// Create new comment
router.post("/:postId/comments/", isAuth, attachCurrentUser, postController.saveComment);

// Retrieve all comments
router.get("/:postId/comments/", isAuth, attachCurrentUser, postController.getComments);

module.exports = router;

const postService = require('../services/post.service.js');
const response = require("../utils/response");

// Create and Save a new Post
exports.create = async (req, res) => {
    const {userId, title, body} = req.body;
    try {
        const post = await postService.create({
            userId,
            title,
            body,
        });
        return response.send(res, post.statusCode, 'Saved successful!', 'success', post.data);

    } catch (error) {
        return response.send(res, error.statusCode, error.message, 'error', error.data);
    }
};

// Retrieve all Posts from the database.
exports.findAll = async (req, res) => {
    try {
        const posts = await postService.findAll();
        return response.send(res, posts.statusCode, 'Fetch successful!', 'success', posts.data);

    } catch (error) {
        return response.send(res, error.statusCode, error.message, 'error', error.data);
    }
};

// Find a single Post with an id
exports.findOne = async (req, res) => {
    const {id} = req.params;
    try {
        const post = await postService.findOne(id);
        return response.send(res, post.statusCode, 'Fetch successful!', 'success', post.data);

    } catch (error) {
        return response.send(res, error.statusCode, error.message, 'error', error.data);
    }
};

// Update a Post by the id in the request
exports.update = async (req, res) => {
    const {id} = req.params;
    const {title, body} = req.body;

    try {
        const post = await postService.update(id, {title, body});
        return response.send(res, post.statusCode, 'Update successful!', 'success', post.data);

    } catch (error) {
        return response.send(res, error.statusCode, error.message, 'error', error.data);
    }
};

// Delete a Post with the specified id in the request
exports.delete = async (req, res) => {
    const {id} = req.params;

    try {
        const post = await postService.delete(id);
        return response.send(res, post.statusCode, 'Update successful!', 'success', post.data);

    } catch (error) {
        return response.send(res, error.statusCode, error.message, 'error', error.data);
    }
};

exports.saveComment = async (req, res) => {
    const {postId} = req.params
    const {name, email, body} = req.body;

    try {
        const comment = await postService.addComment({postId, name, email, body});
        return response.send(res, comment.statusCode, 'Comment saved successful!', 'success', comment.data);

    } catch (error) {
        return response.send(res, error.statusCode, error.message, 'error', error.data);
    }
}

exports.getComments = async (req, res) => {
    const {postId} = req.params;

    try {
        const comments = await postService.getAllComments(postId);
        return response.send(res, comments.statusCode, 'Comments fetched successful!', 'success', comments.data);

    } catch (error) {
        return response.send(res, error.statusCode, error.message, 'error', error.data);
    }
}


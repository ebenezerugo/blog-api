const {Post, Comment} = require('../models');
const status = require( "http-status");

const AuthService = require( "./auth.service");
const errorHandler = require("../utils/error-handler");

exports.create = async (post) => {
    try {
        const data = new Post(post);

        const post = await data.save(data);
        return {data: post, statusCode: status.OK};

    } catch(error){
        return errorHandler.logError({message: error, statusCode: status.INTERNAL_SERVER_ERROR});
    }
}


exports.findAll = async () => {
    try {
        const data = await Post.find();
        return {data, statusCode: status.OK};
    } catch (error) {
        return errorHandler.logError({message: error, statusCode: status.INTERNAL_SERVER_ERROR});
    }
}

exports.findOne = async (id) => {
    let data;
    try {
        data = await Post.findById(id);
    } catch (error) {
        return errorHandler.logError({message: error, statusCode: status.INTERNAL_SERVER_ERROR});
    }

    if (!data) {
        return errorHandler.logError({message: 'Not found post with id' + id, statusCode: status.INTERNAL_SERVER_ERROR});
    } else {
        return {data, statusCode: status.OK};
    }

}

exports.update = async (id, post) => {
    let data;
    try {
        data = await Post.findByIdAndUpdate(id, post, { useFindAndModify: false })
    } catch (error) {
        return errorHandler.logError({message: error, statusCode: status.INTERNAL_SERVER_ERROR});
    }

    if (!post) {
        return errorHandler.logError({message: `Cannot update Post with id=${id}. Maybe Post was not found!`, statusCode: status.INTERNAL_SERVER_ERROR});
    } else {
        return {data, statusCode: status.OK};
    }
}

exports.delete = async (id) => {
    let post;
    try {
        post = await Post.findByIdAndRemove(id);
    } catch (error) {
        return errorHandler.logError({message: error, statusCode: status.INTERNAL_SERVER_ERROR});
    }

    if(!post) {
        return errorHandler.logError({message: `Cannot delete Post with id=${id}. Maybe Post was not found!`, statusCode: status.INTERNAL_SERVER_ERROR});
    } else {
        return {data: 'Deleted successfully', statusCode: status.OK};
    }
}

exports.addComment = async (comment) => {
    try {
        const comments = new Comment(comment);

        const data =  await comments.save(comments);

        return {data, statusCode: status.OK};

    } catch(error){
        return errorHandler.logError({message: error, statusCode: status.INTERNAL_SERVER_ERROR});
    }
}

exports.getAllComments = async (postId) => {
    try {
        const data = await Comment.find({postId: postId});
        return {data, statusCode: status.OK};
    } catch (error) {
        return errorHandler.logError({message: error, statusCode: status.INTERNAL_SERVER_ERROR});
    }
}

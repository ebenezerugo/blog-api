const {expect} = require("chai");
const status = require("http-status");

const postService = require('../../services/post.service');

describe('Testing creation of post', () => {
    it('Should save post to the database', async () => {
        const data = {
            userId: "605eee62f4e6e2cc409595f5,",
            title: "Hello",
            body: "Just a setup"
        }

        const response = await postService.create(data);
        expect(response.statusCode).to.equal(status.OK);
    });
});


describe('Testing get all post', () => {
    it('Should get all posts from the database', async () => {
        const response = await postService.findAll();
        expect(response.statusCode).to.equal(status.OK);
    });
});

describe('Testing get post by Id', () => {
    let post = {};
    it('Should save post to the database', async () => {
        const data = {
            userId: "605eee62f4e6e2cc409595f5,",
            title: "Hello",
            body: "Just a setup"
        }

        const response = await postService.create(data);
        post = response.data;
        expect(response.statusCode).to.equal(status.OK);
    });

    it('Should get a single post from the database', async () => {
        const response = await postService.findOne(post._id);
        expect(response.statusCode).to.equal(status.OK);
    });
});

describe('Testing update post by id', () => {

    let post = {};
    it('Should save post to the database', async () => {
        const data = {
            userId: "605eee62f4e6e2cc409595f5,",
            title: "Hello",
            body: "Just a setup"
        }

        const response = await postService.create(data);
        post = response.data;
        expect(response.statusCode).to.equal(status.OK);
    });


    it('Should update post', async () => {
        const data = {
            userId: "605eee62f4e6e2cc409595f5,",
            title: "Hello update",
            body: "Just a setup update"
        }
        const response = await postService.update(post._id, data);
        expect(response.statusCode).to.equal(status.OK);
    });
});

describe('Testing delete post', () => {
    let post = {};
    it('Should save post to the database', async () => {
        const data = {
            userId: "605eee62f4e6e2cc409595f5,",
            title: "Hello",
            body: "Just a setup"
        }

        const response = await postService.create(data);
        post = response.data;
        expect(response.statusCode).to.equal(status.OK);
    });

    it('should delete a post', async () => {
        const response = await postService.delete(post._id);
        expect(response.statusCode).to.equal(status.OK);
    });
});


describe('Test add comment to post', () => {
    it('Should save post to the database', async () => {
        const data = {
            postId: "605eee62f4e6e2cc409595f5",
            name: "James",
            email: "james@example.com",
            body: "Just a setup, really nice title"
        }

        const response = await postService.addComment(data);
        expect(response.statusCode).to.equal(status.OK);
    });
});

describe('Test get all comments added to a post', () => {
    it('Should get all comments added to a post', async () => {
        const response = await postService.getAllComments("605eee62f4e6e2cc409595f5");
        expect(response.statusCode).to.equal(status.OK);
    });
});

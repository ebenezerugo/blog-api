const {expect} = require("chai");
const status = require("http-status");

const userService = require('../../services/user.service');

describe('Testing the user registration:',() => {
    it('should save user to the database', async () => {

        const data = {
            "email": "james@example.com",
            "password": "123456",
            "name": "James",
        };

        const response = await userService.register(data);
        expect(response.statusCode).to.equal(status.OK);

    });

    it('should return user with email already exist', async () => {
        const data = {
            "email": "james@example.com",
            "password": "123456",
            "name": "James"
        };

        try {
            await userService.register(data);
        } catch (error) {
            expect(error.statusCode).equal(status.ALREADY_REPORTED);
        }
    });
});

describe('Testing user login', () => {

    it('should return email not correct', async () => {
        try {
            await userService.login('idontexist@example.com','1233');
        } catch (error) {
            expect(error.statusCode).to.equal(status.NOT_FOUND);
        }
    });

    it('should return password not correct', async () => {
        try {
            await userService.login('james@example.com','1256');
        } catch (error) {
            expect(error.statusCode).to.equal(status.UNAUTHORIZED);
        }
    });

    it('should log the customer in', async () => {
        const response = await userService.login('james@example.com','123456');
        expect(response.statusCode).to.equal(status.OK);
    });
});

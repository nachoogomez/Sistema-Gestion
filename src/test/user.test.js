import { jest } from '@jest/globals';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import app from '../app.js';
import request from 'supertest';


// Mock the modules
jest.mock('bcrypt');
  
jest.mock('jsonwebtoken');

describe('User controllers', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createUser',() =>{
       
        test('should create a new user', async () => {
            User.findOne = jest.fn().mockResolvedValue(null);

            bcrypt.hash.mockResolvedValue('hashedPassword');

            User.create = jest.fn().mockResolvedValue({
                id: 1,
                user: 'John Doe',
                email: 'john@example.com',
                password: 'hashedPassword',
            });

            const response = await request(app).post('/users/register').send({
                user: 'John Doe',
                email: 'john@example.com',
                password: 'password123',
            });

            expect(response.status).toBe(201);
            expect(response.body.user).toBe('John Doe');
            expect(response.body.email).toBe('john@example.com');

        });

        test('should return 400 if user already exists', async () => {
            User.findOne = jest.fn().mockResolvedValue({});

            const response = await request(app).post('/users/register').send({
                user: 'John Doe',
                email: 'john@example.com',
                password: 'password123',
            });

            expect(response.status).toBe(400);
            expect(response.body.msg).toBe('El usuario ya existe');
        });
    });

    describe('loginUser', () => {
        test('should login user and return token', async () => {
            User.findOne = jest.fn().mockResolvedValue({
                id: 1,
                user: 'John Doe',
                email: 'john@example.com',
                password: 'hashedPassword',
            }); 

            bcrypt.compare.mockResolvedValue(true);

            jwt.sign.mockResolvedValue('token');

            const response = await request(app).post('/users/login').send({
                email: 'john@example.com',
                password: 'password123',
            });

            expect(response.status).toBe(200);
            expect(response.body.token).toBe('token');
        });

        test('should return 401 if invalid password', async () => {
            User.findOne = jest.fn().mockResolvedValue({
                id: 1,
                user: 'John Doe',
                email: 'john@example.com',
                
            });
        });

        test('should return 401 if user not found', async () => {
            User.findOne = jest.fn().mockResolvedValue(null);

            const response = await request(app).post('/users/login').send({
                email: 'john@example.com',
                password: 'password123',
            });
            
        });
    });

    describe('getUsers', () => {
        test('should get all users', async () => {
            const mockUsers = [
                { id: 1, user: 'John Doe', email: 'john@example.com' },
                { id: 2, user: 'Jane Doe', email: 'jane@example.com' },
            ];

            User.find = jest.fn().mockResolvedValue(mockUsers);

            const response = await request(app).get('/users');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUsers);
        });
    });

    describe('deleteUser', () => {
        test('should delete user by ID', async () => {
            User.findByIdAndDelete = jest.fn().mockResolvedValue({});

            const response = await request(app).delete('/users/1');

            expect(response.status).toBe(200);
            expect(response.body.msg).toBe('Usuario eliminado correctamente');
        });
    });
});

// Console command to run the tests
//console.log('To run these tests, execute the following command:');
//console.log('npm test src/test/user.test.js');


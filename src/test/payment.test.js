import { jest } from '@jest/globals';
import { Payment } from '../models/Payment.js';
import { getPayments, postPayment, deletePayment } from '../controllers/paymentControllers.js';
import app from '../app.js';
import request from 'supertest';

jest.mock('../models/Payment');
jest.mock('../controllers/paymentControllers');

describe('Payment controllers', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    
    describe('postPayment', () => {
        test('should create a new payment', async () => {
            const req = {
                body: {
                    amount: 100,
                    date: '2024-01-01',
                    userId: 1
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Payment.create.mockResolvedValue(req.body);

            await postPayment(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ newPayment: req.body });
            expect(Payment.create).toHaveBeenCalledWith(req.body);
        });

        test('should handle error when creating a payment', async () => {
            const req = {
                body: {
                    amount: 100,
                    date: '2024-01-01',
                    userId: 1
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Payment.create.mockRejectedValue(new Error('Error creating payment'));

            await postPayment(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error creating payment' });
        });
    });

    describe('deletePayment', () => {
        test('should delete a payment', async () => {
            const req = {
                params: { id: 1 }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Payment.findByIdAndDelete.mockResolvedValue();

            await deletePayment(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Payment deleted successfully' });
            expect(Payment.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
        });
    })

    describe('getPayments', () => {
        test('should get all payments', async () => {
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            Payment.find.mockResolvedValue([]);

            await getPayments(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ payments: [] });
            expect(Payment.find).toHaveBeenCalled();
        });
    })
})

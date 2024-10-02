import {Payment} from '../models/Payment.js';


// Get all payments
export const getPayments = async (req, res) => {
    
    try {
         const payments = await Payment.findAll();
 
         res.status(200).json({
             payments
         });
    } catch (error) {
          res.status(500).json({
               message: 'Error retrieving payments'
          });
    }   
 }

// Post a payment

export const postPayment = async (req, res) => {

    try {
        const {amount, date, userId} = req.body;

        const newPayment = await Payment.create({
            amount,
            date,
            userId
        });

        res.status(201).json({
            newPayment
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error creating payment'
        });
    }
}

// Delete a payment

export const deletePayment = async (req, res) => {
    try {
        const {id} = req.params;

        const payment = await Payment.findByPk(id);

        if (!payment) {
            return res.status(400).json({
                message: 'Payment not found'
            });
        }

        await payment.destroy();

        res.status(200).json({
            message: 'Payment deleted'
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error deleting payment'
        });
    }
}





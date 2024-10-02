import { Router } from 'express';
import { recolectarErrores } from '../middlewares/recolectarErrores.js';
import {  deletePayment, getPayments, postPayment } from '../controllers/paymentControllers.js';
import {auth } from '../middlewares/auth.js'

const router = Router();

router.get('/payment', 
    recolectarErrores,
    auth('admin'),
    getPayments
)

router.post('/payment', 
    recolectarErrores,
    auth('admin'),
    postPayment
)

router.put('/payment')

router.delete('/payment',
    auth('admin'),
    deletePayment
)

export default router;
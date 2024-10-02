import { Router } from 'express';
import { postFile } from '../controllers/receiptControllers.js';

const router = Router();

router.post('/',
    postFile
)

export default router;
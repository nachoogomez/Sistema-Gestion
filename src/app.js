import express from 'express';
import userRouters from './routes/user.routes.js';
import paymentRouters from './routes/payment.routes.js';
import receiptRouters from './routes/receipts.routes.js';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import morgan from 'morgan';

//Express
const app = express();

//Cors
app.use(cors())

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use(express.json());
app.use(fileUpload(
    {
        useTempFiles : true,
        tempFileDir: '/tmp/',
        createParentPath: true
    }
));

app.use('/users', userRouters);
app.use('/payments', paymentRouters);
app.use('/receipts', receiptRouters);


export default app;
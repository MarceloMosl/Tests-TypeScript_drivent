import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { createPayment, getPaymentByTicketId } from '@/controllers/payments-controller';
import { paymentSchema } from '@/schemas/payment-schemas';

const paymentRouter = Router();

paymentRouter.get('/', authenticateToken, getPaymentByTicketId);
paymentRouter.post('/process', authenticateToken, createPayment);

export { paymentRouter };

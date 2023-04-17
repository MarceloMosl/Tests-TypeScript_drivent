import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getPaymentByTicketId } from '@/controllers/payments-controller';

const paymentRouter = Router();

paymentRouter.get('/', authenticateToken, getPaymentByTicketId);

export { paymentRouter };

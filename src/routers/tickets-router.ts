import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getTicketTypes } from '@/controllers/tickets-controller';

const ticketRouter = Router();

ticketRouter.get('/types', authenticateToken, getTicketTypes);

export { ticketRouter };

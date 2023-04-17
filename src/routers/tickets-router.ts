import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { createTicket, getTicketTypes, getTickets } from '@/controllers/tickets-controller';

const ticketRouter = Router();

ticketRouter.get('/types', authenticateToken, getTicketTypes);
ticketRouter.get('/', authenticateToken, getTickets);
ticketRouter.post('/', authenticateToken, createTicket);

export { ticketRouter };

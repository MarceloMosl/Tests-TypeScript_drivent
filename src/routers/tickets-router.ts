import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { createTicket, getTicketTypes, getTickets } from '@/controllers/tickets-controller';
import { ticketSchema } from '@/schemas/ticket-schemas';

const ticketRouter = Router();

ticketRouter.get('/types', authenticateToken, getTicketTypes);
ticketRouter.get('/', authenticateToken, getTickets);
ticketRouter.post('/', authenticateToken, validateBody(ticketSchema), createTicket);

export { ticketRouter };

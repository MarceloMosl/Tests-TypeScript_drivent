import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ticketsService from '@/services/tickets-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function getTicketTypes(req: Request, res: Response) {
  try {
    const types = await ticketsService.getTicketTypes();
    return res.status(httpStatus.OK).send(types);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  try {
    const tickets = await ticketsService.getTickets(req.userId);
    if (tickets.length == 0) return res.sendStatus(httpStatus.NOT_FOUND);
    return res.status(httpStatus.OK).send(tickets);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}

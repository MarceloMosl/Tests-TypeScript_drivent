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
    const tickets = await ticketsService.getTicket(req.userId);
    if (!tickets) return res.sendStatus(httpStatus.NOT_FOUND);
    return res.status(httpStatus.OK).send(tickets);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}

export async function createTicket(req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId } = req.body;
  if (!ticketTypeId) return res.sendStatus(httpStatus.BAD_REQUEST);
  try {
    const data = await ticketsService.createTicket(ticketTypeId, req.userId);
    return res.status(httpStatus.CREATED).send(data);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

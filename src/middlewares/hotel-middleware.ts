import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from './authentication-middleware';
import ticketsRepo from '@/repositories/tickets-repository';
import paymentRepo from '@/repositories/payment-repository';

export async function validateHotel(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const enrollmentExists = await ticketsRepo.findEnrollmentbyUserId(req.userId);
  if (!enrollmentExists) return res.sendStatus(httpStatus.NOT_FOUND);
  const ticketExists = await ticketsRepo.findFirstTicket(enrollmentExists.id);
  if (!ticketExists) return res.sendStatus(httpStatus.NOT_FOUND);
  const paymentExists = await paymentRepo.getPaymentByTicketId(ticketExists.id);
  if (!paymentExists) return res.sendStatus(httpStatus.UNAUTHORIZED);
  if (!ticketExists.TicketType.includesHotel || ticketExists.TicketType.isRemote)
    return res.sendStatus(httpStatus.CREATED);

  next();
}
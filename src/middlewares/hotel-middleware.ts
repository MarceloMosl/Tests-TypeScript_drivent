import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from './authentication-middleware';
import ticketsRepo from '@/repositories/tickets-repository';
import hotelRepo from '@/repositories/hotel-repository';

export async function validateHotel(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const enrollmentExists = await ticketsRepo.findEnrollmentbyUserId(req.userId);
    if (!enrollmentExists) return res.sendStatus(httpStatus.NOT_FOUND);
    const ticketExists = await ticketsRepo.findFirstTicket(enrollmentExists.id);
    if (!ticketExists) return res.sendStatus(httpStatus.NOT_FOUND);
    if (ticketExists.TicketType.isRemote) return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    if (!ticketExists.TicketType.includesHotel) return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    if (ticketExists.status === 'RESERVED') return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    const hotelExists = await hotelRepo.getAllHotels();
    if (hotelExists.length === 0) return res.sendStatus(httpStatus.NOT_FOUND);

    return next();
  } catch (error) {
    return res.status(400).send(error);
  }
}

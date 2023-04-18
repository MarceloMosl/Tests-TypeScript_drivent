import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentService from '@/services/payments-service';

export async function getPaymentByTicketId(req: AuthenticatedRequest, res: Response) {
  const { ticketId } = req.query;
  if (!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST);
  try {
    const promise = await paymentService.getPaymentByTicketId(Number(ticketId), req.userId);
    if (!promise) return res.sendStatus(httpStatus.UNAUTHORIZED);

    return res.status(httpStatus.OK).send(promise);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function createPayment(req: AuthenticatedRequest, res: Response) {
  try {
    const promise = await paymentService.createPayment(req.body, req.userId);
    if (!promise) return res.sendStatus(httpStatus.NOT_FOUND);

    return res.status(httpStatus.OK).send(promise);
  } catch (error) {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}

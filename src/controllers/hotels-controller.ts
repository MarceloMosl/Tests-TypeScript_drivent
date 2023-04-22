import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import hotelService from '@/services/hotels-service';

export async function getAllHotels(req: AuthenticatedRequest, res: Response) {
  try {
    const promise = await hotelService.getAllHotels(req.userId);
    if (!promise) return res.send(httpStatus.NOT_FOUND);
    return res.send(promise);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}

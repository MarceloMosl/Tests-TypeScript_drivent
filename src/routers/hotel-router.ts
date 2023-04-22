import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getAllHotels } from '@/controllers/hotels-controller';
import { validateHotel } from '@/middlewares/hotel-middleware';

const hotelRouter = Router();

hotelRouter.get('/', authenticateToken, validateHotel, getAllHotels);

export { hotelRouter };

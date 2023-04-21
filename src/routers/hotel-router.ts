import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getAllHotels } from '@/controllers/hotels-controller';

const hotelRouter = Router();

hotelRouter.get('/', getAllHotels);

export { hotelRouter };

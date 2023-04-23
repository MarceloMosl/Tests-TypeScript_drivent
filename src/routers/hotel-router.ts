import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getAllHotels, getHotelRooms } from '@/controllers/hotels-controller';
import { validateHotel } from '@/middlewares/hotel-middleware';

const hotelRouter = Router();

hotelRouter.get('/', authenticateToken, validateHotel, getAllHotels);
hotelRouter.get('/:hotelId', authenticateToken, validateHotel, getHotelRooms);

export { hotelRouter };

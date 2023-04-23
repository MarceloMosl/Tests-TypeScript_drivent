import 'reflect-metadata';
import 'express-async-errors';
import express, { Express } from 'express';
import cors from 'cors';

import { TicketStatus } from '@prisma/client';
import { createTicket } from '../tests/factories/tickets-factory';
import { createPayment } from '../tests/factories/payments-factory';
import { createHotelRooms, createHotelTicketType, cretaeHotel } from '../tests/factories/hotels-factory';
import { createEnrollmentWithAddress } from '../tests/factories/enrollments-factory';
import { generateValidToken } from '../tests/helpers';
import { createUser } from '../tests/factories/users-factory';
import paymentRepo from './repositories/payment-repository';
import { loadEnv, connectDb, disconnectDB } from '@/config';

loadEnv();

import { handleApplicationErrors } from '@/middlewares';
import {
  usersRouter,
  authenticationRouter,
  eventsRouter,
  enrollmentsRouter,
  ticketRouter,
  paymentRouter,
  hotelRouter,
} from '@/routers';

const app = express();
app
  .use(cors())
  .use(express.json())
  .get('/health', async (_req, res) => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const enrollment = await createEnrollmentWithAddress(user);
    const ticketType = await createHotelTicketType();
    const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);
    await createPayment(ticket.id, ticketType.price);
    await paymentRepo.updateTicket(ticket.id);
    const hotel = await cretaeHotel();
    await createHotelRooms(hotel.id);

    console.log(hotel.id);
    console.log(token);
    res.send('OK!');
  })
  .use('/users', usersRouter)
  .use('/auth', authenticationRouter)
  .use('/event', eventsRouter)
  .use('/enrollments', enrollmentsRouter)
  .use('/tickets', ticketRouter)
  .use('/payments', paymentRouter)
  .use('/hotels', hotelRouter)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;

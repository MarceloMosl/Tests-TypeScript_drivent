import { invalidDataError } from '@/errors';
import { paymentObj } from '@/protocols';
import paymentRepo from '@/repositories/payment-repository';

export async function getPaymentByTicketId(ticketId: number, userId: number) {
  const ticketExists = await paymentRepo.findTicketById(ticketId);
  if (!ticketExists) throw invalidDataError(['ticket does not exists']);

  if (ticketExists.Enrollment.userId !== userId) return false;

  return await paymentRepo.getPaymentByTicketId(ticketId);
}

export async function createPayment(paymentObj: paymentObj, userId: number) {
  const ticket = await paymentRepo.findTicketById(paymentObj.ticketId);
  if (!ticket) return false;
  if (ticket.Enrollment.userId !== userId) throw new Error('ticket does not belogns to user');

  return await paymentRepo.createPayment(paymentObj, ticket.TicketType.price);
}

const paymentService = { getPaymentByTicketId, createPayment };
export default paymentService;

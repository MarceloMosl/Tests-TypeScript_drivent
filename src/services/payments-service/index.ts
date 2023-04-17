import { invalidDataError } from '@/errors';
import paymentRepo from '@/repositories/payment-repository';

export async function getPaymentByTicketId(ticketId: number, userId: number) {
  const ticketExists = await paymentRepo.findTicketById(ticketId);
  if (!ticketExists) throw invalidDataError(['ticket does not exists']);

  if (ticketExists.Enrollment.userId !== userId) return false;

  return await paymentRepo.getPaymentByTicketId(ticketId);
}

const paymentService = { getPaymentByTicketId };
export default paymentService;

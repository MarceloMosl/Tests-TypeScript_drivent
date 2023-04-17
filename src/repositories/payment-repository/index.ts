import { prisma } from '@/config';

export async function getPaymentByTicketId(ticketId: number) {
  return await prisma.payment.findFirst({
    where: { ticketId },
  });
}

export async function findTicketById(ticketId: number) {
  return await prisma.ticket.findFirst({
    where: { id: ticketId },
    include: { Enrollment: true },
  });
}

const paymentRepo = { getPaymentByTicketId, findTicketById };

export default paymentRepo;

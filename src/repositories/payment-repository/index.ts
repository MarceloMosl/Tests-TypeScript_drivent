import { prisma } from '@/config';
import { paymentObj } from '@/protocols';

export async function getPaymentByTicketId(ticketId: number) {
  return await prisma.payment.findFirst({
    where: { ticketId },
  });
}

export async function findTicketById(ticketId: number) {
  return await prisma.ticket.findFirst({
    where: { id: ticketId },
    include: { Enrollment: true, TicketType: true },
  });
}

export async function updateTicket(ticketId: number) {
  return prisma.ticket.update({
    where: { id: ticketId },
    data: { status: 'PAID' },
  });
}

export async function createPayment(obj: paymentObj, ticketValue: number) {
  const cardLastDigits = `${obj.cardData.number}`;
  const promise = await prisma.payment.create({
    data: {
      ticketId: obj.ticketId,
      value: ticketValue,
      cardIssuer: obj.cardData.issuer,
      cardLastDigits: cardLastDigits.slice(-4),
    },
  });

  await updateTicket(obj.ticketId);

  return promise;
}

const paymentRepo = { getPaymentByTicketId, findTicketById, createPayment };

export default paymentRepo;

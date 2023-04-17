import { prisma } from '@/config';

export async function findMany() {
  return prisma.ticketType.findMany();
}
export async function findFirstTicket(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: { enrollmentId },
    select: {
      id: true,
      status: true,
      ticketTypeId: true,
      enrollmentId: true,
      TicketType: {
        select: {
          id: true,
          name: true,
          price: true,
          isRemote: true,
          includesHotel: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });
}
export async function findEnrollmentbyUserId(userId: number) {
  return await prisma.enrollment.findFirst({
    where: { userId },
  });
}
export async function findTicketTypeById(ticketTypeId: number) {
  return await prisma.ticketType.findFirst({
    where: { id: ticketTypeId },
  });
}
export async function createTicket(ticketTypeId: number, enrollmentId: number) {
  const promise = await prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      status: 'RESERVED',
    },
  });

  return findFirstTicket(promise.enrollmentId);
}
const ticketsRepo = {
  findMany,
  findFirstTicket,
  findEnrollmentbyUserId,
  findTicketTypeById,
  createTicket,
};
export default ticketsRepo;

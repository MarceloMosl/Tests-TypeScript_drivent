import { prisma } from '@/config';

export async function findMany() {
  return prisma.ticketType.findMany();
}
export async function findManyTickets(enrollmentId: number) {
  return prisma.ticket.findMany({
    where: { enrollmentId },
  });
}
export async function findEnrollmentbyUserId(userId: number) {
  return await prisma.enrollment.findFirst({
    where: { userId },
  });
}
const ticketsRepo = {
  findMany,
  findManyTickets,
  findEnrollmentbyUserId,
};
export default ticketsRepo;

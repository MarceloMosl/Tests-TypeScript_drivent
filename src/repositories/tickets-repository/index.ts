import { prisma } from '@/config';

export async function findMany() {
  return prisma.ticketType.findMany();
}
const ticketsRepo = {
  findMany,
};
export default ticketsRepo;

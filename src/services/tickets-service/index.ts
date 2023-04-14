import ticketsRepo from '@/repositories/tickets-repository';

export async function getTicketTypes() {
  return await ticketsRepo.findMany();
}

export default { getTicketTypes };

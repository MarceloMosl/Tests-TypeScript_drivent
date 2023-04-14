import ticketsRepo from '@/repositories/tickets-repository';

export async function getTicketTypes() {
  return await ticketsRepo.findMany();
}

export async function getTickets(userId: number) {
  const { id } = await ticketsRepo.findEnrollmentbyUserId(userId);
  if (!id) throw new Error('No enrollments found');

  return await ticketsRepo.findManyTickets(id);
}

export default { getTicketTypes, getTickets };

import { invalidDataError } from '@/errors';
import ticketsRepo from '@/repositories/tickets-repository';

export async function getTicketTypes() {
  return await ticketsRepo.findMany();
}

export async function getTicket(userId: number) {
  const { id } = await ticketsRepo.findEnrollmentbyUserId(userId);
  if (!id) throw new Error('No enrollments found');

  return await ticketsRepo.findFirstTicket(id);
}

export async function createTicket(ticketTypeId: number, userId: number) {
  const ticketType = await ticketsRepo.findTicketTypeById(ticketTypeId);
  if (!ticketType) throw invalidDataError(['this ticketType does not exists']);

  const enrollment = await ticketsRepo.findEnrollmentbyUserId(userId);
  if (!enrollment) throw invalidDataError(['this user has no enrollments']);

  return ticketsRepo.createTicket(ticketTypeId, enrollment.id);
}

export default { getTicketTypes, getTicket, createTicket };

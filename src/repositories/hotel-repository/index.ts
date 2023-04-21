import { prisma } from '@/config';

export async function getAllHotels() {
  return await prisma.hotel.findMany();
}

const hotelRepo = { getAllHotels };

export default hotelRepo;

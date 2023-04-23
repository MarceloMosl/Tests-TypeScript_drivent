import { prisma } from '@/config';

export async function getAllHotels() {
  return await prisma.hotel.findMany();
}

export async function getHotelRooms(hotelId: number) {
  return await prisma.hotel.findFirst({
    where: { id: hotelId },
    select: {
      id: true,
      name: true,
      image: true,
      createdAt: true,
      updatedAt: true,
      Rooms: {
        select: {
          id: true,
          name: true,
          capacity: true,
          hotelId: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });
}

const hotelRepo = { getAllHotels, getHotelRooms };

export default hotelRepo;

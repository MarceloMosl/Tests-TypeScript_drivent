import faker from '@faker-js/faker';
import { prisma } from '@/config';

export async function createRemoteTicketType() {
  return prisma.ticketType.create({
    data: {
      name: faker.name.findName(),
      price: faker.datatype.number(),
      isRemote: true,
      includesHotel: true,
    },
  });
}
export async function createNoHotelTicketType() {
  return prisma.ticketType.create({
    data: {
      name: faker.name.findName(),
      price: faker.datatype.number(),
      isRemote: false,
      includesHotel: false,
    },
  });
}

export async function createHotelTicketType() {
  return prisma.ticketType.create({
    data: {
      name: faker.name.findName(),
      price: faker.datatype.number(),
      isRemote: false,
      includesHotel: true,
    },
  });
}

export async function cretaeHotel() {
  return prisma.hotel.create({
    data: {
      name: 'Radisson Alphaville',
      image: 'https://www.essemundoenosso.com.br/wp-content/uploads/2015/11/radisson-alphaville-0.jpg',
    },
  });
}

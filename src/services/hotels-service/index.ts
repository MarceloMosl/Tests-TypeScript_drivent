import hotelRepo from '@/repositories/hotel-repository';

export async function getAllHotels() {
  return await hotelRepo.getAllHotels();
}

export async function getHotelRooms(hotelId: number) {
  return await hotelRepo.getHotelRooms(hotelId);
}

const hotelService = { getAllHotels, getHotelRooms };

export default hotelService;

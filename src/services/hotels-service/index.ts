import hotelRepo from '@/repositories/hotel-repository';

export async function getAllHotels() {
  return await hotelRepo.getAllHotels();
}

const hotelService = { getAllHotels };

export default hotelService;

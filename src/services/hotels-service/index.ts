import hotelRepo from '@/repositories/hotel-repository';

export async function getAllHotels(userId: number) {
  console.log(userId);
  return await hotelRepo.getAllHotels();
}

const hotelService = { getAllHotels };

export default hotelService;

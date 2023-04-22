import hotelRepo from '@/repositories/hotel-repository';

export async function getAllHotels() {
  const promise = await hotelRepo.getAllHotels();
  if (promise.length === 0) return false;

  return promise;
}

const hotelService = { getAllHotels };

export default hotelService;

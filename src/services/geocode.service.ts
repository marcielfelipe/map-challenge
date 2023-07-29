import { api } from './http/api';
import { ICoordinates, IDataGeocode } from './types';

class GeocodeService {
  async getAddress(coordinates:ICoordinates): Promise<{data:IDataGeocode}> {
    return api.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}
    &key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`);
  }
  
}
const geocodeService = new GeocodeService();
export default geocodeService
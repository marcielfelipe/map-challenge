export interface ICoordinates{
  lat:number
  lng:number
}

interface IAddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface ILocation {
  lat: number;
  lng: number;
}

interface IViewport {
  northeast: ILocation;
  southwest: ILocation;
}

interface Geometry {
  location: ILocation;
  location_type: string;
  bounds?: {
    northeast: ILocation;
    southwest: ILocation;
  };
  viewport?: IViewport;
}

interface IPlusCode {
  compound_code: string;
  global_code: string;
}

interface IResult {
  address_components: IAddressComponent[];
  formatted_address: string;
  geometry: Geometry;
  place_id: string;
  plus_code?: IPlusCode;
  types: string[];
}

export interface IDataGeocode {
  plus_code: IPlusCode;
  results: IResult[];
  status: string;
}

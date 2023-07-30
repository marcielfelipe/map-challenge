import { IAddressComponent } from "@/services/types";

export interface IAddressFormatted {
  street: string;
  district: string;
  city: string;
  state: string;
  country: string;
}
enum TypeAdressEnum {
  STREET = "street",
  STREET_NUMBER = "street_number",
  DISTRICT = "district",
  CITY = "city",
  STATE = "state",
  COUNTRY = "country",
}
export interface ITypeAddress {
  type: TypeAdressEnum;
  possibleReturns: string[];
}
const typeAdress: ITypeAddress[] = [
  {
    type: TypeAdressEnum.STREET,
    possibleReturns: ["route", "plus_code"],
  },
  {
    type: TypeAdressEnum.STREET_NUMBER,
    possibleReturns: ["street_number"],
  },
  {
    type: TypeAdressEnum.DISTRICT,
    possibleReturns: [
      "administrative_area_level_4",
      "administrative_area_level_5",
      "administrative_area_level_6",
      "administrative_area_level_7",
      "colloquial_area",
      "locality",
      "sublocality",
      "sublocality_level_1",
      "sublocality_level_2",
      "sublocality_level_3",
      "sublocality_level_4",
      "sublocality_level_5",
      "neighborhood",
    ],
  },
  {
    type: TypeAdressEnum.CITY,
    possibleReturns: [
      "administrative_area_level_2",
      "administrative_area_level_3",
    ],
  },
  {
    type: TypeAdressEnum.STATE,
    possibleReturns: ["administrative_area_level_1"],
  },
  {
    type: TypeAdressEnum.COUNTRY,
    possibleReturns: ["country"],
  },
];

function returnAdress(allAdress:IAddressComponent[],type:TypeAdressEnum){
  var addressReturn:string|undefined
  const possibleTypes = typeAdress.find(t =>t.type===type)?.possibleReturns
  possibleTypes?.map(possibleType=>{
    const addresFound = allAdress.find((addr) => addr.types.includes(possibleType))?.long_name
    if(addresFound){
      addressReturn = addresFound
    }
  })
  return addressReturn||''
}

export function getFormattedAddress(address: IAddressComponent[]) {
  const number = returnAdress(address,TypeAdressEnum.STREET_NUMBER)
  const street = returnAdress(address,TypeAdressEnum.STREET)

  var formattedAddress:IAddressFormatted= {
    street:`${street}, ${number}`,
    district: returnAdress(address,TypeAdressEnum.DISTRICT),
    city:returnAdress(address,TypeAdressEnum.CITY),
    state:returnAdress(address,TypeAdressEnum.STATE),
    country:returnAdress(address,TypeAdressEnum.COUNTRY),
  };

  let newStreet = formattedAddress.street.trim()
  if(newStreet.endsWith(',')){
    formattedAddress.street = newStreet.slice(0, -1)
  }
  return formattedAddress;
}

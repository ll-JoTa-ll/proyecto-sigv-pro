import { IFareFamilyServiceModel } from './IFareFamilyService.model';

export interface IFareFamilyModel {
  origin: string;
  airportOrigin: string;
  destination: string;
  airportDestination: string;
  departureDate: string;
  departureDateShow: string;
  timeOfDeparture: string;
  timeOfDepartureShow: string;
  arrivalDate: string;
  arrivalDateShow: string;
  timeOfArrival: string;
  timeOfArrivalShow: string;
  totalFlightTime: string;
  totalFlightTimeShow: string;
  numberScales: number;
  currency: string;
  flightOrtrainNumber: string;
  equipmentType: string;
  carrierId: string;
  lfareFamilies: IFareFamilyServiceModel[];
}

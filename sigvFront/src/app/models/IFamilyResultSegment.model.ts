import { IFareFamilyServiceModel } from './IFareFamilyService.model';

export interface IFamilyResultSegmentModel {
  oorigin;
  odestination;
  odeparture;
  oarrival;
  otime;
  numberScales;
  oairline;
  lfareFamilies: IFareFamilyServiceModel[];
}

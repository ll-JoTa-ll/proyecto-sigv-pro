import { IFamilyResultSegmentModel } from './IFamilyResultSegment.model';

export interface IFamilyResultSectionModel {
  sectionId;
  oorigin;
  odestination;
  lsegments: IFamilyResultSegmentModel[];
}

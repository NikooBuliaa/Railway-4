import { Vagon } from './vagon.model';

export interface Train {
  id: number;
  name: string;
  wagons: Vagon[];
}



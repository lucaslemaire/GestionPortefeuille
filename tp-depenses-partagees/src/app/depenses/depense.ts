import {Membre} from '../membres/membre';

export interface Depense{
  id: number;
  date_depense: string;
  acheteur: Membre;
  montant: number;
  description: string;
  participants: Membre[];
}

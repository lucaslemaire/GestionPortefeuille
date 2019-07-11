import {Participant} from '../depenses/participant';

export interface Membre {
  id: number;
  nom:  string;
  prenom:  string;
  email:  string;
  password:  string;
  avatar?:  any;
  solde: number;
  achats: any[];
  depenses: any[];
  pivot: Participant[];
}

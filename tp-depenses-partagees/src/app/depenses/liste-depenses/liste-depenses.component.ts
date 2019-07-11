import { Component, OnInit } from '@angular/core';
import {DepenseService} from '../depense.service';
import {Depense} from '../depense';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-liste-depenses',
  templateUrl: './liste-depenses.component.html',
  styleUrls: ['./liste-depenses.component.css']
})
export class ListeDepensesComponent implements OnInit {

  depenses$: Observable<Depense[]>;
  closeResult: string;
  showVar: boolean;

  constructor(private depenseService: DepenseService) {
    this.showVar = false;
  }

  toggleChild(){
    this.showVar = !this.showVar;
  }

  ngOnInit() {
    this.depenses$ = this.depenseService.getDepenses();
  }

}

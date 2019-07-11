import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Membre} from '../membre';
import {MembreService} from '../membre.service';

@Component({
  selector: 'app-liste-membres',
  templateUrl: './liste-membres.component.html',
  styleUrls: ['./liste-membres.component.css']
})
export class ListeMembresComponent implements OnInit {

  membres$: Observable<Membre[]>;

  constructor(private membreService: MembreService) { }

  ngOnInit() {
    this.membres$ = this.membreService.getMembres();
  }

}

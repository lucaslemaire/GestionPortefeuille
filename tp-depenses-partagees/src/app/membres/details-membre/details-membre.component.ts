import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Membre} from '../membre';
import {MembreService} from '../membre.service';

@Component({
  selector: 'app-details-membre',
  templateUrl: './details-membre.component.html',
  styleUrls: ['./details-membre.component.css']
})

export class DetailsMembreComponent implements OnInit {

  membre: Membre;


  constructor(private route: ActivatedRoute,
              private service: MembreService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.getMembreDetail(Number(id)).subscribe(
      response => this.handleResponse(response)
    );
  }

  protected handleResponse(response: Membre) {
    this.membre = response['data'];
  }

}

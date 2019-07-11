import { Component, OnInit } from '@angular/core';
import {Depense} from '../depense';
import {DepenseService} from '../depense.service';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../auth/auth.service';

const btn = 'btn-primary';

@Component({
  selector: 'app-details-depense',
  templateUrl: './details-depense.component.html',
  styleUrls: ['./details-depense.component.css']
})
export class DetailsDepenseComponent implements OnInit {

  depense: Depense;
  private _showAbout: boolean;
  private _showEdit: boolean;
  private _showDelete: boolean;

  constructor(private route: ActivatedRoute,
              private service: DepenseService,
              private auth: AuthService) {
    this._showAbout = true;
    this._showEdit = false;
    this._showDelete = false;
  }

  toggleAbout(): void {
    this._showAbout = true;
    this._showEdit = false;
    this._showDelete = false;
    document.getElementById('about').classList.add(btn);
    document.getElementById('edit').classList.remove(btn);
    document.getElementById('delete').classList.remove(btn);
  }

  toggleEdit(): void {
    this._showAbout = false;
    this._showEdit = true;
    this._showDelete = false;
    document.getElementById('about').classList.remove(btn);
    document.getElementById('edit').classList.add(btn);
    document.getElementById('delete').classList.remove(btn);
  }

  toggleDelete(): void {
    this._showAbout = false;
    this._showEdit = false;
    this._showDelete = true;
    document.getElementById('about').classList.remove(btn);
    document.getElementById('edit').classList.remove(btn);
    document.getElementById('delete').classList.add(btn);
  }

  isOwnerOfDepense(): boolean {
    if(this.depense !== undefined && this.auth.currentUser !== undefined){
    return this.depense.acheteur.id === this.auth.currentUser.id;} else { return false; }
  }


  get showAbout(): boolean {
    return this._showAbout;
  }

  get showEdit(): boolean {
    return this._showEdit;
  }

  get showDelete(): boolean {
    return this._showDelete;
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.getDepenseDetail(Number(id)).subscribe(
      response => this.handleResponse(response)
    );
  }

  protected handleResponse(response: Depense) {
    this.depense = response['data'];
  }

}

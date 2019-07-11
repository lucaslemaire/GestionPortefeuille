import {Component, Input, OnInit} from '@angular/core';
import {Depense} from '../../depense';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DepenseService} from '../../depense.service';
import {MembreService} from '../../../membres/membre.service';
import {Membre} from '../../../membres/membre';
import {Observable} from 'rxjs';
import {AuthService} from '../../../auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Participant} from '../../participant';

@Component({
  selector: 'app-edit-depense',
  templateUrl: './edit-depense.component.html',
  styleUrls: ['./edit-depense.component.css']
})
export class EditDepenseComponent implements OnInit {

  @Input() depense: Depense;
  membres$: Observable<Membre[]>;
  currentUser;
  error: any;
  returnUrl;
  editForm: FormGroup;
  addForm: FormGroup;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  closeResult: string;

  constructor(private service: DepenseService, private membreService: MembreService, private fb: FormBuilder,
              private auth: AuthService, private router: Router, private route: ActivatedRoute,
              private modalService: NgbModal) {
    this.currentUser =  this.auth.currentUser.prenom + ' ' + this.auth.currentUser.nom;
    this.membres$ = this.membreService.getMembres();
    this.createForm();
    this.createAddForm();
  }

  createForm() {
    this.editForm = this.fb.group({
      date_depense: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      montant: ['', Validators.compose([Validators.required, Validators.pattern(/[0-9]+[0-9]?[0-9]?\.[0-9]{2}/)])],
      acheteur: ['', Validators.compose([Validators.required])]
    });
  }

  createAddForm() {
    this.addForm = this.fb.group({
      quote_part: ['', Validators.compose([Validators.required, Validators.pattern(/[0-9]+[0-9]?[0-9]?\.[0-9]{2}/)])],
      membre_id: ['', Validators.compose([Validators.required])]
    });
  }

  onSubmit(): void {
    console.log('contenu du formulaire : ', this.editForm.value);
    this.service.editDepense(this.editForm.value, this.depense.id).subscribe(
      (response) => {
        this.router.navigate([this.returnUrl]);
      },
      (error) => {
        this.error = error.error;
      }
    );
    this.editForm.reset();
  }

  onAddSubmit(): void {
    console.log('contenu du formulaire : ', this.addForm.value);
    this.service.addParticipant(this.addForm.value, this.depense.id).subscribe(
      (response) => {
        this.router.navigate([this.returnUrl]);
      },
      (error) => {
        this.error = error.error;
      }
    );
    this.addForm.reset();
  }

  onDeleteSubmit(p: Participant): void {
    console.log('suppression du participant');
    this.service.deleteParticipant(p, this.depense.id).subscribe(
      (response) => {
        this.router.navigate([this.returnUrl]);
      },
      (error) =>{
        this.error = error.error;
      }
    );
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/depenses/' + this.depense.id;
  }

  get date_depense() {
    return this.editForm.get('date_depense');
  }

  get montant() {
    return this.editForm.get('montant');
  }

  get description() {
    return this.editForm.get('description');
  }

  get acheteur() {
    return this.editForm.get('acheteur');
  }

  get quote_part() {
    return this.addForm.get('quote_part');
  }

  get membre_id() {
    return this.addForm.get('membre_id');
  }

}

import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DepenseService} from '../depense.service';
import {AuthService} from '../../auth/auth.service';
import {User} from '../../auth/user.model';

@Component({
  selector: 'app-add-depense',
  templateUrl: './add-depense.component.html',
  styleUrls: ['./add-depense.component.css']
})
export class AddDepenseComponent implements OnInit {

  @Input() showMe: boolean;
  error: any;
  membre: User;
  depenseForm: FormGroup;
  returnUrl;

  constructor(private service: DepenseService, private route: ActivatedRoute,
              private fb: FormBuilder, private router: Router, public auth: AuthService) {
    this.createForm();
  }

  createForm() {
    this.depenseForm = this.fb.group({
      date_depense: ['', Validators.compose([Validators.required])],
      montant: ['', Validators.compose([Validators.required, Validators.pattern(/[0-9]+[0-9]?[0-9]?\.[0-9]{2}/)])],
      description: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(100)])],
    });
  }

  onSubmit(): void {
    console.log('contenu du formulaire : ', this.depenseForm.value);
    this.service.addDepense(this.depenseForm.value).subscribe(
      (response) => {
        this.router.navigate([this.returnUrl]);
      },
      (error) => {
        this.error = error.error;
      }
    );
    this.depenseForm.reset();
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/depenses';
  }

  get date_depense() {
    return this.depenseForm.get('date_depense');
  }

  get montant() {
    return this.depenseForm.get('montant');
  }

  get description() {
    return this.depenseForm.get('description');
  }


}

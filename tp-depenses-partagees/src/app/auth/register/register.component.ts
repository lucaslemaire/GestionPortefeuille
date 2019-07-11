import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  error: any;
  returnUrl;
  registerForm: FormGroup;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
    this.createForm();
  }

  createForm(){
    this.registerForm = this.fb.group({
      nom: ['', Validators.compose([Validators.required])],
      prenom: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirm_password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    }, {validator: this.checkPasswords});
  }

  checkPasswords(group: FormGroup) {
    return group.controls.password.value === group.controls.confirm_password.value ? null : {notSame: true};
  }

  onSubmit(): void {
    console.log('contenu du formulaire : ', this.registerForm.value);
    this.authService.onRegister(this.registerForm.value).subscribe(
      (response) => {
        this.router.navigate([this.returnUrl]);
      },
      (error) => {
        this.error = error.error;
      }
    );
    this.registerForm.reset();
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get nom() {
    return this.registerForm.get('nom');
  }

  get prenom() {
    return this.registerForm.get('prenom');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirm_password() {
    return this.registerForm.get('confirm_password');
  }

}

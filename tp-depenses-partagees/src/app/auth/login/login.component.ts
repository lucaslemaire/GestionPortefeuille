import { Component, OnInit } from '@angular/core';
import {User} from '../user.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  error: any;
  returnUrl;
  loginForm: FormGroup;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }

  onSubmit(): void {
    console.log('contenu du formulaire : ', this.loginForm.value);
    this.authService.onLogin(this.loginForm.value).subscribe(
      (response) => {
        // En cas de succès redirige vers l'url stokée ou '/'
        this.router.navigate([this.returnUrl]);
      },
      (error) => {
        this.error = error.error;
      }
    );
    // Ré-initialise le formulaire
    this.loginForm.reset();
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}

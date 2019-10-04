import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  formRegistrar: FormGroup;

  constructor(
    public userService: UserService,
    public router: Router,
    public fb: FormBuilder
    ) {
    this.formRegistrar = this.fb.group({
      hideRequired: false,
      floatLabel: 'auto',
      // nombres: ['nombres', [Validators.required]],
      // apellidos: ['apellidos', [Validators.required]],
      // pais: ['pais', [Validators.required]],
      // idioma: ['idioma', [Validators.required, Validators.email]],
      email: ['email', [Validators.required, Validators.email]],
      // username: ['username', [Validators.required, Validators.email]],
      password: ['password', [Validators.pattern(/^[a-z0-9_-]{6,18}$/), Validators.required, Validators.minLength(8)]],
      // tokenSocial: ['tokenSocial', [Validators.required]]
    });
   }
   get f() { return this.formRegistrar.controls; }

  ngOnInit() {

  }
  saveData() {
    console.log(this.formRegistrar.value);
  }

  onSubmitRegister(form: FormGroup) {
    this.userService.registar(form.value).then(res => {
      this.router.navigateByUrl('/perfil');
    });
    }

}

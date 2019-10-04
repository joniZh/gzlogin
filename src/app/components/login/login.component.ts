import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';
import { SocialUser } from 'angularx-social-login';
import { FormBuilder, FormGroup, Validators, NgForm} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user: SocialUser;
  private loggedIn: boolean;
  public error: string;
  formLogin: FormGroup;
  public token;

  constructor(
    public router: Router,
    public userService: UserService,
    public fb: FormBuilder
    ) {
      this.formLogin = this.fb.group({
        hideRequired: false,
      floatLabel: 'auto',
        email: ['email', [Validators.required, Validators.email]],
        password: ['password', [Validators.pattern(/^[a-z0-9_-]{6,18}$/), Validators.required, Validators.minLength(8)]]
      });
     }
     get f() { return this.formLogin.controls; }

  ngOnInit(
  ) {  this.loggedIn = this.userService.IniSession(); }

  saveData() {
    console.log(this.formLogin.value);
  }

  onLogin(form: FormGroup): void {
    this.userService.login(form.value).then(res => {
      // console.log(res);
      this.router.navigateByUrl('/perfil');
    });
  }

  loginGoogle() {
    this.userService.loginGoogle()
    .then((resultado) => {
      console.log(resultado.user.providerData[0]);
      this.router.navigate(['/perfil']);
    }).catch((error) => {
      console.log('error of authetication' + error);
      this.router.navigate(['/login']);
    });
  }


}

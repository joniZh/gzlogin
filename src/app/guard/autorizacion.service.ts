import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import {UserService} from '../shared/user.service';


@Injectable()
export class AutorizacionService  implements CanActivate{

  constructor(private userService:UserService, private router:Router) { }


canActivate(){
  // var sesion = this.userService.IniSession();
  // console.log(sesion);
  if (!this.userService.IniSession()) {
    console.log('No estás logueado');
    this.router.navigate(['/login']);
    return false;
  }
    // this.router.navigate(['/home']);
    return true;
}
}

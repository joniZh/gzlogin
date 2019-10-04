import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';
import { MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  public isLogin: boolean;

  ngOnInit() {
    this.onCheckUser();
  }

  onLogout(): void {
    this.userService.logout();
    this.router.navigateByUrl('/login');
  }

  onCheckUser(): void {
    console.log('estado de session', this.userService.IniSession());
    if (!this.userService.IniSession()) {
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }
  }

}

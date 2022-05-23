import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService) {}

  logged!: boolean;

  ngOnInit(): void {
    this.authService.loggedUser$.subscribe((val) => {
      this.logged = val;
    });
  }

  logout() {
    this.authService.logout();
  }
}

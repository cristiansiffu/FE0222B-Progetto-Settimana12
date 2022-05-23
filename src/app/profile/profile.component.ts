import { Component, OnInit } from '@angular/core';
import { AuthData, AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private authService: AuthService
  ) {}

  userName!: string | undefined
    userEmail!: string | undefined

  ngOnInit(): void {
    this.authService.user$.subscribe((val) => {
      this.userName = val?.user.name;
      this.userEmail = val?.user.email
    });

  }
}

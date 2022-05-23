import { Component, OnInit } from '@angular/core';
import { AuthData, AuthService } from '../auth/auth.service';
import { Favourites } from '../interfaces/favourites';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private moviesService: MoviesService
  ) {}

  favourites!: Favourites[];
  userName!: string | undefined;
  userEmail!: string | undefined;

  ngOnInit(): void {
    this.authService.user$.subscribe((val) => {
      this.userName = val?.user.name;
      this.userEmail = val?.user.email;
    });
  }
}

import { Injectable } from '@angular/core';
import { AuthService, AuthData } from '../auth/auth.service';
import { Movies } from '../interfaces/movies';
import { Favourites } from '../interfaces/favourites';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  URL = 'http://localhost:4201';
  movies!: Movies[];
  favourites!: Favourites[];

  constructor(private authService: AuthService, private http: HttpClient) {}

  getMovies() {
    // this.getFavourite();
    return this.http.get<Movies[]>(`${this.URL}/movies-popular`);
  }

  addFavorite(movie: Movies) {
    movie.favourite = true;
    this.authService.user$.subscribe((val) => {
      console.log(val);
      let randomId = Math.floor(Math.random() * 100000)
      const favouriteMovie: Favourites = {
        movieId: movie.id,
        userId: val!.user.id,
        id: randomId,
      };
      console.log(favouriteMovie);
      return this.http.post<Favourites[]>(
        'http://localhost:4201/favorites',
        favouriteMovie
      );
    });
  }

  /* getFavourite() {
    this.authService.user$.subscribe((val) => {
      this.http.get<Favourites[]>(
        `http://localhost:4201/favorites?userId=${val!.user.id}`
      );
    });
  } */
}

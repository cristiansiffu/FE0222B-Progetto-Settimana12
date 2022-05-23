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
    return this.http.get<Movies[]>(`${this.URL}/movies-popular`);
  }

  addFavorite(movie: Movies) {
    movie.favourite = true;
    this.authService.user$.subscribe((val) => {
      console.log(val);
      let idFavourite = 0
      const favouriteMovie: Favourites = {
        movieId: movie.id,
        userId: val!.user.id,
        id: idFavourite++,
      };
      console.log(favouriteMovie.movieId, favouriteMovie.userId);
      return this.http.post<Favourites[]>(
        'http://localhost:4201/favorites',
        favouriteMovie
      ).subscribe()
    });
  }
}

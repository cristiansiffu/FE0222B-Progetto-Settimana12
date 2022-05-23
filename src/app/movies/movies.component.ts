import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movies } from '../interfaces/movies';
import { tap } from 'rxjs';
import { Favourites } from '../interfaces/favourites';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  constructor(private moviesService: MoviesService) {}

  movies!: Movies[];
  favourites!: Favourites[];

  ngOnInit(): void {
    this.movieList();
    // this.moviesService.getFavourite()
  }
  movieList() {
    this.moviesService.getMovies().pipe(
      tap((movie) => {
        this.movies = movie;
      })
    ).subscribe();
  }
  like(movie: Movies){
    return this.moviesService.addFavorite(movie);
  }
}

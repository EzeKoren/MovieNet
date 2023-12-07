import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from './movie';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { mergeAll, first, catchError, tap } from 'rxjs/operators';

/**
 * MovieService class provides methods to fetch movies from database.
 */
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  movies = signal<Record<number, Movie>>({});
  movieWatchlist: number[] = [];

  constructor(private httpClient: HttpClient) {
    const moviesString = sessionStorage.getItem('movies');
    this.movieWatchlist = JSON.parse(
      localStorage.getItem('movieWatchlist') || '[]'
    );

    const setMovies = (movieList: Movie[]) =>
      this.movies.set(
        movieList.reduce((acc: Record<number, Movie>, cur: Movie) => {
          cur.onWatchlist = this.movieWatchlist.includes(cur.id);
          acc[cur.id] = cur;

          return acc;
        }, {})
      );

    if (moviesString) {
      const movieList = JSON.parse(moviesString) as Movie[];
      setMovies(movieList);
    } else {
      this.httpClient
        .get<Movie[]>('assets/movies.json')
        .forEach((movieList) => {
          movieList = movieList.map((movie) => ({
            ...movie,
            onWatchlist: this.movieWatchlist.includes(movie.id),
          }));
          setMovies(movieList);
          sessionStorage.setItem('movies', JSON.stringify(movieList));
        });
    }
  }

  setOnWatchlist(movieId: number, addToWatchlist: boolean) {
    console.log('watchlist updated');

    if (addToWatchlist) this.movieWatchlist.push(movieId);
    else this.movieWatchlist.filter((id) => id !== movieId);

    debugger;

    localStorage.setItem('movieWatchlist', JSON.stringify(this.movieWatchlist));

    this.movies.update((movies) => {
      movies[movieId].onWatchlist = addToWatchlist;
      return movies;
    });
  }
}

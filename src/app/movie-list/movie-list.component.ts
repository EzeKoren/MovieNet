import { Component, Signal, computed, signal } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';

type Order = ['name' | 'date', 'asc' | 'desc'];

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent {
  currentOrder = signal<Order>(['name', 'asc']);
  lastHoveredMovie = signal<number>(0);

  movies: Signal<Movie[]> = computed(() =>
    this.order(Object.values(this.movieService.movies()))
  );

  constructor(private movieService: MovieService) {}

  setOrder(orderBy: 'name' | 'date') {
    this.currentOrder.update((prevOrder) => {
      if (prevOrder[0] === orderBy)
        return [orderBy, prevOrder[1] === 'asc' ? 'desc' : 'asc'];
      else return [orderBy, 'asc'];
    });
  }

  getYear(releasedDate: string) {
    console.log(`getYear called with: ${releasedDate}`);
    return new Date(releasedDate).getFullYear();
  }

  onMoviePosterHover(movieId: number) {
    console.log(`Movie with movieId ${movieId} hovered`);

    this.lastHoveredMovie.set(movieId);
  }

  toggleWatchlist(movie: Movie) {
    this.movieService.setOnWatchlist(movie.id, !movie.onWatchlist);
  }

  private order(movies: Movie[]) {
    return movies.sort((a, b) => {
      switch (this.currentOrder()[0]) {
        case 'name':
          return this.currentOrder()[1] === 'asc'
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
        case 'date':
          const aDate = new Date(a.releasedDate);
          const bDate = new Date(b.releasedDate);

          return this.currentOrder()[1] === 'asc'
            ? aDate.getTime() - bDate.getTime()
            : bDate.getTime() - aDate.getTime();
      }
    });
  }
}

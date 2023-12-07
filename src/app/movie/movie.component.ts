import { Component, Input } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent {
  @Input() movie!: Movie;

  constructor(private movieService: MovieService) {}

  onClickToggleWatchlist() {
    this.movieService.setOnWatchlist(this.movie.id, !this.movie.onWatchlist);
  }
}

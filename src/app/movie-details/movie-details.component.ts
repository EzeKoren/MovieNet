import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';

type StarRating = 'faStar' | 'faStarHalfStroke' | 'faSolidStar';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent {
  movie!: Movie;
  stars!: StarRating[];
  safeEmbed!: SafeResourceUrl;
  localizedReleaseDate!: string;
  duration!: string;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const movieIdFromRoute = Number(routeParams.get('movieId'));

    this.movie = this.movieService.movies()[movieIdFromRoute];

    this.stars = Array.from({ length: 5 }, (_, i) =>
      this.getStar(this.movie.rating, i)
    );

    this.safeEmbed = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.movie.trailerLink
    );

    this.localizedReleaseDate = new Date(
      this.movie.releasedDate
    ).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    this.duration = this.getDuration();
  }

  private getDuration(): string {
    if (this.movie.duration < 60) return `${this.movie.duration} minutes`;

    const hours = Math.floor(this.movie.duration / 60);
    const minutes = this.movie.duration % 60;

    return minutes > 0
      ? `${hours} hours, ${minutes} minutes`
      : `${hours} hours`;
  }

  private getStar(rating: number, position: number): StarRating {
    const starNumericValue = Math.min(Math.max(rating / 2 - position, 0), 1);

    switch (starNumericValue) {
      case 0:
        return 'faStar';
      case 1:
        return 'faSolidStar';
      default:
        return 'faStarHalfStroke';
    }
  }

  onClickToggleWatchlist() {
    this.movieService.setOnWatchlist(this.movie.id, !this.movie.onWatchlist);
  }
}

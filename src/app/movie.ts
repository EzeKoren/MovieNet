export class Movie {
  id!: number;
  title!: string;
  description!: string;
  rating!: number;
  duration!: number;
  genre!: string[];
  releasedDate!: string;
  trailerLink!: string;
  cover!: string;
  onWatchlist: boolean = false;
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieComponent } from './movie/movie.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { NgIconsModule } from '@ng-icons/core';
import {
  faBookmark,
  faStar,
  faStarHalfStroke,
  faClock,
  faCalendar,
} from '@ng-icons/font-awesome/regular';
import {
  faSolidBookmark,
  faSolidStar,
  faSolidChevronLeft,
  faSolidChevronUp,
  faSolidChevronDown,
} from '@ng-icons/font-awesome/solid';
@NgModule({
  declarations: [
    AppComponent,
    MovieDetailsComponent,
    MovieComponent,
    MovieListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgIconsModule.withIcons({
      faBookmark,
      faSolidBookmark,
      faStar,
      faStarHalfStroke,
      faSolidStar,
      faClock,
      faCalendar,
      faSolidChevronLeft,
      faSolidChevronUp,
      faSolidChevronDown,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
